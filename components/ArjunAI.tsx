'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Wand2 } from 'lucide-react';
import { JapaneseColors, JapaneseShadows } from '../lib/japaneseColors';

export default function ArjunAI() {
  const [isActive, setIsActive] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [userInteractions, setUserInteractions] = useState(0);

  const scrollToSection = (sectionId: string) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        return true;
      }
      return false;
    } catch (error) {
      console.log('ArjunAI: Scroll error:', error);
      return false;
    }
  };

  const smartMessages = [
    {
      title: "Welcome, Traveler",
      message: "I am the digital samurai of this portfolio. Let me guide you through Arjun's mastery of code and innovation. Shall we begin?",
      action: "Begin Journey",
      actionFunction: () => scrollToSection('about')
    },
    {
      title: "Skill & Craft",
      message: "Like a samurai perfecting their blade, Arjun has honed expertise in Python, Machine Learning, and React. Excellence through discipline.",
      action: "View Skills",
      actionFunction: () => scrollToSection('about')
    },
    {
      title: "Projects of Honor",
      message: "Each project represents a quest completed with honor. From data pipelines to AI assistants, witness the path of a tech warrior.",
      action: "See Quests",
      actionFunction: () => scrollToSection('projects')
    },
    {
      title: "The Code Path",
      message: "Experience: Labmentix, YARA Fertilizers, Accenture. Each step on the path of the warrior has forged greater strength.",
      action: "Read History",
      actionFunction: () => scrollToSection('experience')
    },
    {
      title: "Connect With Honor",
      message: "A true samurai is always open to collaboration. Send a message and let's forge something extraordinary together.",
      action: "Contact",
      actionFunction: () => scrollToSection('contact')
    }
  ];

  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        setShowGreeting(true);
        setIsActive(true);
        setHasGreeted(true);
      }, 2000);

      return () => clearTimeout(timer);
    }

    const messageInterval = setInterval(() => {
      if (showGreeting && !isThinking) {
        setIsThinking(true);
        
        setTimeout(() => {
          setCurrentMessage(prev => (prev + 1) % smartMessages.length);
          setIsThinking(false);
        }, 1500);
      }
    }, 20000);

    return () => clearInterval(messageInterval);
  }, [hasGreeted, showGreeting, isThinking, smartMessages.length]);

  const handleSamuraiClick = () => {
    setUserInteractions(prev => prev + 1);
    setShowGreeting(true);
    setIsActive(true);
    
    setIsThinking(true);
    setTimeout(() => {
      setCurrentMessage(prev => (prev + 1) % smartMessages.length);
      setIsThinking(false);
    }, 500);
  };

  const currentMsg = smartMessages[currentMessage];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Samurai Character */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring", 
          damping: 12, 
          stiffness: 100,
          delay: 0.5 
        }}
        className="relative cursor-pointer"
        onClick={handleSamuraiClick}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isActive 
              ? [
                  `0 0 20px ${JapaneseColors.sakuraPink}40`,
                  `0 0 40px ${JapaneseColors.sakuraPink}60`,
                  `0 0 20px ${JapaneseColors.sakuraPink}40`
                ]
              : `0 0 10px ${JapaneseColors.midnightBlue}20`
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Main Character Container */}
        <motion.div
          animate={{ 
            y: isActive ? [0, -8, 0] : 0,
            rotate: isThinking ? [0, -3, 3, 0] : 0
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 1, repeat: isThinking ? Infinity : 0 }
          }}
          className="relative w-20 h-24 sm:w-24 sm:h-32"
        >
          {/* Katana Sword */}
          <motion.div
            className="absolute -left-3 sm:-left-4 top-2 sm:top-3"
            animate={{ rotate: isActive ? [0, -10, 0] : 0 }}
            transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
            style={{ transformOrigin: 'bottom center' }}
          >
            <div 
              className="w-1 sm:w-1.5 h-12 sm:h-16"
              style={{
                background: `linear-gradient(180deg, ${JapaneseColors.gold} 0%, #a89968 50%, ${JapaneseColors.gold} 100%)`,
                boxShadow: `0 0 10px ${JapaneseColors.gold}80`,
                borderRadius: '50% 50% 0 0'
              }}
            />
            {/* Sword Guard */}
            <div 
              className="w-8 h-2 sm:w-10 sm:h-2.5 mx-auto -mt-1"
              style={{
                background: `linear-gradient(90deg, #8B0000 0%, #DC143C 50%, #8B0000 100%)`,
                boxShadow: JapaneseShadows.elevated,
                borderRadius: '4px'
              }}
            />
          </motion.div>

          {/* Head - Samurai Helmet (Kabuto) */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-8 sm:h-10 rounded-t-2xl"
            style={{
              background: `linear-gradient(180deg, ${JapaneseColors.midnightBlue} 0%, #0f0f3d 100%)`,
              boxShadow: `0 -2px 8px ${JapaneseColors.gold}40, ${JapaneseShadows.deep}`,
              border: `2px solid ${JapaneseColors.gold}`
            }}
          >
            {/* Helmet Crest */}
            <motion.div 
              className="absolute -top-3 left-1/2 transform -translate-x-1/2"
              animate={{ 
                rotateZ: isActive ? [-5, 5, -5] : 0
              }}
              transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
            >
              <div 
                className="w-2 h-6 sm:w-3 sm:h-8"
                style={{
                  background: `linear-gradient(180deg, ${JapaneseColors.sakuraPink} 0%, ${JapaneseColors.gold} 100%)`,
                  clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)',
                  filter: `drop-shadow(0 0 6px ${JapaneseColors.sakuraPink}80)`
                }}
              />
            </motion.div>

            {/* Eyes */}
            <div className="flex justify-center space-x-2 pt-1.5 sm:pt-2">
              {[0, 1].map((i) => (
                <motion.div 
                  key={i}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${JapaneseColors.gold} 0%, #FFA500 100%)`,
                    boxShadow: `0 0 6px ${JapaneseColors.gold}80`
                  }}
                  animate={{
                    scale: isThinking ? [1, 1.3, 1] : 1,
                    opacity: isThinking ? [1, 0.6, 1] : 1
                  }}
                  transition={{ duration: 0.5, repeat: isThinking ? Infinity : 0, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Body - Armor (Do) */}
          <div 
            className="absolute top-7 sm:top-9 left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-lg"
            style={{
              background: `linear-gradient(135deg, #2c1810 0%, #1a0f0a 100%)`,
              boxShadow: `inset -2px -2px 8px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6), 0 0 15px ${JapaneseColors.sakuraPink}30`,
              border: `2px solid ${JapaneseColors.gold}`
            }}
          >
            {/* Armor Details */}
            <div className="absolute top-1 left-2 sm:left-3 w-6 h-1 sm:w-8 sm:h-1.5"
              style={{
                background: `linear-gradient(90deg, ${JapaneseColors.gold}80 0%, transparent 100%)`,
                borderRadius: '50%'
              }}
            />
            <div className="absolute top-4 left-1 sm:top-5 sm:left-2 w-7 h-1 sm:w-10 sm:h-1.5"
              style={{
                background: `linear-gradient(90deg, ${JapaneseColors.gold}60 0%, transparent 100%)`,
                borderRadius: '50%'
              }}
            />
            
            {/* Center Gem */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${JapaneseColors.sakuraPink}, #8B0000)`,
                boxShadow: `0 0 12px ${JapaneseColors.sakuraPink}80, inset -1px -1px 3px rgba(0,0,0,0.8)`
              }}
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
                opacity: isActive ? [0.8, 1, 0.8] : 0.6
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Arms */}
          {[0, 1].map((side) => (
            <motion.div
              key={side}
              className={`absolute top-7 sm:top-9 w-2.5 h-8 sm:w-3.5 sm:h-11 rounded-full ${side === 0 ? '-left-3 sm:-left-4' : '-right-3 sm:-right-4'}`}
              style={{
                background: `linear-gradient(90deg, #2c1810 0%, #1a0f0a 100%)`,
                boxShadow: JapaneseShadows.medium
              }}
              animate={{
                rotate: side === 0 ? [isActive ? -20 : -30, isActive ? -40 : -30] : [isActive ? 20 : 30, isActive ? 40 : 30],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ))}

          {/* Legs */}
          {[0, 1].map((side) => (
            <motion.div
              key={`leg-${side}`}
              className={`absolute -bottom-1 w-2.5 h-6 sm:w-3.5 sm:h-8 rounded-sm ${side === 0 ? 'left-2 sm:left-3' : 'right-2 sm:right-3'}`}
              style={{
                background: `linear-gradient(90deg, #1a0f0a 0%, #2c1810 100%)`,
                boxShadow: JapaneseShadows.soft
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="absolute right-24 sm:right-32 bottom-2 sm:bottom-4 w-60 sm:w-72 z-10"
          >
            {/* Card with Japanese aesthetic */}
            <div 
              className="p-4 sm:p-5 rounded-2xl border-2"
              style={{
                background: `linear-gradient(135deg, rgba(25, 25, 112, 0.95) 0%, rgba(143, 188, 143, 0.1) 100%)`,
                borderColor: JapaneseColors.sakuraPink,
                boxShadow: `${JapaneseShadows.elevated}, 0 0 30px ${JapaneseColors.sakuraPink}40`
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <motion.div 
                  className="flex items-center gap-2"
                  animate={{ rotate: isThinking ? [0, 360] : 0 }}
                  transition={{ duration: 1, repeat: isThinking ? Infinity : 0 }}
                >
                  <Wand2 size={16} className="sm:w-5 sm:h-5" style={{ color: JapaneseColors.gold }} />
                  <span className="font-bold text-xs sm:text-sm" style={{ color: JapaneseColors.sakuraPink }}>
                    {currentMsg.title}
                  </span>
                </motion.div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowGreeting(false);
                  }}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Message */}
              <motion.p 
                className="text-xs sm:text-sm mb-4 leading-relaxed text-gray-100"
                key={currentMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentMsg.message}
              </motion.p>

              {/* Action Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  currentMsg.actionFunction();
                  setIsActive(true);
                  setTimeout(() => setIsActive(false), 2000);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-white transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${JapaneseColors.sakuraPink} 0%, ${JapaneseColors.gold} 100%)`,
                  boxShadow: `0 0 15px ${JapaneseColors.sakuraPink}60`
                }}
              >
                {currentMsg.action} ⚔️
              </motion.button>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-1.5 mt-3">
                {smartMessages.map((_, index) => (
                  <motion.div
                    key={index}
                    className="rounded-full"
                    style={{
                      width: index === currentMessage ? '8px' : '4px',
                      height: '4px',
                      background: index === currentMessage ? JapaneseColors.sakuraPink : JapaneseColors.gold + '40',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              {/* Pointer Arrow */}
              <div 
                className="absolute -right-2 bottom-4 sm:bottom-6 w-0 h-0"
                style={{
                  borderLeft: `8px solid ${JapaneseColors.sakuraPink}`,
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  filter: `drop-shadow(0 0 8px ${JapaneseColors.sakuraPink}60)`
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Tooltip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute bottom-24 sm:bottom-32 right-0 px-3 py-2 rounded-lg text-xs whitespace-nowrap pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${JapaneseColors.midnightBlue}, ${JapaneseColors.sakuraPink})`,
          color: 'white',
          boxShadow: JapaneseShadows.elevated
        }}
      >
        Click the Samurai for guidance ⚔️
      </motion.div>
    </div>
  );
}