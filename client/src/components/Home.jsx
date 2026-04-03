import im from "../assets/what.jpeg"
import im2 from "../assets/what3.jpeg"
import im3 from "../assets/whats2.jpeg"
import im4 from "../assets/whats4.jpeg"

const Home = () => {
  return (
    <section id="home" className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center flex items-center" 
           style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://picsum.photos/id/1015/2000/1200')" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-6 py-3 rounded-3xl border border-amber-400/30 text-amber-400 text-sm tracking-widest mb-6">
              HANDCRAFTED IN LAGOS
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-white mb-6">
              BEADS THAT<br />TELL STORIES
            </h1>
            
            <p className="text-2xl text-amber-200 mb-10">
              Exquisite hand-beaded bags and custom wristbands by Basil
            </p>

            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold rounded-3xl text-lg flex items-center gap-3">
                Commission Your Piece
              </button>
              <button 
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-5 border-2 border-white/70 hover:border-amber-400 rounded-3xl text-lg font-medium">
                Meet Basil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Works */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm tracking-widest">SIGNATURE COLLECTION</span>
          <h2 className="text-5xl font-bold mt-3">Wearable Art</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { img: im, title: "Tropical Reverie Bag",  },
            { img: im2, title: "Celestial Wristband",  },
            { img: im3, title: "Golden Hour Clutch",  },
            { img: im4, title: "Ocean Dream Band",  }
          ].map((item, i) => (
            <div key={i} className="group bg-stone-900 rounded-3xl overflow-hidden hover:-translate-y-3 transition-all duration-300">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-amber-400 text-sm">Hand-beaded • Unique</p>
                <div className="mt-4 text-2xl font-light">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;