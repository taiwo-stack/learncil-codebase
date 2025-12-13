'use client';

import { useState } from 'react';
import { BookOpen, Clock, Users, Star, ArrowRight, Code, Laptop, Database, Brain, Shield, Palette, TrendingUp, Search, Filter, Cpu, Sparkles } from 'lucide-react';

// Course data type
interface TechCourse {
  id: number;
  title: string;
  image: string;
  duration: string;
  rating: number;
  reviews: number;
  lessons: number;
  students: string;
  level: string;
  gradeLevel: string;
  ageRange: string;
  category: string;
  tools: string[];
  projects: number;
}

// Tech Skills Course Data
const techCoursesData: TechCourse[] = [
  // K-5 ELEMENTARY (Ages 5-11)
  {
    id: 1,
    title: "Computer Basics for Beginners",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop",
    duration: "4 WEEKS",
    rating: 4.9,
    reviews: 245,
    lessons: 12,
    students: "580+",
    level: "Beginner",
    gradeLevel: "K-5",
    ageRange: "Ages 5-11",
    category: "Digital Literacy",
    tools: ["Windows", "Mac", "Mouse & Keyboard"],
    projects: 3
  },
  {
    id: 2,
    title: "Scratch for Kids: Create Your First Game",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop",
    duration: "6 WEEKS",
    rating: 5.0,
    reviews: 412,
    lessons: 18,
    students: "890+",
    level: "Beginner",
    gradeLevel: "K-5",
    ageRange: "Ages 5-11",
    category: "Block Coding",
    tools: ["Scratch"],
    projects: 5
  },
  {
    id: 3,
    title: "Internet Safety & Digital Citizenship",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop",
    duration: "3 WEEKS",
    rating: 4.8,
    reviews: 198,
    lessons: 10,
    students: "420+",
    level: "Beginner",
    gradeLevel: "K-5",
    ageRange: "Ages 5-11",
    category: "Digital Literacy",
    tools: ["Online Safety Tools"],
    projects: 2
  },
  {
    id: 4,
    title: "Canva for Kids: Design Posters & Presentations",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    duration: "5 WEEKS",
    rating: 4.9,
    reviews: 334,
    lessons: 15,
    students: "670+",
    level: "Beginner",
    gradeLevel: "K-5",
    ageRange: "Ages 5-11",
    category: "Creative Tools",
    tools: ["Canva"],
    projects: 8
  },
  {
    id: 5,
    title: "Blockly Adventures: Learn Coding Through Puzzles",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=300&fit=crop",
    duration: "4 WEEKS",
    rating: 4.7,
    reviews: 267,
    lessons: 12,
    students: "510+",
    level: "Beginner",
    gradeLevel: "K-5",
    ageRange: "Ages 5-11",
    category: "Block Coding",
    tools: ["Blockly"],
    projects: 6
  },
  {
    id: 6,
    title: "Typing & Keyboard Mastery",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop",
    duration: "6 WEEKS",
    rating: 4.6,
    reviews: 189,
    lessons: 20,
    students: "450+",
    level: "Beginner",
    gradeLevel: "K-5",
    ageRange: "Ages 5-11",
    category: "Digital Literacy",
    tools: ["Typing Software"],
    projects: 1
  },

  // 6-8 MIDDLE SCHOOL (Ages 11-14)
  {
    id: 7,
    title: "Python for Beginners: Your First Programs",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop",
    duration: "8 WEEKS",
    rating: 4.9,
    reviews: 523,
    lessons: 24,
    students: "1240+",
    level: "Intermediate",
    gradeLevel: "6-8",
    ageRange: "Ages 11-14",
    category: "Programming",
    tools: ["Python"],
    projects: 10
  },
  {
    id: 8,
    title: "JavaScript Fundamentals: Make Interactive Websites",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&h=300&fit=crop",
    duration: "8 WEEKS",
    rating: 4.8,
    reviews: 456,
    lessons: 26,
    students: "980+",
    level: "Intermediate",
    gradeLevel: "6-8",
    ageRange: "Ages 11-14",
    category: "Programming",
    tools: ["JavaScript", "HTML", "CSS"],
    projects: 8
  },
  {
    id: 9,
    title: "Create Your First Game with Unity & C#",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&h=300&fit=crop",
    duration: "10 WEEKS",
    rating: 5.0,
    reviews: 678,
    lessons: 30,
    students: "1580+",
    level: "Intermediate",
    gradeLevel: "6-8",
    ageRange: "Ages 11-14",
    category: "Game Development",
    tools: ["Unity", "C#"],
    projects: 4
  },
  {
    id: 10,
    title: "Introduction to Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
    duration: "6 WEEKS",
    rating: 4.9,
    reviews: 389,
    lessons: 18,
    students: "820+",
    level: "Intermediate",
    gradeLevel: "6-8",
    ageRange: "Ages 11-14",
    category: "AI & Machine Learning",
    tools: ["Teachable Machine", "JavaScript"],
    projects: 5
  },
  {
    id: 11,
    title: "Roblox Game Development",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=500&h=300&fit=crop",
    duration: "8 WEEKS",
    rating: 5.0,
    reviews: 892,
    lessons: 24,
    students: "2100+",
    level: "Intermediate",
    gradeLevel: "6-8",
    ageRange: "Ages 11-14",
    category: "Game Development",
    tools: ["Roblox Studio", "Lua"],
    projects: 6
  },
  {
    id: 12,
    title: "Data Organization & Simple Analysis",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    duration: "5 WEEKS",
    rating: 4.7,
    reviews: 234,
    lessons: 15,
    students: "520+",
    level: "Intermediate",
    gradeLevel: "6-8",
    ageRange: "Ages 11-14",
    category: "Data Science",
    tools: ["Excel", "Google Sheets"],
    projects: 4
  },
  {
    id: 13,
    title: "Graphic Design with Canva Pro",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=300&fit=crop",
    duration: "6 WEEKS",
    rating: 4.8,
    reviews: 367,
    lessons: 18,
    students: "780+",
    level: "Intermediate",
    gradeLevel: "6-8",
    ageRange: "Ages 11-14",
    category: "Graphic Design",
    tools: ["Canva Pro"],
    projects: 12
  },
  {
    id: 14,
    title: "Turtle Graphics & Creative Coding with Python",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop",
    duration: "5 WEEKS",
    rating: 4.9,
    reviews: 289,
    lessons: 15,
    students: "610+",
    level: "Intermediate",
    gradeLevel: "6-8",
    ageRange: "Ages 11-14",
    category: "Programming",
    tools: ["Python", "Turtle"],
    projects: 10
  },

  // 9-12 HIGH SCHOOL (Ages 14-18)
  {
    id: 15,
    title: "Python Advanced: Object-Oriented Programming",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop",
    duration: "12 WEEKS",
    rating: 4.9,
    reviews: 645,
    lessons: 36,
    students: "1450+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Programming",
    tools: ["Python"],
    projects: 8
  },
  {
    id: 16,
    title: "HTML & CSS: Build Your First Website",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=300&fit=crop",
    duration: "8 WEEKS",
    rating: 5.0,
    reviews: 823,
    lessons: 24,
    students: "1980+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Web Development",
    tools: ["HTML", "CSS"],
    projects: 5
  },
  {
    id: 17,
    title: "JavaScript & React: Modern Web Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
    duration: "14 WEEKS",
    rating: 4.9,
    reviews: 712,
    lessons: 42,
    students: "1620+",
    level: "Expert",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Web Development",
    tools: ["JavaScript", "React"],
    projects: 10
  },
  {
    id: 18,
    title: "SQL for Beginners: Database Fundamentals",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=300&fit=crop",
    duration: "10 WEEKS",
    rating: 4.8,
    reviews: 489,
    lessons: 30,
    students: "1120+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Data Science",
    tools: ["SQL", "MySQL"],
    projects: 6
  },
  {
    id: 19,
    title: "Introduction to Data Science with Python",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    duration: "12 WEEKS",
    rating: 5.0,
    reviews: 567,
    lessons: 36,
    students: "1340+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Data Science",
    tools: ["Python", "Pandas", "NumPy"],
    projects: 8
  },
  {
    id: 20,
    title: "Machine Learning Fundamentals",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500&h=300&fit=crop",
    duration: "14 WEEKS",
    rating: 4.9,
    reviews: 423,
    lessons: 42,
    students: "980+",
    level: "Expert",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "AI & Machine Learning",
    tools: ["Python", "TensorFlow", "Scikit-learn"],
    projects: 6
  },
  {
    id: 21,
    title: "Excel Mastery: From Basics to Advanced",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    duration: "10 WEEKS",
    rating: 4.8,
    reviews: 678,
    lessons: 30,
    students: "1520+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Data Science",
    tools: ["Excel", "VBA"],
    projects: 12
  },
  {
    id: 22,
    title: "Cybersecurity Fundamentals",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop",
    duration: "10 WEEKS",
    rating: 4.9,
    reviews: 512,
    lessons: 30,
    students: "1180+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Cybersecurity",
    tools: ["Kali Linux", "Security Tools"],
    projects: 5
  },
  {
    id: 23,
    title: "Adobe Photoshop for Beginners",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&h=300&fit=crop",
    duration: "8 WEEKS",
    rating: 4.9,
    reviews: 745,
    lessons: 24,
    students: "1680+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Graphic Design",
    tools: ["Photoshop"],
    projects: 15
  },
  {
    id: 24,
    title: "UI/UX Design Fundamentals",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    duration: "10 WEEKS",
    rating: 5.0,
    reviews: 623,
    lessons: 30,
    students: "1420+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Graphic Design",
    tools: ["Figma", "Adobe XD"],
    projects: 8
  },
  {
    id: 25,
    title: "Digital Marketing Fundamentals",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    duration: "8 WEEKS",
    rating: 4.8,
    reviews: 456,
    lessons: 24,
    students: "1050+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Digital Marketing",
    tools: ["Google Analytics", "SEO Tools"],
    projects: 6
  },
  {
    id: 26,
    title: "Build AI Chatbots & Virtual Assistants",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop",
    duration: "12 WEEKS",
    rating: 4.9,
    reviews: 389,
    lessons: 36,
    students: "890+",
    level: "Expert",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "AI & Machine Learning",
    tools: ["Python", "NLP", "Dialogflow"],
    projects: 4
  },
  {
    id: 27,
    title: "Full-Stack Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
    duration: "16 WEEKS",
    rating: 5.0,
    reviews: 812,
    lessons: 48,
    students: "1890+",
    level: "Expert",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "Web Development",
    tools: ["React", "Node.js", "MongoDB"],
    projects: 12
  },
  {
    id: 28,
    title: "Mobile App Development with Thunkable",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
    duration: "10 WEEKS",
    rating: 4.8,
    reviews: 534,
    lessons: 30,
    students: "1220+",
    level: "Advanced",
    gradeLevel: "9-12",
    ageRange: "Ages 14-18",
    category: "App Development",
    tools: ["Thunkable"],
    projects: 5
  }
];

