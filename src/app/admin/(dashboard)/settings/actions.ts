"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

function getYoutubeEmbedUrl(url: string) {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url;
}

export async function updateGlobalSettings(formData: FormData) {
  try {
    const heroHeadline = formData.get("heroHeadline") as string;
    let videoUrl = formData.get("videoUrl") as string;
    videoUrl = getYoutubeEmbedUrl(videoUrl);
    const whatsappNumber = formData.get("whatsappNumber") as string;
    const whatsappText = formData.get("whatsappText") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const mapEmbedUrl = formData.get("mapEmbedUrl") as string;
    
    const heroImage = formData.get("heroImage") as File | null;

    // Ambil setting saat ini
    const currentSettings = await prisma.globalSettings.findFirst();
    let imageUrl = currentSettings?.heroImage || "";

    // Proses upload jika ada gambar Hero baru yang disubmit
    if (heroImage && heroImage.size > 0) {
      const fileExt = heroImage.name.split('.').pop();
      const fileName = `hero-${Date.now()}.${fileExt}`;
      
      const arrayBuffer = await heroImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(fileName, buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: heroImage.type
        });

      if (uploadError) {
         return { success: false, error: `Gagal upload Background Hero: ${uploadError.message}` };
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(fileName);
        
      imageUrl = publicUrl;

      // Hapus gambar hero lama dari storage bucket 'assets' untuk hemat ruang
      if (currentSettings?.heroImage) {
        const oldFileName = currentSettings.heroImage.split('/').pop();
        if (oldFileName) {
           await supabase.storage.from('assets').remove([oldFileName]);
        }
      }
    }

    const data = {
      heroHeadline,
      videoUrl,
      whatsappNumber,
      whatsappText,
      address,
      phone,
      email,
      mapEmbedUrl,
      heroImage: imageUrl,
    };

    // Update jika sudah ada, Create jika belum (karena cuma ada 1 baris setting)
    if (currentSettings) {
      await prisma.globalSettings.update({
        where: { id: currentSettings.id },
        data
      });
    } else {
      await prisma.globalSettings.create({
        data: {
          ...data,
          id: 1 // pastikan ID-nya 1
        }
      });
    }

    // Refresh semua rute agar perubahan kontak dan footer terlihat seketika
    revalidatePath("/", "layout"); 
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal menyimpan pengaturan website" };
  }
}

export async function addPartner(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const logo = formData.get("logo") as File | null;

    if (!name || !logo || logo.size === 0) {
      return { success: false, error: "Nama institusi/partner dan logo wajib diisi." };
    }

    // Pengecekan limitasi 4 Partner (berdasarkan request)
    const currentPartnersCount = await prisma.partner.count();
    if (currentPartnersCount >= 4) {
      return { success: false, error: "Maksimal hanya 4 logo partner yang diizinkan sesuai kesepakatan desain." };
    }

    const fileExt = logo.name.split('.').pop();
    const fileName = `partner-${Date.now()}.${fileExt}`;
    
    const arrayBuffer = await logo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from('assets')
      .upload(fileName, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: logo.type
      });

    if (uploadError) {
      return { success: false, error: `Gagal upload logo partner: ${uploadError.message}` };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('assets')
      .getPublicUrl(fileName);

    await prisma.partner.create({
      data: {
        name,
        logoUrl: publicUrl,
        order: currentPartnersCount,
      }
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal menambahkan data partner" };
  }
}

export async function deletePartner(id: number) {
  try {
    const existing = await prisma.partner.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Partner tidak ditemukan di database." };

    // Bersihkan file logo asli di Storage
    const oldFileName = existing.logoUrl.split('/').pop();
    if (oldFileName) {
       await supabase.storage.from('assets').remove([oldFileName]);
    }

    await prisma.partner.delete({
      where: { id },
    });
    
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal menghapus data partner" };
  }
}
