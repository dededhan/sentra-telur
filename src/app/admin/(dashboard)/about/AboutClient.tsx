"use client";

import { useState, useRef } from "react";
import { updateAbout } from "./actions";
import { Loader2, Image as ImageIcon, Save } from "lucide-react";

type About = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export default function AboutClient({ initialAbout }: { initialAbout: About | null }) {
  const [title, setTitle] = useState(initialAbout?.title || "");
  const [description, setDescription] = useState(initialAbout?.description || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialAbout?.image || null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const saveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (!initialAbout?.image && !imageFile) {
       alert("Harap unggah gambar About.");
       setIsSaving(false);
       return;
    }

    const res = await updateAbout(formData);
    if (res.success) {
      alert("Pengaturan Tentang Kami berhasil disimpan!");
      setImageFile(null);
    } else {
      alert(res.error);
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden pb-8">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Pengaturan Tentang Kami (About)</h2>
      </div>
      
      <form onSubmit={saveAbout} className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom Kiri: Gambar */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Gambar "Tentang Kami"</label>
            <div 
              className="w-full aspect-[4/3] relative rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 bg-gray-50 overflow-hidden cursor-pointer group transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="About Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium bg-black/60 px-4 py-2 rounded-lg">Ganti Gambar</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ImageIcon className="w-8 h-8 mb-2 text-emerald-500" />
                  <span className="text-sm font-medium">Klik untuk unggah gambar</span>
                  <span className="text-xs mt-1">(Max 5MB)</span>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Teks */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Seksi</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
              className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900" 
              placeholder="Contoh: Tentang BANG TELOR" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi / Sejarah Perusahaan</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required 
              rows={8} 
              className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-gray-900" 
              placeholder="Ceritakan tentang peternakan Anda..." 
            />
          </div>
          
          <div className="pt-4 flex justify-end">
             <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
             </button>
          </div>
        </div>
      </form>
    </div>
  );
}
