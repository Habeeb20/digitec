import { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';
import { uploadToCloudinary } from './cloudinary';
import { useEffect } from 'react';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function ProductUploadModal({ isOpen, onClose, onSuccess,   initialData = null    }) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

   const [form, setForm] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    category: initialData?.category || 'Books & Resources',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        price: initialData.price || '',
        description: initialData.description || '',
        category: initialData.category || 'Books & Resources',
      });
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.error("Please upload a product image");

    setUploadingImage(true);
    try {
      // Upload to Cloudinary using your credentials
      const imageUrl = await uploadToCloudinary(imageFile);

      setUploadingImage(false);
      setLoading(true);

      await axios.post(`${VITE_BACKEND_URL}/api/marketplace`, {
        ...form,
        price: Number(form.price),
        image: imageUrl,   // Only string sent to backend
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      toast.success("Product posted successfully! 🎉");
      onSuccess();
      onClose();
      // Reset form
      setForm({ name: '', price: '', description: '', category: 'Books & Resources' });
      setPreview(null);
      setImageFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload product");
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">List New Product</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X size={32} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Area */}
            <div>
              <label className="block text-slate-300 mb-3 font-medium">Product Image</label>
              <div 
                className="border-2 border-dashed border-slate-600 hover:border-indigo-500 rounded-3xl p-10 text-center transition cursor-pointer"
                onClick={() => document.getElementById('product-image').click()}
              >
                {preview ? (
                  <img src={preview} alt="preview" className="mx-auto max-h-64 rounded-2xl object-cover" />
                ) : (
                  <div>
                    <ImageIcon className="mx-auto w-16 h-16 text-slate-400 mb-4" />
                    <p className="text-slate-400">Click or drag image here</p>
                  </div>
                )}
                <input 
                  id="product-image" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className="text-slate-300 text-sm block mb-2">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white px-5 py-4 rounded-2xl focus:border-indigo-500 outline-none"
                  placeholder="Anointed Prayer Journal"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm block mb-2">Price (₦)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white px-5 py-4 rounded-2xl focus:border-indigo-500 outline-none"
                  placeholder="4500"
                />
              </div>

              <div>
                <label className="text-slate-300 text-sm block mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white px-5 py-4 rounded-2xl focus:border-indigo-500 outline-none"
                >
                  <option>Books & Resources</option>
                  <option>Apparel & Merch</option>
                  <option>Audio Messages</option>
                  <option>Ministry Tools</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-300 text-sm block mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="w-full bg-slate-800 border border-slate-700 text-white px-5 py-4 rounded-3xl focus:border-indigo-500 outline-none resize-none"
                placeholder="Describe the spiritual impact of this product..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl flex items-center justify-center gap-3 disabled:opacity-70 transition"
            >
              {uploadingImage ? "Uploading image to Cloudinary..." : loading ? "Posting to Marketplace..." : "Publish Product"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}


























