// client/src/pages/About.jsx
import { motion } from 'framer-motion';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

export default function About() {
  return (
    <>
    <Navbar/>
      <div className="bg-slate-950 text-white min-h-screen">
      <div className="pt-24 pb-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            About Apostle<br />Godwin <span className="text-indigo-400">BANTAR</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A servant of God, visionary leader, and compassionate apostle raising a generation for revival.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5">
            <div className="sticky top-24">
              <div className="aspect-[4/5] bg-slate-800 rounded-3xl overflow-hidden border border-slate-700">
                <img 
                  src="https://via.placeholder.com/800x1000/4338ca/ffffff?text=Apostle+Godwin+Bantar" 
                  alt="Apostle Godwin Bantar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-12 text-lg leading-relaxed text-slate-300">
            <p>
              Apostle Godwin Bantar, fondly known as Apostle Godwin BANTAR, is a Cameroonian purpose-driven leader 
              from Nkambe in the Donga Mantung Division of the North West Region.
            </p>

            <p>
              Born and raised by Pa Joseph Mbunwe and Ma Odilia Munkeng (both late), he is a called and ordained servant 
              of God serving in the apostolic office. He is also a passionate entrepreneur with investments across various sectors.
            </p>

            <div className="bg-slate-900 border-l-4 border-indigo-500 pl-8 py-2">
              <p className="italic">
                "I am driven by the spirit of revival that is at work in me. My heart burns to see the Church of Jesus Christ 
                rise in power, purity, and purpose."
              </p>
              <p className="mt-4 text-indigo-400 font-medium">- Apostle Godwin Bantar</p>
            </div>

            <p>
              He is the founder of <strong>Christ's Revelation International Church (CRIC)</strong>, with its headquarters in Yaoundé, Cameroon. 
              Through his ministry and the church, he has touched many lives through consistent human empowerment programs, 
              especially for the less privileged in both the church and the wider community.
            </p>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Family</h3>
              <p>
                Apostle Godwin Bantar is happily married to Pastor Mrs. Ethel Bantar. 
                Their union is blessed with three beautiful children — one handsome boy and two lovely girls.
              </p>
            </div>

            <div className="pt-10 border-t border-slate-700">
              <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex gap-4">
                  <span className="text-2xl">🔥</span>
                  <span>Raising a generation that walks in the power and revelation of Christ</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl">🤝</span>
                  <span>Empowering the less privileged through compassion and practical support</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl">🌍</span>
                  <span>Advancing the Kingdom of God through revival, leadership training, and community development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  
  );
}