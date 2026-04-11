-- ============================================================
-- LEARNCIL COURSES SEED SCRIPT
-- Run this ENTIRE script in your Supabase SQL Editor.
-- It creates the courses table (if missing) and inserts all
-- 24 British Curriculum + 28 Tech Skills Academy courses.
-- ============================================================

-- STEP 1: Create the table if it does not exist
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('curriculum', 'tech')),
  title text NOT NULL,
  duration text,
  image_url text,
  level text CHECK (level IN ('Foundation', 'Beginner', 'Intermediate', 'Advanced', 'Expert')),
  lessons integer DEFAULT 0,
  students text DEFAULT '0+',
  curriculum_data jsonb DEFAULT '{}'::jsonb,
  tech_data jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- STEP 2: Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- STEP 3: Set up RLS policies
DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;
CREATE POLICY "Anyone can view published courses"
  ON public.courses FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Admins can select all courses" ON public.courses;
CREATE POLICY "Admins can select all courses"
  ON public.courses FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "Admins can insert courses" ON public.courses;
CREATE POLICY "Admins can insert courses"
  ON public.courses FOR INSERT
  WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "Admins can update courses" ON public.courses;
CREATE POLICY "Admins can update courses"
  ON public.courses FOR UPDATE
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "Admins can delete courses" ON public.courses;
CREATE POLICY "Admins can delete courses"
  ON public.courses FOR DELETE
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- ============================================================
-- STEP 4: Clear existing seed data and insert fresh
-- ============================================================
DELETE FROM public.courses WHERE status = 'published';

-- ============================================================
-- BRITISH CURRICULUM COURSES (24 total)
-- ============================================================

