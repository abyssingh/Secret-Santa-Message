import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icons (Inline SVGs for high compatibility) ---
const CrownIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-white/80">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// --- Particle Components ---

const Confetti = () => {
  const particles = useMemo(() => [...Array(40)].map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * -100 - 50,
    size: Math.random() * 10 + 5,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.5,
    type: Math.random() > 0.5 ? 'star' : 'snow',
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: "50vw", y: "100vh", scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            x: `calc(50vw + ${p.x}vw)`,
            y: `calc(50vh + ${p.y}vh)`,
            scale: [0, 1, 1.2, 0.8],
            rotate: p.rotation + 360
          }}
          transition={{
            duration: 3,
            delay: p.delay,
            ease: "easeOut"
          }}
          className="absolute text-white/40 flex items-center justify-center text-lg"
        >
          {p.type === 'star' ? '✨' : '❄️'}
        </motion.div>
      ))}
    </div>
  );
};

const QueenSparkles = () => {
  const sparkles = useMemo(() => [...Array(12)].map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    angle: (i / 12) * Math.PI * 2,
    dist: 60 + Math.random() * 40
  })), []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: Math.cos(s.angle) * s.dist,
            y: Math.sin(s.angle) * s.dist
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut"
          }}
          className="absolute w-1.5 h-1.5 bg-yellow-100 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

const StarField = () => {
  const stars = useMemo(() =>
    [...Array(80)].map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1.2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 3,
    })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-0 shadow-[0_0_10px_rgba(255,255,255,1)]"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};


const GlowingMoon = ({ scale = 1, glowIntensity = 1 }) => (
  <motion.div
    className="relative flex items-center justify-center"
    animate={{ 
      scale: scale,
      filter: `drop-shadow(0 0 ${25 * glowIntensity}px rgba(255, 255, 255, 0.3))`
    }}
    transition={{ duration: 2, ease: "easeInOut" }}
  >
    <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 rounded-full relative shadow-inner overflow-hidden border border-white/10">
      <div className="absolute top-4 left-8 w-6 h-6 bg-slate-500/20 rounded-full" />
      <div className="absolute top-12 left-16 w-10 h-10 bg-slate-500/10 rounded-full" />
      <div className="absolute bottom-10 left-6 w-8 h-8 bg-slate-500/15 rounded-full" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
    </div>
    <motion.div
      className="absolute inset-0 bg-white/5 rounded-full blur-2xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const MysteryBox = ({ onOpen, isOpen }) => {
  return (
    <motion.div 
      className="relative cursor-pointer group"
      whileHover={!isOpen ? { scale: 1.05 } : {}}
      onClick={!isOpen ? onOpen : undefined}
    >
      <div className="w-40 h-40 md:w-56 md:h-56 relative flex items-center justify-center">
        <motion.div
          className="absolute z-20 w-full h-1/2 top-0 bg-slate-800 border-2 border-slate-600 rounded-t-lg shadow-xl"
          animate={isOpen ? { y: -100, rotateX: -45, opacity: 0 } : { y: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-full bg-slate-400 shadow-sm" />
        </motion.div>
        
        <motion.div
          className="absolute z-10 w-full h-1/2 bottom-0 bg-slate-900 border-2 border-slate-700 rounded-b-lg shadow-2xl"
          animate={isOpen ? { scale: 0.8, opacity: 0 } : { scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-full bg-slate-500/50" />
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 4, opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute z-0 w-20 h-20 bg-white rounded-full blur-3xl"
            />
          )}
        </AnimatePresence>
      </div>
      {!isOpen && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-slate-400 font-light tracking-[0.2em] uppercase text-[10px]"
        >
          Tap to unveil
        </motion.p>
      )}
    </motion.div>
  );
};

const ScreenWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 relative overflow-hidden"
  >
    {children}
  </motion.div>
);

