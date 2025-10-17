export function AboutHero() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-primary/90 to-primary/70">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl font-bold mb-6">About TourismCo</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          We are passionate about creating unforgettable travel experiences that connect 
          you with the beauty, culture, and adventure that our destinations have to offer.
        </p>
      </div>
    </section>
  )
}