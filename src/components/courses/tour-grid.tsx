'use client';

import { useState } from 'react';
import { BookOpen, Clock, Users, GraduationCap, Star, ArrowRight, X, Check, Target, Award, Calendar, Video, FileText, Download, Heart, Share2, Calculator, Globe, Beaker } from 'lucide-react';

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
  instructorBio: string;
  instructorImage: string;
  price: string;
  classes: string[];
  description: string;
  objectives: string[];
  curriculum: { week: number; topic: string; details: string; }[];
  prerequisites: string[];
  materials: string[];
  parentInfo: {
    skills: string[];
    timeCommitment: string;
    support: string;
    outcomes: string[];
  };
}

// All courses data
const allCoursesData: Course[] = [
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
    instructorBio: "Certified Early Childhood Educator with 12 years of experience teaching young learners.",
    instructorImage: "/images/tutor1.jpg",
    price: "FREE",
    classes: ["K1", "K2"],
    description: "A fun and engaging introduction to numbers, counting, and basic math concepts designed for young learners. Through interactive games, songs, and hands-on activities, children will develop number sense and early mathematical thinking.",
    objectives: [
      "Count from 1 to 20 with confidence",
      "Recognize and write numbers 0-10",
      "Understand basic addition and subtraction concepts",
      "Identify shapes and patterns in everyday objects"
    ],
    curriculum: [
      { week: 1, topic: "Numbers 1-10", details: "Introduction to counting, number recognition, and writing numbers" },
      { week: 2, topic: "Numbers 11-20", details: "Extending counting skills and understanding teen numbers" },
      { week: 3, topic: "Basic Addition", details: "Simple addition using objects and visual aids" }
    ],
    prerequisites: ["None - perfect for beginners!"],
    materials: ["Counting objects (toys, blocks)", "Pencils and paper", "Number flashcards"],
    parentInfo: {
      skills: ["Number recognition", "Counting ability", "Basic addition", "Pattern recognition"],
      timeCommitment: "15-20 minutes daily practice recommended",
      support: "Weekly progress reports and parent guidance materials provided",
      outcomes: [
        "Strong foundation in number concepts",
        "Increased confidence in math abilities",
        "Preparation for K2 curriculum",
        "Enhanced problem-solving skills"
      ]
    }
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
    instructorBio: "Reading Specialist and Literacy Coach with expertise in phonics-based instruction.",
    instructorImage: "/images/tutor2.jpg",
    price: "FREE",
    classes: ["K1", "K2", "K3"],
    description: "Build a strong literacy foundation with this comprehensive alphabet and phonics course. Children will learn letter recognition, sounds, and early reading skills through songs, stories, and interactive activities.",
    objectives: [
      "Recognize all uppercase and lowercase letters",
      "Associate letters with their sounds",
      "Blend simple CVC words",
      "Develop early reading skills"
    ],
    curriculum: [
      { week: 1, topic: "Letters A-G", details: "Letter recognition, sounds, and simple words" },
      { week: 2, topic: "Letters H-N", details: "Continuing letter sounds and beginning blending" },
      { week: 3, topic: "Letters O-T", details: "Advanced phonics and word families" },
      { week: 4, topic: "Letters U-Z", details: "Complete alphabet mastery and simple sentences" }
    ],
    prerequisites: ["None - suitable for early learners"],
    materials: ["Alphabet chart", "Picture books", "Letter magnets or cards"],
    parentInfo: {
      skills: ["Letter recognition", "Phonemic awareness", "Early reading", "Vocabulary building"],
      timeCommitment: "20-30 minutes daily reading practice",
      support: "Reading tips for parents and recommended book lists included",
      outcomes: [
        "Ability to read simple words",
        "Strong phonics foundation",
        "Increased vocabulary",
        "Love for reading and learning"
      ]
    }
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
    instructorBio: "Art Education Specialist focusing on early childhood creative development.",
    instructorImage: "/images/tutor3.jpg",
    price: "FREE",
    classes: ["K1", "K2", "K3"],
    description: "Explore the wonderful world of colors, shapes, and artistic expression! This hands-on course develops fine motor skills, creativity, and visual perception through age-appropriate art projects.",
    objectives: [
      "Identify and name primary and secondary colors",
      "Recognize basic shapes (circle, square, triangle, rectangle)",
      "Create simple art projects",
      "Develop fine motor skills through crafts"
    ],
    curriculum: [
      { week: 1, topic: "Colors Everywhere", details: "Learning primary colors, color mixing, and creative painting" },
      { week: 2, topic: "Shape Discovery", details: "Identifying shapes in art and environment, shape crafts" }
    ],
    prerequisites: ["None - all materials easily available at home"],
    materials: ["Crayons, markers, paint", "Construction paper", "Scissors and glue", "Everyday craft supplies"],
    parentInfo: {
      skills: ["Color recognition", "Shape identification", "Fine motor development", "Creative expression"],
      timeCommitment: "2-3 art sessions per week (30 minutes each)",
      support: "Video tutorials and step-by-step project guides for parents",
      outcomes: [
        "Enhanced creativity and imagination",
        "Improved hand-eye coordination",
        "Confidence in artistic abilities",
        "Understanding of colors and shapes"
      ]
    }
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
    instructorBio: "Children's Literature Expert with a passion for developing young readers.",
    instructorImage: "/images/tutor4.jpg",
    price: "FREE",
    classes: ["K2", "K3"],
    description: "Dive into the magical world of stories and develop comprehension skills! Through engaging tales and interactive discussions, children learn to understand, predict, and retell stories.",
    objectives: [
      "Listen to and understand age-appropriate stories",
      "Answer questions about story details",
      "Predict what might happen next",
      "Retell stories in their own words"
    ],
    curriculum: [
      { week: 1, topic: "Story Elements", details: "Characters, settings, and basic plot understanding" },
      { week: 2, topic: "Making Predictions", details: "Using clues to guess what happens next" },
      { week: 3, topic: "Retelling Stories", details: "Sequencing events and sharing stories" }
    ],
    prerequisites: ["Basic letter knowledge helpful but not required"],
    materials: ["Picture books", "Story props or toys", "Drawing materials"],
    parentInfo: {
      skills: ["Listening comprehension", "Prediction skills", "Story sequencing", "Verbal expression"],
      timeCommitment: "Daily bedtime story reading (15-20 minutes)",
      support: "Recommended reading lists and discussion questions provided",
      outcomes: [
        "Strong listening skills",
        "Better story comprehension",
        "Expanded imagination",
        "Improved communication abilities"
      ]
    }
  },
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
    instructorBio: "Mathematics Teacher with 15 years of experience making math fun and accessible.",
    instructorImage: "/images/tutor5.jpg",
    price: "FREE",
    classes: ["K4", "K5", "K6"],
    description: "Master essential arithmetic skills with this comprehensive course. Students will develop fluency in addition, subtraction, and multiplication through engaging methods and practical applications.",
    objectives: [
      "Solve multi-digit addition and subtraction problems",
      "Memorize times tables up to 12",
      "Apply math skills to real-world problems",
      "Develop mental math strategies"
    ],
    curriculum: [
      { week: 1, topic: "Advanced Addition", details: "Multi-digit addition with regrouping" },
      { week: 2, topic: "Subtraction Mastery", details: "Multi-digit subtraction and borrowing" },
      { week: 3, topic: "Introduction to Multiplication", details: "Understanding multiplication as repeated addition" },
      { week: 4, topic: "Times Tables Practice", details: "Memorization strategies and quick recall" }
    ],
    prerequisites: ["Basic counting and single-digit addition/subtraction"],
    materials: ["Math workbook", "Multiplication chart", "Calculator for checking work"],
    parentInfo: {
      skills: ["Arithmetic fluency", "Problem-solving", "Mental math", "Times tables mastery"],
      timeCommitment: "30 minutes daily practice with weekly review",
      support: "Practice worksheets and online math games included",
      outcomes: [
        "Confidence in math abilities",
        "Quick mental calculation skills",
        "Strong foundation for algebra",
        "Improved logical thinking"
      ]
    }
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
    instructorBio: "Language Arts Specialist passionate about developing strong writers.",
    instructorImage: "/images/tutor6.jpg",
    price: "FREE",
    classes: ["K4", "K5", "K6"],
    description: "Transform from reading simple words to crafting complete sentences! This course builds reading fluency and writing skills through structured lessons and creative exercises.",
    objectives: [
      "Read grade-level texts fluently",
      "Write complete sentences with proper punctuation",
      "Understand grammar basics (nouns, verbs, adjectives)",
      "Express ideas clearly in writing"
    ],
    curriculum: [
      { week: 1, topic: "Sentence Structure", details: "Subject and predicate, capitalization, and periods" },
      { week: 2, topic: "Parts of Speech", details: "Nouns, verbs, and adjectives" },
      { week: 3, topic: "Descriptive Writing", details: "Using adjectives to make writing interesting" },
      { week: 4, topic: "Punctuation Power", details: "Commas, question marks, and exclamation points" },
      { week: 5, topic: "Story Writing", details: "Creating short stories with beginning, middle, and end" }
    ],
    prerequisites: ["Basic reading ability and letter writing skills"],
    materials: ["Lined writing paper", "Pencils and erasers", "Reading books at appropriate level"],
    parentInfo: {
      skills: ["Reading fluency", "Sentence construction", "Grammar basics", "Creative writing"],
      timeCommitment: "30-40 minutes daily (20 min reading, 20 min writing)",
      support: "Writing prompts and grammar games for home practice",
      outcomes: [
        "Fluent reading at grade level",
        "Ability to write clear sentences",
        "Understanding of grammar rules",
        "Enhanced communication skills"
      ]
    }
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
    instructorBio: "Science Educator bringing wonder and curiosity to young scientists.",
    instructorImage: "/images/tutor7.jpg",
    price: "FREE",
    classes: ["K4", "K5", "K6"],
    description: "Discover the wonders of the natural world! Through hands-on experiments and observations, students explore plants, animals, weather, and basic scientific concepts.",
    objectives: [
      "Understand the scientific method",
      "Learn about plant and animal life cycles",
      "Observe and record weather patterns",
      "Conduct simple, safe experiments"
    ],
    curriculum: [
      { week: 1, topic: "Plants and Growth", details: "Parts of plants, photosynthesis basics, growing experiments" },
      { week: 2, topic: "Animals and Habitats", details: "Classification, habitats, and animal adaptations" },
      { week: 3, topic: "Weather and Seasons", details: "Understanding weather patterns and seasonal changes" }
    ],
    prerequisites: ["Curiosity and willingness to explore!"],
    materials: ["Science journal", "Magnifying glass", "Seeds for planting", "Basic craft supplies"],
    parentInfo: {
      skills: ["Scientific observation", "Hypothesis formation", "Data recording", "Critical thinking"],
      timeCommitment: "1-2 experiments per week plus daily observations",
      support: "Safety guidelines and experiment instructions for parents",
      outcomes: [
        "Understanding of basic science concepts",
        "Development of scientific thinking",
        "Appreciation for nature",
        "Enhanced curiosity and questioning"
      ]
    }
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
    instructorBio: "Geography Teacher making the world accessible to young explorers.",
    instructorImage: "/images/tutor8.jpg",
    price: "FREE",
    classes: ["K5", "K6"],
    description: "Explore the world from your classroom! Learn about continents, countries, maps, and cultures while developing important spatial reasoning and map-reading skills.",
    objectives: [
      "Identify continents and major oceans",
      "Read and create simple maps",
      "Understand compass directions",
      "Learn about different cultures and countries"
    ],
    curriculum: [
      { week: 1, topic: "Our Planet Earth", details: "Continents, oceans, and Earth's features" },
      { week: 2, topic: "Map Skills", details: "Reading maps, keys, and symbols" },
      { week: 3, topic: "Directions and Landmarks", details: "North, South, East, West, and local geography" },
      { week: 4, topic: "World Cultures", details: "Exploring different countries and traditions" }
    ],
    prerequisites: ["None - suitable for curious learners"],
    materials: ["World map or globe", "Colored pencils", "Paper for map drawing"],
    parentInfo: {
      skills: ["Map reading", "Spatial awareness", "Cultural awareness", "Direction understanding"],
      timeCommitment: "3-4 lessons per week (30 minutes each)",
      support: "Interactive map activities and virtual field trips included",
      outcomes: [
        "Global awareness and perspective",
        "Ability to read and use maps",
        "Understanding of geography concepts",
        "Appreciation for cultural diversity"
      ]
    }
  }
];

