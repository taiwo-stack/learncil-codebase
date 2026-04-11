'use client';

import Image from 'next/image';
import { Award, Code, Shield, Users, BookOpen, Target, Heart, Lightbulb } from 'lucide-react';

export default function FoundersSection() {
  const founders = [
    {
      name: "Taiwo Adedotun",
      role: "Co-Founder & Technology Architect",
      image: "/taiwoadedotun.jpg",
      bio: "Taiwo Adedotun, Co-Founder of LearnCil Academy, is an AI Engineer, Cybersecurity Analyst, and Electrical and Electronic Engineer with a strong passion for building intelligent, secure, and scalable technology solutions. His multidisciplinary background places him at the intersection of software innovation, security architecture, and systems engineering, a rare blend that powers the technological backbone of LearnCil.",
      expertise: [
        "Full-Stack Software Engineering",
        "Cybersecurity, Security Architecture",
        "Cloud Technologies & Platform Optimization",
        "AI Engineering & Automation"
      ],
      achievements: [
        "Developed robust digital systems for multiple industries",
        "Built scalable solutions for companies",
        "Integrated advanced technology into personalized learning",
        "Ensured platform stability and innovation-driven operations"
      ],
      quote: "Every great educational experience deserves equally great technology supporting it.",
      icons: [Code, Shield, Lightbulb, Target]
    },
    {
      name: "Favour Alabi",
      role: "Founder",
      image: "/alabifavour.jpg",
      bio: "Favour Alabi, Founder of LearnCil Academy, is a professional Electrical and Electronic Engineer, certified Google Educator, and seasoned school administrator. His engineering background provides a unique advantage in STEM education, combining analytical precision with real-world problem-solving. Favour’s journey from empathetic classroom teacher to Managing Director of CIMA Schools has given him a rare, 360-degree perspective on learning systems. He understands students, teachers, parents, and systems alike. He founded LearnCil Academy to ensure K–12 learners across borders have a learning environment that truly understands their world, pace, and cultural identity.",
      expertise: [
        "STEM Education & Analytical Precision",
        "Curriculum Design & Strategy",
        "Instructional Leadership",
        "School-Wide Operations & Student Support"
      ],
      achievements: [
        "Certified Google Educator with an engineering background",
        "Managing Director of CIMA Schools in Ibadan",
        "Built personalized learning environments for cross-border students",
        "Leads a growing community of culturally-aware educators"
      ],
      quote: "To build an educational space where every learner feels understood, supported, and confident no matter where they live or which curriculum they study.",
      icons: [BookOpen, Users, Heart, Award]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIyNCwyMzEsMjQzLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-100/40 to-pink-100/40 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
            <div className="w-6 h-0.5 bg-blue-600"></div>
            <span className="text-sm font-bold uppercase tracking-wider">OUR LEADERSHIP</span>
            <div className="w-6 h-0.5 bg-blue-600"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet the Visionaries Behind LearnCil
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our co-founders bring together decades of expertise in technology, education, and innovation
            to create a learning platform that truly transforms lives.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="space-y-20">
          {founders.map((founder, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image Side */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative w-full max-w-md mx-auto">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover object-center"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>

                  {/* Floating Achievement Badges */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-blue-600 rounded-full p-3 shadow-lg">
                    {(() => {
                      const IconComponent = founder.icons[0];
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {founder.name}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold mb-4">
                      {founder.role}
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {founder.bio}
                  </p>

                  {/* Expertise */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Core Expertise</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {founder.expertise.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700 font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Key Achievements</h4>
                    <div className="space-y-3">
                      {founder.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="relative bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                    <div className="text-blue-600 text-4xl leading-none mb-2">"</div>
                    <p className="text-gray-800 font-medium italic text-lg">
                      {founder.quote}
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA
        <div className="text-center mt-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Join Our Mission?
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Experience the difference that passionate leadership and innovative technology can make in education.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2 group">
              <span>Start Your Learning Journey</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <div className="w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45 translate-x-0.5"></div>
              </div>
            </button>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.1); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
      `}</style>
    </section>
  );
}