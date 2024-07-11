// src/components/LessonSelector.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentLesson } from '../store/typingSlice';

const lessons = [
  { id: 'basic', name: 'Basic Lesson' },
  { id: 'intermediate', name: 'Intermediate Lesson' },
  { id: 'advanced', name: 'Advanced Lesson' },
];

const LessonSelector = () => {
  const dispatch = useDispatch();

  const handleLessonSelect = (lessonId) => {
    dispatch(setCurrentLesson(lessonId));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Select a Lesson</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            className="bg-blue-500 text-white p-4 rounded-lg"
            onClick={() => handleLessonSelect(lesson.id)}
          >
            {lesson.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LessonSelector;