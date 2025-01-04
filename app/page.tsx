"use client"
import { useState } from 'react'
import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BookingForm } from "@/components/booking-form"
import { MenuCarousel } from "@/components/menu-carousel"
import { GalleryCarousel } from "@/components/gallery-carousel"

export default function OysterCatering() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="absolute w-full z-50 bg-transparent dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-32">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/images/ritual_logo_3_clean_trans_white_2000px.png"
                  alt="Ritual Oyster Co"
                  width={1000}
                  height={250}
                  className="h-40 w-auto hidden dark:block"
                  priority
                />
                <Image
                  src="/images/ritual_logo_3_clean_trans_black_2000px.png"
                  alt="Ritual Oyster Co"
                  width={1000}
                  height={250}
                  className="h-40 w-auto block dark:hidden"
                  priority
                />
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <a href="#home" className="text-primary font-sans font-light tracking-widest">
                Home
              </a>
              <a href="#services" className="border-transparent text-navy-600 hover:text-navy-900 hover:border-sand-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-sans font-light tracking-widest transition-colors">
                Services
              </a>
              <a href="#gallery" className="border-transparent text-navy-600 hover:text-navy-900 hover:border-sand-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-sans font-light tracking-widest transition-colors">
                Gallery
              </a>
              <a href="#contact" className="border-transparent text-navy-600 hover:text-navy-900 hover:border-sand-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-sans font-light tracking-widest transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            <a href="#home" className="bg-navy-50 border-navy-500 text-navy-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Home</a>
            <a href="#services" className="border-transparent text-navy-600 hover:bg-navy-50 hover:border-navy-300 hover:text-navy-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Services</a>
            <a href="#gallery" className="border-transparent text-navy-600 hover:bg-navy-50 hover:border-navy-300 hover:text-navy-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Gallery</a>
            <a href="#contact" className="border-transparent text-navy-600 hover:bg-navy-50 hover:border-navy-300 hover:text-navy-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative min-h-screen bg-white">
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 pt-32">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left space-y-6">
                <h1 className="font-display">
                  <span className="block text-6xl sm:text-7xl md:text-8xl tracking-wide font-light text-black leading-none">
                    Luxury Oyster Catering
                  </span>
                </h1>
                <p className="text-lg text-black sm:text-xl max-w-xl font-sans font-light tracking-wider leading-relaxed">
                  Chicago's premier raw bar catering service, bringing restaurant-caliber oyster experiences to the city's most prestigious events and celebrations.
                </p>
                <div className="mt-12 sm:flex sm:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center px-8 py-3 border border-black/20 text-base font-sans font-light tracking-widest uppercase text-black bg-transparent hover:border-black transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                  >
                    Book Your Event
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center px-8 py-3 border border-black/20 text-base font-sans font-light tracking-widest uppercase text-black bg-transparent hover:border-black transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                  >
                    Our Services
                  </a>
                </div>
              </div>
            </main>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/hero_1_inverted.png"
                alt="Luxury oyster presentation"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sample Menus Section */}
      <div className="bg-white dark:bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-sand-500 dark:text-sand-100 font-sans font-light tracking-widest uppercase">
              Sample Selections
            </h2>
            <p className="mt-2 text-3xl leading-8 font-display font-light tracking-wide text-black dark:text-white sm:text-4xl">
              Curated For Your Event
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-700 dark:text-gray-300 font-sans font-light mx-auto">
              We work closely with you to design the perfect oyster experience. Our selections evolve with the seasons, ensuring you receive the finest oysters at their peak. Below are examples of our seasonal inspirations that we can customize for your celebration.
            </p>
          </div>
          <MenuCarousel />
          <div className="mt-12 text-center">
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-sans font-light">
              Each menu is thoughtfully customized based on seasonality, availability, and your preferences. Our relationships with premium oyster farms ensure we source only the finest selections for your event.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-sand-500 dark:text-sand-100 font-sans font-light tracking-widest uppercase">
              Our Expertise
            </h2>
            <p className="mt-2 text-3xl leading-8 font-display font-light tracking-wide text-black dark:text-white sm:text-4xl">
              Curated Oyster Experiences
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-700 dark:text-gray-300 font-sans font-light mx-auto">
              Specializing in premium oyster service with the option to expand your raw bar selection.
            </p>
          </div>
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: 'Signature Oyster Service',
                  description: 'Our core offering features a carefully curated selection of East and West Coast oysters, expertly shucked and elegantly presented. Each variety is chosen to create a journey of distinct flavors, from briny to sweet, served with our house-made mignonettes.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
                    </svg>
                  )
                },
                {
                  name: 'Enhanced Raw Bar',
                  description: 'Complement your oyster service with an expanded selection of premium seafood including fresh clams, shrimp cocktail, and seasonal ceviche. Perfect for guests who appreciate variety while maintaining oysters as the centerpiece.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )
                },
                {
                  name: 'Educational Tasting Experience',
                  description: 'Transform your event with our guided oyster tasting experience. Our expert shuckers share the story of each variety, offering pairing suggestions and tasting notes. An interactive element that adds depth to any celebration.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )
                },
                {
                  name: 'Fine Dining Presentation',
                  description: 'Elevate your event with our restaurant-caliber presentation and service. Featuring custom ice sculptures, theatrical dry ice displays, and artisanal accompaniments including champagne mignonette, yuzu kosho, and freshly grated horseradish.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
              ].map((service) => (
                <div key={service.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-sand-100 text-black">
                      {service.icon}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-display font-light tracking-wide text-gray-900 dark:text-white">{service.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-700 dark:text-gray-300 font-sans font-light">{service.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="bg-white dark:bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-light tracking-wide text-black dark:text-white sm:text-4xl text-center mb-8">
            Our Oyster Gallery
          </h2>
          <GalleryCarousel />
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-white dark:bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-base text-sand-500 dark:text-sand-100 font-sans font-light tracking-widest uppercase">
                Reserve Your Date
              </h2>
              <p className="mt-2 text-3xl leading-8 font-display font-light tracking-wide text-black dark:text-white sm:text-4xl">
                Book Your Chicago Raw Bar Experience
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-700 dark:text-gray-300 font-sans font-light mx-auto">
                Available at Chicago's finest venues including The Peninsula, Four Seasons, Ritz-Carlton, and private estates throughout the North Shore.
              </p>
            </div>
            <BookingForm />
          </div>
        </div>
      </div>

      {/* A Toast Section */}
      <div className="bg-[#000000] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="prose lg:prose-lg">
              <h2 className="font-display text-4xl text-white mb-6 font-light tracking-wide">A Toast</h2>
              <div className="space-y-6 text-gray-300 font-sans font-light tracking-wide">
                <p className="text-lg leading-relaxed">
                  To the oyster—nature's most elegant expression of the sea. Each shell tells a story of its waters, carrying within it the essence of the ocean depths. Like fine wine, oysters speak of terroir, that magical combination of place and time that makes each variety uniquely extraordinary.
                </p>
                <p className="text-lg leading-relaxed">
                  From the briny depths of New England's cold waters to the sweet finish of West Coast treasures, each oyster offers a moment of sublime pleasure. They remind us to pause, to savor, to celebrate the simple yet profound pleasures of life.
                </p>
                <p className="text-lg leading-relaxed">
                  At Ritual Oyster Co, we honor an ancient tradition that spans millennia. Our ancestors traced coastlines and settled in coves, sustained by these precious gifts of the sea. Oysters were more than sustenance—they were the cornerstone of coastal communities, drawing people together in a ritual of gathering and celebration. Today, we continue this sacred practice, transforming your event into a meaningful ceremony where each oyster served pays homage to our collective heritage. Like those who came before us, moving from cove to cove, we bring this life-giving tradition to your celebration, creating moments of connection that echo through time.
                </p>
                <p className="text-lg leading-relaxed italic text-gray-300">
                  "As I ate the oysters with their strong taste of the sea and their faint metallic taste that the cold white wine washed away, leaving only the sea taste and the succulent texture, I lost the empty feeling and began to be happy and to make plans."
                  <span className="block text-sm mt-1">— Ernest Hemingway, A Moveable Feast</span>
                </p>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[600px]">
              <Image
                src="/images/Toast.jpg"
                alt="Elegant oyster presentation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/ritual_logo_3_white_2000px.png"
                  alt="Ritual Oyster Co"
                  width={400}
                  height={100}
                  className="h-24 w-auto block dark:hidden"
                  priority
                />
                <Image
                  src="/images/ritual_logo_black_2000px.png"
                  alt="Ritual Oyster Co"
                  width={400}
                  height={100}
                  className="h-24 w-auto hidden dark:block"
                  priority
                />
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-sans font-light">Chicago&apos;s premier luxury raw bar and oyster catering service. Specializing in weddings, corporate events, and private celebrations.</p>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 font-sans font-light">Proudly serving venues including:</p>
                <ul className="mt-2 text-gray-500 dark:text-gray-400 text-sm font-sans font-light">
                  <li>The Peninsula Chicago</li>
                  <li>Four Seasons Hotel Chicago</li>
                  <li>Ritz-Carlton Chicago</li>
                  <li>Chicago Athletic Association</li>
                  <li>The Langham Chicago</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white text-lg font-display font-light tracking-wide mb-4">Service Areas</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans font-light">
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-sand-100" />
                  Downtown Chicago
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-sand-100" />
                  North Shore (Winnetka, Glencoe, Highland Park)
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-sand-100" />
                  Gold Coast & Lincoln Park
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-sand-100" />
                  Western Suburbs (Hinsdale, Oak Brook)
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-sand-100" />
                  (202) 813-6862
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-sand-100" />
                  bookings@ritualoysters.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white text-lg font-display font-light tracking-wide mb-4">Event Types</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-sans font-light">
                <li>Chicago Wedding Receptions</li>
                <li>Corporate Events & Galas</li>
                <li>Private Home Celebrations</li>
                <li>Charity & Fundraising Events</li>
                <li>Holiday Parties</li>
                <li>Engagement Celebrations</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-white/10 pt-8">
            <p className="text-base text-gray-600 dark:text-gray-400 text-center font-sans font-light">
              © {new Date().getFullYear()} Ritual Oysters, LLC. Chicago's Premier Oyster & Raw Bar Catering Service. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Add this to your globals.css or tailwind config
// .text-gold-500 { color: #D4AF37; }
