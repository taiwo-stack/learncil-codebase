"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, onSnapshot, doc, updateDoc, addDoc, where, getDocs } from 'firebase/firestore';
import { db } from '@/components/layout/firebase';
import AuthGuard from '@/components/layout/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BookOpen, Users, Clock, DollarSign, Star, Eye, UserPlus, CheckCircle } from 'lucide-react';
import { Course, CourseAssignment } from '@/types';

interface Student {
  id: string;
  name?: string;
  email: string;
}

export default function InstructorCourseManagement() {
  const params = useParams();
  const uid = params.uid as string;
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<CourseAssignment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showViewAssignmentsModal, setShowViewAssignmentsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

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
        setLoadingStep('Loading courses...');
        // Fetch courses with limit for performance
        const coursesQuery = query(collection(db, "courses"));
        const coursesSnapshot = await getDocs(coursesQuery);
        const coursesData: Course[] = [];
        coursesSnapshot.forEach((doc) => {
          coursesData.push({
            id: doc.id,
            ...doc.data()
          } as Course);
        });
        setCourses(coursesData);

        setLoadingStep('Loading assignments...');
        // Fetch assignments by this instructor
        const assignmentsQuery = query(collection(db, "courseAssignments"), where('instructorId', '==', uid));
        const assignmentsSnapshot = await getDocs(assignmentsQuery);
        const assignmentsData: CourseAssignment[] = [];
        assignmentsSnapshot.forEach((doc) => {
          assignmentsData.push({
            id: doc.id,
            ...doc.data()
          } as CourseAssignment);
        });
        setAssignments(assignmentsData);

        setLoadingStep('Loading assigned students...');
        // Fetch only students assigned to this instructor
        const usersRef = collection(db, 'users');
        const studentsQuery = query(
          usersRef,
          where('role', '==', 'student'),
          where('assignedInstructor', '==', uid)
        );
        const studentsSnapshot = await getDocs(studentsQuery);

        const studentsData: Student[] = [];
        studentsSnapshot.forEach((doc) => {
          const data = doc.data();
          studentsData.push({
            id: doc.id,
            email: data.email,
            name: data.name || data.email,
          });
        });

        setStudents(studentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [uid]);

  const handleAssignCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || selectedStudents.length === 0) return;

    try {
      const assignmentPromises = selectedStudents.map(studentId =>
        addDoc(collection(db, 'courseAssignments'), {
          courseId: selectedCourse.id,
          studentId,
          instructorId: uid,
          assignedAt: new Date(),
          status: 'active',
        })
      );

      await Promise.all(assignmentPromises);

      setShowAssignModal(false);
      setSelectedCourse(null);
      setSelectedStudents([]);
    } catch (error) {
      console.error('Error assigning course:', error);
      alert('Error assigning course. Please try again.');
    }
  };

  const openAssignModal = (course: Course) => {
    setSelectedCourse(course);
    setShowAssignModal(true);
  };

  const openViewAssignmentsModal = (course: Course) => {
    setSelectedCourse(course);
    setShowViewAssignmentsModal(true);
  };

  const handleUnassignStudent = async (assignmentId: string) => {
    try {
      await updateDoc(doc(db, 'courseAssignments', assignmentId), {
        status: 'inactive',
        updatedAt: new Date(),
      });
      // Refresh assignments data
      const assignmentsQuery = query(collection(db, "courseAssignments"), where('instructorId', '==', uid));
      const assignmentsSnapshot = await getDocs(assignmentsQuery);
      const assignmentsData: CourseAssignment[] = [];
      assignmentsSnapshot.forEach((doc) => {
        assignmentsData.push({
          id: doc.id,
          ...doc.data()
        } as CourseAssignment);
      });
      setAssignments(assignmentsData);
    } catch (error) {
      console.error('Error unassigning student:', error);
      alert('Error unassigning student. Please try again.');
    }
  };

  // Memoize expensive calculations
  const assignedStudentsCount = useMemo(() => {
    const countMap: { [courseId: string]: number } = {};
    assignments.forEach(assignment => {
      if (assignment.status === 'active') {
        countMap[assignment.courseId] = (countMap[assignment.courseId] || 0) + 1;
      }
    });
    return countMap;
  }, [assignments]);

  const stats = useMemo(() => {
    const activeAssignments = assignments.filter(a => a.status === 'active');
    return {
      totalCourses: courses.length,
      totalAssignments: assignments.length,
      activeAssignments: activeAssignments.length,
      uniqueStudents: new Set(activeAssignments.map(a => a.studentId)).size
    };
  }, [courses.length, assignments]);

  const getAssignedStudentsCount = (courseId: string) => {
    return assignedStudentsCount[courseId] || 0;
  };

  const updateCourseStatus = async (courseId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'courses', courseId), {
        status: newStatus,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
      <AuthGuard role="instructor">
        <DashboardLayout role="instructor" uid={uid}>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg font-semibold text-gray-700">Loading Course Data</div>
              <div className="text-sm text-gray-500 mt-2">{loadingStep}</div>
            </div>
          </div>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard role="instructor">
      <DashboardLayout role="instructor" uid={uid}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Assignments</h1>
              <p className="mt-2 text-gray-600">Assign courses to students</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAssignments}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Students Assigned</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.uniqueStudents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Assignments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeAssignments}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
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
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status}
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
                      <UserPlus className="w-4 h-4 mr-1" />
                      {getAssignedStudentsCount(course.id)} assigned
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {course.rating?.toFixed(1) || '0.0'}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openAssignModal(course)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Assign
                    </button>
                    <button
                      onClick={() => openViewAssignmentsModal(course)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View ({getAssignedStudentsCount(course.id)})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
              <p className="text-gray-600">Courses will be created by administrators</p>
            </div>
          )}

          {/* Assign Course Modal */}
          {showAssignModal && selectedCourse && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Assign Course: {selectedCourse.title}</h3>
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <BookOpen className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAssignCourse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Students</label>
                    <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md">
                      {students.map((student) => {
                        const isAlreadyAssigned = assignments.some(a =>
                          a.courseId === selectedCourse.id && a.studentId === student.id && a.status === 'active'
                        );
                        return (
                          <div key={student.id} className="flex items-center p-3 border-b border-gray-200 last:border-b-0">
                            <input
                              type="checkbox"
                              id={student.id}
                              checked={selectedStudents.includes(student.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedStudents([...selectedStudents, student.id]);
                                } else {
                                  setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                                }
                              }}
                              disabled={isAlreadyAssigned}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={student.id} className="ml-3 text-sm">
                              <div className="font-medium text-gray-900">{student.name || student.email}</div>
                              {isAlreadyAssigned && (
                                <div className="text-xs text-green-600">Already assigned</div>
                              )}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAssignModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={selectedStudents.length === 0}
                      className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Assign to {selectedStudents.length} Student{selectedStudents.length !== 1 ? 's' : ''}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* View Assignments Modal */}
          {showViewAssignmentsModal && selectedCourse && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Assignments: {selectedCourse.title}</h3>
                  <button
                    onClick={() => setShowViewAssignmentsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <BookOpen className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-3">
                  {assignments
                    .filter(assignment => assignment.courseId === selectedCourse.id && assignment.status === 'active')
                    .map(assignment => {
                      const student = students.find(s => s.id === assignment.studentId);
                      return (
                        <div key={assignment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                          <div>
                            <div className="font-medium text-gray-900">{student?.name || student?.email || 'Unknown Student'}</div>
                            <div className="text-sm text-gray-500">
                              Assigned on {assignment.assignedAt?.toDate()?.toLocaleDateString()}
                            </div>
                          </div>
                          <button
                            onClick={() => handleUnassignStudent(assignment.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          >
                            Unassign
                          </button>
                        </div>
                      );
                    })}
                  {assignments.filter(assignment => assignment.courseId === selectedCourse.id && assignment.status === 'active').length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No students assigned to this course yet.
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowViewAssignmentsModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}