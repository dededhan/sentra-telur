"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Fungsi bantuan untuk membuat slug dari judul
function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export async function createProduct(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    if (!title || !description || !image || image.size === 0) {
      return { success: false, error: "Semua field (termasuk gambar) harus diisi." };
    }

    // 1. Validasi & buat Slug
    let slug = generateSlug(title);
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // 2. Upload gambar ke Supabase Storage (Bucket: 'products')
    const fileExt = image.name.split('.').pop();
    const fileName = `${slug}-${Date.now()}.${fileExt}`;
    
    // Konversi File Web API ke Buffer untuk lingkungan Node.js (Server Action)
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: image.type
      });

    if (uploadError) {
      return { success: false, error: `Gagal upload gambar ke Supabase: ${uploadError.message}` };
    }

    // 3. Dapatkan Public URL dari file yang diunggah
    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(fileName);

    // 4. Simpan URL dan data ke Database (Prisma)
    await prisma.product.create({
      data: {
        title,
        description,
        slug,
        image: publicUrl,
      }
    });

    revalidatePath("/admin/product");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal menambahkan produk" };
  }
}

export async function updateProduct(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return { success: false, error: "Produk tidak ditemukan." };

    let imageUrl = existingProduct.image;
    let slug = existingProduct.slug;

    // Perbarui slug jika title diubah
    if (title !== existingProduct.title) {
      slug = generateSlug(title);
      const existingSlug = await prisma.product.findUnique({ where: { slug } });
      if (existingSlug && existingSlug.id !== id) {
         slug = `${slug}-${Date.now()}`;
      }
    }

    // Jika user mengupload gambar baru
    if (image && image.size > 0) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${slug}-${Date.now()}.${fileExt}`;
      
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: image.type
        });

      if (uploadError) {
         return { success: false, error: `Gagal upload gambar baru: ${uploadError.message}` };
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);
        
      imageUrl = publicUrl;

      // Hapus gambar lama dari Supabase untuk menghemat storage
      const oldFileName = existingProduct.image.split('/').pop();
      if (oldFileName) {
         await supabase.storage.from('products').remove([oldFileName]);
      }
    }

    // Perbarui ke database
    await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        slug,
        image: imageUrl,
      }
    });

    revalidatePath("/admin/product");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal mengupdate produk" };
  }
}

export async function deleteProduct(id: number) {
  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return { success: false, error: "Produk tidak ditemukan." };

    // 1. Hapus gambar terkait dari Supabase Storage
    const oldFileName = existingProduct.image.split('/').pop();
    if (oldFileName) {
       await supabase.storage.from('products').remove([oldFileName]);
    }

    // 2. Hapus data dari Database Prisma
    await prisma.product.delete({
      where: { id },
    });
    
    revalidatePath("/admin/product");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Gagal menghapus produk" };
  }
}
