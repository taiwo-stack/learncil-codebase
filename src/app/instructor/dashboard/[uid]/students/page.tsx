"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '@/components/layout/firebase';
import AuthGuard from '@/components/layout/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Users, BookOpen, Clock, Mail, UserCheck, TrendingUp } from 'lucide-react';
import { CourseAssignment } from '@/types';

interface Student {
  id: string;
  name?: string;
  email: string;
  createdAt?: any;
}

interface StudentWithAssignments extends Student {
  assignments: CourseAssignment[];
  activeAssignments: number;
  completedAssignments: number;
}

export default function InstructorStudents() {
  const params = useParams();
  const uid = params.uid as string;
  const [students, setStudents] = useState<StudentWithAssignments[]>([]);
  const [assignments, setAssignments] = useState<CourseAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingStep('Loading assigned students...');
        // Fetch students assigned to this instructor
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
            createdAt: data.createdAt,
          });
        });

        setLoadingStep('Loading assignments...');
        // Fetch all assignments by this instructor
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

        // Combine students with their assignments
        const studentsWithAssignments: StudentWithAssignments[] = studentsData.map(student => {
          const studentAssignments = assignmentsData.filter(a => a.studentId === student.id);
          return {
            ...student,
            assignments: studentAssignments,
            activeAssignments: studentAssignments.filter(a => a.status === 'active').length,
            completedAssignments: studentAssignments.filter(a => a.status === 'completed').length,
          };
        });

        setStudents(studentsWithAssignments);
        setLoading(false);
      } catch (error) {
        console.error('Error loading students:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [uid]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const totalAssignments = assignments.length;
    const activeAssignments = assignments.filter(a => a.status === 'active').length;
    const completedAssignments = assignments.filter(a => a.status === 'completed').length;
    const avgAssignmentsPerStudent = totalStudents > 0 ? (activeAssignments / totalStudents).toFixed(1) : '0';

    return {
      totalStudents,
      totalAssignments,
      activeAssignments,
      completedAssignments,
      avgAssignmentsPerStudent,
    };
  }, [students, assignments]);

  if (loading) {
    return (
      <AuthGuard role="instructor">
        <DashboardLayout role="instructor" uid={uid}>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg font-semibold text-gray-700">Loading Students</div>
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
              <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
              <p className="mt-2 text-gray-600">Students assigned to you by administrators</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Assignments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeAssignments}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedAssignments}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg per Student</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgAssignmentsPerStudent}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAssignments}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Assigned Students</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {students.map((student) => (
                <div key={student.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-medium text-gray-900">
                          {student.name || 'Unnamed Student'}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-4 h-4 mr-1" />
                          {student.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{student.activeAssignments}</div>
                        <div className="text-xs text-gray-500">Active</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{student.completedAssignments}</div>
                        <div className="text-xs text-gray-500">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">{student.assignments.length}</div>
                        <div className="text-xs text-gray-500">Total</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Assignments */}
                  {student.assignments.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Recent Assignments:</div>
                      <div className="flex flex-wrap gap-2">
                        {student.assignments.slice(0, 3).map((assignment) => (
                          <span
                            key={assignment.id}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              assignment.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : assignment.status === 'completed'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            Course {assignment.courseId.slice(-4)}
                            {assignment.status === 'completed' && ' ✓'}
                          </span>
                        ))}
                        {student.assignments.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{student.assignments.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {students.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students assigned</h3>
                <p className="text-gray-600">Administrators haven't assigned any students to you yet.</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}