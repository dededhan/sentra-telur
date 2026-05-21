"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  addSustainabilitySection as addResponsibilitySection, 
  editSustainabilitySection as editResponsibilitySection, 
  deleteSustainabilitySection as deleteResponsibilitySection 
} from "../sustainability/actions";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Loader2, 
  Image as ImageIcon, 
  Save, 
  Shield 
} from "lucide-react";

type ResponsibilitySection = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
};

export default function ResponsibilityClient({ 
  initialSections 
}: { 
  initialSections: ResponsibilitySection[] 
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<ResponsibilitySection | null>(null);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openModal = (section?: ResponsibilitySection) => {
    if (section) {
      setEditingSection(section);
      setTitle(section.title);
      setDescription(section.description);
      setImagePreview(section.imageUrl);
      setImageFile(null);
    } else {
      setEditingSection(null);
      setTitle("");
      setDescription("");
      setImagePreview(null);
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isLoading) return;
    setIsModalOpen(false);
    setEditingSection(null);
    setTitle("");
    setDescription("");
    setImagePreview(null);
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Gambar terlalu besar. Maksimal 5MB.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", "responsibility");
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingSection) {
        const res = await editResponsibilitySection(editingSection.id, formData);
        if (res.success) {
          alert("Seksi tanggung jawab berhasil diubah!");
          closeModal();
          router.refresh();
        } else {
          alert(res.error);
        }
      } else {
        if (!imageFile) {
          alert("Harap unggah gambar terlebih dahulu untuk seksi baru.");
          setIsLoading(false);
          return;
        }
        const res = await addResponsibilitySection(formData);
        if (res.success) {
          alert("Seksi tanggung jawab berhasil ditambahkan!");
          closeModal();
          router.refresh();
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
    if (confirm("Apakah Anda yakin ingin menghapus seksi tanggung jawab ini? Tindakan ini tidak dapat dibatalkan.")) {
      try {
        const res = await deleteResponsibilitySection(id);
        if (res.success) {
          alert("Seksi tanggung jawab berhasil dihapus!");
          router.refresh();
        } else {
          alert(res.error);
        }
      } catch (err) {
        alert("Terjadi kesalahan sistem saat menghapus.");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden pb-8">
      <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Daftar Seksi Konten Tanggung Jawab (Responsibility)
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all shadow-sm hover:shadow"
        >
          <Plus className="w-4 h-4" />
          Tambah Seksi
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="px-6 py-4 font-semibold w-[12%]">Gambar</th>
              <th className="px-6 py-4 font-semibold w-[25%]">Judul Seksi</th>
              <th className="px-6 py-4 font-semibold w-[48%]">Penjelasan / Deskripsi</th>
              <th className="px-6 py-4 font-semibold text-right w-[15%]">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {initialSections.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <ImageIcon className="w-8 h-8 text-gray-300" />
                    <p className="font-medium">Belum ada seksi tanggung jawab.</p>
                    <p className="text-sm text-gray-400">Silakan tambahkan seksi baru menggunakan tombol di atas.</p>
                  </div>
                </td>
              </tr>
            ) : (
              initialSections.map((section, idx) => (
                <tr key={section.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 align-middle">
                    <div className="w-16 h-12 relative rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={section.imageUrl} 
                        alt={section.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <p className="font-bold text-gray-900 leading-snug">{section.title}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                      Seksi {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <p className="text-gray-600 text-sm whitespace-pre-wrap line-clamp-3 leading-relaxed">
                      {section.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openModal(section)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100"
                        title="Edit Seksi"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(section.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        title="Hapus Seksi"
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
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-900">
                {editingSection ? "Ubah Seksi Tanggung Jawab" : "Tambah Seksi Tanggung Jawab Baru"}
              </h3>
              <button
                onClick={closeModal}
                disabled={isLoading}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bagian Kiri: Upload Gambar */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gambar Seksi <span className="text-red-500">*</span>
                  </label>
                  <div 
                    className="w-full aspect-[4/3] relative rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 bg-gray-50 overflow-hidden cursor-pointer group transition-colors flex items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-lg">Ganti Gambar</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4 text-gray-500">
                        <ImageIcon className="w-8 h-8 mb-2 text-emerald-500 animate-pulse" />
                        <span className="text-sm font-semibold">Pilih Gambar</span>
                        <span className="text-xs mt-1 text-gray-400">Rasio 4:3 disarankan (Max 5MB)</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                </div>

                {/* Bagian Kanan: Teks */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Judul Seksi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-gray-900 font-medium"
                      placeholder="Contoh: Program Pembagian Gizi"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Penjelasan / Deskripsi <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none text-gray-900 text-sm leading-relaxed"
                      placeholder="Tulis penjelasan lengkap bagaimana peternakan Anda menjalankan tanggung jawab sosial ini..."
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isLoading}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Proses...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingSection ? "Simpan Perubahan" : "Tambah Seksi"}
                    </>
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