// Tech category filters
const techCategories = [
  { name: "Programming", icon: Code, color: "bg-blue-500" },
  { name: "Web Development", icon: Laptop, color: "bg-blue-500" },
  { name: "Data Science", icon: Database, color: "bg-green-500" },
  { name: "AI & Machine Learning", icon: Brain, color: "bg-pink-500" },
  { name: "Cybersecurity", icon: Shield, color: "bg-red-500" },
  { name: "Graphic Design", icon: Palette, color: "bg-orange-500" },
  { name: "Digital Marketing", icon: TrendingUp, color: "bg-cyan-500" }
];

export default function TechSkillsAcademy() {
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickFilter, setQuickFilter] = useState<string>("");
  const coursesPerPage = 8;

  // Grade level options
  const gradeLevelOptions = ["All", "K-5", "6-8", "9-12"];

  // Filter courses
  const filteredCourses = techCoursesData.filter(course => {
    // Quick filter logic
    if (quickFilter === "elementary") {
      if (course.gradeLevel !== "K-5") return false;
    } else if (quickFilter === "middle") {
      if (course.gradeLevel !== "6-8") return false;
    } else if (quickFilter === "high") {
      if (course.gradeLevel !== "9-12") return false;
    } else if (quickFilter === "coding") {
      if (!["Programming", "Web Development"].includes(course.category)) return false;
    }

    const matchesGradeLevel = selectedGradeLevel === "All" || course.gradeLevel === selectedGradeLevel;
    const matchesCategory = selectedCategory === "All" || course.category.includes(selectedCategory);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesGradeLevel && matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const displayedCourses = filteredCourses.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'gradeLevel') setSelectedGradeLevel(value);
    if (filterType === 'category') setSelectedCategory(value);
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
    if (filter !== quickFilter) {
      setSelectedGradeLevel("All");
      setSelectedCategory("All");
    }
  };

  const clearQuickFilter = () => {
    setQuickFilter("");
    setCurrentPage(1);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-pink-50/40 to-cyan-50/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-blue-600 mb-3">
            <Sparkles size={20} strokeWidth={2} />
            <span className="text-sm font-bold uppercase tracking-wide">TECH SKILLS ACADEMY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1a1d3f' }}>
            Future-Ready Tech Skills for K-12 Students
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            From coding basics to AI and data science - build the skills that matter for tomorrow
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses: Python, AI, Web Design, Excel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-700 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button 
            onClick={() => handleQuickFilter("elementary")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              quickFilter === "elementary"
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            Elementary (K-5)
          </button>
          <button 
            onClick={() => handleQuickFilter("middle")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              quickFilter === "middle"
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            Middle School (6-8)
          </button>
          <button 
            onClick={() => handleQuickFilter("high")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              quickFilter === "high"
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            High School (9-12)
          </button>
          <button 
            onClick={() => handleQuickFilter("coding")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
              quickFilter === "coding"
                ? 'bg-blue-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            Coding & Programming
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

        {/* Grade Level Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Filter by Grade Level</h3>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-blue-600 font-semibold"
            >
              <Filter size={18} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-wrap gap-3`}>
            {gradeLevelOptions.map((grade) => (
              <button
                key={grade}
                onClick={() => handleFilterChange('gradeLevel', grade)}
                className={`px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                  selectedGradeLevel === grade
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {grade === "All" ? "All Grades" : grade}
                {grade === "K-5" && " (Ages 5-11)"}
                {grade === "6-8" && " (Ages 11-14)"}
                {grade === "9-12" && " (Ages 14-18)"}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Categories */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-10`}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Tech Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3">
            <button
              onClick={() => handleFilterChange('category', "All")}
              className={`p-4 rounded-xl transition-all duration-300 ${
                selectedCategory === "All"
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">💻</div>
                <div className="font-semibold text-sm">All Tech</div>
              </div>
            </button>
            
            {techCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleFilterChange('category', cat.name)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? `${cat.color} text-white shadow-lg`
                      : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <Icon size={28} className="mx-auto mb-2" strokeWidth={2} />
                    <div className="font-semibold text-xs leading-tight">{cat.name}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

                {/* Results Info */}
                <div className="mb-6 text-sm text-gray-600">
                  Showing {displayedCourses.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredCourses.length)} of {filteredCourses.length} courses
                </div>
        
                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {displayedCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="relative overflow-hidden h-48">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">{course.level}</div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                        <div className="flex items-center gap-1 mb-3">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-900">{course.rating}</span>
                          <span className="text-gray-500 text-sm">({course.reviews})</span>
                        </div>
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2"><Clock size={16} /> {course.duration}</div>
                          <div className="flex items-center gap-2"><BookOpen size={16} /> {course.lessons} lessons</div>
                          <div className="flex items-center gap-2"><Users size={16} /> {course.students} students</div>
                        </div>
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 font-semibold mb-2">Tools & Languages:</p>
                          <div className="flex flex-wrap gap-1">
                            {course.tools.map((tool, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{tool}</span>
                            ))}
                          </div>
                        </div>
                       
                      </div>
                    </div>
                  ))}
                </div>
        
                {/* Pagination */}
                <div className="flex items-center justify-center gap-3 mb-12">
                  <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50">Previous</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'}`}>{page}</button>
                  ))}
                  <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50">Next</button>
                </div>
              </div>
            </section>
          );
        }