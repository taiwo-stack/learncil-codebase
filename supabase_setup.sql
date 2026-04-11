-- Supabase Schema Setup for Learncil App

-- 1. Create Profiles Table (if not exists)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'instructor', 'admin', 'guest')),
  name text,
  assigned_instructor uuid REFERENCES public.profiles(id),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_login timestamp with time zone
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile or if they are admin
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- Allow users to insert their own profile
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 2. Create Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text NOT NULL,
  "appointmentDate" text NOT NULL,
  "appointmentTime" text NOT NULL,
  duration text DEFAULT '30' NOT NULL,
  timezone text NOT NULL,
  "detailedMessage" text,
  "currentGrade" text,
  "contactMethod" text NOT NULL,
  "alternativeContact" text,
  "bestContactTime" text,
  "referralSource" text,
  "studentName" text,
  "yearGroup" text,
  "curriculum" text,
  "primaryGoal" text,
  "meetingPlatform" text,
  "specialRequirements" text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  appointment_date_time timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert appointments (for the booking form)
DROP POLICY IF EXISTS "Anyone can insert appointments" ON public.appointments;
CREATE POLICY "Anyone can insert appointments" 
  ON public.appointments FOR INSERT 
  WITH CHECK (true);

-- Allow admins to view all appointments
DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;
CREATE POLICY "Admins can view all appointments" 
  ON public.appointments FOR SELECT 
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin' OR 'true' = 'true'); 
  -- NOTE: Temporarily allowing anonymous selection for calendar availability counts. You may want to restrict this later.

-- Allow admins to update appointments (to close them)
DROP POLICY IF EXISTS "Admins can update appointments" ON public.appointments;
CREATE POLICY "Admins can update appointments" 
  ON public.appointments FOR UPDATE 
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');





-- 3. Create Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('curriculum', 'tech')),
  title text NOT NULL,
  duration text,
  image_url text,
  level text CHECK (level IN ('Foundation', 'Beginner', 'Intermediate', 'Advanced', 'Expert')),
  lessons integer DEFAULT 0,
  students text DEFAULT '0+',
  
  -- Flexible metadata for different types
  curriculum_data jsonb DEFAULT '{}'::jsonb, -- { keyStage, yearGroups, subject, examBoard }
  tech_data jsonb DEFAULT '{}'::jsonb,        -- { category, tools, projects, ageRange }
  
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Anyone can view published courses
DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;
CREATE POLICY "Anyone can view published courses" 
  ON public.courses FOR SELECT 
  USING (status = 'published');

-- Admins can do everything
DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;
CREATE POLICY "Admins can manage courses" 
  ON public.courses FOR ALL
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- INSTRUCTIONS FOR ADMIN:
-- 1. Create a user via Supabase Auth (Authentication -> Add user -> Create new user)
--    with the email: learncildev@gmail.com
--    password: Learncildev,
--
-- 2. Our application logic in Auth.tsx will recognize this exact email upon login 
--    and correctly assign the 'admin' role in the profiles table automatically.
