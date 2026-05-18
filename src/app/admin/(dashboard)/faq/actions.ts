"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFAQ(data: { question: string; answer: string }) {
  try {
    await prisma.fAQ.create({
      data: {
        question: data.question,
        answer: data.answer,
      }
    });
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menambahkan FAQ" };
  }
}

export async function updateFAQ(id: number, data: { question: string; answer: string }) {
  try {
    await prisma.fAQ.update({
      where: { id },
      data: {
        question: data.question,
        answer: data.answer,
      }
    });
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal mengupdate FAQ" };
  }
}

export async function deleteFAQ(id: number) {
  try {
    await prisma.fAQ.delete({
      where: { id },
    });
    revalidatePath("/admin/faq");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus FAQ" };
  }
}
