// src/components/LessonSelector.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentLesson } from '../store/typingSlice';
import { FaKeyboard, FaChartLine, FaTrophy } from 'react-icons/fa';

const lessons = [
  { 
    id: 'basic', 
    name: 'Basic Lesson', 
    description: 'Perfect for beginners. Learn proper finger placement and basic typing techniques.',
    icon: FaKeyboard,
    color: 'from-green-400 to-green-600'
  },
  { 
    id: 'intermediate', 
    name: 'Intermediate Lesson', 
    description: 'Improve your speed and accuracy with more challenging exercises.',
    icon: FaChartLine,
    color: 'from-blue-400 to-blue-600'
  },
  { 
    id: 'advanced', 
    name: 'Advanced Lesson', 
    description: 'Master complex typing patterns and achieve professional-level skills.',
    icon: FaTrophy,
    color: 'from-purple-400 to-purple-600'
  },
];

const LessonSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.typing.darkMode);

  const handleLessonSelect = (lessonId) => {
    dispatch(setCurrentLesson(lessonId));
    navigate('/typing');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-900 dark:text-white">Choose Your Lesson</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className={`bg-gradient-to-br ${lesson.color} p-8 flex items-center justify-center`}>
              <lesson.icon className="text-white text-5xl" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{lesson.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{lesson.description}</p>
              <button
                className={`w-full bg-gradient-to-r ${lesson.color} text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90 hover:shadow-md`}
                onClick={() => handleLessonSelect(lesson.id)}
              >
                Start Lesson
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonSelector;