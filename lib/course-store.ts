"use client";

import * as React from "react";

import type { Course, Lesson, Module, Quiz } from "@/types";
import { COURSES } from "@/data/courses";
import { CATEGORIES } from "@/data/categories";

const STORAGE_KEY = "dfa_trainer_courses_v1";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readStorage(): Course[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Course[]) : null;
  } catch {
    return null;
  }
}

function writeStorage(courses: Course[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

function loadAll(): Course[] {
  const stored = readStorage();
  if (stored && stored.length > 0) return stored;
  writeStorage(COURSES);
  return COURSES;
}

const listeners = new Set<() => void>();
function emitChange() {
  listeners.forEach((listener) => listener());
}

function recalcCourse(course: Course): Course {
  const lessonsCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const duration = course.modules.reduce((sum, m) => sum + m.duration, 0);
  return { ...course, lessonsCount, duration };
}

export interface CourseDraft {
  title: string;
  subtitle: string;
  description: string;
  categoryId: string;
  level: Course["level"];
  language: Course["language"];
  price: number;
  originalPrice?: number;
  certificateIncluded: boolean;
  learningOutcomes: string[];
  requirements: string[];
  tags: string[];
  modules?: Module[];
  status?: Course["status"];
}

export function useTrainerCourses(instructorId: string) {
  const [all, setAll] = React.useState<Course[]>([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setAll(loadAll());
    setReady(true);
    const listener = () => setAll(loadAll());
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const persist = React.useCallback((next: Course[]) => {
    writeStorage(next);
    setAll(next);
    emitChange();
  }, []);

  const courses = React.useMemo(
    () => all.filter((c) => c.instructorId === instructorId),
    [all, instructorId]
  );

  const getCourse = React.useCallback((id: string) => all.find((c) => c.id === id), [all]);

  const createCourse = React.useCallback(
    (draft: CourseDraft) => {
      const category = CATEGORIES.find((c) => c.id === draft.categoryId) ?? CATEGORIES[0];
      const id = uid("course");
      const now = new Date().toISOString().slice(0, 10);
      const modules = draft.modules ?? [];
      const newCourse = recalcCourse({
        id,
        slug: `${slugify(draft.title)}-${id.slice(-6)}`,
        title: draft.title,
        subtitle: draft.subtitle,
        description: draft.description,
        thumbnail: `/assets/courses/course-01.jpg`,
        banner: `/assets/banners/course-01.jpg`,
        categoryId: category.id,
        categoryName: category.name,
        instructorId,
        level: draft.level,
        language: draft.language,
        price: draft.price,
        originalPrice: draft.originalPrice,
        currency: "FCFA",
        rating: 0,
        reviewsCount: 0,
        studentsCount: 0,
        duration: 0,
        lessonsCount: 0,
        modules,
        tags: draft.tags,
        learningOutcomes: draft.learningOutcomes,
        requirements: draft.requirements,
        featured: false,
        bestseller: false,
        isNew: true,
        updatedAt: now,
        createdAt: now,
        certificateIncluded: draft.certificateIncluded,
        status: draft.status ?? "brouillon",
      });
      persist([...all, newCourse]);
      return newCourse;
    },
    [all, instructorId, persist]
  );

  const updateCourse = React.useCallback(
    (id: string, patch: Partial<Course>) => {
      persist(
        all.map((c) =>
          c.id === id
            ? recalcCourse({ ...c, ...patch, updatedAt: new Date().toISOString().slice(0, 10) })
            : c
        )
      );
    },
    [all, persist]
  );

  const deleteCourse = React.useCallback(
    (id: string) => {
      persist(all.filter((c) => c.id !== id));
    },
    [all, persist]
  );

  const duplicateCourse = React.useCallback(
    (id: string) => {
      const source = all.find((c) => c.id === id);
      if (!source) return;
      const newId = uid("course");
      const clone: Course = {
        ...source,
        id: newId,
        slug: `${source.slug}-copie-${newId.slice(-6)}`,
        title: `${source.title} (copie)`,
        status: "brouillon",
        studentsCount: 0,
        reviewsCount: 0,
        rating: 0,
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
      };
      persist([...all, clone]);
      return clone;
    },
    [all, persist]
  );

  const setStatus = React.useCallback(
    (id: string, status: Course["status"]) => updateCourse(id, { status }),
    [updateCourse]
  );

  const addModule = React.useCallback(
    (courseId: string, title: string) => {
      const course = all.find((c) => c.id === courseId);
      if (!course) return;
      const newModule: Module = {
        id: uid("module"),
        title,
        description: "",
        lessons: [],
        duration: 0,
      };
      updateCourse(courseId, { modules: [...course.modules, newModule] });
    },
    [all, updateCourse]
  );

  const updateModule = React.useCallback(
    (courseId: string, moduleId: string, patch: Partial<Module>) => {
      const course = all.find((c) => c.id === courseId);
      if (!course) return;
      updateCourse(courseId, {
        modules: course.modules.map((m) => (m.id === moduleId ? { ...m, ...patch } : m)),
      });
    },
    [all, updateCourse]
  );

  const deleteModule = React.useCallback(
    (courseId: string, moduleId: string) => {
      const course = all.find((c) => c.id === courseId);
      if (!course) return;
      updateCourse(courseId, { modules: course.modules.filter((m) => m.id !== moduleId) });
    },
    [all, updateCourse]
  );

  const addLesson = React.useCallback(
    (courseId: string, moduleId: string, lesson: Omit<Lesson, "id">) => {
      const course = all.find((c) => c.id === courseId);
      if (!course) return;
      const newLesson: Lesson = { ...lesson, id: uid("lesson") };
      updateCourse(courseId, {
        modules: course.modules.map((m) =>
          m.id === moduleId
            ? {
                ...m,
                lessons: [...m.lessons, newLesson],
                duration: m.duration + newLesson.duration,
              }
            : m
        ),
      });
    },
    [all, updateCourse]
  );

  const updateLesson = React.useCallback(
    (courseId: string, moduleId: string, lessonId: string, patch: Partial<Lesson>) => {
      const course = all.find((c) => c.id === courseId);
      if (!course) return;
      updateCourse(courseId, {
        modules: course.modules.map((m) => {
          if (m.id !== moduleId) return m;
          const lessons = m.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l));
          return { ...m, lessons, duration: lessons.reduce((s, l) => s + l.duration, 0) };
        }),
      });
    },
    [all, updateCourse]
  );

  const deleteLesson = React.useCallback(
    (courseId: string, moduleId: string, lessonId: string) => {
      const course = all.find((c) => c.id === courseId);
      if (!course) return;
      updateCourse(courseId, {
        modules: course.modules.map((m) => {
          if (m.id !== moduleId) return m;
          const lessons = m.lessons.filter((l) => l.id !== lessonId);
          return { ...m, lessons, duration: lessons.reduce((s, l) => s + l.duration, 0) };
        }),
      });
    },
    [all, updateCourse]
  );

  const setLessonQuiz = React.useCallback(
    (courseId: string, moduleId: string, lessonId: string, quiz: Quiz | undefined) => {
      updateLesson(courseId, moduleId, lessonId, { quiz });
    },
    [updateLesson]
  );

  return {
    courses,
    ready,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    duplicateCourse,
    setStatus,
    addModule,
    updateModule,
    deleteModule,
    addLesson,
    updateLesson,
    deleteLesson,
    setLessonQuiz,
  };
}
