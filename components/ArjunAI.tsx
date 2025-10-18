'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageCircle, X, ChevronRight, Star, Code, Mail, User } from 'lucide-react';

export default function ArjunAI() {
  const [isWaving, setIsWaving] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [eyeExpression, setEyeExpression] = useState('normal'); // normal, blink, excited, happy
  const [antennaGlow, setAntennaGlow] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [userInteractions, setUserInteractions] = useState(0);

  const smartMessages = [
    {
      title: "Hello! I'm ArjunAI! 🎉",
      message: "Hi there! I'm Arjun's personal AI assistant. I can help you explore this amazing portfolio and discover all the cool features!",
      action: "Start Exploring",
      actionFunction: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      title: "Portfolio Magic! 💡",
      message: "This portfolio features floating particles, typewriter effects, and 3D animations! Try hovering over the skill cards to see the magic!",
      action: "See Skills",
      actionFunction: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      title: "Project Showcase! ⚡",
      message: "Arjun's projects have live demos and GitHub links. Each one represents real-world problem solving with cutting-edge tech!",
      action: "View Projects",
      actionFunction: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      title: "Let's Connect! 📧",
      message: "Ready to collaborate? The contact form connects directly to Arjun's email. He's always excited to discuss new opportunities!",
      action: "Contact Arjun",
      actionFunction: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      title: "Thanks for visiting! 🌟",
      message: "You've interacted with me " + (userInteractions + 1) + " times! I'm Arjun's AI companion, always here to help guide your journey!",
      action: "Restart Tour",
      actionFunction: () => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        setCurrentMessage(0);
      }
    }
  ];

  useEffect(() => {
    // Initial smart greeting after 2 seconds
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        setIsWaving(true);
        setShowGreeting(true);
        setEyeExpression('excited');
        setHasGreeted(true);
        
        // Stop waving after 4 seconds
        setTimeout(() => {
          setIsWaving(false);
          setEyeExpression('happy');
        }, 4000);
      }, 2000);

      return () => clearTimeout(timer);
    }

    // Smart blinking based on user activity
    const blinkInterval = setInterval(() => {
      if (eyeExpression === 'normal' || eyeExpression === 'happy') {
        setEyeExpression('blink');
        setTimeout(() => setEyeExpression('happy'), 150);
      }
    }, 2000 + Math.random() * 3000);

    // Smart antenna glow animation
    const glowInterval = setInterval(() => {
      setAntennaGlow(prev => (prev + 1) % 3);
    }, 1000);

    // Auto-cycle through messages every 15 seconds if greeting is shown
    const messageInterval = setInterval(() => {
      if (showGreeting && !isThinking) {
        setIsThinking(true);
        setEyeExpression('normal');
        
        setTimeout(() => {
          setCurrentMessage(prev => (prev + 1) % smartMessages.length);
          setIsThinking(false);
          setEyeExpression('excited');
          setIsWaving(true);
          
          setTimeout(() => {
            setIsWaving(false);
            setEyeExpression('happy');
          }, 2000);
        }, 1000);
      }
    }, 15000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(glowInterval);
      clearInterval(messageInterval);
    };
  }, [hasGreeted, eyeExpression, showGreeting, isThinking, userInteractions]);

  const handleRobotClick = () => {
    setUserInteractions(prev => prev + 1);
    setIsWaving(true);
    setShowGreeting(true);
    setEyeExpression('excited');
    
    // Cycle to next message on click
    setIsThinking(true);
    setTimeout(() => {
      setCurrentMessage(prev => (prev + 1) % smartMessages.length);
      setIsThinking(false);
      setEyeExpression('happy');
    }, 500);
    
    setTimeout(() => {
      setIsWaving(false);
    }, 3000);
  };

  const currentMsg = smartMessages[currentMessage];

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Smart Robot Character */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          damping: 15, 
          stiffness: 100,
          delay: 0.5 
        }}
        className="relative cursor-pointer group"
        onClick={handleRobotClick}
      >
        {/* Robot Container with enhanced floating animation */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: isThinking ? [0, -5, 5, 0] : [0, 1, -1, 0],
            scale: isWaving ? [1, 1.05, 1] : 1
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { 
              duration: isThinking ? 1 : 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            },
            scale: { duration: 0.5 }
          }}
          className="relative"
        >
          {/* Enhanced Antennas with smarter glow */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {[0, 1, 2].map((index) => (
              <motion.div 
                key={index}
                className="w-1 h-6 bg-gray-600 relative"
                animate={{ 
                  rotate: isWaving ? [0, index * 10 - 10, -(index * 10 - 10), 0] : 0,
                  scaleY: isThinking ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  rotate: { duration: 0.5, repeat: isWaving ? Infinity : 0 },
                  scaleY: { duration: 0.5, repeat: isThinking ? Infinity : 0, delay: index * 0.1 }
                }}
              >
                <motion.div 
                  className={`w-3 h-3 rounded-full absolute -top-1 -left-1 ${
                    antennaGlow === index || isThinking
                      ? 'bg-red-400 shadow-lg shadow-red-400/50' 
                      : 'bg-red-300'
                  }`}
                  animate={{ 
                    scale: antennaGlow === index || isThinking ? [1, 1.3, 1] : 1,
                    opacity: isThinking ? [1, 0.5, 1] : 1
                  }}
                  transition={{ duration: isThinking ? 0.3 : 0.5 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Enhanced Robot Head */}
          <motion.div 
            className="w-16 h-12 bg-gradient-to-b from-slate-400 to-slate-500 rounded-lg border-2 border-slate-600 shadow-xl relative"
            animate={{
              boxShadow: isWaving 
                ? ['0 4px 8px rgba(0,0,0,0.2)', '0 8px 16px rgba(0,0,0,0.3)', '0 4px 8px rgba(0,0,0,0.2)']
                : '0 4px 8px rgba(0,0,0,0.2)'
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Enhanced Head Top Part */}
            <motion.div 
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-slate-500 rounded-t-lg border border-slate-600"
              animate={{ rotateX: isThinking ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 1, repeat: isThinking ? Infinity : 0 }}
            />
            
            {/* Smart Eyes with more expressions */}
            <div className="flex space-x-3 justify-center pt-3">
              {[0, 1].map((index) => (
                <motion.div 
                  key={index}
                  className={`w-4 h-4 rounded-full border-2 border-slate-700 flex items-center justify-center ${
                    eyeExpression === 'blink' ? 'bg-slate-600' : 'bg-white'
                  }`}
                  animate={eyeExpression === 'excited' ? { 
                    scale: [1, 1.3, 1],
                    rotate: [0, 360, 0]
                  } : eyeExpression === 'happy' ? {
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ 
                    duration: 0.8, 
                    repeat: eyeExpression === 'excited' ? Infinity : (eyeExpression === 'happy' ? Infinity : 0),
                    delay: index * 0.1 
                  }}
                >
                  {eyeExpression !== 'blink' && (
                    <motion.div 
                      className="w-2 h-2 bg-slate-800 rounded-full"
                      animate={isThinking ? { 
                        x: [0, 2, -2, 0],
                        y: [0, -1, 1, 0]
                      } : {}}
                      transition={{ duration: 1, repeat: isThinking ? Infinity : 0 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Enhanced decorative elements */}
            <motion.div 
              className="absolute bottom-1 left-1 w-1 h-1 bg-orange-400 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-1 right-1 w-1 h-1 bg-orange-400 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>

          {/* Enhanced Robot Body */}
          <motion.div 
            className="w-20 h-16 bg-gradient-to-b from-slate-300 to-slate-400 rounded-lg border-2 border-slate-500 shadow-xl relative mt-1"
            animate={{
              background: isThinking 
                ? ['linear-gradient(to bottom, #cbd5e1, #94a3b8)', 'linear-gradient(to bottom, #94a3b8, #cbd5e1)']
                : 'linear-gradient(to bottom, #cbd5e1, #94a3b8)'
            }}
            transition={{ duration: 1, repeat: isThinking ? Infinity : 0 }}
          >
            {/* Enhanced Central Orange Circle */}
            <motion.div 
              className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full border-2 border-orange-600 shadow-md"
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(251, 146, 60, 0.4)',
                  '0 0 0 6px rgba(251, 146, 60, 0.1)',
                  '0 0 0 0 rgba(251, 146, 60, 0.4)'
                ],
                rotate: isWaving ? [0, 360] : 0
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity },
                rotate: { duration: 2, repeat: isWaving ? Infinity : 0 }
              }}
            />
            
            {/* Smart Red Light */}
            <motion.div 
              className="absolute top-2 right-2 w-2 h-3 rounded-sm"
              animate={{ 
                backgroundColor: isThinking 
                  ? ['#ef4444', '#22c55e', '#3b82f6', '#ef4444']
                  : ['#ef4444', '#dc2626', '#ef4444']
              }}
              transition={{ 
                duration: isThinking ? 2 : 1.5, 
                repeat: Infinity 
              }}
            />
            
            {/* Enhanced body details */}
            <motion.div 
              className="absolute bottom-2 left-2 w-2 h-2 bg-slate-600 rounded"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-2 right-2 w-2 h-2 bg-slate-600 rounded"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          {/* Enhanced Waving Arms */}
          <motion.div 
            className="absolute top-8 -left-6 w-4 h-8 bg-gradient-to-b from-slate-400 to-slate-500 rounded-lg border border-slate-600"
            animate={isWaving ? {
              rotate: [0, -60, 60, -60, 60, -30, 30, 0],
              x: [0, -3, 3, -3, 3, -1, 1, 0],
              scaleY: [1, 1.1, 1, 1.1, 1]
            } : { rotate: -15 }}
            transition={{ 
              duration: isWaving ? 3 : 0.5, 
              repeat: isWaving ? Infinity : 0,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: 'top center' }}
          >
            {/* Enhanced Hand */}
            <motion.div 
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-600 rounded-full border border-slate-700"
              animate={isWaving ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: isWaving ? Infinity : 0 }}
            />
          </motion.div>
          
          <motion.div 
            className="absolute top-8 -right-6 w-4 h-8 bg-gradient-to-b from-slate-400 to-slate-500 rounded-lg border border-slate-600"
            animate={{ rotate: [15, 20, 10, 15] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Enhanced Hand */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-slate-600 rounded-full border border-slate-700" />
          </motion.div>

          {/* Enhanced Legs with movement */}
          {[0, 1].map((index) => (
            <motion.div 
              key={index}
              className={`absolute -bottom-6 ${index === 0 ? 'left-2' : 'right-2'} w-3 h-8 bg-gradient-to-b from-slate-400 to-slate-500 rounded-lg border border-slate-600`}
              animate={{ 
                scaleY: [1, 1.05, 1],
                rotate: [0, index === 0 ? -1 : 1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              {/* Enhanced Foot */}
              <motion.div 
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-slate-600 rounded border border-slate-700"
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Smart Greeting Speech Bubble */}
        <AnimatePresence>
          {showGreeting && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0, x: 20 }}
              className="absolute right-24 top-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-2xl shadow-2xl border-2 border-cyan-200 dark:border-cyan-600 w-64 z-10"
            >
              <div className="flex items-center space-x-2 mb-2">
                <motion.span 
                  className="text-sm"
                  animate={{ rotate: isThinking ? [0, 360] : 0 }}
                  transition={{ duration: 1, repeat: isThinking ? Infinity : 0 }}
                >
                  🤖
                </motion.span>
                <span className="font-bold text-sm text-cyan-600">{currentMsg.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowGreeting(false);
                  }}
                  className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={14} />
                </button>
              </div>
              
              <motion.p 
                className="text-sm mb-3 leading-relaxed"
                key={currentMessage} // Re-animate when message changes
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentMsg.message}
              </motion.p>
              
              <div className="flex space-x-2">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    currentMsg.actionFunction();
                    setIsWaving(true);
                    setTimeout(() => setIsWaving(false), 2000);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
                >
                  {currentMsg.action} ✨
                </motion.button>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center space-x-1 mt-3">
                {smartMessages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentMessage ? 'bg-cyan-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    animate={index === currentMessage ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>

              {/* Arrow pointing to robot */}
              <div className="absolute right-[-6px] top-6 w-0 h-0 border-l-[6px] border-l-white dark:border-l-gray-800 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced hover tooltip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute right-24 top-12 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none"
        >
          Hi! I'm ArjunAI! Click for tips! �✨
          <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[4px] border-l-gray-900 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}