export default function TourGrid() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(allCoursesData);

  const classOptions = ["All", ...Array.from({ length: 12 }, (_, i) => `K${i + 1}`)];

  const handleClassFilter = (classLevel: string) => {
    setSelectedClass(classLevel);
    if (classLevel === "All") {
      setFilteredCourses(allCoursesData);
    } else {
      const filtered = allCoursesData.filter(course => 
        course.classes.includes(classLevel)
      );
      setFilteredCourses(filtered);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Courses</h1>
          <p className="text-xl text-blue-100">Explore our complete collection of K-12 courses</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-wrap gap-2">
            {classOptions.map((classLevel) => (
              <button
                key={classLevel}
                onClick={() => handleClassFilter(classLevel)}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
                  selectedClass === classLevel
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {classLevel}
              </button>
            ))}
          </div>
          <p className="text-gray-600 mt-4">
            Showing <span className="font-bold text-gray-900">{filteredCourses.length}</span> courses
            {selectedClass !== "All" && ` for ${selectedClass}`}
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
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

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Heart size={18} className="text-red-500" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 size={18} className="text-blue-600" />
                  </button>
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
                <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem] leading-snug">
                  {course.title}
                </h3>

                {/* Description Preview */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} strokeWidth={2} />
                    <span>Lesson {course.lessons}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} strokeWidth={2} />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap size={14} strokeWidth={2} />
                    <span>{course.level}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
                  </div>
                  <span className="text-red-500 font-bold text-base">{course.price}</span>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  Read More
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try selecting a different class level</p>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img 
                src={selectedCourse.image} 
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <X size={24} className="text-gray-900" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Clock size={12} />
                    {selectedCourse.duration}
                  </span>
                  {selectedCourse.classes.map((cls) => (
                    <span key={cls} className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                      {cls}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-bold mb-2">{selectedCourse.title}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}
                        strokeWidth={0}
                      />
                    ))}
                    <span className="ml-1">({selectedCourse.reviews})</span>
                  </div>
                  <span>•</span>
                  <span>{selectedCourse.students} Students</span>
                  <span>•</span>
                  <span>{selectedCourse.lessons} Lessons</span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[600px] overflow-y-auto">
              {/* Instructor Info */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {selectedCourse.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Instructor</p>
                  <p className="font-bold text-lg text-gray-900">{selectedCourse.instructor}</p>
                  <p className="text-sm text-gray-600">{selectedCourse.instructorBio}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={24} />
                  Course Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
              </div>

              {/* Learning Objectives */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="text-blue-600" size={24} />
                  What You'll Learn
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedCourse.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} />
                  Course Curriculum
                </h3>
                <div className="space-y-3">
                  {selectedCourse.curriculum.map((week, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full text-sm">
                          Week {week.week}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{week.topic}</h4>
                          <p className="text-sm text-gray-600">{week.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent Information Section */}
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="text-purple-600" size={24} />
                  Important Information for Parents
                </h3>

                {/* Skills Your Child Will Develop */}
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">Skills Your Child Will Develop:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedCourse.parentInfo.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-2">
                        <Check className="text-purple-600 flex-shrink-0" size={18} />
                        <span className="text-gray-700 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Commitment */}
                <div className="mb-4 bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="text-purple-600" size={20} />
                    Time Commitment:
                  </h4>
                  <p className="text-gray-700">{selectedCourse.parentInfo.timeCommitment}</p>
                </div>

                {/* Parent Support */}
                <div className="mb-4 bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Users className="text-purple-600" size={20} />
                    Parent Support:
                  </h4>
                  <p className="text-gray-700">{selectedCourse.parentInfo.support}</p>
                </div>

                {/* Expected Outcomes */}
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="text-purple-600" size={20} />
                    Expected Outcomes:
                  </h4>
                  <div className="space-y-2">
                    {selectedCourse.parentInfo.outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                          <Check className="text-purple-600" size={14} />
                        </div>
                        <span className="text-gray-700 text-sm">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="text-blue-600" size={24} />
                  Prerequisites
                </h3>
                <div className="space-y-2">
                  {selectedCourse.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <Check className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{prereq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Materials */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Download className="text-blue-600" size={24} />
                  Required Materials
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedCourse.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-lg">
                  Enroll Now
                  <ArrowRight size={20} />
                </button>
                <button className="px-6 py-4 border-2 border-gray-300 rounded-lg font-bold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2">
                  <Heart size={20} />
                  Save
                </button>
                <button className="px-6 py-4 border-2 border-gray-300 rounded-lg font-bold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2">
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        /* Custom scrollbar for modal */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}