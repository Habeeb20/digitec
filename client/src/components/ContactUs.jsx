import { useState } from 'react';
import im3 from "../assets/whats2.jpeg"
import im4 from "../assets/whats4.jpeg"
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert("Thank you! Basil will reply to your message soon ✨");
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 1000);
  };

  return (
    <section id="contact" className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-24">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-5xl font-bold mb-6">Let’s Create Something Beautiful</h2>
          <p className="text-stone-400 mb-10 text-lg">
            Ready for a custom beaded bag or personalized wristband? Send Basil a message.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-3xl px-6 py-5 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-3xl px-6 py-5 outline-none"
                required
              />
            </div>
            
            <textarea
              placeholder="Tell Basil what you would like to create..."
              rows={7}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-3xl px-6 py-5 outline-none resize-none"
              required
            ></textarea>

            <button 
              type="submit"
              disabled={submitted}
              className="w-full py-6 bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 text-stone-950 font-semibold text-xl rounded-3xl disabled:opacity-70"
            >
              {submitted ? "Sending..." : "Send Message to Basil"}
            </button>
          </form>
        </div>

        <div className="space-y-10">
          <div className="bg-stone-900 rounded-3xl p-10">
            <h3 className="text-2xl font-semibold mb-8 text-amber-400">Get in Touch</h3>
            <div className="space-y-8 text-stone-300">
              <p><strong>Email:</strong> hello@basilbeads.art</p>
              <p><strong>Phone:</strong> +255 625 204 898</p>
              {/* <p><strong>Studio:</strong> Victoria Island, Lagos</p> */}
            </div>
          </div>

          <img 
            src={im3}
            alt="Basil Studio" 
            className="rounded-3xl w-full" 
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;