'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Maximize2, BedDouble, Bath } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  specs: { beds: number; baths: number; sqft: string };
  image: string;
}

interface PropertyCardProps {
  property: Property;
  index: number;
  isLarge?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PropertyCard({ property, index, isLarge = false }: PropertyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      className={`relative group overflow-hidden cursor-pointer bg-carbon rounded-sm ${
        isLarge ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2 md:row-span-1'
      }`}
    >
      {/* Image Container with Strict Aspect Ratio */}
      <div className="relative w-full h-full overflow-hidden aspect-square md:aspect-auto">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          loading={index === 0 ? "eager" : "lazy"}
        />
        
        {/* Overlay: Old Money Gradient (Tailwind v4 bg-linear-to-t) */}
        <div className="absolute inset-0 bg-linear-to-t from-carbon/90 via-carbon/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Content Info */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
        <motion.div 
          className="space-y-3"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
        >
          <p className="text-oro text-[10px] uppercase tracking-[0.3em] font-bold">
            {property.location}
          </p>
          
          <h3 className={`text-crema font-serif leading-tight ${isLarge ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>
            {property.title}
          </h3>

          <div className="flex items-center gap-6 pt-4 border-t border-crema/10 text-crema/60">
            <div className="flex items-center gap-2">
              <BedDouble size={14} className="text-oro" />
              <span className="text-[11px] uppercase tracking-widest">{property.specs.beds} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={14} className="text-oro" />
              <span className="text-[11px] uppercase tracking-widest">{property.specs.baths} Baths</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Maximize2 size={14} className="text-oro" />
              <span className="text-[11px] uppercase tracking-widest">{property.specs.sqft}</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-crema text-xl font-light italic font-serif">
              {property.price}
            </span>
            <span className="text-oro text-[10px] uppercase tracking-widest border-b border-oro/0 group-hover:border-oro transition-all duration-500"></span>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}