import { error } from "@sveltejs/kit";
import { courses, courseAliases } from "$lib/courses";
export const entries = () => [
  ...courses.map((course) => ({ course: course.slug })),
  ...Object.entries(courseAliases)
    .filter(([, slug]) => courses.some((course) => course.slug === slug))
    .map(([alias]) => ({ course: alias })),
];
export function load({ params }) {
  const slug = courseAliases[params.course] || params.course;
  const course = courses.find((course) => course.slug === slug);
  if (!course) error(404, "Enseignement introuvable");
  return { course };
}
