"use client";

import { useState } from "react";
import { createFAQ, updateFAQ, deleteFAQ } from "./actions";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  order: number;
};

export default function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (faq?: FAQ) => {
    if (faq) {
      setEditingId(faq.id);
      setQuestion(faq.question);
      setAnswer(faq.answer);
    } else {
      setEditingId(null);
      setQuestion("");
      setAnswer("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isLoading) return;
    setIsModalOpen(false);
    setEditingId(null);
    setQuestion("");
    setAnswer("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId) {
        const res = await updateFAQ(editingId, { question, answer });
        if (res.success) {
          closeModal();
        } else {
          alert(res.error);
        }
      } else {
        const res = await createFAQ({ question, answer });
        if (res.success) {
          closeModal();
        } else {
          alert(res.error);
        }
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus FAQ ini?")) {
      const res = await deleteFAQ(id);
      if (!res.success) {
        alert(res.error);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Daftar FAQ</h2>
        <button
          onClick={() => openModal()}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah FAQ
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="px-6 py-4 font-medium w-1/3">Pertanyaan</th>
              <th className="px-6 py-4 font-medium w-1/2">Jawaban</th>
              <th className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {faqs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  Belum ada data FAQ. Silakan tambah baru.
                </td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <p className="font-medium text-gray-900 line-clamp-2">{faq.question}</p>
                  </td>
                  <td className="px-6 py-4 align-top whitespace-pre-wrap">
                    <p className="text-gray-600 text-sm line-clamp-3">{faq.answer}</p>
                  </td>
                  <td className="px-6 py-4 align-top text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openModal(faq)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900">
                {editingId ? "Edit FAQ" : "Tambah FAQ Baru"}
              </h3>
              <button
                onClick={closeModal}
                disabled={isLoading}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Pertanyaan
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-gray-900"
                  placeholder="Masukkan pertanyaan..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Jawaban
                </label>
                <textarea
                  required
                  rows={5}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none text-gray-900"
                  placeholder="Masukkan jawaban lengkap..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isLoading}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan FAQ"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
