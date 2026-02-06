import ParallaxService from '../ui/ParallaxService';
import excellenceImage from '@/assets/images/services/excellence.webp';

const SERVICES = [
  {
    title: "Private Brokerage",
    description: "Acceso privilegiado a propiedades off-market. Operamos bajo acuerdos de confidencialidad estricta para asegurar que las transacciones más exclusivas nunca lleguen al mercado público.",
    tag: "Discreción Absoluta"
  },
  {
    title: "Asset Management",
    description: "Gestión integral de carteras inmobiliarias de alto valor. Optimizamos el rendimiento de sus activos mediante análisis predictivo y mantenimiento de estándares ultra-premium.",
    tag: "Rendimiento & Legado"
  },
  {
    title: "Legal Architecture",
    description: "Ingeniería fiscal y legal personalizada para adquisiciones internacionales. Estructuramos cada operación para garantizar seguridad jurídica y eficiencia patrimonial.",
    tag: "Seguridad Global"
  }
];

export default function ExcellenceSuite() {
  // SEO: Schema.org Service & Organization
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Real Estate Consulting",
    "provider": {
      "@type": "Organization",
      "name": "EstiloDomus",
      "url": "https://estilodomus.com"
    },
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Ultra-Lujo",
      "itemListElement": SERVICES.map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.title,
          "description": s.description
        }
      }))
    }
  };

  return (
    <section 
      className="relative bg-crema py-24 md:py-40 overflow-hidden"
      aria-labelledby="excellence-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* COLUMNA IZQUIERDA: Contenido Narrativo */}
          <div className="lg:col-span-7 space-y-16">
            <header className="space-y-6">
              <h2 
                id="excellence-heading"
                className="text-carbon font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight"
              >
                La Excelencia <br />
                <span className="italic text-oro">como estándar único.</span>
              </h2>
              <div className="h-px w-24 bg-oro" />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
              {SERVICES.map((service, index) => (
                <article 
                  key={index}
                  className="group space-y-4 max-w-xl"
                >
                  <span className="text-oro text-[10px] uppercase tracking-[0.4em] font-bold">
                    {service.tag}
                  </span>
                  <h3 className="text-carbon font-serif text-2xl md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="text-carbon/70 font-sans leading-relaxed text-sm md:text-base tracking-wide">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>

            <button className="inline-flex items-center gap-4 text-carbon group">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold border-b border-carbon/20 pb-1 group-hover:border-oro transition-all duration-500">
                Descubrir nuestra filosofía
              </span>
              <div className="w-10 h-10 rounded-full border border-carbon/10 flex items-center justify-center group-hover:bg-carbon group-hover:text-crema transition-all duration-500">
                <span className="text-xs">→</span>
              </div>
            </button>
          </div>

          {/* COLUMNA DERECHA: Visual Parallax */}
          <div className="lg:col-span-5 h-[70dvh] lg:h-[90dvh] sticky top-20">
            <ParallaxService 
              image={excellenceImage.src}
              alt="Interiorismo minimalista de ultra-lujo EstiloDomus"
            />
          </div>

        </div>
      </div>

      {/* Background Decor (Old Money Subtle Watermark) */}
      <div className="absolute bottom-10 left-10 pointer-events-none select-none opacity-[0.03]">
        <span className="text-[15vw] font-serif italic text-carbon leading-none">
          Domus
        </span>
      </div>
    </section>
  );
}