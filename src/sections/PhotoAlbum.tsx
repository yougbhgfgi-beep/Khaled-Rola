import { useState, useEffect, useRef } from 'react'
import { Heart } from 'lucide-react'

export default function PhotoAlbum() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="photo-album" ref={sectionRef} className="py-20 px-4 md:px-8 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-amiri text-3xl md:text-4xl font-bold text-dark-plum mb-4">
            ذكرياتنا الجميلة
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gold-accent" />
            <Heart className="w-5 h-5 text-deep-rose" fill="currentColor" />
            <div className="w-16 h-px bg-gold-accent" />
          </div>
        </div>

        <div
          className={`group relative overflow-hidden rounded-2xl mx-auto max-w-md md:max-w-lg transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            border: '3px solid #D4A853',
            boxShadow: '0 4px 20px rgba(212, 168, 83, 0.25)',
          }}
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="images/hero.jpg"
              alt="Khaled و Rola"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-plum/50 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
            <div className="w-12 h-0.5 bg-gold-accent mb-3" />
            <p className="font-amiri text-xl text-warm-cream text-center">
              Khaled &amp; Rola
            </p>
            <Heart className="w-4 h-4 text-gold-accent mt-2" fill="currentColor" />
          </div>
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold-accent/60 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold-accent/60 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold-accent/60 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold-accent/60 rounded-br-lg" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />
    </section>
  )
}
