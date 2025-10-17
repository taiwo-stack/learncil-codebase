import { Globe, DollarSign, MapPin, Calendar, Users, Briefcase } from 'lucide-react'

export default function WhyChoose() {
  const features = [
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Diverse Destinations",
      description: "Richly varied landscapes, luxury accommodation Travel."
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Fast Booking",
      description: "Richly varied landscapes, luxury accommodation Travel."
    },
    {
      icon: <DollarSign className="w-10 h-10" />,
      title: "Value for Money",
      description: "Richly varied landscapes, luxury accommodation Travel."
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Support Team",
      description: "Richly varied landscapes, luxury accommodation Travel."
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Beautiful Places",
      description: "Richly varied landscapes, luxury accommodation Travel."
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Passionate Travel",
      description: "Richly varied landscapes, luxury accommodation Travel."
    }
  ]

  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute top-32 right-20 w-40 h-40 bg-green-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-teal-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-44 h-44 bg-emerald-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <p className="text-green-600 font-semibold text-base md:text-lg mb-2" style={{ fontFamily: 'cursive' }}>
            We Are Awesome
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 px-4">
            Why <span className="text-green-600">Choose BoxoutCity</span>
          </h2>
        </div>

        {/* Main Content Container */}
        <div className="relative">
          {/* Desktop & Tablet Layout (md and up) - 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12 items-center">
            {/* Left Column - Features 1-3 */}
            <div className="space-y-8 lg:space-y-12">
              {features.slice(0, 3).map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Column - Image with traveler */}
            <div className="flex justify-center items-center px-4">
              <div className="relative w-full max-w-md aspect-square">
                {/* Circular background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full shadow-2xl"></div>
                
                {/* Overlay pattern */}
                <div className="absolute inset-0 rounded-full" style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)`
                }}></div>

                {/* Happy traveler illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 300 400" className="w-11/12 h-11/12 drop-shadow-2xl">
                    {/* Mountain peaks background - simplified and stylized */}
                    <g opacity="0.3">
                      <path d="M50 250 L100 180 L150 220 L200 160 L250 230 L280 250 Z" fill="white"/>
                      <path d="M30 250 L80 200 L130 240 L180 190 L230 240 L270 250 Z" fill="white" opacity="0.7"/>
                    </g>

                    {/* Happy traveler with backpack */}
                    <g>
                      {/* Body */}
                      <ellipse cx="150" cy="260" rx="40" ry="55" fill="#FFA726"/>
                      
                      {/* Backpack */}
                      <rect x="165" y="230" width="30" height="45" rx="8" fill="#2E7D32"/>
                      <rect x="170" y="235" width="20" height="15" rx="3" fill="#1B5E20"/>
                      <line x1="175" y1="230" x2="175" y2="220" stroke="#1B5E20" strokeWidth="3" strokeLinecap="round"/>
                      <line x1="185" y1="230" x2="185" y2="220" stroke="#1B5E20" strokeWidth="3" strokeLinecap="round"/>
                      
                      {/* Head */}
                      <circle cx="150" cy="200" r="28" fill="#FFB74D"/>
                      
                      {/* Happy face */}
                      <circle cx="142" cy="195" r="3" fill="#1B5E20"/>
                      <circle cx="158" cy="195" r="3" fill="#1B5E20"/>
                      <path d="M 138 208 Q 150 218 162 208" stroke="#1B5E20" strokeWidth="3" fill="none" strokeLinecap="round"/>
                      
                      {/* Cap/Hat */}
                      <ellipse cx="150" cy="180" rx="32" ry="12" fill="#43A047"/>
                      <path d="M 120 180 Q 150 170 180 180" fill="#2E7D32"/>
                      <circle cx="150" cy="172" r="6" fill="#FDD835"/>
                      
                      {/* Arms - one raised in excitement */}
                      <line x1="120" y1="240" x2="90" y2="190" stroke="#FFA726" strokeWidth="14" strokeLinecap="round"/>
                      <circle cx="90" cy="185" r="10" fill="#FFB74D"/>
                      
                      <line x1="180" y1="245" x2="200" y2="280" stroke="#FFA726" strokeWidth="14" strokeLinecap="round"/>
                      <circle cx="203" cy="285" r="10" fill="#FFB74D"/>
                      
                      {/* Legs */}
                      <line x1="140" y1="315" x2="130" y2="370" stroke="#1565C0" strokeWidth="16" strokeLinecap="round"/>
                      <line x1="160" y1="315" x2="170" y2="370" stroke="#1565C0" strokeWidth="16" strokeLinecap="round"/>
                      
                      {/* Hiking boots */}
                      <ellipse cx="130" cy="375" rx="14" ry="10" fill="#4E342E"/>
                      <ellipse cx="170" cy="375" rx="14" ry="10" fill="#4E342E"/>
                      
                      {/* Camera hanging */}
                      <rect x="145" y="270" width="18" height="15" rx="3" fill="#212121" opacity="0.8"/>
                      <circle cx="154" cy="277" r="5" fill="#64B5F6"/>
                      <line x1="154" y1="265" x2="154" y2="270" stroke="#424242" strokeWidth="2"/>
                    </g>

                    {/* Floating travel elements */}
                    <g opacity="0.6">
                      {/* Cloud */}
                      <ellipse cx="70" cy="120" rx="20" ry="12" fill="white"/>
                      <ellipse cx="85" cy="115" rx="18" ry="12" fill="white"/>
                      <ellipse cx="55" cy="118" rx="15" ry="10" fill="white"/>
                      
                      {/* Airplane */}
                      <g transform="translate(220, 100)">
                        <path d="M0,0 L15,0 L18,-5 L20,-5 L17,0 L20,5 L18,5 L15,0 L5,3 L0,0" fill="white"/>
                      </g>
                      
                      {/* Stars/sparkles */}
                      <path d="M240 180 L242 185 L247 185 L243 188 L245 193 L240 190 L235 193 L237 188 L233 185 L238 185 Z" fill="white"/>
                      <path d="M60 160 L61 163 L64 163 L61.5 165 L62.5 168 L60 166 L57.5 168 L58.5 165 L56 163 L59 163 Z" fill="white"/>
                    </g>
                  </svg>
                </div>

                {/* Decorative rings around the circle */}
                <div className="absolute inset-0 rounded-full border-4 border-white opacity-20 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-0 rounded-full border-2 border-green-300 opacity-40"></div>
              </div>
            </div>

            {/* Right Column - Features 4-6 */}
            <div className="space-y-8 lg:space-y-12">
              {features.slice(3, 6).map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout (sm and below) */}
          <div className="md:hidden space-y-8">
            {/* Illustration first on mobile */}
            <div className="flex justify-center items-center px-4 mb-8">
              <div className="relative w-full max-w-sm aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full shadow-2xl"></div>
                
                <div className="absolute inset-0 rounded-full" style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)`
                }}></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 300 400" className="w-11/12 h-11/12 drop-shadow-2xl">
                    <g opacity="0.3">
                      <path d="M50 250 L100 180 L150 220 L200 160 L250 230 L280 250 Z" fill="white"/>
                      <path d="M30 250 L80 200 L130 240 L180 190 L230 240 L270 250 Z" fill="white" opacity="0.7"/>
                    </g>

                    <g>
                      <ellipse cx="150" cy="260" rx="40" ry="55" fill="#FFA726"/>
                      <rect x="165" y="230" width="30" height="45" rx="8" fill="#2E7D32"/>
                      <rect x="170" y="235" width="20" height="15" rx="3" fill="#1B5E20"/>
                      <line x1="175" y1="230" x2="175" y2="220" stroke="#1B5E20" strokeWidth="3" strokeLinecap="round"/>
                      <line x1="185" y1="230" x2="185" y2="220" stroke="#1B5E20" strokeWidth="3" strokeLinecap="round"/>
                      <circle cx="150" cy="200" r="28" fill="#FFB74D"/>
                      <circle cx="142" cy="195" r="3" fill="#1B5E20"/>
                      <circle cx="158" cy="195" r="3" fill="#1B5E20"/>
                      <path d="M 138 208 Q 150 218 162 208" stroke="#1B5E20" strokeWidth="3" fill="none" strokeLinecap="round"/>
                      <ellipse cx="150" cy="180" rx="32" ry="12" fill="#43A047"/>
                      <path d="M 120 180 Q 150 170 180 180" fill="#2E7D32"/>
                      <circle cx="150" cy="172" r="6" fill="#FDD835"/>
                      <line x1="120" y1="240" x2="90" y2="190" stroke="#FFA726" strokeWidth="14" strokeLinecap="round"/>
                      <circle cx="90" cy="185" r="10" fill="#FFB74D"/>
                      <line x1="180" y1="245" x2="200" y2="280" stroke="#FFA726" strokeWidth="14" strokeLinecap="round"/>
                      <circle cx="203" cy="285" r="10" fill="#FFB74D"/>
                      <line x1="140" y1="315" x2="130" y2="370" stroke="#1565C0" strokeWidth="16" strokeLinecap="round"/>
                      <line x1="160" y1="315" x2="170" y2="370" stroke="#1565C0" strokeWidth="16" strokeLinecap="round"/>
                      <ellipse cx="130" cy="375" rx="14" ry="10" fill="#4E342E"/>
                      <ellipse cx="170" cy="375" rx="14" ry="10" fill="#4E342E"/>
                      <rect x="145" y="270" width="18" height="15" rx="3" fill="#212121" opacity="0.8"/>
                      <circle cx="154" cy="277" r="5" fill="#64B5F6"/>
                      <line x1="154" y1="265" x2="154" y2="270" stroke="#424242" strokeWidth="2"/>
                    </g>

                    <g opacity="0.6">
                      <ellipse cx="70" cy="120" rx="20" ry="12" fill="white"/>
                      <ellipse cx="85" cy="115" rx="18" ry="12" fill="white"/>
                      <ellipse cx="55" cy="118" rx="15" ry="10" fill="white"/>
                      <g transform="translate(220, 100)">
                        <path d="M0,0 L15,0 L18,-5 L20,-5 L17,0 L20,5 L18,5 L15,0 L5,3 L0,0" fill="white"/>
                      </g>
                      <path d="M240 180 L242 185 L247 185 L243 188 L245 193 L240 190 L235 193 L237 188 L233 185 L238 185 Z" fill="white"/>
                      <path d="M60 160 L61 163 L64 163 L61.5 165 L62.5 168 L60 166 L57.5 168 L58.5 165 L56 163 L59 163 Z" fill="white"/>
                    </g>
                  </svg>
                </div>

                <div className="absolute inset-0 rounded-full border-4 border-white opacity-20 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-0 rounded-full border-2 border-green-300 opacity-40"></div>
              </div>
            </div>

            {/* Features list on mobile */}
            <div className="space-y-4 px-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white shadow-md">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}