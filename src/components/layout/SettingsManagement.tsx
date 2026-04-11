'use client';

import { useState, useEffect } from 'react';
import { FileText, Shield, Scale, Upload, Check, AlertCircle, Loader2 } from 'lucide-react';

interface SiteSettings {
  privacy_policy_url?: string;
  terms_of_service_url?: string;
  [key: string]: string | undefined;
}

export default function SettingsManagement() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSettings(json.data || {});
    } catch (err) {
      console.error('Fetch settings error:', err);
      setError('Could not load settings. Please ensure the site_settings table exists.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (key: string, file: File) => {
    setSubmitting(key);
    setSuccess(null);
    setError(null);

    try {
      // 1. Upload file
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson.error);

      // 2. Update setting
      const patchRes = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: uploadJson.url }),
      });
      const patchJson = await patchRes.json();
      if (!patchRes.ok) throw new Error(patchJson.error);

      setSettings((prev) => ({ ...prev, [key]: uploadJson.url }));
      setSuccess(`${key === 'privacy_policy_url' ? 'Privacy Policy' : 'Terms of Service'} updated successfully!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during upload';
      console.error('Upload error:', err);
      setError(message);
    } finally {
      setSubmitting(null);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage global documents and site configurations.</p>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <Check size={20} /> {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Privacy Policy Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Shield size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Privacy Policy</h3>
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed">
            Upload the latest Privacy Policy PDF. This will be linked across the entire website footer and registration forms.
          </p>

          <div className="pt-2">
            {settings.privacy_policy_url ? (
              <a 
                href={settings.privacy_policy_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 mb-3"
              >
                <FileText size={12} /> View Current Document
              </a>
            ) : (
              <p className="text-xs text-amber-600 mb-3 font-medium">No document uploaded yet.</p>
            )}

            <label className="relative group cursor-pointer block">
              <div className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 transition-all ${submitting === 'privacy_policy_url' ? 'bg-gray-50 border-gray-200' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'}`}>
                {submitting === 'privacy_policy_url' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                ) : (
                  <Upload size={20} className="text-gray-400 group-hover:text-blue-500" />
                )}
                <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-700">
                  {submitting === 'privacy_policy_url' ? 'Uploading...' : 'Choose PDF File'}
                </span>
              </div>
              <input 
                type="file" 
                accept="application/pdf"
                className="hidden"
                disabled={!!submitting}
                onChange={(e) => e.target.files?.[0] && handleUpload('privacy_policy_url', e.target.files[0])}
              />
            </label>
          </div>
        </div>

        {/* Terms of Service Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Scale size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Terms of Service</h3>
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed">
            Upload the latest Terms of Service PDF. This document governs the legal relationship with your users.
          </p>

          <div className="pt-2">
            {settings.terms_of_service_url ? (
              <a 
                href={settings.terms_of_service_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-purple-600 hover:underline inline-flex items-center gap-1 mb-3"
              >
                <FileText size={12} /> View Current Document
              </a>
            ) : (
              <p className="text-xs text-amber-600 mb-3 font-medium">No document uploaded yet.</p>
            )}

            <label className="relative group cursor-pointer block">
              <div className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-xl p-4 transition-all ${submitting === 'terms_of_service_url' ? 'bg-gray-50 border-gray-200' : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'}`}>
                {submitting === 'terms_of_service_url' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                ) : (
                  <Upload size={20} className="text-gray-400 group-hover:text-purple-500" />
                )}
                <span className="text-sm font-semibold text-gray-600 group-hover:text-purple-700">
                  {submitting === 'terms_of_service_url' ? 'Uploading...' : 'Choose PDF File'}
                </span>
              </div>
              <input 
                type="file" 
                accept="application/pdf"
                className="hidden"
                disabled={!!submitting}
                onChange={(e) => e.target.files?.[0] && handleUpload('terms_of_service_url', e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
