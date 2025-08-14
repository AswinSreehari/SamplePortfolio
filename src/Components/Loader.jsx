import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Initializing...');

  // Loading tasks to display during loading
  const loadingTasks = [
    'Initializing application...',
    'Loading resources...',
    'Setting up components...',
    'Preparing user interface...',
    'Almost ready...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        
        // Update current task based on progress
        const taskIndex = Math.floor((prev / 100) * loadingTasks.length);
        if (taskIndex < loadingTasks.length) {
          setCurrentTask(loadingTasks[taskIndex]);
        }
        
        // Simulate realistic loading with variable speed
        const increment = Math.random() * 8 + 2; // Faster increment for 2-second duration
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Static positioned particles with glow effect - Now 40 particles!
  const staticParticlePositions = [
    { left: 10, top: 20 }, { left: 20, top: 40 }, { left: 30, top: 60 }, { left: 40, top: 80 },
    { left: 50, top: 10 }, { left: 60, top: 30 }, { left: 70, top: 50 }, { left: 80, top: 70 },
    { left: 90, top: 90 }, { left: 15, top: 25 }, { left: 25, top: 45 }, { left: 35, top: 65 },
    { left: 45, top: 85 }, { left: 55, top: 15 }, { left: 65, top: 35 }, { left: 75, top: 55 },
    { left: 85, top: 75 }, { left: 95, top: 95 }, { left: 12, top: 22 }, { left: 22, top: 42 },
    // Additional 20 particles for more density
    { left: 5, top: 10 }, { left: 18, top: 55 }, { left: 33, top: 30 }, { left: 48, top: 75 },
    { left: 62, top: 20 }, { left: 77, top: 60 }, { left: 89, top: 15 }, { left: 96, top: 33 },
    { left: 7, top: 48 }, { left: 23, top: 78 }, { left: 38, top: 12 }, { left: 52, top: 50 },
    { left: 67, top: 85 }, { left: 80, top: 25 }, { left: 91, top: 68 }, { left: 13, top: 68 },
    { left: 26, top: 93 }, { left: 41, top: 38 }, { left: 56, top: 18 }, { left: 71, top: 43 }
  ];

  const particles = staticParticlePositions.map((pos, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-70"
      style={{
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        animation: `glowParticle 3s ease-in-out ${i * 0.15}s infinite`,
        boxShadow: '0 0 10px rgb(96 165 250), 0 0 20px rgb(96 165 250), 0 0 30px rgb(96 165 250)',
        filter: 'drop-shadow(0 0 8px rgb(96 165 250))'
      }}
    />
  ));

  // Calculate circle properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      {/* CSS Animations - Added glow particle animation */}
      <style>
        {`
          @keyframes glowParticle {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.8;
              box-shadow: 0 0 8px rgb(96 165 250), 0 0 16px rgb(96 165 250), 0 0 24px rgb(96 165 250);
            }
            25% { 
              transform: translateY(-5px) scale(1.1); 
              opacity: 1;
              box-shadow: 0 0 12px rgb(147 197 253), 0 0 24px rgb(147 197 253), 0 0 36px rgb(147 197 253);
            }
            50% { 
              transform: translateY(-10px) scale(1.2); 
              opacity: 1;
              box-shadow: 0 0 16px rgb(59 130 246), 0 0 32px rgb(59 130 246), 0 0 48px rgb(59 130 246);
            }
            75% { 
              transform: translateY(-5px) scale(1.1); 
              opacity: 1;
              box-shadow: 0 0 12px rgb(147 197 253), 0 0 24px rgb(147 197 253), 0 0 36px rgb(147 197 253);
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes loadingBarMove {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 0%; }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-10px); }
            70% { transform: translateY(-5px); }
            90% { transform: translateY(-2px); }
          }
          
          .spin-animation { animation: spin 3s linear infinite; }
          .loading-bar-animation { animation: loadingBarMove 2s ease-in-out infinite; }
          .shimmer-animation { animation: shimmer 2s ease-in-out infinite; }
          .fade-animation { animation: fadeInOut 2s ease-in-out infinite; }
          .bounce-animation { animation: bounce 1.4s ease-in-out infinite; }
        `}
      </style>

      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {particles}
        </div>

        {/* Main loading content */}
        <div className="relative z-10 text-center text-white max-w-lg mx-auto px-6">
          
          {/* Logo/Brand area */}
          <div className="mb-12">
            <h1 className="text-4xl h-11 font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Loading
            </h1>
          </div>

          {/* Animated progress ring with percentage */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 0.3s ease-out'
                }}
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Percentage display in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">
                  {Math.round(progress)}
                  <span className="text-2xl text-blue-300">%</span>
                </div>
                <div className="text-sm text-blue-200 font-medium">KPMG</div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto animate-pulse mt-2"></div>
              </div>
            </div>
          </div>

          {/* Loading bar */}
          <div className="mb-8">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-animation"></div>
              </div>
            </div>
          </div>

          {/* Loading text */}
          <div className="mb-8 h-6">
            <p className="text-lg text-blue-200 fade-animation">
              {currentTask}
            </p>
          </div>

          {/* Loading dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-3 h-3 bg-blue-400 rounded-full bounce-animation"
                style={{ 
                  animationDelay: `${index * 0.2}s`
                }}
              />
            ))}
          </div>

          {/* Progress text */}
          {/* {progress === 100 && (
            <div className="mt-6 animate-fade-in">
              <div className="text-xl font-semibold text-green-400 mb-2">
                ✓ Ready!
              </div>
            </div>
          )} */}

        </div>
      </div>
    </>
  );
};

export default Loader;
