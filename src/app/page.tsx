import ClientPage from "./clientpage";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learncil - Online Learning Platform',
  description: 'Transform your learning journey with Learncil. Access expert-led courses, personalized instruction, and comprehensive educational resources designed for students of all levels.',
  keywords: 'online learning, courses, education, e-learning, tutorials, student learning',
  openGraph: {
    title: 'Learncil - Online Learning Platform',
    description: 'Transform your learning journey with expert-led courses and personalized instruction.',
    url: 'https://learncil.com',
    siteName: 'Learncil',
    images: [
      {
        url: 'https://learncil.com/og-image.jpg', // Add your logo/banner here
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learncil - Online Learning Platform',
    description: 'Transform your learning journey with expert-led courses and personalized instruction.',
    images: ['https://learncil.com/og-image.jpg'],
  },
};


export default function Page() {
  return <ClientPage />;
}