-- EYFS (Reception)
INSERT INTO public.courses (type, title, duration, image_url, level, lessons, students, status, curriculum_data) VALUES
('curriculum', 'Early Literacy: Letters, Sounds & Phonics', '8 WEEKS', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop', 'Foundation', 24, '320+', 'published', '{"keyStage": "EYFS", "yearGroups": ["Reception"], "subject": "English", "examBoard": ""}'),
('curriculum', 'Numbers & Counting for Early Years', '6 WEEKS', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop', 'Foundation', 18, '280+', 'published', '{"keyStage": "EYFS", "yearGroups": ["Reception"], "subject": "Mathematics", "examBoard": ""}');

-- KEY STAGE 1 (Years 1-2)
INSERT INTO public.courses (type, title, duration, image_url, level, lessons, students, status, curriculum_data) VALUES
('curriculum', 'KS1 English: Reading & Writing Skills', '10 WEEKS', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop', 'Beginner', 30, '450+', 'published', '{"keyStage": "KS1", "yearGroups": ["Year 1", "Year 2"], "subject": "English", "examBoard": ""}'),
('curriculum', 'KS1 Maths: Numbers, Shapes & Measurement', '10 WEEKS', 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&h=300&fit=crop', 'Beginner', 28, '410+', 'published', '{"keyStage": "KS1", "yearGroups": ["Year 1", "Year 2"], "subject": "Mathematics", "examBoard": ""}'),
('curriculum', 'KS1 Science: Plants, Animals & Materials', '8 WEEKS', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop', 'Beginner', 24, '380+', 'published', '{"keyStage": "KS1", "yearGroups": ["Year 1", "Year 2"], "subject": "Science", "examBoard": ""}');

-- KEY STAGE 2 (Years 3-6)
INSERT INTO public.courses (type, title, duration, image_url, level, lessons, students, status, curriculum_data) VALUES
('curriculum', 'KS2 English: Grammar, Comprehension & Writing', '12 WEEKS', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=300&fit=crop', 'Intermediate', 36, '620+', 'published', '{"keyStage": "KS2", "yearGroups": ["Year 3", "Year 4", "Year 5", "Year 6"], "subject": "English", "examBoard": ""}'),
('curriculum', 'KS2 Mathematics: Arithmetic & Reasoning', '12 WEEKS', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop', 'Intermediate', 40, '680+', 'published', '{"keyStage": "KS2", "yearGroups": ["Year 3", "Year 4", "Year 5", "Year 6"], "subject": "Mathematics", "examBoard": ""}'),
('curriculum', 'Year 6 SATs Preparation Complete Bundle', '16 WEEKS', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop', 'Intermediate', 48, '890+', 'published', '{"keyStage": "KS2", "yearGroups": ["Year 6"], "subject": "SATs Prep", "examBoard": ""}');

-- KEY STAGE 3 (Years 7-9)
INSERT INTO public.courses (type, title, duration, image_url, level, lessons, students, status, curriculum_data) VALUES
('curriculum', 'KS3 English Language & Literature', '14 WEEKS', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop', 'Intermediate', 42, '520+', 'published', '{"keyStage": "KS3", "yearGroups": ["Year 7", "Year 8", "Year 9"], "subject": "English", "examBoard": ""}'),
('curriculum', 'KS3 Mathematics: Algebra & Geometry', '14 WEEKS', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop', 'Intermediate', 44, '540+', 'published', '{"keyStage": "KS3", "yearGroups": ["Year 7", "Year 8", "Year 9"], "subject": "Mathematics", "examBoard": ""}'),
('curriculum', 'KS3 Science: Biology, Chemistry & Physics', '15 WEEKS', 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=500&h=300&fit=crop', 'Intermediate', 45, '610+', 'published', '{"keyStage": "KS3", "yearGroups": ["Year 7", "Year 8", "Year 9"], "subject": "Science", "examBoard": ""}'),
('curriculum', 'KS3 History: Medieval to Modern Britain', '12 WEEKS', 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&h=300&fit=crop', 'Intermediate', 36, '390+', 'published', '{"keyStage": "KS3", "yearGroups": ["Year 7", "Year 8", "Year 9"], "subject": "History", "examBoard": ""}');

-- KEY STAGE 4 / GCSE (Years 10-11)
INSERT INTO public.courses (type, title, duration, image_url, level, lessons, students, status, curriculum_data) VALUES
('curriculum', 'GCSE English Language (AQA)', '20 WEEKS', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=300&fit=crop', 'Advanced', 60, '1200+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "English Language", "examBoard": "AQA"}'),
('curriculum', 'GCSE English Literature (AQA)', '20 WEEKS', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop', 'Advanced', 58, '1100+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "English Literature", "examBoard": "AQA"}'),
('curriculum', 'GCSE Mathematics (Edexcel) - Foundation', '22 WEEKS', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop', 'Advanced', 66, '1450+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "Mathematics", "examBoard": "Edexcel"}'),
('curriculum', 'GCSE Mathematics (Edexcel) - Higher', '24 WEEKS', 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&h=300&fit=crop', 'Expert', 72, '1680+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "Mathematics", "examBoard": "Edexcel"}'),
('curriculum', 'GCSE Combined Science Trilogy (AQA)', '24 WEEKS', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop', 'Advanced', 72, '1320+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "Combined Science", "examBoard": "AQA"}'),
('curriculum', 'GCSE Biology (OCR)', '20 WEEKS', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&h=300&fit=crop', 'Advanced', 60, '980+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "Biology", "examBoard": "OCR"}'),
('curriculum', 'GCSE Chemistry (OCR)', '20 WEEKS', 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=500&h=300&fit=crop', 'Advanced', 60, '920+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "Chemistry", "examBoard": "OCR"}'),
('curriculum', 'GCSE Physics (OCR)', '20 WEEKS', 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&h=300&fit=crop', 'Advanced', 60, '1050+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "Physics", "examBoard": "OCR"}'),
('curriculum', 'GCSE History (Edexcel)', '18 WEEKS', 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&h=300&fit=crop', 'Advanced', 54, '750+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "History", "examBoard": "Edexcel"}'),
('curriculum', 'GCSE Geography (AQA)', '18 WEEKS', 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=300&fit=crop', 'Advanced', 54, '820+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "Geography", "examBoard": "AQA"}'),
('curriculum', 'GCSE Computer Science (OCR)', '20 WEEKS', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop', 'Advanced', 60, '1180+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "Computer Science", "examBoard": "OCR"}'),
('curriculum', 'GCSE Business Studies (AQA)', '18 WEEKS', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop', 'Advanced', 54, '690+', 'published', '{"keyStage": "KS4", "yearGroups": ["Year 10", "Year 11"], "subject": "Business Studies", "examBoard": "AQA"}');

-- ============================================================
-- TECH SKILLS ACADEMY COURSES (28 total)
-- ============================================================

-- K-5 ELEMENTARY (Ages 5-11)
INSERT INTO public.courses (type, title, duration, image_url, level, lessons, students, status, tech_data) VALUES
('tech', 'Computer Basics for Beginners', '4 WEEKS', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop', 'Beginner', 12, '580+', 'published', '{"gradeLevel": "K-5", "ageRange": "Ages 5-11", "category": "Digital Literacy", "tools": ["Windows", "Mac", "Mouse & Keyboard"], "projects": 3}'),
('tech', 'Scratch for Kids: Create Your First Game', '6 WEEKS', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop', 'Beginner', 18, '890+', 'published', '{"gradeLevel": "K-5", "ageRange": "Ages 5-11", "category": "Block Coding", "tools": ["Scratch"], "projects": 5}'),
('tech', 'Internet Safety & Digital Citizenship', '3 WEEKS', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop', 'Beginner', 10, '420+', 'published', '{"gradeLevel": "K-5", "ageRange": "Ages 5-11", "category": "Digital Literacy", "tools": ["Online Safety Tools"], "projects": 2}'),
('tech', 'Canva for Kids: Design Posters & Presentations', '5 WEEKS', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop', 'Beginner', 15, '670+', 'published', '{"gradeLevel": "K-5", "ageRange": "Ages 5-11", "category": "Creative Tools", "tools": ["Canva"], "projects": 8}'),
('tech', 'Blockly Adventures: Learn Coding Through Puzzles', '4 WEEKS', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=300&fit=crop', 'Beginner', 12, '510+', 'published', '{"gradeLevel": "K-5", "ageRange": "Ages 5-11", "category": "Block Coding", "tools": ["Blockly"], "projects": 6}'),
('tech', 'Typing & Keyboard Mastery', '6 WEEKS', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop', 'Beginner', 20, '450+', 'published', '{"gradeLevel": "K-5", "ageRange": "Ages 5-11", "category": "Digital Literacy", "tools": ["Typing Software"], "projects": 1}');

-- 6-8 MIDDLE SCHOOL (Ages 11-14)
INSERT INTO public.courses (type, title, duration, image_url, level, lessons, students, status, tech_data) VALUES
('tech', 'Python for Beginners: Your First Programs', '8 WEEKS', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop', 'Intermediate', 24, '1240+', 'published', '{"gradeLevel": "6-8", "ageRange": "Ages 11-14", "category": "Programming", "tools": ["Python"], "projects": 10}'),
('tech', 'JavaScript Fundamentals: Make Interactive Websites', '8 WEEKS', 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&h=300&fit=crop', 'Intermediate', 26, '980+', 'published', '{"gradeLevel": "6-8", "ageRange": "Ages 11-14", "category": "Programming", "tools": ["JavaScript", "HTML", "CSS"], "projects": 8}'),
('tech', 'Create Your First Game with Unity & C#', '10 WEEKS', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&h=300&fit=crop', 'Intermediate', 30, '1580+', 'published', '{"gradeLevel": "6-8", "ageRange": "Ages 11-14", "category": "Game Development", "tools": ["Unity", "C#"], "projects": 4}'),
('tech', 'Introduction to Artificial Intelligence', '6 WEEKS', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop', 'Intermediate', 18, '820+', 'published', '{"gradeLevel": "6-8", "ageRange": "Ages 11-14", "category": "AI & Machine Learning", "tools": ["Teachable Machine", "JavaScript"], "projects": 5}'),
('tech', 'Roblox Game Development', '8 WEEKS', 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=500&h=300&fit=crop', 'Intermediate', 24, '2100+', 'published', '{"gradeLevel": "6-8", "ageRange": "Ages 11-14", "category": "Game Development", "tools": ["Roblox Studio", "Lua"], "projects": 6}'),
('tech', 'Data Organization & Simple Analysis', '5 WEEKS', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop', 'Intermediate', 15, '520+', 'published', '{"gradeLevel": "6-8", "ageRange": "Ages 11-14", "category": "Data Science", "tools": ["Excel", "Google Sheets"], "projects": 4}'),
('tech', 'Graphic Design with Canva Pro', '6 WEEKS', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=300&fit=crop', 'Intermediate', 18, '780+', 'published', '{"gradeLevel": "6-8", "ageRange": "Ages 11-14", "category": "Graphic Design", "tools": ["Canva Pro"], "projects": 12}'),
('tech', 'Turtle Graphics & Creative Coding with Python', '5 WEEKS', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop', 'Intermediate', 15, '610+', 'published', '{"gradeLevel": "6-8", "ageRange": "Ages 11-14", "category": "Programming", "tools": ["Python", "Turtle"], "projects": 10}');

-- 9-12 HIGH SCHOOL (Ages 14-18)
INSERT INTO public.courses (type, title, duration, image_url, level, lessons, students, status, tech_data) VALUES
('tech', 'Python Advanced: Object-Oriented Programming', '12 WEEKS', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop', 'Advanced', 36, '1450+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Programming", "tools": ["Python"], "projects": 8}'),
('tech', 'HTML & CSS: Build Your First Website', '8 WEEKS', 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=300&fit=crop', 'Advanced', 24, '1980+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Web Development", "tools": ["HTML", "CSS"], "projects": 5}'),
('tech', 'JavaScript & React: Modern Web Development', '14 WEEKS', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop', 'Expert', 42, '1620+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Web Development", "tools": ["JavaScript", "React"], "projects": 10}'),
('tech', 'SQL for Beginners: Database Fundamentals', '10 WEEKS', 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=300&fit=crop', 'Advanced', 30, '1120+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Data Science", "tools": ["SQL", "MySQL"], "projects": 6}'),
('tech', 'Introduction to Data Science with Python', '12 WEEKS', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop', 'Advanced', 36, '1340+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Data Science", "tools": ["Python", "Pandas", "NumPy"], "projects": 8}'),
('tech', 'Machine Learning Fundamentals', '14 WEEKS', 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500&h=300&fit=crop', 'Expert', 42, '980+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "AI & Machine Learning", "tools": ["Python", "TensorFlow", "Scikit-learn"], "projects": 6}'),
('tech', 'Excel Mastery: From Basics to Advanced', '10 WEEKS', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop', 'Advanced', 30, '1520+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Data Science", "tools": ["Excel", "VBA"], "projects": 12}'),
('tech', 'Cybersecurity Fundamentals', '10 WEEKS', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop', 'Advanced', 30, '1180+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Cybersecurity", "tools": ["Kali Linux", "Security Tools"], "projects": 5}'),
('tech', 'Adobe Photoshop for Beginners', '8 WEEKS', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&h=300&fit=crop', 'Advanced', 24, '1680+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Graphic Design", "tools": ["Photoshop"], "projects": 15}'),
('tech', 'UI/UX Design Fundamentals', '10 WEEKS', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop', 'Advanced', 30, '1420+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Graphic Design", "tools": ["Figma", "Adobe XD"], "projects": 8}'),
('tech', 'Digital Marketing Fundamentals', '8 WEEKS', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop', 'Advanced', 24, '1050+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Digital Marketing", "tools": ["Google Analytics", "SEO Tools"], "projects": 6}'),
('tech', 'Build AI Chatbots & Virtual Assistants', '12 WEEKS', 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop', 'Expert', 36, '890+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "AI & Machine Learning", "tools": ["Python", "NLP", "Dialogflow"], "projects": 4}'),
('tech', 'Full-Stack Web Development', '16 WEEKS', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop', 'Expert', 48, '1890+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "Web Development", "tools": ["React", "Node.js", "MongoDB"], "projects": 12}'),
('tech', 'Mobile App Development with Thunkable', '10 WEEKS', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop', 'Advanced', 30, '1220+', 'published', '{"gradeLevel": "9-12", "ageRange": "Ages 14-18", "category": "App Development", "tools": ["Thunkable"], "projects": 5}');

-- Verify counts
SELECT type, COUNT(*) as total FROM public.courses GROUP BY type;
