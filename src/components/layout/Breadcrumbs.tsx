'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface Breadcrumb {
  label: string;
  href: string;
}

const Breadcrumbs = () => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    const crumbs: Breadcrumb[] = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Handle special routes
      if (segment === 'admin' || segment === 'student' || segment === 'instructor') {
        crumbs.push({
          label: segment.charAt(0).toUpperCase() + segment.slice(1),
          href: currentPath
        });
      } else if (segment === 'dashboard') {
        const prevSegment = pathSegments[index - 1];
        if (prevSegment === 'admin') {
          crumbs.push({ label: 'Admin Dashboard', href: currentPath });
        } else if (prevSegment === 'student') {
          crumbs.push({ label: 'Student Dashboard', href: currentPath });
        } else if (prevSegment === 'instructor') {
          crumbs.push({ label: 'Instructor Dashboard', href: currentPath });
        }
      } else if (segment === 'courses') {
        crumbs.push({ label: 'Courses', href: currentPath });
      } else if (segment === 'tours') {
        crumbs.push({ label: 'Tours', href: currentPath });
      } else if (segment === 'blog') {
        crumbs.push({ label: 'Blog', href: currentPath });
      } else if (segment === 'about') {
        crumbs.push({ label: 'About', href: currentPath });
      } else if (segment === 'contact') {
        crumbs.push({ label: 'Contact', href: currentPath });
      } else if (segment === 'booking') {
        crumbs.push({ label: 'Booking', href: currentPath });
      } else if (segment === 'services') {
        crumbs.push({ label: 'Services', href: currentPath });
      } else if (segment === 'testimonials') {
        crumbs.push({ label: 'Testimonials', href: currentPath });
      } else if (segment === 'founders') {
        crumbs.push({ label: 'Founders', href: currentPath });
      } else if (segment === 'id') {
        // Handle dynamic tour/course/blog post pages
        const prevSegment = pathSegments[index - 1];
        if (prevSegment === 'tours') {
          crumbs.push({ label: 'Tour Details', href: currentPath });
        } else if (prevSegment === 'blog') {
          crumbs.push({ label: 'Blog Post', href: currentPath });
        }
      } else {
        // Default handling for other segments
        crumbs.push({
          label: segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '),
          href: currentPath
        });
      }
    });

    return crumbs;
  }, [pathname]);

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400" aria-hidden="true">
                /
              </span>
            )}
            <a
              href={crumb.href}
              className={`hover:text-blue-600 transition-colors ${
                index === breadcrumbs.length - 1 ? 'text-blue-600 font-medium' : ''
              }`}
            >
              {crumb.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;