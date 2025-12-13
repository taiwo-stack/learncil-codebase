'use client';

import { BookOpen, Users, Globe, Smartphone, Heart, GraduationCap, Target, Zap } from 'lucide-react';

export default function ServicesSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const services = [
    {
      icon: Target,
      title: "Personalized Tutoring",
      description: "One-on-one instruction tailored to each child's learning style, pace, and goals for maximum effectiveness."
    },
    {
      icon: BookOpen,
      title: "Subject Expertise",
      description: "Comprehensive coverage of Mathematics, English, Science, Social Studies, and all core subjects."
    },
    {
      icon: GraduationCap,
      title: "K-12 Curriculum Support",
      description: "Complete academic support from Kindergarten through High School across all grade levels."
    },
    {
      icon: Smartphone,
      title: "Digital Learning Tools",
      description: "Interactive platforms, educational apps, and technology-enhanced learning experiences."
    },
    {
      icon: Heart,
      title: "Cultural Sensitivity",
      description: "Teaching that respects and incorporates cultural identity and diverse learning backgrounds."
    },
    {
      icon: Zap,
      title: "Tech-Forward Instruction",
      description: "Modern teaching methods using digital tools and platforms for engaging, future-ready education."
    },
    {
      icon: Globe,
      title: "Curriculum Versatility",
      description: "Support for British, American, Nigerian, and hybrid curriculum systems."
    },
    {
      icon: Users,
      title: "Family Partnership",
      description: "Collaborative approach involving parents in their child's educational journey and progress."
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-indigo-400/8 to-blue-400/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-float"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-40"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-32 right-20 w-4 h-4 bg-blue-500/20 rotate-45 animate-float-slow"></div>
        <div className="absolute bottom-40 left-20 w-6 h-6 border-2 border-indigo-500/20 rotate-12 animate-float-delayed"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-500/20 rounded-full animate-float"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
            <div className="w-6 h-0.5 bg-blue-600"></div>
            <span className="text-sm font-bold uppercase tracking-wider">OUR SERVICES</span>
            <div className="w-6 h-0.5 bg-blue-600"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Learning Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our full range of educational services designed to empower every child with personalized,
            culturally sensitive, and technologically advanced learning experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Effect Line */}
                <div className="w-0 h-0.5 bg-blue-600 mt-4 group-hover:w-full transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button
            onClick={() => scrollToSection('booking')}
            className="inline-flex items-center gap-4 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors group"
          >
            <span>Book a Consultation</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <div className="w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45 translate-x-0.5"></div>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
      `}</style>
    </section>
  );
}