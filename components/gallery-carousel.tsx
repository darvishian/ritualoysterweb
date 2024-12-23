"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  { src: '/images/gallery/1.png', alt: 'Oysters on ice display' },
  { src: '/images/gallery/2.png', alt: 'Fresh oyster presentation' },
  { src: '/images/gallery/3.png', alt: 'Oyster shucking service' },
  { src: '/images/gallery/4.png', alt: 'Elegant raw bar setup' },
  { src: '/images/gallery/5.png', alt: 'Premium oyster selection' },
  { src: '/images/gallery/6.png', alt: 'Oyster catering event' },
  { src: '/images/gallery/7.png', alt: 'Raw bar service' },
  { src: '/images/gallery/8.png', alt: 'Luxury catering setup' },
]

export function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return

    const touchEndX = e.touches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        next()
      } else {
        previous()
      }
      touchStartX.current = null
    }
  }

  const handleTouchEnd = () => {
    touchStartX.current = null
  }

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Get visible images based on current index
  const getVisibleImages = () => {
    const visibleCount = 3 // Show 3 images at a time
    const images = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % galleryImages.length
      images.push(galleryImages[index])
    }
    return images
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div 
        ref={containerRef}
        className="overflow-hidden relative h-[400px] w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-4 h-full">
          {getVisibleImages().map((image, index) => (
            <div 
              key={`${currentIndex}-${index}`} 
              className="flex-1 relative h-full min-w-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-sans font-light">
            {currentIndex + 1} / {galleryImages.length}
          </span>
        </div>
      </div>
      
      <button
        onClick={previous}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
} 