import Gallery from "./Gallery";

export default function FeaturedResidences() {
  return (
    <section className="bg-transparent relative z-10">
      {/* HEADER DE LA SECCIÓN */}
      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl space-y-6">
          {/* Usamos HTML estándar para mantener el componente en el Servidor (SEO puro) */}
          <span className="block font-sans text-[10px] uppercase tracking-[0.4em] text-bronze animate-fade-in">
            Selección Curada
          </span>
          
          <h2 className="font-serif text-4xl md:text-6xl text-carbon leading-tight">
            Residencias que <br />
            <span className="italic">Redefinen el Estándar</span>
          </h2>
          
          <div className="h-[1px] w-24 bg-bronze/40" />
        </div>
      </div>

      {/* GALERÍA HORIZONTAL (Cliente) */}
      <Gallery />
      
      {/* FOOTER DE SECCIÓN */}
      <div className="container mx-auto px-6 py-12 hidden lg:block text-right">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-carbon/30">
          Desliza para explorar →
        </p>
      </div>
    </section>
  );
}