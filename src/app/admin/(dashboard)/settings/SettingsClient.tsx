"use client";

import { useState, useRef } from "react";
import { 
  updateGlobalSettings, 
  addPartner, 
  deletePartner, 
  addFarmLocationImage, 
  deleteFarmLocationImage 
} from "./actions";
import { Loader2, Image as ImageIcon, Save, Plus, Trash2, MapPin, Phone, Mail, MessageSquare } from "lucide-react";

type GlobalSettings = {
  id: number;
  heroHeadline: string;
  heroImage: string;
  videoUrl: string;
  whatsappNumber: string;
  whatsappText: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  contactCardImage: string | null;
};

type Partner = {
  id: number;
  name: string;
  logoUrl: string;
  order: number;
};

type FarmImage = {
  id: number;
  imageUrl: string;
  caption: string | null;
  createdAt: Date;
};

export default function SettingsClient({ 
  initialSettings, 
  initialPartners,
  initialFarmImages = []
}: { 
  initialSettings: GlobalSettings | null, 
  initialPartners: Partner[],
  initialFarmImages?: FarmImage[]
}) {
  // Global Settings State
  const [headline, setHeadline] = useState(initialSettings?.heroHeadline || "");
  const [video, setVideo] = useState(initialSettings?.videoUrl || "");
  const [waNum, setWaNum] = useState(initialSettings?.whatsappNumber || "");
  const [waText, setWaText] = useState(initialSettings?.whatsappText || "");
  const [address, setAddress] = useState(initialSettings?.address || "");
  const [phone, setPhone] = useState(initialSettings?.phone || "");
  const [email, setEmail] = useState(initialSettings?.email || "");
  const [mapEmbed, setMapEmbed] = useState(initialSettings?.mapEmbedUrl || "");
  
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(initialSettings?.heroImage || null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const heroInputRef = useRef<HTMLInputElement>(null);

  // Large Card Banner (contactCardImage) State
  const [contactCardImageFile, setContactCardImageFile] = useState<File | null>(null);
  const [contactCardPreview, setContactCardPreview] = useState<string | null>(initialSettings?.contactCardImage || null);
  const contactCardInputRef = useRef<HTMLInputElement>(null);

  // Partners State
  const [partnerName, setPartnerName] = useState("");
  const [partnerFile, setPartnerFile] = useState<File | null>(null);
  const [partnerPreview, setPartnerPreview] = useState<string | null>(null);
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const partnerInputRef = useRef<HTMLInputElement>(null);

  // Farm Location Images State
  const [farmImageFile, setFarmImageFile] = useState<File | null>(null);
  const [farmImagePreview, setFarmImagePreview] = useState<string | null>(null);
  const [farmCaption, setFarmCaption] = useState("");
  const [isAddingFarmImage, setIsAddingFarmImage] = useState(false);
  const farmImageInputRef = useRef<HTMLInputElement>(null);

  // Handlers for Global Settings
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type === "video/mp4" || file.name.toLowerCase().endsWith(".mp4");
      const maxSize = isVideo ? 25 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(isVideo ? "Video Hero terlalu besar. Maksimal 25MB." : "Gambar Hero terlalu besar. Maksimal 5MB.");
        return;
      }
      setHeroImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setHeroPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleContactCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Gambar Banner Hubungi Kami terlalu besar. Maksimal 5MB.");
        return;
      }
      setContactCardImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setContactCardPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    
    const formData = new FormData();
    formData.append("heroHeadline", headline);
    formData.append("videoUrl", video);
    formData.append("whatsappNumber", waNum);
    formData.append("whatsappText", waText);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("mapEmbedUrl", mapEmbed);
    
    if (heroImageFile) {
      formData.append("heroImage", heroImageFile);
    }
    if (contactCardImageFile) {
      formData.append("contactCardImage", contactCardImageFile);
    }

    const res = await updateGlobalSettings(formData);
    if (res.success) {
      alert("Pengaturan website berhasil disimpan!");
      setHeroImageFile(null); // Reset input file after success
      setContactCardImageFile(null);
    } else {
      alert(res.error);
    }
    setIsSavingSettings(false);
  };

  // Handlers for Partners
  const handlePartnerLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Logo terlalu besar. Maksimal 2MB.");
        return;
      }
      setPartnerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPartnerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const savePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerFile || !partnerName) {
      alert("Nama dan Logo wajib diisi!");
      return;
    }
    if (initialPartners.length >= 4) {
      alert("Maksimal 4 partner.");
      return;
    }

    setIsAddingPartner(true);
    const formData = new FormData();
    formData.append("name", partnerName);
    formData.append("logo", partnerFile);

    const res = await addPartner(formData);
    if (res.success) {
      setPartnerName("");
      setPartnerFile(null);
      setPartnerPreview(null);
      if (partnerInputRef.current) partnerInputRef.current.value = "";
    } else {
      alert(res.error);
    }
    setIsAddingPartner(false);
  };

  const removePartner = async (id: number) => {
    if (confirm("Hapus partner ini?")) {
      const res = await deletePartner(id);
      if (!res.success) alert(res.error);
    }
  };

  // Handlers for Farm Location Images
  const handleFarmImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Gambar peternakan terlalu besar. Maksimal 5MB.");
        return;
      }
      setFarmImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFarmImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const saveFarmLocationImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmImageFile) {
      alert("Gambar wajib dipilih!");
      return;
    }

    setIsAddingFarmImage(true);
    const formData = new FormData();
    formData.append("image", farmImageFile);
    formData.append("caption", farmCaption);

    const res = await addFarmLocationImage(formData);
    if (res.success) {
      setFarmCaption("");
      setFarmImageFile(null);
      setFarmImagePreview(null);
      if (farmImageInputRef.current) farmImageInputRef.current.value = "";
    } else {
      alert(res.error);
    }
    setIsAddingFarmImage(false);
  };

  const removeFarmLocationImage = async (id: number) => {
    if (confirm("Hapus gambar lokasi peternakan ini?")) {
      const res = await deleteFarmLocationImage(id);
      if (!res.success) alert(res.error);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. KARTU PENGATURAN GLOBAL */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">1. Pengaturan Global Website</h2>
        </div>
        
        <form onSubmit={saveSettings} className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Kolom Kiri: Hero & Media */}
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-700 text-lg border-b pb-2">Halaman Utama (Hero)</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Background Hero (Gambar / MP4 Video Loop)</label>
              <div 
                className="w-full aspect-[21/9] relative rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 bg-gray-50 overflow-hidden cursor-pointer group transition-colors"
                onClick={() => heroInputRef.current?.click()}
              >
                {heroPreview ? (
                  <>
                    {heroPreview.startsWith("data:video/") || heroPreview.split('?')[0].toLowerCase().endsWith(".mp4") ? (
                      <video src={heroPreview} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <img src={heroPreview} alt="Hero Preview" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-medium bg-black/60 px-4 py-2 rounded-lg">Ganti Media</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ImageIcon className="w-8 h-8 mb-2 text-emerald-500" />
                    <span className="text-sm font-medium">Klik untuk unggah media (Gambar/Video)</span>
                    <span className="text-xs mt-1">(Gambar Max 5MB, MP4 Video Max 25MB)</span>
                  </div>
                )}
                <input type="file" ref={heroInputRef} onChange={handleHeroChange} accept="image/*,video/mp4" className="hidden" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Headline Utama (Teks Besar)</label>
              <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} required className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">URL Video YouTube</label>
              <input type="url" value={video} onChange={e => setVideo(e.target.value)} required className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900" placeholder="https://youtube.com/embed/..." />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Banner Hubungi Kami (Card Besar Kontak)</label>
              <div 
                className="w-full aspect-[21/9] relative rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 bg-gray-50 overflow-hidden cursor-pointer group transition-colors"
                onClick={() => contactCardInputRef.current?.click()}
              >
                {contactCardPreview ? (
                  <>
                    <img src={contactCardPreview} alt="Contact Banner Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-medium bg-black/60 px-4 py-2 rounded-lg">Ganti Banner</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ImageIcon className="w-8 h-8 mb-2 text-emerald-500" />
                    <span className="text-sm font-medium">Klik untuk unggah banner kontak</span>
                    <span className="text-xs mt-1">(Gambar Max 5MB)</span>
                  </div>
                )}
                <input type="file" ref={contactCardInputRef} onChange={handleContactCardChange} accept="image/*" className="hidden" />
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Kontak */}
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-700 text-lg border-b pb-2">Informasi Kontak & Footer</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><Phone className="w-4 h-4"/> No. WhatsApp</label>
                <input type="text" value={waNum} onChange={e => setWaNum(e.target.value)} required className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900" placeholder="62812..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Pesan Default WA</label>
                <input type="text" value={waText} onChange={e => setWaText(e.target.value)} required className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900" placeholder="Halo BANG TELOR..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><Phone className="w-4 h-4"/> Telepon Kantor (Footer)</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><Mail className="w-4 h-4"/> Email Perusahaan</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><MapPin className="w-4 h-4"/> Alamat Lengkap</label>
              <textarea value={address} onChange={e => setAddress(e.target.value)} required rows={3} className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 resize-none" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><MapPin className="w-4 h-4"/> URL Iframe Google Maps</label>
              <textarea value={mapEmbed} onChange={e => setMapEmbed(e.target.value)} required rows={2} className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 resize-none text-xs font-mono" placeholder="<iframe src=...>" />
            </div>
          </div>

          {/* Tombol Simpan Full Width */}
          <div className="lg:col-span-2 pt-4 border-t flex justify-end">
             <button
                type="submit"
                disabled={isSavingSettings}
                className="px-8 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
              >
                {isSavingSettings ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isSavingSettings ? "Menyimpan..." : "Simpan Pengaturan Global"}
             </button>
          </div>
        </form>
      </div>


      {/* 2. KARTU KELOLA PARTNER */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">2. Kelola Logo Partner ({initialPartners.length}/4)</h2>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Tambah Partner */}
          <div className="lg:col-span-1 border-r-0 lg:border-r border-gray-100 lg:pr-8">
            <h3 className="font-semibold text-gray-700 mb-4">Tambah Partner Baru</h3>
            <form onSubmit={savePartner} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Logo Partner (PNG Transparan)</label>
                <div 
                  className="w-full aspect-[3/2] relative rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 bg-gray-50 overflow-hidden cursor-pointer flex items-center justify-center p-4"
                  onClick={() => partnerInputRef.current?.click()}
                >
                  {partnerPreview ? (
                    <img src={partnerPreview} alt="Partner Preview" className="w-full h-full object-contain mix-blend-multiply" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Plus className="w-6 h-6 mx-auto mb-1 text-emerald-500" />
                      <span className="text-xs">Pilih Gambar</span>
                    </div>
                  )}
                  <input type="file" ref={partnerInputRef} onChange={handlePartnerLogoChange} accept="image/*" className="hidden" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Nama Partner/Perusahaan</label>
                <input type="text" value={partnerName} onChange={e => setPartnerName(e.target.value)} required className="w-full px-4 py-2 text-sm bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900" />
              </div>

              <button
                type="submit"
                disabled={isAddingPartner || initialPartners.length >= 4}
                className="w-full py-2.5 text-sm font-bold text-emerald-600 bg-emerald-50 border-2 border-emerald-100 rounded-xl hover:bg-emerald-100 hover:border-emerald-200 transition-colors disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
              >
                {isAddingPartner ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Tambah Partner
              </button>
              {initialPartners.length >= 4 && (
                <p className="text-xs text-red-500 text-center font-medium">Batas maksimal (4 logo) tercapai.</p>
              )}
            </form>
          </div>

          {/* Grid Logo Terdaftar */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-700 mb-4">Logo Aktif di Halaman Utama</h3>
            
            {initialPartners.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-sm">Belum ada logo partner.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {initialPartners.map((p) => (
                  <div key={p.id} className="group relative bg-white border border-gray-200 rounded-xl p-4 aspect-square flex flex-col items-center justify-center hover:border-emerald-400 transition-colors shadow-sm">
                    <img src={p.logoUrl} alt={p.name} className="w-full h-20 object-contain mix-blend-multiply mb-2" />
                    <p className="text-xs font-medium text-gray-600 text-center truncate w-full" title={p.name}>{p.name}</p>
                    
                    <button
                      onClick={() => removePartner(p.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:scale-110 shadow-md"
                      title="Hapus Logo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. KARTU KELOLA GAMBAR LOKASI PETERNAKAN */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">3. Kelola Gambar Lokasi Peternakan (Tak Terbatas)</h2>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Tambah Gambar Peternakan */}
          <div className="lg:col-span-1 border-r-0 lg:border-r border-gray-100 lg:pr-8">
            <h3 className="font-semibold text-gray-700 mb-4">Tambah Gambar Baru</h3>
            <form onSubmit={saveFarmLocationImage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Gambar Peternakan (Max 5MB)</label>
                <div 
                  className="w-full aspect-[4/3] relative rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 bg-gray-50 overflow-hidden cursor-pointer flex items-center justify-center p-2"
                  onClick={() => farmImageInputRef.current?.click()}
                >
                  {farmImagePreview ? (
                    <img src={farmImagePreview} alt="Farm Location Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Plus className="w-6 h-6 mx-auto mb-1 text-emerald-500" />
                      <span className="text-xs">Pilih Gambar</span>
                    </div>
                  )}
                  <input type="file" ref={farmImageInputRef} onChange={handleFarmImageChange} accept="image/*" className="hidden" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Caption / Keterangan Gambar (Opsional)</label>
                <input 
                  type="text" 
                  value={farmCaption} 
                  onChange={e => setFarmCaption(e.target.value)} 
                  placeholder="Contoh: Kandang K3 Kebersihan Terjaga"
                  className="w-full px-4 py-2 text-sm bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900" 
                />
              </div>

              <button
                type="submit"
                disabled={isAddingFarmImage || !farmImageFile}
                className="w-full py-2.5 text-sm font-bold text-emerald-600 bg-emerald-50 border-2 border-emerald-100 rounded-xl hover:bg-emerald-100 hover:border-emerald-200 transition-colors disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
              >
                {isAddingFarmImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Unggah Gambar Peternakan
              </button>
            </form>
          </div>

          {/* Grid Gambar Terdaftar */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-700 mb-4">Gambar Terdaftar di Halaman Kontak</h3>
            
            {initialFarmImages.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-sm">Belum ada gambar lokasi peternakan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {initialFarmImages.map((img) => (
                  <div key={img.id} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:border-emerald-400 transition-colors shadow-sm h-full">
                    <div className="aspect-[4/3] w-full bg-gray-50 overflow-hidden relative">
                      <img src={img.imageUrl} alt={img.caption || "Farm Image"} className="w-full h-full object-cover" />
                    </div>
                    {img.caption && (
                      <p className="p-3 text-xs font-semibold text-gray-700 text-center truncate border-t bg-gray-50/50 flex-grow" title={img.caption}>
                        {img.caption}
                      </p>
                    )}
                    
                    <button
                      onClick={() => removeFarmLocationImage(img.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:scale-110 shadow-md z-10"
                      title="Hapus Gambar"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}

