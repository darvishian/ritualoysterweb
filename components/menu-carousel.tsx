"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const menus = [
  {
    season: "Spring",
    description: "Bright, crisp flavors celebrating the ocean's awakening",
    oysters: [
      "Kumamoto (Washington) - Sweet cucumber finish",
      "Wellfleet (Massachusetts) - Clean, briny start",
      "Blue Point (New York) - Mild, salty character",
    ],
    pairings: [
      "Champagne Mignonette",
      "Meyer Lemon & Shallot",
      "Spring Ramp Vinaigrette",
    ],
    accompaniments: "Fresh horseradish, Meyer lemon, seasonal microgreens"
  },
  {
    season: "Summer",
    description: "Light, refreshing selections for warm weather gatherings",
    oysters: [
      "Raspberry Point (PEI) - Sweet, briny finish",
      "Kusshi (British Columbia) - Ultra clean, cucumber notes",
      "Island Creek (Massachusetts) - Perfect salinity",
    ],
    pairings: [
      "Watermelon Granita",
      "Yuzu Kosho & Rice Wine Vinegar",
      "Cucumber & Dill Mignonette",
    ],
    accompaniments: "Freshly grated horseradish, citrus, edible flowers"
  },
  {
    season: "Autumn",
    description: "Rich, complex flavors of peak oyster season",
    oysters: [
      "Belon (Maine) - Intense mineral finish",
      "Olympia (Washington) - Copper penny brightness",
      "Pemaquid (Maine) - Bold brine, sweet finish",
    ],
    pairings: [
      "Apple Cider Mignonette",
      "Burnt Onion & Black Pepper",
      "Preserved Lemon & Thyme",
    ],
    accompaniments: "Fresh horseradish, aged sherry vinegar, bronze fennel"
  },
  {
    season: "Winter",
    description: "Deep, rich flavors at their peak of perfection",
    oysters: [
      "Totten Inlet (Washington) - Cucumber & Salt",
      "Glidden Point (Maine) - Perfect winter oyster",
      "Malpeque (PEI) - Classic maritime brine",
    ],
    pairings: [
      "Classic Mignonette",
      "Barrel-Aged Hot Sauce",
      "Smoked Ice & Cracked Pepper",
    ],
    accompaniments: "Fresh horseradish, aged champagne vinegar, micro celery"
  },
]

export function MenuCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((currentIndex + 1) % menus.length)
  }

  const previous = () => {
    setCurrentIndex((currentIndex - 1 + menus.length) % menus.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-8 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-display font-light tracking-wide text-black dark:text-white">
                {menus[currentIndex].season}
              </h3>
              <span className="text-sand-500 dark:text-sand-100 font-sans font-light">
                {currentIndex + 1} / {menus.length}
              </span>
            </div>
            <p className="text-navy-600 dark:text-gray-300 italic mb-6 font-sans font-light">
              {menus[currentIndex].description}
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sand-500 dark:text-sand-100 text-lg font-display font-light tracking-wide mb-2">
                  Featured Oysters
                </h4>
                <ul className="text-navy-600 dark:text-gray-300 space-y-1 font-sans font-light">
                  {menus[currentIndex].oysters.map((oyster, index) => (
                    <li key={index}>{oyster}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sand-500 dark:text-sand-100 text-lg font-display font-light tracking-wide mb-2">
                  House-Made Pairings
                </h4>
                <ul className="text-navy-600 dark:text-gray-300 space-y-1 font-sans font-light">
                  {menus[currentIndex].pairings.map((pairing, index) => (
                    <li key={index}>{pairing}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sand-500 dark:text-sand-100 text-lg font-display font-light tracking-wide mb-2">
                  Accompaniments
                </h4>
                <p className="text-navy-600 dark:text-gray-300 font-sans font-light">
                  {menus[currentIndex].accompaniments}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={previous}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-gray-100 dark:bg-black/50 text-black dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-black/80 transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-gray-100 dark:bg-black/50 text-black dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-black/80 transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
} 