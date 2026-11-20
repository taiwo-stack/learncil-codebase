/**
 * Parent / student testimonials shown in the homepage "What parents say" section.
 *
 * To add a new testimonial, append an object to the array below:
 *  - `id`      unique, lowercase, no spaces
 *  - `name`    the person's name as they want it displayed
 *  - `role`    e.g. "Parent" or "Parent, Year 4 student"
 *  - `quote`   their words, lightly trimmed for length only (never rewrite the meaning)
 *  - `image`   optional photo in /public (e.g. "/parent_4.jpg"). If omitted, initials are shown.
 *  - `rating`  optional, 1-5. Only include it if the person actually gave a rating.
 *
 * Only add testimonials from people who have agreed to have their words
 * (and photo, if used) shown on the website.
 */
export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  image?: string;
  quote: string;
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "funmito",
    name: "Funmito Dorcas",
    role: "Parent",
    image: "/parent_1.png",
    quote:
      "LearnCil took the time to understand my child's strengths and learning gaps through a thorough assessment. They provided a clear learning plan, consistent progress updates, and supportive instructors who made my child more confident and engaged. The structured approach and personalized guidance truly exceeded my expectations.",
    rating: 5,
  },
  {
    id: "aisha",
    name: "Aisha Anathony",
    role: "Parent",
    image: "/parent_2.jpg",
    quote:
      "The LearnCil experience was truly transformational. My child received hands-on support, personalized lessons, and encouragement from instructors who genuinely cared. I noticed improvements not just academically but also in confidence and curiosity.",
    rating: 5,
  },
  {
    id: "okewumi",
    name: "Okewumi Taiwo",
    role: "Parent",
    image: "/parent_3.png",
    quote:
      "LearnCil provides a supportive and structured environment. The lesson plans are clear, the curriculum is engaging, and the regular feedback helps us stay updated on our child's progress. I highly recommend LearnCil to any parent who wants real academic improvement.",
    rating: 5,
  },
];
