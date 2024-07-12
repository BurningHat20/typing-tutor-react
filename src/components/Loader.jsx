import React from 'react';
import { motion } from 'framer-motion';

const keys = [
  { letter: 'Q', color: 'bg-blue-400 dark:bg-blue-600' },
  { letter: 'W', color: 'bg-green-400 dark:bg-green-600' },
  { letter: 'E', color: 'bg-yellow-400 dark:bg-yellow-600' },
  { letter: 'R', color: 'bg-red-400 dark:bg-red-600' },
  { letter: 'T', color: 'bg-purple-400 dark:bg-purple-600' },
  { letter: 'Y', color: 'bg-pink-400 dark:bg-pink-600' },
];

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen  transition-colors duration-300">
      <div className="flex space-x-2">
        {keys.map(({ letter, color }, index) => (
          <motion.div
            key={letter}
            className={`w-12 h-12 ${color} rounded-lg shadow-md flex items-center justify-center text-white font-bold text-xl transition-colors duration-300`}
            initial={{ y: 0 }}
            animate={{
              y: [-5, 5],
              transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: index * 0.1,
              },
            }}
          >
            {letter}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loader;