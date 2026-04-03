const Biography = () => {
  return (
    <section id="biography" className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-24 bg-stone-900">
      <div className="max-w-3xl mx-auto text-center">
        <img 
          src="https://picsum.photos/id/1009/600/600" 
          alt="Basil Portrait" 
          className="w-64 h-64 mx-auto rounded-3xl object-cover mb-10 ring-8 ring-amber-400/20" 
        />
        <h2 className="text-5xl font-bold mb-2">Basil Adebayo</h2>
        <p className="text-amber-400 text-lg">Bead Artist • Lagos, Nigeria</p>
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-lg leading-relaxed text-stone-300 space-y-8">
        <p>
          Born and raised in Lagos, Basil discovered his passion for beads at a young age in the bustling Balogun Market. 
          What began as a childhood hobby evolved into a celebrated artistic practice.
        </p>
        <p>
          After studying Fine Arts, he traveled across West Africa to master traditional and contemporary beading techniques. 
          Today, his studio creates unique beaded bags and custom wristbands that blend African heritage with modern elegance.
        </p>
        <div className="italic border-l-4 border-amber-400 pl-8 py-2 text-xl">
          “I don’t just make accessories — I weave stories, culture, and emotions into every single bead.”
        </div>
      </div>
    </section>
  );
};

export default Biography;