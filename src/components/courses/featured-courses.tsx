'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BookOpen, Clock, Users, GraduationCap, Star, ArrowRight, Calculator, Globe, Beaker, Palette, Music, Code, Award, Search, Filter, X, FileText } from 'lucide-react';

// Course data type — matches DB schema
interface Course {
  id: string;
  title: string;
  image_url: string;
  duration: string;
  lessons: number;
  students: string;
  level: string;
  curriculum_data: {
    keyStage: string;
    yearGroups: string[];
    subject: string;
    examBoard?: string;
    pdf_url?: string;
  };
}

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
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [selectedKeyStage, setSelectedKeyStage] = useState<string>("All");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
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
        const res = await fetch('/api/courses?type=curriculum');
        const json = await res.json();
        if (res.ok && json.data) {
          setCoursesData(json.data);
        }
      } catch (e) {
        console.error('featured-courses fetch error:', e);
      }
      setDbLoading(false);
    };
    fetchCourses();
  }, []);

  // Key Stage options
  const keyStageOptions = ["All", "EYFS", "KS1", "KS2", "KS3", "KS4"];

  // Filter courses
  const filteredCourses = coursesData.filter(course => {
    const ks = course.curriculum_data?.keyStage || '';
    const subject = course.curriculum_data?.subject || '';

    if (quickFilter === "primary") {
      if (!["EYFS", "KS1", "KS2"].includes(ks)) return false;
    } else if (quickFilter === "secondary") {
      if (!["KS3", "KS4"].includes(ks)) return false;
    } else if (quickFilter === "gcse") {
      if (ks !== "KS4") return false;
    } else if (quickFilter === "sats") {
      if (!subject.includes("SATs")) return false;
    }

    const matchesKeyStage = selectedKeyStage === "All" || ks === selectedKeyStage;
    const matchesSubject = selectedSubject === "All" || subject.includes(selectedSubject);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesKeyStage && matchesSubject && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const displayedCourses = filteredCourses.slice(startIndex, endIndex);

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'keyStage') setSelectedKeyStage(value);
    if (filterType === 'subject') setSelectedSubject(value);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const goToPreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const goToNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  const handleQuickFilter = (filter: string) => {
    setQuickFilter(filter);
    setCurrentPage(1);
    if (filter !== quickFilter) {
      setSelectedKeyStage("All");
      setSelectedSubject("All");
    }
  };
  const clearQuickFilter = () => { setQuickFilter(""); setCurrentPage(1); };

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
                  placeholder="Search by subject, year group, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-700 bg-white shadow-sm"
                />
              </div>
            </div>

            {/* Quick Access Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { key: "primary", label: "Primary Courses" },
                { key: "secondary", label: "Secondary Courses" },
                { key: "gcse", label: "GCSE Preparation" },
                { key: "sats", label: "SATs Revision" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleQuickFilter(key)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
                    quickFilter === key
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

            {/* Key Stage Filter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Filter by Key Stage</h3>
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 text-blue-600 font-semibold">
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
                    {ks === "EYFS" && " (Reception)"}{ks === "KS1" && " (Years 1-2)"}
                    {ks === "KS2" && " (Years 3-6)"}{ks === "KS3" && " (Years 7-9)"}
                    {ks === "KS4" && " (Years 10-11)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Categories */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-10`}>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Subject</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                <button onClick={() => handleFilterChange('subject', "All")} className={`p-4 rounded-xl transition-all duration-300 ${selectedSubject === "All" ? 'bg-blue-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50 border-2 border-gray-200'}`}>
                  <div className="text-center"><div className="text-2xl mb-2">📚</div><div className="font-semibold text-sm">All Subjects</div></div>
                </button>
                {subjectCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.name} onClick={() => handleFilterChange('subject', cat.name)} className={`p-4 rounded-xl transition-all duration-300 ${selectedSubject === cat.name ? `${cat.color} text-white shadow-lg` : 'bg-white hover:bg-gray-50 border-2 border-gray-200'}`}>
                      <div className="text-center"><Icon size={28} className="mx-auto mb-2" strokeWidth={2} /><div className="font-semibold text-sm">{cat.name}</div></div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Showing <span className="font-bold text-blue-600">{Math.min(startIndex + 1, filteredCourses.length)}-{Math.min(endIndex, filteredCourses.length)}</span> of <span className="font-bold">{filteredCourses.length}</span> courses
                {totalPages > 1 && <span className="ml-2">(Page {currentPage} of {totalPages})</span>}
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {displayedCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
                  {/* Course Image */}
                  <div className="relative overflow-hidden h-48">
                    <Image 
                      src={course.image_url} 
                      alt={course.title} 
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-w-7xl) 25vw, (max-w-lg) 50vw, 100vw"
                      priority={displayedCourses.indexOf(course) < 4}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                      {course.curriculum_data?.keyStage}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold">
                      {course.level}
                    </div>
                    {course.curriculum_data?.examBoard && (
                      <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {course.curriculum_data.examBoard}
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-5">
                    <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {course.curriculum_data?.subject}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem] leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(course.curriculum_data?.yearGroups || []).map((year, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{year}</span>
                      ))}
                    </div>
                    {/* Replaced stats with See Curriculum button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (course.curriculum_data?.pdf_url) {
                          setIsPdfLoading(true);
                          setPdfViewerUrl(course.curriculum_data.pdf_url);
                        } else {
                          alert('No curriculum PDF uploaded for this course yet.');
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl font-bold text-sm transition-colors duration-300 border border-blue-100 shadow-sm"
                    >
                      <FileText size={16} />
                      See Curriculum
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mb-12">
                <button onClick={goToPreviousPage} disabled={currentPage === 1} className={`p-2 rounded-lg transition-all duration-300 ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'}`}>
                  <ArrowRight size={20} className="rotate-180" strokeWidth={2.5} />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const showPage = page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
                    const showEllipsis = (page === currentPage - 2 && currentPage > 3) || (page === currentPage + 2 && currentPage < totalPages - 2);
                    if (showEllipsis) return <span key={page} className="px-2 text-gray-400">...</span>;
                    if (!showPage) return null;
                    return (
                      <button key={page} onClick={() => handlePageChange(page)} className={`w-10 h-10 rounded-lg font-bold text-sm transition-all duration-300 ${currentPage === page ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'}`}>
                        {page}
                      </button>
                    );
                  })}
                </div>
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`p-2 rounded-lg transition-all duration-300 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300'}`}>
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            )}

            {/* No Results */}
            {displayedCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4"><BookOpen size={64} className="mx-auto" strokeWidth={1.5} /></div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                <button onClick={() => { setSelectedKeyStage("All"); setSelectedSubject("All"); setSearchQuery(""); setCurrentPage(1); setQuickFilter(""); }} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><Award size={32} className="text-blue-600" /></div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">National Curriculum Aligned</h4>
                <p className="text-gray-600 text-sm">All courses follow the National Curriculum standards</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><GraduationCap size={32} className="text-green-600" /></div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">Qualified Teachers</h4>
                <p className="text-gray-600 text-sm">Learn from experienced qualified educators</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"><BookOpen size={32} className="text-purple-600" /></div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">Exam Board Approved</h4>
                <p className="text-gray-600 text-sm">GCSE courses aligned with AQA, Edexcel, OCR exam boards</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* PDF VIEWER MODAL */}
      {pdfViewerUrl && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-slate-900/90 backdrop-blur-md animate-fade-in p-2 md:p-8">
          <div className="flex justify-between items-center mb-4 max-w-6xl mx-auto w-full px-2">
            <h2 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
              <FileText size={24} className="text-blue-400" /> 
              <span className="hidden xs:inline">Course Curriculum</span>
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