export default function App() {
  const [step, setStep] = useState(1);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [riddleInput, setRiddleInput] = useState("");
  const [riddleError, setRiddleError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const handleBoxOpen = () => {
    setIsBoxOpen(true);
    setTimeout(() => {
      nextStep();
    }, 2500); 
  };

  const handleSolveRiddle = (e) => {
    e.preventDefault();
    if (riddleInput.toLowerCase().trim() === "queen") {
      setRiddleError(false);
      nextStep();
    } else {
      setRiddleError(true);
      setTimeout(() => setRiddleError(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-white/10 overflow-hidden fixed inset-0 flex flex-col items-center justify-center">
      <StarField />
      {showConfetti && <Confetti />}
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <ScreenWrapper key="step1">
            <GlowingMoon />
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              className="mt-12 space-y-4"
            >
              <motion.h1 
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="text-4xl md:text-6xl font-light tracking-tight text-white"
              >
                Hello, Donna
              </motion.h1>
              <motion.p 
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto"
              >
                Under this moonlit sky,<br />
                something special has been waiting for you.
              </motion.p>
              <motion.p 
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="text-slate-500 italic font-light text-sm"
              >
                Before anything else… just know — this was made just for you.
              </motion.p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              onClick={nextStep}
              className="mt-12 group flex items-center space-x-2 px-10 py-3 rounded-full border border-slate-700 bg-white/5 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm shadow-xl"
            >
              <span className="text-xs tracking-[0.2em] uppercase font-light">Secret Message from Secret Santa</span>
            </motion.button>
          </ScreenWrapper>
        )}

        {step === 2 && (
          <ScreenWrapper key="step2">
             <div className="relative flex flex-col items-center">
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute w-40 h-40 bg-white/5 rounded-full blur-3xl"
                />
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-light tracking-[0.3em] text-slate-300 uppercase text-center"
                >
                    Entering the mystery...
                </motion.p>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "240px" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    onAnimationComplete={nextStep}
                    className="h-[1px] bg-gradient-to-r from-transparent via-slate-500 to-transparent mt-6"
                />
             </div>
          </ScreenWrapper>
        )}

        {step === 3 && (
          <ScreenWrapper key="step3">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-12 space-y-2"
            >
                <p className="text-slate-400 font-light tracking-wide italic">Some secrets are loud.</p>
                <p className="text-2xl font-light tracking-widest">This one prefers moonlight ✨</p>
            </motion.div>

            <MysteryBox isOpen={isBoxOpen} onOpen={handleBoxOpen} />

            <motion.div
                animate={{ opacity: isBoxOpen ? 0 : 1 }}
                className="mt-12"
            >
                <p className="text-slate-500 font-light text-lg text-center">
                    Go on, <span className="text-slate-200">Donna…</span><br />
                    open it.
                </p>
            </motion.div>
          </ScreenWrapper>
        )}

        {step === 4 && (
          <ScreenWrapper key="step4">
            <div className="max-w-2xl w-full flex flex-col items-center space-y-12">
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={{ visible: { transition: { staggerChildren: 1 } } }} 
                    className="space-y-6 text-center"
                >
                    <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-slate-500 text-[10px] tracking-[0.5em] uppercase font-light">The Mystery Riddle</motion.p>
                    <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-xl md:text-2xl font-light text-slate-300 italic leading-relaxed">
                        "You claim the title of a Princess,<br/>
                        but the moon knows a deeper truth."
                    </motion.p>
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-2xl md:text-3xl font-light text-white tracking-wide mt-4 leading-snug">
                        What is higher than a Princess,<br/>
                        but glows like the night you adore?
                    </motion.h2>
                </motion.div>

                <motion.form 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 2.5 }}
                  onSubmit={handleSolveRiddle}
                  className="w-full max-w-xs space-y-8"
                >
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Your answer..."
                            value={riddleInput}
                            onChange={(e) => setRiddleInput(e.target.value)}
                            className={`w-full bg-transparent border-b ${riddleError ? 'border-red-500' : 'border-slate-700'} focus:border-white py-4 text-center text-2xl font-light outline-none transition-all duration-500 tracking-[0.3em] uppercase placeholder:text-slate-800 placeholder:italic placeholder:tracking-normal`}
                            autoFocus
                        />
                        {riddleError && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-0 right-0 text-red-500/60 text-[10px] uppercase tracking-widest font-light">
                            Try looking at yourself through my eyes...
                          </motion.p>
                        )}
                    </div>
                    <button type="submit" className="px-10 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.4em] uppercase hover:bg-white/10 transition-all active:scale-95">
                        Unlock the truth
                    </button>
                </motion.form>
            </div>
          </ScreenWrapper>
        )}

        {step === 5 && (
          <ScreenWrapper key="step5">
            <div className="max-w-3xl w-full flex flex-col items-center space-y-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 1.5 } } }}
                    className="flex flex-col items-center w-full"
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-4 text-center">
                        <p className="text-slate-400 font-light text-lg">While you call yourself a Princess, Donna...</p>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight">
                            I truly think you are a <br/>
                            <span className="relative inline-block mt-4 pb-2">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 1.2 }}
                                    className="text-white font-normal relative z-10"
                                >
                                    Queen 👑
                                </motion.span>
                                
                                <QueenSparkles />
                                
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: -45 }}
                                    transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                                >
                                    <CrownIcon className="w-10 h-10 md:w-12 md:h-12 text-yellow-100/30 drop-shadow-[0_0_15px_rgba(254,240,138,0.3)]" />
                                </motion.div>

                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 1.2, duration: 1 }}
                                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                />
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div 
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="mt-12 py-10 italic text-2xl md:text-3xl text-slate-300 font-light border-y border-white/5 w-full leading-relaxed text-center"
                    >
                        “Tum husn pari, tum jaane jahaan.<br />
                        Tum sabse haseen, tum sabse jawaan.”
                    </motion.div>

                    <motion.button
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextStep}
                        className="mt-14 group flex flex-col items-center space-y-4 cursor-pointer"
                    >
                        <div className="px-10 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center space-x-3 group-hover:bg-white/10 transition-all duration-300 shadow-lg">
                           <HeartIcon />
                           <span className="text-[10px] tracking-[0.4em] uppercase font-light">But there is more...</span>
                        </div>
                        <p className="text-slate-500 text-[9px] tracking-[0.3em] uppercase italic opacity-40">A whisper from your Secret Santa</p>
                    </motion.button>
                </motion.div>
            </div>
          </ScreenWrapper>
        )}

        {step === 6 && (
          <ScreenWrapper key="step6">
            <div className="max-w-2xl w-full flex flex-col items-center justify-center space-y-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 2.2 } } }}
                    className="flex flex-col items-center space-y-10 w-full"
                >
                    <motion.div 
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="space-y-6 text-slate-200 font-light leading-relaxed text-xl md:text-2xl italic max-w-xl text-center"
                    >
                        <p>
                            "I may not know all your pains or sorrows, but I have always felt 
                            that you carry the heart of a Queen within you." 
                        </p>
                        <p className="text-slate-400 not-italic text-lg md:text-xl font-light">
                            Your very first gesture of kindness is still etched in my memory.
                        </p>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="space-y-4 text-center">
                        <p className="text-xl md:text-2xl text-white font-light">Always have that liveliness and happiness.</p>
                        <p className="text-slate-400 italic text-lg font-light">
                            May all your dreams come true—<br/>
                            that is my wish for you.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        onAnimationComplete={() => setShowConfetti(true)}
                        className="pt-12 w-full flex flex-col items-center space-y-8"
                    >
                        <div className="w-16 h-[1px] bg-white/20" />
                        <div className="space-y-4 text-center">
                            <motion.p animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, repeat: Infinity }} className="text-slate-500 uppercase tracking-[0.6em] text-[10px]">From my heart to yours</motion.p>
                            <h3 className="text-4xl md:text-6xl font-light text-white tracking-tighter leading-tight">
                                Merry Christmas & <br/> Happy New Year ❄️
                            </h3>
                        </div>
                        <p className="text-slate-600 text-[9px] tracking-[0.4em] uppercase font-light mt-10 italic opacity-40">Some magic deserves a proper reveal.</p>
                    </motion.div>
                </motion.div>
            </div>
          </ScreenWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}