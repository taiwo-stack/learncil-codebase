
"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Plus, Search, Edit2, Trash2, BookOpen, Laptop, X, Check,
  AlertCircle, GraduationCap, Layout, Settings, RefreshCw
} from 'lucide-react';

interface Course {
  id: string;
  type: 'curriculum' | 'tech';
  title: string;
  duration: string;
  image_url: string;
  level: string;
  status: 'draft' | 'published' | 'archived';
  curriculum_data: {
    keyStage?: string;
    yearGroups?: string[];
    subject?: string;
    examBoard?: string;
    pdf_url?: string;
  };
  tech_data: {
    gradeLevel?: string;
    category?: string;
    tools?: string[];
    projects?: number;
    ageRange?: string;
    pdf_url?: string;
  };
  created_at: string;
}

const LEVELS = ['Foundation', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
const KEY_STAGES = ['EYFS', 'KS1', 'KS2', 'KS3', 'KS4'];
const GRADE_LEVELS = ['K-5', '6-8', '9-12'];
const STATUSES = ['published', 'draft', 'archived'];

const blankForm = (): Partial<Course> => ({
  type: 'curriculum',
  title: '',
  image_url: '',
  level: 'Beginner',
  status: 'published',
  curriculum_data: { keyStage: 'KS1', yearGroups: [], subject: '', examBoard: '', pdf_url: '' },
  tech_data: { gradeLevel: 'K-5', category: '', tools: [], projects: 0, ageRange: '', pdf_url: '' }
});

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'curriculum' | 'tech'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Course>>(blankForm());
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Helpers for tag-style array fields
  const [yearGroupsInput, setYearGroupsInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setErrorStatus(null);
    try {
      // Use our server-side API route to bypass PostgREST schema cache issues
      const res = await fetch('/api/courses?type=all');
      const json = await res.json();

      if (!res.ok || json.error) {
        const errMsg = json.error || 'Unknown error';
        const errCode = json.code || '';
        console.error(`[CourseManagement] API error: ${errCode} | ${errMsg}`);
        setErrorStatus(errMsg.includes('PGRST205') || errMsg.includes('schema cache')
          ? 'PostgREST schema not refreshed yet. Please pause & resume your Supabase project from the dashboard Settings → General page.'
          : errMsg);
      } else {
        setCourses(json.data || []);
      }
    } catch (err: any) {
      console.error('[CourseManagement] Fetch error:', err.message);
      setErrorStatus('Network error — is the dev server running?');
    }
    setLoading(false);
  };

  const openCreateModal = () => {
    const fresh = blankForm();
    setFormData(fresh);
    setEditingCourse(null);
    setYearGroupsInput('');
    setToolsInput('');
    setPdfFile(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormData({ ...course });
    setYearGroupsInput((course.curriculum_data?.yearGroups || []).join(', '));
    setToolsInput((course.tech_data?.tools || []).join(', '));
    setPdfFile(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setFormData(blankForm());
    setYearGroupsInput('');
    setToolsInput('');
    setPdfFile(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Sync array fields from text inputs
    const payload: Partial<Course> = {
      ...formData,
      curriculum_data: {
        ...(formData.curriculum_data || {}),
        yearGroups: yearGroupsInput
          ? yearGroupsInput.split(',').map(s => s.trim()).filter(Boolean)
          : []
      },
      tech_data: {
        ...(formData.tech_data || {}),
        tools: toolsInput
          ? toolsInput.split(',').map(s => s.trim()).filter(Boolean)
          : []
      }
    };

    try {
      // 1. Upload PDF if a new one is selected
      if (pdfFile) {
        setSuccessMsg('Uploading PDF...');
        const uploadForm = new FormData();
        uploadForm.append('file', pdfFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadForm
        });
        const uploadJson = await uploadRes.json();
        
        if (!uploadRes.ok) {
          throw new Error(uploadJson.error || 'Failed to upload PDF');
        }

        // Attach the public URL into the right dataset
        if (payload.type === 'curriculum') {
          payload.curriculum_data!.pdf_url = uploadJson.url;
        } else {
          payload.tech_data!.pdf_url = uploadJson.url;
        }
      }

      // 2. Upload Image if a new one is selected
      if (imageFile) {
        setSuccessMsg('Uploading Image...');
        const imgForm = new FormData();
        imgForm.append('file', imageFile);

        const imgRes = await fetch('/api/upload', {
          method: 'POST',
          body: imgForm
        });
        const imgJson = await imgRes.json();
        
        if (!imgRes.ok) {
          throw new Error(imgJson.error || 'Failed to upload image');
        }

        payload.image_url = imgJson.url;
      }

      setSuccessMsg('Saving course...');
      let res: Response;
      if (editingCourse) {
        res = await fetch('/api/courses', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingCourse.id, ...payload })
        });
      } else {
        res = await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Save failed');
      setSuccessMsg(editingCourse ? 'Course updated successfully!' : 'Course created successfully!');
      closeModal();
      fetchCourses();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      console.error('Save error:', err);
      alert(`Error: ${err.message || 'Could not save course'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/courses?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    const json = await res.json();
    if (!res.ok) {
      alert('Error deleting course: ' + (json.error || 'Unknown error'));
    } else {
      setCourses(prev => prev.filter(c => c.id !== id));
      setSuccessMsg('Course deleted.');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const filteredCourses = courses.filter(c => {
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.curriculum_data?.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.tech_data?.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const setField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
  const setCurriculumField = (field: string, value: any) => setFormData(prev => ({
    ...prev, curriculum_data: { ...(prev.curriculum_data || {}), [field]: value }
  }));
  const setTechField = (field: string, value: any) => setFormData(prev => ({
    ...prev, tech_data: { ...(prev.tech_data || {}), [field]: value }
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Success Banner */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <Check size={20} /> {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} total courses in database</p>
        </div>
        <button onClick={openCreateModal} className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
          <Plus size={20} /> Create New Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Courses', count: courses.length, icon: BookOpen, color: 'blue', filter: 'all' },
          { label: 'Academic (Curriculum)', count: courses.filter(c => c.type === 'curriculum').length, icon: GraduationCap, color: 'purple', filter: 'curriculum' },
          { label: 'Tech Skills', count: courses.filter(c => c.type === 'tech').length, icon: Laptop, color: 'emerald', filter: 'tech' },
        ].map(stat => (
          <button
            key={stat.label}
            onClick={() => setTypeFilter(stat.filter as any)}
            className={`bg-white p-6 rounded-2xl border-2 shadow-sm text-left transition-all hover:shadow-md ${typeFilter === stat.filter ? 'border-blue-400 shadow-blue-100' : 'border-gray-100'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Search + Type Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by title, subject, instructor, or category..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'curriculum', 'tech'] as const).map(f => (
            <button key={f} onClick={() => setTypeFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${typeFilter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {f === 'curriculum' ? 'Academic' : f === 'tech' ? 'Tech' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Table / States */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 animate-pulse font-medium">Loading courses...</p>
          </div>
        ) : errorStatus ? (
          <div className="p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Database Error</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">{errorStatus.includes('courses') ? 'The "courses" table is missing. Please run the courses_seed.sql in your Supabase dashboard.' : errorStatus}</p>
            <button onClick={fetchCourses} className="inline-flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
              <RefreshCw size={16} /> Retry
            </button>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No courses found</h3>
            <p className="text-gray-500">
              {courses.length === 0 ? 'Run the courses_seed.sql file first, then click Retry.' : 'Try adjusting your search or filter.'}
            </p>
            {courses.length === 0 && (
              <button onClick={fetchCourses} className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                <RefreshCw size={16} /> Retry Connection
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-4">Course</th>
                  <th className="px-5 py-4">Type / Category</th>
                  <th className="px-5 py-4">Level</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/70 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          {course.image_url
                            ? <img src={course.image_url} alt="" className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-gray-400"><Layout size={18} /></div>
                          }
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 max-w-xs">{course.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${course.type === 'curriculum' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {course.type === 'curriculum' ? <GraduationCap size={12} /> : <Laptop size={12} />}
                        {course.type === 'curriculum' ? 'Academic' : 'Tech'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1 ml-1">
                        {course.type === 'curriculum'
                          ? `${course.curriculum_data?.keyStage || ''} · ${course.curriculum_data?.subject || ''}`
                          : `${course.tech_data?.gradeLevel || ''} · ${course.tech_data?.category || ''}`
                        }
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700 font-medium">{course.level}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${course.status === 'published' ? 'bg-emerald-100 text-emerald-700' : course.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditModal(course)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(course.id, course.title)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
                <p className="text-sm text-gray-500">{editingCourse ? `Editing: ${editingCourse.title}` : 'Fill in all required details below'}</p>
              </div>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all">
                <X size={22} />
              </button>
            </div>

            {/* Modal Form */}
            <div className="overflow-y-auto p-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}>
              <form onSubmit={handleSubmit} id="course-form" className="space-y-6">

                {/* Type Toggle */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Course Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['curriculum', 'tech'] as const).map(t => (
                      <button key={t} type="button" onClick={() => setField('type', t)}
                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${formData.type === t ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}>
                        {t === 'curriculum' ? <GraduationCap size={22} /> : <Laptop size={22} />}
                        <span className="font-bold">{t === 'curriculum' ? 'Academic Curriculum' : 'Tech Skills Academy'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Core Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="label-sm">Course Title *</label>
                    <input required type="text" className="input-field" placeholder="e.g. GCSE Mathematics (Edexcel) - Higher"
                      value={formData.title || ''} onChange={e => setField('title', e.target.value)} />
                  </div>
                  <div>
                    <label className="label-sm">Level</label>
                    <select className="input-field" value={formData.level || 'Beginner'} onChange={e => setField('level', e.target.value)}>
                      {LEVELS.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label-sm">Curriculum PDF</label>
                    <div className="flex flex-col gap-2">
                      <input 
                        type="file" 
                        accept="application/pdf"
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setPdfFile(e.target.files[0]);
                          }
                        }}
                      />
                      {/* Show existing PDF link if there's one */}
                      {!pdfFile && (formData.type === 'curriculum' ? formData.curriculum_data?.pdf_url : formData.tech_data?.pdf_url) && (
                        <a 
                          href={formData.type === 'curriculum' ? formData.curriculum_data?.pdf_url : formData.tech_data?.pdf_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
                        >
                          <BookOpen size={12} /> View currently attached PDF
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="label-sm">Course Thumbnail (Image)</label>
                    <div className="flex flex-col gap-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setImageFile(e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-sm">Status</label>
                    <select className="input-field" value={formData.status || 'published'} onChange={e => setField('status', e.target.value)}>
                      {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="label-sm">Image URL (Optional if uploading file)</label>
                    <input type="text" className="input-field" placeholder="https://images.unsplash.com/..."
                      value={formData.image_url || ''} onChange={e => setField('image_url', e.target.value)} />
                  </div>
                </div>

                {/* Curriculum-specific */}
                {formData.type === 'curriculum' && (
                  <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100 space-y-4">
                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap size={14} /> Academic Curriculum Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-sm">Key Stage</label>
                        <select className="input-field bg-white" value={formData.curriculum_data?.keyStage || 'KS1'}
                          onChange={e => setCurriculumField('keyStage', e.target.value)}>
                          {KEY_STAGES.map(k => <option key={k}>{k}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="label-sm">Subject</label>
                        <input type="text" className="input-field bg-white" placeholder="e.g. Mathematics"
                          value={formData.curriculum_data?.subject || ''} onChange={e => setCurriculumField('subject', e.target.value)} />
                      </div>
                      <div>
                        <label className="label-sm">Exam Board (optional)</label>
                        <input type="text" className="input-field bg-white" placeholder="AQA / Edexcel / OCR"
                          value={formData.curriculum_data?.examBoard || ''} onChange={e => setCurriculumField('examBoard', e.target.value)} />
                      </div>
                      <div>
                        <label className="label-sm">Year Groups (comma-separated)</label>
                        <input type="text" className="input-field bg-white" placeholder="Year 10, Year 11"
                          value={yearGroupsInput} onChange={e => setYearGroupsInput(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tech-specific */}
                {formData.type === 'tech' && (
                  <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 space-y-4">
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                      <Laptop size={14} /> Tech Skills Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-sm">Grade Level</label>
                        <select className="input-field bg-white" value={formData.tech_data?.gradeLevel || 'K-5'}
                          onChange={e => setTechField('gradeLevel', e.target.value)}>
                          {GRADE_LEVELS.map(g => <option key={g}>{g}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="label-sm">Category</label>
                        <input type="text" className="input-field bg-white" placeholder="e.g. Programming"
                          value={formData.tech_data?.category || ''} onChange={e => setTechField('category', e.target.value)} />
                      </div>
                      <div>
                        <label className="label-sm">Age Range</label>
                        <input type="text" className="input-field bg-white" placeholder="e.g. Ages 14-18"
                          value={formData.tech_data?.ageRange || ''} onChange={e => setTechField('ageRange', e.target.value)} />
                      </div>
                      <div>
                        <label className="label-sm">Projects (count)</label>
                        <input type="number" min={0} className="input-field bg-white"
                          value={formData.tech_data?.projects || 0} onChange={e => setTechField('projects', parseInt(e.target.value) || 0)} />
                      </div>
                      <div className="col-span-2">
                        <label className="label-sm">Tools / Languages (comma-separated)</label>
                        <input type="text" className="input-field bg-white" placeholder="Python, TensorFlow, Scikit-learn"
                          value={toolsInput} onChange={e => setToolsInput(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button type="submit" form="course-form" disabled={submitting}
                className="flex-2 flex-[2] py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting
                  ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                  : <><Check size={20} /> {editingCourse ? 'Save Changes' : 'Publish Course'}</>
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Utility CSS */}
      <style jsx global>{`
        .label-sm { display: block; font-size: 0.7rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .input-field { width: 100%; padding: 10px 14px; border-radius: 12px; border: 1px solid #e5e7eb; outline: none; transition: border-color 0.2s; font-size: 0.9rem; }
        .input-field:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
      `}</style>
    </div>
  );
}
