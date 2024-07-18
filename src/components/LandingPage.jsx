import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence,  useAnimation } from 'framer-motion';
import { FaKeyboard, FaChartLine, FaTrophy, FaArrowRight,  FaQuoteLeft, FaRocket, FaCheck } from 'react-icons/fa';
import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 min-h-screen text-white">
      <Header isSignedIn={isSignedIn} user={user} />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

const Header = ({ isSignedIn, user }) => (
  <header className="bg-transparent py-4 absolute top-0 left-0 right-0 z-10">
    <nav className="container mx-auto px-4 flex justify-between items-center">
      <div className="text-2xl font-bold">RED Labz</div>
      <div>
        {isSignedIn ? (
          <span>Welcome, {user.firstName}!</span>
        ) : (
          <div className="space-x-4">
            <Link to="/sign-in" className="text-white hover:text-purple-200">
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  </header>
);

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Speed", "Accuracy", "Efficiency", "Mastery"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-[15vw] md:text-[400px] font-bold text-white opacity-5"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {words[currentWordIndex]}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Master the Art of Typing
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Achieve 
          <AnimatePresence mode="wait">
            <motion.span
              key={currentWordIndex}
              className="inline-block font-bold text-purple-300 mx-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {words[currentWordIndex]}
            </motion.span>
          </AnimatePresence>
          in your typing
        </motion.p>
        <SignInButton mode="modal">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-purple-600 transition duration-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Start Typing Now <FaArrowRight className="inline-block ml-2" />
          </motion.button>
        </SignInButton>
      </div>

      <KeyboardAnimation />
    </section>
  );
};


const KeyboardAnimation = () => {
  const keys = ['Q', 'W', 'E', 'R', 'T', 'Y'];
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const keyVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    },
    hover: { 
      y: -10, 
      scale: 1.1,
      boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  useEffect(() => {
    const pulseAnimation = async () => {
      await controls.start(i => ({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5, delay: i * 0.1 }
      }));
      await controls.start({ scale: 1 });
      pulseAnimation();
    };

    pulseAnimation();
  }, [controls]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent">
      <motion.div
        className="flex justify-center space-x-2 md:space-x-3 mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {keys.map((key, index) => (
          <motion.div
            key={key}
            className="w-12 md:w-14 h-12 md:h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold cursor-pointer"
            variants={keyVariants}
            whileHover="hover"
            whileTap="tap"
            custom={index}
            animate={controls}
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)`,
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255,255,255,0.18)'
            }}
          >
            <motion.span
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {key}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};




const FeaturesSection = () => {
  const features = [
    { icon: <FaKeyboard />, title: "Adaptive Lessons", description: "Personalized exercises that evolve with your skills" },
    { icon: <FaChartLine />, title: "Real-time Analytics", description: "Instant feedback and detailed progress tracking" },
    { icon: <FaTrophy />, title: "Gamified Challenges", description: "Fun, competitive elements to boost motivation" },
    { icon: <FaRocket />, title: "Speed Optimization", description: "Targeted drills to increase your typing speed" },
  ];

  return (
    <section className="py-20 bg-customPurple">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Elevate Your Typing Skills</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-700 rounded-lg p-6 shadow-lg flex items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl mr-4 text-blue-400">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Sarah L.", role: "Content Writer", text: "This typing tutor has revolutionized my workflow. My productivity has doubled!" },
    { name: "Mike R.", role: "Software Developer", text: "The interactive lessons made improving my coding speed both fun and effective." },
    { name: "Emily K.", role: "Student", text: "Thanks to this app, I can now easily keep up with lecture notes and finish assignments faster." },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 rounded-lg p-6 shadow-lg relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <FaQuoteLeft className="text-4xl text-blue-400 absolute top-4 left-4" />
              <p className="text-gray-300 mb-4 relative z-10 pt-8">"{testimonial.text}"</p>
              <div className="font-semibold text-white">{testimonial.name}</div>
              <div className="text-sm text-gray-400">{testimonial.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const plans = [
    { name: "Basic", price: "Free", features: ["5 lessons per day", "Basic progress tracking", "Community forum access"] },
    { name: "Pro", price: "$9.99/month", features: ["Unlimited lessons", "Advanced analytics", "Priority support", "Custom lesson creator"] },
    { name: "Team", price: "$29.99/month", features: ["Everything in Pro", "Team progress dashboard", "Admin controls", "API access"] },
  ];

  return (
    <section className="py-20 bg-customPurple">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className="bg-gray-700 rounded-lg p-6 shadow-lg border border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6 text-blue-400">{plan.price}</div>
              <ul className="mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2 text-gray-300">
                    <FaCheck className="text-green-400 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};  

const Footer = () => (
  <footer className="bg-gray-900 py-8">
    <div className="container mx-auto px-4 text-center">
      <p className="text-gray-400">© 2023 Pro Typing Tutor. All rights reserved.</p>
      <div className="mt-4 space-x-4">
        <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
        <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
      </div>
    </div>
  </footer>
);

export default LandingPage;