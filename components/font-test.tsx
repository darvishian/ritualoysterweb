"use client"

export function FontTest() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-cream-50 mb-4">Canela Font Test:</h3>
        <p className="font-display text-4xl font-light text-cream-50">Canela Light</p>
        <p className="font-display text-4xl font-normal text-cream-50">Canela Regular</p>
        <p className="font-display text-4xl font-medium text-cream-50">Canela Medium</p>
      </div>
      
      <div>
        <h3 className="text-cream-50 mb-4">Favorit Font Test:</h3>
        <p className="font-sans text-xl font-light text-cream-50">Favorit Light</p>
        <p className="font-sans text-xl font-normal text-cream-50">Favorit Regular</p>
        <p className="font-sans text-xl font-medium text-cream-50">Favorit Medium</p>
      </div>
    </div>
  )
} 