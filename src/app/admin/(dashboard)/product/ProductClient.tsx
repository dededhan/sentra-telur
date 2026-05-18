"use client";

import { useState, useRef } from "react";
import { createProduct, updateProduct, deleteProduct } from "./actions";
import { Plus, Edit2, Trash2, X, Loader2, Image as ImageIcon } from "lucide-react";

type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  slug: string;
};

export default function ProductClient({ products }: { products: Product[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setTitle(product.title);
      setDescription(product.description);
      setImagePreview(product.image);
      setImageFile(null);
    } else {
      setEditingId(null);
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
    setEditingId(null);
    setTitle("");
    setDescription("");
    setImagePreview(null);
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi ukuran max 2MB (opsional tapi disarankan)
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran gambar terlalu besar. Maksimal 2MB.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi file (harus ada saat tambah produk baru)
    if (!editingId && !imageFile) {
      alert("Harap unggah gambar produk.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editingId) {
        const res = await updateProduct(editingId, formData);
        if (res.success) {
          closeModal();
        } else {
          alert(res.error);
        }
      } else {
        const res = await createProduct(formData);
        if (res.success) {
          closeModal();
        } else {
          alert(res.error);
        }
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem saat menghubungi server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini? (Gambar aslinya juga akan terhapus otomatis dari Supabase)")) {
      const res = await deleteProduct(id);
      if (!res.success) {
        alert(res.error);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Daftar Produk</h2>
        <button
          onClick={() => openModal()}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Produk
        </button>
      </div>

      <div className="p-6">
        {products.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Belum ada produk.</p>
            <p className="text-gray-400 text-sm mt-1">Klik tombol "Tambah Produk" untuk mulai mengunggah.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  {/* Kita menggunakan <img> standar karena URL dari Supabase, menghindari error Next.js Image external domain config */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 gap-3">
                    <button
                      onClick={() => openModal(product)}
                      className="bg-white/90 text-blue-600 p-2 rounded-full hover:bg-white hover:scale-110 transition-all shadow-sm"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-white/90 text-red-600 p-2 rounded-full hover:bg-white hover:scale-110 transition-all shadow-sm"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-1" title={product.title}>
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2" title={product.description}>
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl my-8 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h3 className="font-bold text-lg text-gray-900">
                {editingId ? "Edit Produk" : "Tambah Produk Baru"}
              </h3>
              <button
                onClick={closeModal}
                disabled={isLoading}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Gambar Produk
                </label>
                <div 
                  className="w-full relative rounded-xl border-2 border-dashed border-gray-300 hover:border-amber-500 bg-gray-50 transition-colors cursor-pointer overflow-hidden group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className={`flex flex-col items-center justify-center p-8 text-center ${imagePreview ? 'opacity-0 absolute inset-0' : 'opacity-100 relative'}`}>
                    <div className="p-3 bg-white rounded-full shadow-sm mb-3 text-amber-600">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Klik untuk mengunggah gambar</p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP (Max. 2MB)</p>
                  </div>
                  
                  {imagePreview && (
                    <div className="aspect-[4/3] w-full relative group-hover:opacity-50 transition-opacity">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-black/70 text-white text-sm px-4 py-2 rounded-lg font-medium shadow-lg backdrop-blur-sm">Ganti Gambar</span>
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {editingId && !imageFile && (
                  <p className="text-xs text-gray-500 mt-2">* Kosongkan jika tidak ingin mengubah gambar.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Judul Produk
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-gray-900"
                  placeholder="Contoh: Telur Ayam Negeri (1 Kg)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Deskripsi Produk
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none text-gray-900"
                  placeholder="Jelaskan kualitas, ukuran, atau informasi harga..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white">
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
                  className="px-6 py-2.5 text-sm font-medium text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {editingId ? "Menyimpan Perubahan..." : "Mengunggah..."}
                    </>
                  ) : (
                    "Simpan Produk"
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
