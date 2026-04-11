'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BookOpen, Clock, Users, Star, ArrowRight, Code, Laptop, Database, Brain, Shield, Palette, TrendingUp, Search, Filter, Cpu, Sparkles, X, FileText } from 'lucide-react';

// Course data type — matches DB schema
interface TechCourse {
  id: string;
  title: string;
  image_url: string;
  duration: string;
  lessons: number;
  students: string;
  level: string;
  tech_data: {
    gradeLevel: string;
    ageRange: string;
    category: string;
    tools: string[];
    projects: number;
    pdf_url?: string;
  };
}

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
  const [techCoursesData, setTechCoursesData] = useState<TechCourse[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickFilter, setQuickFilter] = useState<string>("");
  const [pdfViewerUrl, setPdfViewerUrl] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const coursesPerPage = 8;

  // Fetch from /api/courses (uses static fallback if Supabase PostgREST is unavailable)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses?type=tech');
        const json = await res.json();
        if (res.ok && json.data) {
          setTechCoursesData(json.data);
        }
      } catch (e) {
        console.error('special-courses fetch error:', e);
      }
      setDbLoading(false);
    };
    fetchCourses();
  }, []);

  // Grade level options
  const gradeLevelOptions = ["All", "K-5", "6-8", "9-12"];

  // Filter courses
  const filteredCourses = techCoursesData.filter(course => {
    const gradeLevel = course.tech_data?.gradeLevel || '';
    const category = course.tech_data?.category || '';
    const tools = course.tech_data?.tools || [];

    if (quickFilter === "elementary") {
      if (gradeLevel !== "K-5") return false;
    } else if (quickFilter === "middle") {
      if (gradeLevel !== "6-8") return false;
    } else if (quickFilter === "high") {
      if (gradeLevel !== "9-12") return false;
    } else if (quickFilter === "coding") {
      if (!["Programming", "Web Development"].includes(category)) return false;
    }

    const matchesGradeLevel = selectedGradeLevel === "All" || gradeLevel === selectedGradeLevel;
    const matchesCategory = selectedCategory === "All" || category.includes(selectedCategory);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesGradeLevel && matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const displayedCourses = filteredCourses.slice(startIndex, endIndex);

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'gradeLevel') setSelectedGradeLevel(value);
    if (filterType === 'category') setSelectedCategory(value);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const goToPreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const goToNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  const handleQuickFilter = (filter: string) => {
    setQuickFilter(filter);
    setCurrentPage(1);
    if (filter !== quickFilter) {
      setSelectedGradeLevel("All");
      setSelectedCategory("All");
    }
  };
  const clearQuickFilter = () => { setQuickFilter(""); setCurrentPage(1); };

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

        {/* Loading state */}
        {dbLoading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium animate-pulse">Loading courses...</p>
          </div>
        ) : (
          <>
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
              {[
                { key: "elementary", label: "Elementary (K-5)" },
                { key: "middle", label: "Middle School (6-8)" },
                { key: "high", label: "High School (9-12)" },
                { key: "coding", label: "Coding & Programming" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleQuickFilter(key)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${quickFilter === key
                      ? 'bg-blue-600 text-white scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                    }`}
                >
                  {label}
                </button>
              ))}
              {quickFilter && (
                <button onClick={clearQuickFilter} className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 bg-red-500 text-white hover:bg-red-600 shadow-md">
                  Clear Filter
                </button>
              )}
            </div>

            {/* Grade Level Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Filter by Grade Level</h3>
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 text-blue-600 font-semibold">
                  <Filter size={18} />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-wrap gap-3`}>
                {gradeLevelOptions.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => handleFilterChange('gradeLevel', grade)}
                    className={`px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${selectedGradeLevel === grade
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
                <button onClick={() => handleFilterChange('category', "All")} className={`p-4 rounded-xl transition-all duration-300 ${selectedCategory === "All" ? 'bg-blue-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50 border-2 border-gray-200'}`}>
                  <div className="text-center"><div className="text-2xl mb-2">💻</div><div className="font-semibold text-sm">All Tech</div></div>
                </button>
                {techCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.name} onClick={() => handleFilterChange('category', cat.name)} className={`p-4 rounded-xl transition-all duration-300 ${selectedCategory === cat.name ? `${cat.color} text-white shadow-lg` : 'bg-white hover:bg-gray-50 border-2 border-gray-200'}`}>
                      <div className="text-center"><Icon size={28} className="mx-auto mb-2" strokeWidth={2} /><div className="font-semibold text-xs leading-tight">{cat.name}</div></div>
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
                    <Image 
                      src={course.image_url} 
                      alt={course.title} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-w-7xl) 25vw, (max-w-lg) 50vw, 100vw"
                      priority={displayedCourses.indexOf(course) < 4}
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">{course.level}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                    {/* Replaced stats with See Curriculum button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (course.tech_data?.pdf_url) {
                          setIsPdfLoading(true);
                          setPdfViewerUrl(course.tech_data.pdf_url);
                        } else {
                          alert('No curriculum PDF uploaded for this course yet.');
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl font-bold text-sm transition-colors duration-300 border border-blue-100 shadow-sm"
                    >
                      <FileText size={16} />
                      See Curriculum
                    </button>
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-semibold mb-2">Tools & Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {(course.tech_data?.tools || []).map((tool, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mb-12">
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50">Previous</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'}`}>{page}</button>
                ))}
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50">Next</button>
              </div>
            )}

            {/* No Results */}
            {displayedCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4"><Cpu size={64} className="mx-auto" strokeWidth={1.5} /></div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                <button onClick={() => { setSelectedGradeLevel("All"); setSelectedCategory("All"); setSearchQuery(""); setCurrentPage(1); setQuickFilter(""); }} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* PDF VIEWER MODAL */}
      {pdfViewerUrl && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/90 backdrop-blur-md animate-fade-in p-2 md:p-8">
          <div className="flex justify-between items-center mb-4 max-w-6xl mx-auto w-full px-2">
            <h2 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
              <FileText size={24} className="text-blue-400" /> 
              <span className="hidden xs:inline">Academy Curriculum</span>
              <span className="xs:hidden">Curriculum</span>
            </h2>
            <button 
              onClick={() => { setPdfViewerUrl(null); setIsPdfLoading(false); }}
              className="bg-white/10 hover:bg-red-500 text-white p-2 rounded-xl transition-all inline-flex items-center gap-2 font-bold px-3 md:px-5 border border-white/20 hover:border-red-500"
            >
              <X size={20} /> 
              <span className="hidden sm:inline text-sm">Close Window</span>
              <span className="sm:hidden text-sm">Close</span>
            </button>
          </div>
          
          <div className="flex-1 bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative w-full max-w-6xl mx-auto border border-white/10">
            {isPdfLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 gap-4">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-bold animate-pulse tracking-wide uppercase text-xs">Opening Document...</p>
              </div>
            )}
            <iframe 
              src={`${pdfViewerUrl}#toolbar=0`} 
              className="w-full h-full absolute inset-0 border-none"
              title="Course PDF Viewer"
              onLoad={() => setIsPdfLoading(false)}
            >
              This browser does not support PDFs. Please download the PDF to view it.
            </iframe>
          </div>
        </div>
      )}
    </section>
  );
}