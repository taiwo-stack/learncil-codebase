"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, getDocs, where, getDoc, doc } from 'firebase/firestore';
import { db } from '@/components/layout/firebase';
import AuthGuard from '@/components/layout/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BookOpen, Search, Filter, Users, Clock, DollarSign, Star, CheckCircle } from 'lucide-react';
import { Course, CourseAssignment } from '@/types';

export default function StudentCourses() {
  const params = useParams();
  const uid = params.uid as string;
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<CourseAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = [
    'Programming',
    'Data Science',
    'Design',
    'Business',
    'Marketing',
    'Language',
    'Mathematics',
    'Science',
    'Arts',
    'Other'
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingStep('Loading your assignments...');
        // Fetch student's assignments first
        const assignmentsQuery = query(collection(db, "courseAssignments"), where('studentId', '==', uid));
        const assignmentsSnapshot = await getDocs(assignmentsQuery);
        const assignmentsData: CourseAssignment[] = [];
        assignmentsSnapshot.forEach((doc) => {
          assignmentsData.push({
            id: doc.id,
            ...doc.data()
          } as CourseAssignment);
        });
        setAssignments(assignmentsData);

        // Get unique course IDs from active assignments
        const activeAssignments = assignmentsData.filter(a => a.status === 'active');
        const courseIds = [...new Set(activeAssignments.map(a => a.courseId))];

        setLoadingStep('Loading course details...');
        // Fetch only the courses that are actively assigned to this student
        if (courseIds.length > 0) {
          const coursesData: Course[] = [];

          // Use individual document gets for better performance with small sets
          const coursePromises = courseIds.map(courseId =>
            getDoc(doc(db, 'courses', courseId))
          );

          const courseDocs = await Promise.all(coursePromises);
          courseDocs.forEach(courseDoc => {
            if (courseDoc.exists()) {
              coursesData.push({
                id: courseDoc.id,
                ...courseDoc.data()
              } as Course);
            }
          });

          setCourses(coursesData);
        } else {
          setCourses([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading student courses:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [uid]);

  const isAssigned = (courseId: string) => {
    return assignments.some(assignment => assignment.courseId === courseId && assignment.status === 'active');
  };


  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesPrice = priceFilter === 'all' ||
                         (priceFilter === 'free' && course.price === 0) ||
                         (priceFilter === 'paid' && course.price > 0);

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-orange-100 text-orange-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AuthGuard role="student">
        <DashboardLayout role="student" uid={uid}>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg font-semibold text-gray-700">Loading Your Courses</div>
              <div className="text-sm text-gray-500 mt-2">{loadingStep}</div>
            </div>
          </div>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard role="student">
      <DashboardLayout role="student" uid={uid}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
              <p className="mt-2 text-gray-600">Courses assigned to you</p>
            </div>
            <div className="text-sm text-gray-600">
              {assignments.filter(a => a.status === 'active').length} assigned courses
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

          {/* Assigned Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments
              .filter(assignment => assignment.status === 'active')
              .map(assignment => {
                const course = courses.find(c => c.id === assignment.courseId);
                if (!course) return null;

                return (
                  <div key={assignment.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-200 relative">
                      {course.imageUrl ? (
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Assigned
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                          {course.level}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-gray-600">{course.category}</span>
                        <span className="font-semibold text-gray-900 flex items-center">
                          <DollarSign className="w-4 h-4" />
                          {course.price === 0 ? 'Free' : course.price}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {course.rating?.toFixed(1) || '0.0'}
                        </span>
                      </div>

                      <div className="text-xs text-gray-500">
                        Assigned on {assignment.assignedAt?.toDate()?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {assignments.filter(a => a.status === 'active').length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses assigned</h3>
              <p className="text-gray-600">You haven't been assigned any courses yet</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}