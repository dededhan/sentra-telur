"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateAbout(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description) {
      return { success: false, error: "Judul dan Deskripsi wajib diisi." };
    }

    const currentAbout = await prisma.about.findFirst();
    let imageUrl = currentAbout?.image || "";

    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `about-${Date.now()}.${fileExt}`;
      
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(fileName, buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type
        });

      if (uploadError) {
         return { success: false, error: `Gagal upload gambar: ${uploadError.message}` };
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(fileName);
        
      imageUrl = publicUrl;

      // Hapus gambar lama dari storage
      if (currentAbout?.image) {
        const oldFileName = currentAbout.image.split('/').pop();
        if (oldFileName) {
           await supabase.storage.from('assets').remove([oldFileName]);
        }
      }
    }

    const data = {
      title,
      description,
      image: imageUrl,
    };

    if (currentAbout) {
      await prisma.about.update({
        where: { id: currentAbout.id },
        data
      });
    } else {
      await prisma.about.create({
        data: {
          ...data,
          id: 1
        }
      });
    }

    revalidatePath("/", "layout"); 
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal menyimpan data About" };
  }
}
