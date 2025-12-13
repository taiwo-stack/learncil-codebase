"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc, getDocs, where } from 'firebase/firestore';
import { db } from '@/components/layout/firebase';
import AuthGuard from '@/components/layout/AuthGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { User, Plus, Edit, Trash2, Search, Filter, UserCheck, GraduationCap, BookOpen, Mail, Phone, Calendar } from 'lucide-react';

interface UserData {
  id: string;
  uid: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  name?: string;
  assignedInstructor?: string;
  secondaryEmail?: string;
  createdAt: any;
  lastLogin: any;
}

interface Instructor {
  id: string;
  email: string;
  name?: string;
}

export default function UserManagement() {
  const params = useParams();
  const uid = params.uid as string;
  const [users, setUsers] = useState<UserData[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'instructor' | 'admin'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student' as 'student' | 'instructor',
    assignedInstructor: '',
    password: '',
    secondaryEmail: ''
  });

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData: UserData[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...doc.data()
        } as UserData);
      });
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('role', '==', 'instructor'));
        const querySnapshot = await getDocs(q);

        const instructorsData: Instructor[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          instructorsData.push({
            id: doc.id,
            email: data.email,
            name: data.name || data.email,
          });
        });

        setInstructors(instructorsData);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, [users]);

  // Filter out admin users from display
  const nonAdminUsers = users.filter(user => user.role !== 'admin');

  const filteredUsers = nonAdminUsers.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate unique name
    const existingUser = users.find(user =>
      user.name?.toLowerCase() === formData.name.toLowerCase()
    );
    if (existingUser) {
      alert('A user with this name already exists. Please choose a different name.');
      return;
    }

    // Validate password requirements
    if (!formData.password || formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password,
          assignedInstructor: formData.assignedInstructor,
          secondaryEmail: formData.secondaryEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setShowCreateModal(false);
      setFormData({ name: '', email: '', role: 'student', assignedInstructor: '', password: '', secondaryEmail: '' });
      alert(data.message);
    } catch (error: any) {
      console.error('Error creating user:', error);
      alert(error.message || 'Error creating user. Please try again.');
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Validate unique name (excluding current user)
    const existingUser = users.find(user =>
      user.id !== selectedUser.id &&
      user.name?.toLowerCase() === formData.name.toLowerCase()
    );
    if (existingUser) {
      alert('A user with this name already exists. Please choose a different name.');
      return;
    }

    try {
      await updateDoc(doc(db, 'users', selectedUser.id), {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        assignedInstructor: formData.role === 'student' ? (formData.assignedInstructor || null) : null,
        secondaryEmail: formData.role === 'student' ? (formData.secondaryEmail || null) : null,
      });
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user. Please try again.');
    }
  };

  const handleDeleteUser = (user: UserData) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteDoc(doc(db, 'users', userToDelete.id));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };

  const openEditModal = (user: UserData) => {
    // Prevent editing admin users
    if (user.role === 'admin') {
      alert('Admin users cannot be edited by other admins.');
      return;
    }

    setSelectedUser(user);
    setFormData({
      name: user.name || '',
      email: user.email,
      role: user.role,
      assignedInstructor: user.assignedInstructor || '',
      password: '', // Not used in edit
      secondaryEmail: user.secondaryEmail || ''
    });
    setShowEditModal(true);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return <GraduationCap className="w-4 h-4" />;
      case 'instructor': return <BookOpen className="w-4 h-4" />;
      case 'admin': return <UserCheck className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'instructor': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AuthGuard role="admin">
        <DashboardLayout role="admin" uid={uid}>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg font-semibold">Loading users...</div>
          </div>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard role="admin">
      <DashboardLayout role="admin" uid={uid}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="mt-2 text-gray-600">Manage students, instructors, and administrators</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {nonAdminUsers.filter(u => u.role === 'student').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Instructors</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {nonAdminUsers.filter(u => u.role === 'instructor').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Manageable Users</p>
                  <p className="text-2xl font-bold text-gray-900">{nonAdminUsers.length}</p>
                </div>
              </div>
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
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="instructor">Instructors</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Secondary Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned Instructor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name || 'No name'}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1 capitalize">{user.role}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role === 'student' ? (
                          <span className="text-sm text-gray-900">
                            {user.secondaryEmail || 'Not set'}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">N/A</span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role === 'student' ? (
                          <select
                            value={user.assignedInstructor || ''}
                            onChange={async (e) => {
                              try {
                                await updateDoc(doc(db, 'users', user.id), {
                                  assignedInstructor: e.target.value || null
                                });
                              } catch (error) {
                                console.error('Error updating instructor assignment:', error);
                              }
                            }}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Unassigned</option>
                            {instructors.map((instructor) => (
                              <option key={instructor.id} value={instructor.id}>
                                {instructor.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-sm text-gray-500">N/A</span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin ? new Date(user.lastLogin.seconds * 1000).toLocaleDateString() : 'Never'}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(user)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">
                  {searchTerm || roleFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'No users have been registered yet'}
                </p>
              </div>
            )}
          </div>

          {/* Create User Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Create New User</h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Username</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="username"
                        className="mt-1 block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <span className="mt-1 inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-r-md">
                        {formData.role === 'student' ? '.student@learncil.com' : '.instructor@learncil.com'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Full email will be: {formData.email}{formData.role === 'student' ? '.student@learncil.com' : '.instructor@learncil.com'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as any, assignedInstructor: e.target.value === 'instructor' ? '' : formData.assignedInstructor})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500">Note: Only students and instructors can be created by admins</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Set a permanent password (min 6 characters)"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                      minLength={6}
                    />
                    <p className="mt-1 text-xs text-gray-500">This will be the user's permanent login password</p>
                  </div>

                  {formData.role === 'student' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Secondary Email (Optional)</label>
                        <input
                          type="email"
                          value={formData.secondaryEmail}
                          onChange={(e) => setFormData({...formData, secondaryEmail: e.target.value})}
                          placeholder="parent@example.com"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">For promotions and contacting parents</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Assign Instructor</label>
                        <select
                          value={formData.assignedInstructor}
                          onChange={(e) => setFormData({...formData, assignedInstructor: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Unassigned</option>
                          {instructors.map((instructor) => (
                            <option key={instructor.id} value={instructor.id}>
                              {instructor.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {showEditModal && selectedUser && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as any, assignedInstructor: e.target.value === 'instructor' ? '' : formData.assignedInstructor})}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                    </select>
                  </div>

                  {formData.role === 'student' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Secondary Email (Optional)</label>
                        <input
                          type="email"
                          value={formData.secondaryEmail}
                          onChange={(e) => setFormData({...formData, secondaryEmail: e.target.value})}
                          placeholder="parent@example.com"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">For promotions and contacting parents</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Assign Instructor</label>
                        <select
                          value={formData.assignedInstructor}
                          onChange={(e) => setFormData({...formData, assignedInstructor: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Unassigned</option>
                          {instructors.map((instructor) => (
                            <option key={instructor.id} value={instructor.id}>
                              {instructor.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Update User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && userToDelete && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Confirm Delete</h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Trash2 className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Delete User Account
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-md p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">User Details:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Name:</strong> {userToDelete.name || 'No name'}</p>
                      <p><strong>Email:</strong> {userToDelete.email}</p>
                      <p><strong>Role:</strong> {userToDelete.role}</p>
                      {userToDelete.secondaryEmail && (
                        <p><strong>Secondary Email:</strong> {userToDelete.secondaryEmail}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmDeleteUser}
                    className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete User
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