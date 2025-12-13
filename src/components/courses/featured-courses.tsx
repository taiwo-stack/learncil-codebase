'use client';

import { useState } from 'react';
import { BookOpen, Clock, Users, GraduationCap, Star, ArrowRight, Calculator, Globe, Beaker, Palette, Music, Code, Award, Search, Filter } from 'lucide-react';

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
  price: string;
  keyStage: string;
  yearGroups: string[];
  subject: string;
  examBoard?: string;
}

// British Curriculum Course Data
const coursesData: Course[] = [
  // RECEPTION (EYFS)
  {
    id: 1,
    title: "Early Literacy: Letters, Sounds & Phonics",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop",
    duration: "8 WEEKS",
    rating: 4.9,
    reviews: 156,
    lessons: 24,
    students: "320+",
    level: "Foundation",
    instructor: "Emma Thompson",
    price: "£45",
    keyStage: "EYFS",
    yearGroups: ["Reception"],
    subject: "English"
  },
  {
    id: 2,
    title: "Numbers & Counting for Early Years",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop",
    duration: "6 WEEKS",
    rating: 4.8,
    reviews: 142,
    lessons: 18,
    students: "280+",
    level: "Foundation",
    instructor: "Oliver Davis",
    price: "£40",
    keyStage: "EYFS",
    yearGroups: ["Reception"],
    subject: "Mathematics"
  },

  // KEY STAGE 1 (Years 1-2)
  {
    id: 3,
    title: "KS1 English: Reading & Writing Skills",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
    duration: "10 WEEKS",
    rating: 4.9,
    reviews: 203,
    lessons: 30,
    students: "450+",
    level: "Beginner",
    instructor: "Sophie Williams",
    price: "£55",
    keyStage: "KS1",
    yearGroups: ["Year 1", "Year 2"],
    subject: "English"
  },
  {
    id: 4,
    title: "KS1 Maths: Numbers, Shapes & Measurement",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&h=300&fit=crop",
    duration: "10 WEEKS",
    rating: 4.8,
    reviews: 189,
    lessons: 28,
    students: "410+",
    level: "Beginner",
    instructor: "James Anderson",
    price: "£55",
    keyStage: "KS1",
    yearGroups: ["Year 1", "Year 2"],
    subject: "Mathematics"
  },
  {
    id: 5,
    title: "KS1 Science: Plants, Animals & Materials",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop",
    duration: "8 WEEKS",
    rating: 4.7,
    reviews: 167,
    lessons: 24,
    students: "380+",
    level: "Beginner",
    instructor: "Dr. Rachel Green",
    price: "£50",
    keyStage: "KS1",
    yearGroups: ["Year 1", "Year 2"],
    subject: "Science"
  },

  // KEY STAGE 2 (Years 3-6)
  {
    id: 6,
    title: "KS2 English: Grammar, Comprehension & Writing",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=300&fit=crop",
    duration: "12 WEEKS",
    rating: 4.9,
    reviews: 287,
    lessons: 36,
    students: "620+",
    level: "Intermediate",
    instructor: "Catherine Hart",
    price: "£65",
    keyStage: "KS2",
    yearGroups: ["Year 3", "Year 4", "Year 5", "Year 6"],
    subject: "English"
  },
  {
    id: 7,
    title: "KS2 Mathematics: Arithmetic & Reasoning",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop",
    duration: "12 WEEKS",
    rating: 4.8,
    reviews: 312,
    lessons: 40,
    students: "680+",
    level: "Intermediate",
    instructor: "Michael Brown",
    price: "£65",
    keyStage: "KS2",
    yearGroups: ["Year 3", "Year 4", "Year 5", "Year 6"],
    subject: "Mathematics"
  },
  {
    id: 8,
    title: "Year 6 SATs Preparation Complete Bundle",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop",
    duration: "16 WEEKS",
    rating: 5.0,
    reviews: 423,
    lessons: 48,
    students: "890+",
    level: "Intermediate",
    instructor: "Helen Foster",
    price: "£95",
    keyStage: "KS2",
    yearGroups: ["Year 6"],
    subject: "SATs Prep"
  },

  // KEY STAGE 3 (Years 7-9)
  {
    id: 9,
    title: "KS3 English Language & Literature",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop",
    duration: "14 WEEKS",
    rating: 4.8,
    reviews: 234,
    lessons: 42,
    students: "520+",
    level: "Intermediate",
    instructor: "Dr. Sarah Mitchell",
    price: "£75",
    keyStage: "KS3",
    yearGroups: ["Year 7", "Year 8", "Year 9"],
    subject: "English"
  },
  {
    id: 10,
    title: "KS3 Mathematics: Algebra & Geometry",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop",
    duration: "14 WEEKS",
    rating: 4.7,
    reviews: 256,
    lessons: 44,
    students: "540+",
    level: "Intermediate",
    instructor: "Peter Clarke",
    price: "£75",
    keyStage: "KS3",
    yearGroups: ["Year 7", "Year 8", "Year 9"],
    subject: "Mathematics"
  },
  {
    id: 11,
    title: "KS3 Science: Biology, Chemistry & Physics",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=500&h=300&fit=crop",
    duration: "15 WEEKS",
    rating: 4.9,
    reviews: 298,
    lessons: 45,
    students: "610+",
    level: "Intermediate",
    instructor: "Dr. Emily Watson",
    price: "£80",
    keyStage: "KS3",
    yearGroups: ["Year 7", "Year 8", "Year 9"],
    subject: "Science"
  },
  {
    id: 12,
    title: "KS3 History: Medieval to Modern Britain",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&h=300&fit=crop",
    duration: "12 WEEKS",
    rating: 4.7,
    reviews: 178,
    lessons: 36,
    students: "390+",
    level: "Intermediate",
    instructor: "David Wilson",
    price: "£70",
    keyStage: "KS3",
    yearGroups: ["Year 7", "Year 8", "Year 9"],
    subject: "History"
  },

  // KEY STAGE 4 (Years 10-11) - GCSE
  {
    id: 13,
    title: "GCSE English Language (AQA)",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=300&fit=crop",
    duration: "20 WEEKS",
    rating: 4.9,
    reviews: 456,
    lessons: 60,
    students: "1200+",
    level: "Advanced",
    instructor: "Jennifer Collins",
    price: "£120",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "English Language",
    examBoard: "AQA"
  },
  {
    id: 14,
    title: "GCSE English Literature (AQA)",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
    duration: "20 WEEKS",
    rating: 4.8,
    reviews: 412,
    lessons: 58,
    students: "1100+",
    level: "Advanced",
    instructor: "Margaret Hayes",
    price: "£120",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "English Literature",
    examBoard: "AQA"
  },
  {
    id: 15,
    title: "GCSE Mathematics (Edexcel) - Foundation",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop",
    duration: "22 WEEKS",
    rating: 4.9,
    reviews: 534,
    lessons: 66,
    students: "1450+",
    level: "Advanced",
    instructor: "Robert Taylor",
    price: "£130",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "Mathematics",
    examBoard: "Edexcel"
  },
  {
    id: 16,
    title: "GCSE Mathematics (Edexcel) - Higher",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&h=300&fit=crop",
    duration: "24 WEEKS",
    rating: 5.0,
    reviews: 623,
    lessons: 72,
    students: "1680+",
    level: "Expert",
    instructor: "Dr. Alan Price",
    price: "£140",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "Mathematics",
    examBoard: "Edexcel"
  },
  {
    id: 17,
    title: "GCSE Combined Science Trilogy (AQA)",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop",
    duration: "24 WEEKS",
    rating: 4.8,
    reviews: 489,
    lessons: 72,
    students: "1320+",
    level: "Advanced",
    instructor: "Dr. Lisa Bennett",
    price: "£150",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "Combined Science",
    examBoard: "AQA"
  },
  {
    id: 18,
    title: "GCSE Biology (OCR)",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&h=300&fit=crop",
    duration: "20 WEEKS",
    rating: 4.9,
    reviews: 367,
    lessons: 60,
    students: "980+",
    level: "Advanced",
    instructor: "Dr. Amanda Roberts",
    price: "£125",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "Biology",
    examBoard: "OCR"
  },
  {
    id: 19,
    title: "GCSE Chemistry (OCR)",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=500&h=300&fit=crop",
    duration: "20 WEEKS",
    rating: 4.8,
    reviews: 342,
    lessons: 60,
    students: "920+",
    level: "Advanced",
    instructor: "Dr. Thomas Cooper",
    price: "£125",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "Chemistry",
    examBoard: "OCR"
  },
  {
    id: 20,
    title: "GCSE Physics (OCR)",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&h=300&fit=crop",
    duration: "20 WEEKS",
    rating: 4.9,
    reviews: 391,
    lessons: 60,
    students: "1050+",
    level: "Advanced",
    instructor: "Dr. Mark Stevens",
    price: "£125",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "Physics",
    examBoard: "OCR"
  },
  {
    id: 21,
    title: "GCSE History (Edexcel)",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&h=300&fit=crop",
    duration: "18 WEEKS",
    rating: 4.7,
    reviews: 278,
    lessons: 54,
    students: "750+",
    level: "Advanced",
    instructor: "Dr. Victoria Hughes",
    price: "£115",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "History",
    examBoard: "Edexcel"
  },
  {
    id: 22,
    title: "GCSE Geography (AQA)",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=300&fit=crop",
    duration: "18 WEEKS",
    rating: 4.8,
    reviews: 312,
    lessons: 54,
    students: "820+",
    level: "Advanced",
    instructor: "Dr. Simon Wright",
    price: "£115",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "Geography",
    examBoard: "AQA"
  },
  {
    id: 23,
    title: "GCSE Computer Science (OCR)",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
    duration: "20 WEEKS",
    rating: 4.9,
    reviews: 445,
    lessons: 60,
    students: "1180+",
    level: "Advanced",
    instructor: "Alex Turner",
    price: "£130",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "Computer Science",
    examBoard: "OCR"
  },
  {
    id: 24,
    title: "GCSE Business Studies (AQA)",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    duration: "18 WEEKS",
    rating: 4.7,
    reviews: 289,
    lessons: 54,
    students: "690+",
    level: "Advanced",
    instructor: "Caroline Evans",
    price: "£115",
    keyStage: "KS4",
    yearGroups: ["Year 10", "Year 11"],
    subject: "Business Studies",
    examBoard: "AQA"
  }
];

