'use client';

import { useState } from 'react';
import { BookOpen, Clock, Users, GraduationCap, Star, ArrowRight, User, Calculator, Globe, Beaker, Palette } from 'lucide-react';

// Course data type
interface Course {
  id: number;
  title: string;
  image: string;
  duration: string;
  rating: number;
  reviews: number;
  lessons: number;
  students: string;
  level: string;
  instructor: string;
  instructorImage: string;
  price: string;
  classes: string[]; // K1, K2, etc.
}

// Realistic K1-K12 course data
const coursesData: Course[] = [
  // K1-K3 (Ages 5-8) - Elementary Foundation
  {
    id: 1,
    title: "Introduction to Numbers and Basic Counting",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop",
    duration: "03 WEEKS",
    rating: 4.9,
    reviews: 4.9,
    lessons: 12,
    students: "150+",
    level: "Beginner",
    instructor: "Sarah Johnson",
    instructorImage: "/images/tutor1.jpg",
    price: "FREE",
    classes: ["K1", "K2"]
  },
  {
    id: 2,
    title: "Learning the Alphabet and Phonics Fun",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop",
    duration: "04 WEEKS",
    rating: 4.8,
    reviews: 4.8,
    lessons: 15,
    students: "200+",
    level: "Beginner",
    instructor: "Emily Davis",
    instructorImage: "/images/tutor2.jpg",
    price: "FREE",
    classes: ["K1", "K2", "K3"]
  },
  {
    id: 3,
    title: "Colors, Shapes and Simple Art Activities",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=300&fit=crop",
    duration: "02 WEEKS",
    rating: 4.7,
    reviews: 4.7,
    lessons: 10,
    students: "180+",
    level: "Beginner",
    instructor: "Maria Garcia",
    instructorImage: "/images/tutor3.jpg",
    price: "FREE",
    classes: ["K1", "K2", "K3"]
  },
  {
    id: 4,
    title: "Stories and Early Reading Comprehension",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
    duration: "03 WEEKS",
    rating: 4.8,
    reviews: 4.8,
    lessons: 14,
    students: "190+",
    level: "Beginner",
    instructor: "Lisa Brown",
    instructorImage: "/images/tutor4.jpg",
    price: "FREE",
    classes: ["K2", "K3"]
  },

  // K4-K6 (Ages 9-11) - Elementary Advanced
  {
    id: 5,
    title: "Addition, Subtraction and Times Tables",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&h=300&fit=crop",
    duration: "04 WEEKS",
    rating: 4.7,
    reviews: 4.7,
    lessons: 16,
    students: "220+",
    level: "Intermediate",
    instructor: "Michael Chen",
    instructorImage: "/images/tutor5.jpg",
    price: "FREE",
    classes: ["K4", "K5", "K6"]
  },
  {
    id: 6,
    title: "Reading and Writing Full Sentences",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=300&fit=crop",
    duration: "05 WEEKS",
    rating: 4.9,
    reviews: 4.9,
    lessons: 18,
    students: "250+",
    level: "Intermediate",
    instructor: "Jennifer White",
    instructorImage: "/images/tutor6.jpg",
    price: "FREE",
    classes: ["K4", "K5", "K6"]
  },
  {
    id: 7,
    title: "Introduction to Science and Nature",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop",
    duration: "03 WEEKS",
    rating: 4.8,
    reviews: 4.8,
    lessons: 12,
    students: "170+",
    level: "Intermediate",
    instructor: "David Wilson",
    instructorImage: "/images/tutor7.jpg",
    price: "FREE",
    classes: ["K4", "K5", "K6"]
  },
  {
    id: 8,
    title: "World Geography and Map Reading Skills",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=300&fit=crop",
    duration: "04 WEEKS",
    rating: 4.6,
    reviews: 4.6,
    lessons: 14,
    students: "160+",
    level: "Intermediate",
    instructor: "Robert Taylor",
    instructorImage: "/images/tutor8.jpg",
    price: "FREE",
    classes: ["K5", "K6"]
  },

  // K7-K9 (Ages 12-14) - Middle School
  {
    id: 9,
    title: "Algebra Fundamentals and Problem Solving",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop",
    duration: "06 WEEKS",
    rating: 4.7,
    reviews: 4.7,
    lessons: 20,
    students: "140+",
    level: "Advanced",
    instructor: "Dr. James Anderson",
    instructorImage: "/images/tutor9.jpg",
    price: "FREE",
    classes: ["K7", "K8", "K9"]
  },
  {
    id: 10,
    title: "English Literature and Essay Writing",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop",
    duration: "05 WEEKS",
    rating: 4.8,
    reviews: 4.8,
    lessons: 18,
    students: "180+",
    level: "Advanced",
    instructor: "Prof. Emma Thompson",
    instructorImage: "/images/tutor10.jpg",
    price: "FREE",
    classes: ["K7", "K8", "K9"]
  },
  {
    id: 11,
    title: "Chemistry: Atoms, Molecules and Reactions",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=500&h=300&fit=crop",
    duration: "06 WEEKS",
    rating: 4.9,
    reviews: 4.9,
    lessons: 22,
    students: "130+",
    level: "Advanced",
    instructor: "Dr. Patricia Lee",
    instructorImage: "/images/tutor11.jpg",
    price: "FREE",
    classes: ["K8", "K9"]
  },
  {
    id: 12,
    title: "World History: Ancient Civilizations",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&h=300&fit=crop",
    duration: "04 WEEKS",
    rating: 4.7,
    reviews: 4.7,
    lessons: 16,
    students: "150+",
    level: "Advanced",
    instructor: "Dr. Thomas Harris",
    instructorImage: "/images/tutor12.jpg",
    price: "FREE",
    classes: ["K7", "K8", "K9"]
  },

  // K10-K12 (Ages 15-17) - High School
  {
    id: 13,
    title: "Advanced Calculus and Trigonometry",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop",
    duration: "08 WEEKS",
    rating: 4.8,
    reviews: 4.8,
    lessons: 25,
    students: "110+",
    level: "Expert",
    instructor: "Dr. Richard Martinez",
    instructorImage: "/images/tutor13.jpg",
    price: "FREE",
    classes: ["K10", "K11", "K12"]
  },
  {
    id: 14,
    title: "Physics: Mechanics and Motion",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&h=300&fit=crop",
    duration: "07 WEEKS",
    rating: 4.9,
    reviews: 4.9,
    lessons: 24,
    students: "95+",
    level: "Expert",
    instructor: "Dr. Steven Clark",
    instructorImage: "/images/tutor14.jpg",
    price: "FREE",
    classes: ["K10", "K11", "K12"]
  },
  {
    id: 15,
    title: "Advanced English Literature and Critical Analysis",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=300&fit=crop",
    duration: "06 WEEKS",
    rating: 4.7,
    reviews: 4.7,
    lessons: 20,
    students: "120+",
    level: "Expert",
    instructor: "Prof. Margaret Lewis",
    instructorImage: "/images/tutor15.jpg",
    price: "FREE",
    classes: ["K10", "K11", "K12"]
  },
  {
    id: 16,
    title: "Biology: Cell Structure and Human Anatomy",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&h=300&fit=crop",
    duration: "07 WEEKS",
    rating: 4.8,
    reviews: 4.8,
    lessons: 23,
    students: "105+",
    level: "Expert",
    instructor: "Dr. Helen Walker",
    instructorImage: "/images/tutor16.jpg",
    price: "FREE",
    classes: ["K10", "K11", "K12"]
  }
];

