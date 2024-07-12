// src/components/LessonSelector.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentLesson } from '../store/typingSlice';

const lessons = [
  { id: 'basic', name: 'Basic Lesson' },
  { id: 'intermediate', name: 'Intermediate Lesson' },
  { id: 'advanced', name: 'Advanced Lesson' },
];

const LessonSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLessonSelect = (lessonId) => {
    dispatch(setCurrentLesson(lessonId));
    navigate('/typing');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Select a Lesson</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors duration-200"
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