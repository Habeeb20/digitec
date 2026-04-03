const AboutUs = () => {
  return (
    <section id="about" className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-amber-400 text-sm uppercase tracking-widest">OUR STORY</span>
          <h2 className="text-6xl font-bold leading-none mt-6 mb-8">Where beads become art.<br />Where art becomes legacy.</h2>
          <p className="text-xl text-stone-300 leading-relaxed">
            Basil transforms premium beads into stunning wearable art. Every bag and wristband is meticulously handcrafted in Lagos with passion, patience, and purpose.
          </p>
        </div>

        <div className="relative">
          <img 
            src="https://picsum.photos/id/1005/900/1100" 
            alt="Basil working" 
            className="rounded-3xl shadow-2xl" 
          />
          <div className="absolute -bottom-6 -left-6 bg-stone-900 p-8 rounded-3xl max-w-xs">
            <p className="italic">"Every bead carries a story, every piece carries emotion."</p>
            <p className="mt-4 text-amber-400 font-medium">— Basil Adebayo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;