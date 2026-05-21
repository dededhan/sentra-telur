"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addSustainabilitySection(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;
    const category = (formData.get("category") as string) || "sustainability";

    if (!title || !description || !image || image.size === 0) {
      return { success: false, error: "Judul, penjelasan, dan gambar wajib diisi." };
    }

    const fileExt = image.name.split('.').pop();
    const fileName = `sustainability-${Date.now()}.${fileExt}`;
    
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from('assets')
      .upload(fileName, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: image.type
      });

    if (uploadError) {
      return { success: false, error: `Gagal upload gambar: ${uploadError.message}` };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('assets')
      .getPublicUrl(fileName);

    const count = await prisma.sustainabilitySection.count({
      where: { category }
    });

    await prisma.sustainabilitySection.create({
      data: {
        category,
        title,
        description,
        imageUrl: publicUrl,
        order: count
      }
    });

    revalidatePath("/sustainability");
    revalidatePath("/responsibility");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal menambahkan seksi keberlanjutan" };
  }
}

export async function editSustainabilitySection(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    if (!title || !description) {
      return { success: false, error: "Judul dan penjelasan wajib diisi." };
    }

    const existing = await prisma.sustainabilitySection.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Seksi tidak ditemukan di database." };
    }

    let imageUrl = existing.imageUrl;

    if (image && image.size > 0) {
      const fileExt = image.name.split('.').pop();
      const fileName = `sustainability-${Date.now()}.${fileExt}`;
      
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(fileName, buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: image.type
        });

      if (uploadError) {
        return { success: false, error: `Gagal upload gambar baru: ${uploadError.message}` };
      }

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(fileName);

      imageUrl = publicUrl;

      // Hapus file lama dari storage bucket
      const oldFileName = existing.imageUrl.split('/').pop();
      if (oldFileName) {
        await supabase.storage.from('assets').remove([oldFileName]);
      }
    }

    await prisma.sustainabilitySection.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl
      }
    });

    revalidatePath("/sustainability");
    revalidatePath("/responsibility");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal mengubah seksi keberlanjutan" };
  }
}

export async function deleteSustainabilitySection(id: number) {
  try {
    const existing = await prisma.sustainabilitySection.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Seksi tidak ditemukan." };
    }

    // Hapus file dari Storage bucket
    const oldFileName = existing.imageUrl.split('/').pop();
    if (oldFileName) {
      await supabase.storage.from('assets').remove([oldFileName]);
    }

    await prisma.sustainabilitySection.delete({ where: { id } });

    revalidatePath("/sustainability");
    revalidatePath("/responsibility");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal menghapus seksi keberlanjutan" };
  }
}