// Subject categories with icons
const subjectCategories = [
  { name: "English", icon: BookOpen, color: "bg-blue-500" },
  { name: "Mathematics", icon: Calculator, color: "bg-green-500" },
  { name: "Science", icon: Beaker, color: "bg-purple-500" },
  { name: "Humanities", icon: Globe, color: "bg-orange-500" },
  { name: "Languages", icon: Globe, color: "bg-red-500" },
  { name: "Computing", icon: Code, color: "bg-indigo-500" },
  { name: "Arts", icon: Palette, color: "bg-pink-500" }
];

export default function BritishCurriculumCourses() {
  const [selectedKeyStage, setSelectedKeyStage] = useState<string>("All");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickFilter, setQuickFilter] = useState<string>("");
  const coursesPerPage = 8;

  // Key Stage options
  const keyStageOptions = ["All", "EYFS", "KS1", "KS2", "KS3", "KS4"];

  // Filter courses
  const filteredCourses = coursesData.filter(course => {
    // Quick filter logic
    if (quickFilter === "primary") {
      if (!["EYFS", "KS1", "KS2"].includes(course.keyStage)) return false;
    } else if (quickFilter === "secondary") {
      if (!["KS3", "KS4"].includes(course.keyStage)) return false;
    } else if (quickFilter === "gcse") {
      if (course.keyStage !== "KS4") return false;
    } else if (quickFilter === "sats") {
      if (!course.subject.includes("SATs")) return false;
    }

    const matchesKeyStage = selectedKeyStage === "All" || course.keyStage === selectedKeyStage;
    const matchesSubject = selectedSubject === "All" || course.subject.includes(selectedSubject);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesKeyStage && matchesSubject && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const displayedCourses = filteredCourses.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'keyStage') setSelectedKeyStage(value);
    if (filterType === 'subject') setSelectedSubject(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Quick filter handlers
  const handleQuickFilter = (filter: string) => {
    setQuickFilter(filter);
    setCurrentPage(1);
    // Reset other filters when quick filter is applied
    if (filter !== quickFilter) {
      setSelectedKeyStage("All");
      setSelectedSubject("All");
    }
  };

  const clearQuickFilter = () => {
    setQuickFilter("");
    setCurrentPage(1);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-3">
            <Award size={20} strokeWidth={2} />
            <span className="text-sm font-bold uppercase tracking-wide">Our CURRICULUM</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1a1d3f' }}>
            Courses Aligned with National Curriculum
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            From Early Years to GCSE - Quality education following the British education system
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by subject, year group, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-700 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button 
            onClick={() => handleQuickFilter("primary")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              quickFilter === "primary"
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            Primary Courses
          </button>
          <button 
            onClick={() => handleQuickFilter("secondary")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              quickFilter === "secondary"
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            Secondary Courses
          </button>
          <button 
            onClick={() => handleQuickFilter("gcse")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              quickFilter === "gcse"
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            GCSE Preparation
          </button>
          <button 
            onClick={() => handleQuickFilter("sats")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              quickFilter === "sats"
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            SATs Revision
          </button>
          {quickFilter && (
            <button 
              onClick={clearQuickFilter}
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-md"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Key Stage Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Filter by Key Stage</h3>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-blue-600 font-semibold"
            >
              <Filter size={18} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-wrap gap-3`}>
            {keyStageOptions.map((ks) => (
              <button
                key={ks}
                onClick={() => handleFilterChange('keyStage', ks)}
                className={`px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                  selectedKeyStage === ks
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {ks === "All" ? "All Stages" : ks}
                {ks === "EYFS" && " (Reception)"}
                {ks === "KS1" && " (Years 1-2)"}
                {ks === "KS2" && " (Years 3-6)"}
                {ks === "KS3" && " (Years 7-9)"}
                {ks === "KS4" && " (Years 10-11)"}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Categories */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-10`}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Subject</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            <button
              onClick={() => handleFilterChange('subject', "All")}
              className={`p-4 rounded-xl transition-all duration-300 ${
                selectedSubject === "All"
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-semibold text-sm">All Subjects</div>
              </div>
            </button>
            
            {subjectCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleFilterChange('subject', cat.name)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    selectedSubject === cat.name
                      ? `${cat.color} text-white shadow-lg`
                      : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <Icon size={28} className="mx-auto mb-2" strokeWidth={2} />
                    <div className="font-semibold text-sm">{cat.name}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-bold text-blue-600">{startIndex + 1}-{Math.min(endIndex, filteredCourses.length)}</span> of <span className="font-bold">{filteredCourses.length}</span> courses
            {totalPages > 1 && <span className="ml-2">(Page {currentPage} of {totalPages})</span>}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Key Stage Badge */}
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  {course.keyStage}
                </div>

                {/* Level Badge */}
                <div className="absolute top-3 right-3 bg-white/90 text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold">
                  {course.level}
                </div>

                {/* Exam Board Badge (for GCSE) */}
                {course.examBoard && (
                  <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {course.examBoard}
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-5">
                {/* Subject Tag */}
                <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                  {course.subject}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}
                      strokeWidth={0}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1 font-semibold">{course.rating}</span>
                  <span className="text-xs text-gray-400">({course.reviews})</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem] leading-tight">
                  {course.title}
                </h3>

                {/* Year Groups */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.yearGroups.map((year, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {year}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} strokeWidth={2} />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} strokeWidth={2} />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} strokeWidth={2} />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-12">
            {/* Previous Button */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              <ArrowRight size={20} className="rotate-180" strokeWidth={2.5} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage = 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1);
                
                const showEllipsis = 
                  (page === currentPage - 2 && currentPage > 3) || 
                  (page === currentPage + 2 && currentPage < totalPages - 2);

                if (showEllipsis) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }

                if (!showPage) return null;

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* No Results Message */}
        {displayedCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen size={64} className="mx-auto" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSelectedKeyStage("All");
                setSelectedSubject("All");
                setSearchQuery("");
                setCurrentPage(1);
                setQuickFilter("");
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-blue-600" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-900">National Curriculum Aligned</h4>
            <p className="text-gray-600 text-sm">All courses follow the National Curriculum standards</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} className="text-green-600" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-900">Qualified Teachers</h4>
            <p className="text-gray-600 text-sm">Learn from experienced qualified educators</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} className="text-purple-600" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-900">Exam Board Approved</h4>
            <p className="text-gray-600 text-sm">GCSE courses aligned with AQA, Edexcel, OCR exam boards</p>
          </div>
        </div>
      </div>
    </section>
  );
}