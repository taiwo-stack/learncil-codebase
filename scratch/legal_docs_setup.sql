-- COPY ALL OF THIS CODE AND PASTE IT DIRECTLY INTO SUPABASE SQL EDITOR
-- DO NOT INCLUDE BACKTICKS OR QUOTES OUTSIDE THIS TEXT

-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    key text UNIQUE NOT NULL,
    value text,
    label text,
    description text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read settings
DROP POLICY IF EXISTS "Anyone can read settings" ON public.site_settings;
CREATE POLICY "Anyone can read settings" 
    ON public.site_settings FOR SELECT 
    USING (true);

-- Allow only admins to manage settings
DROP POLICY IF EXISTS "Admins can manage settings" ON public.site_settings;
CREATE POLICY "Admins can manage settings" 
    ON public.site_settings FOR ALL 
    USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Insert default values if not present
INSERT INTO public.site_settings (key, label, description)
VALUES 
    ('privacy_policy_url', 'Privacy Policy PDF', 'Direct link to the current Privacy Policy document.'),
    ('terms_of_service_url', 'Terms of Service PDF', 'Direct link to the current Terms of Service document.')
ON CONFLICT (key) DO NOTHING;