// Category data updated for K-12
const categories = [
  { name: "Mathematics", courses: 286, active: true, icon: Calculator },
  { name: "English & Literature", courses: 245, active: false, icon: BookOpen },
  { name: "Science", courses: 195, active: false, icon: Beaker },
  { name: "Social Studies", courses: 168, active: false, icon: Globe }
];

export default function SpecialCourses() {
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(coursesData.slice(0, 4));

  // Generate class options K1-K12
  const classOptions = ["All", ...Array.from({ length: 12 }, (_, i) => `K${i + 1}`)];

  // Filter courses based on selected class
  const handleClassFilter = (classLevel: string) => {
    setSelectedClass(classLevel);
    
    if (classLevel === "All") {
      setFilteredCourses(coursesData.slice(0, 4));
    } else {
      const filtered = coursesData.filter(course => 
        course.classes.includes(classLevel)
      ).slice(0, 4);
      setFilteredCourses(filtered.length > 0 ? filtered : coursesData.slice(0, 4));
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50/50 to-indigo-50/40">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-3">
            <BookOpen size={20} strokeWidth={2} />
            <span className="text-sm font-bold uppercase tracking-wide">SPECIAL COURSES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12" style={{ color: '#1a1d3f' }}>
            Our Special Online Courses
          </h2>

          {/* Class Filter - Mobile/Tablet Only */}
          <div className="lg:hidden flex flex-wrap justify-center gap-2 mb-8">
            {classOptions.map((classLevel) => (
              <button
                key={classLevel}
                onClick={() => handleClassFilter(classLevel)}
                className={`px-5 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                  selectedClass === classLevel
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {classLevel}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className={`${
                  category.active 
                    ? 'bg-blue-600' 
                    : 'bg-white'
                } rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg group`}
                style={!category.active ? { border: '1px solid #e5e7eb' } : {}}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${
                    category.active ? 'bg-white' : 'bg-blue-50'
                  } rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent size={32} className={category.active ? 'text-blue-600' : 'text-blue-500'} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <h3 className={`font-bold text-lg mb-1 ${
                      category.active ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm ${
                      category.active ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {category.courses} Courses
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Class Filter - Above Courses */}
        <div className="hidden lg:flex flex-wrap justify-center gap-2 mb-8">
          {classOptions.map((classLevel) => (
            <button
              key={classLevel}
              onClick={() => handleClassFilter(classLevel)}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
                selectedClass === classLevel
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {classLevel}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden h-56">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Duration Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Clock size={14} strokeWidth={2.5} />
                  {course.duration}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}
                      strokeWidth={0}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({course.reviews})</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mb-4 line-clamp-2 min-h-[3rem] leading-snug">
                  {course.title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} strokeWidth={2} />
                    <span>Lesson {course.lessons}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} strokeWidth={2} />
                    <span>Students {course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap size={14} strokeWidth={2} />
                    <span>{course.level}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {course.instructor.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
                  </div>
                  <span className="text-red-500 font-bold text-base">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg uppercase text-sm tracking-wide">
            VIEW ALL COURSES
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}