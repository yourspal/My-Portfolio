'use client';

// src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden pt-20">
      {/* Animated Tech Icons Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* React Icon - Floating Animation */}
        <div className="absolute top-20 left-10 animate-float-slow">
          <div className="animate-spin-slow">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="2" fill="#61DAFB" opacity="0.8"/>
              <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" opacity="0.6"/>
              <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" opacity="0.6" transform="rotate(60 12 12)"/>
              <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" opacity="0.6" transform="rotate(120 12 12)"/>
            </svg>
          </div>
        </div>

        {/* .NET Icon - Floating Animation */}
        <div className="absolute top-32 right-16 animate-float-medium">
          <div className="animate-pulse">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#512BD4" opacity="0.8"/>
              <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#512BD4" opacity="0.8"/>
            </svg>
          </div>
        </div>

        {/* SQL Server Icon - Floating Animation */}
        <div className="absolute bottom-24 left-20 animate-float-fast">
          <div className="animate-bounce-slow">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="16" height="16" rx="2" fill="#CC2927" opacity="0.8"/>
              <path d="M8 8H16V10H8V8Z" fill="white"/>
              <path d="M8 12H16V14H8V12Z" fill="white"/>
              <path d="M8 16H12V18H8V16Z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Additional floating React icons */}
        <div className="absolute top-1/2 right-10 animate-float-slow" style={{ animationDelay: '1s' }}>
          <div className="animate-spin-slow">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="1.5" fill="#61DAFB" opacity="0.5"/>
              <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" strokeWidth="1" opacity="0.4"/>
              <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" strokeWidth="1" opacity="0.4" transform="rotate(60 12 12)"/>
              <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" strokeWidth="1" opacity="0.4" transform="rotate(120 12 12)"/>
            </svg>
          </div>
        </div>

        {/* Additional .NET icon */}
        <div className="absolute bottom-32 right-24 animate-float-medium" style={{ animationDelay: '0.5s' }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#512BD4" opacity="0.5"/>
            <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#512BD4" opacity="0.5"/>
          </svg>
        </div>

        {/* Azure Icon - Floating Animation */}
        <div className="absolute top-1/4 left-1/4 animate-float-medium" style={{ animationDelay: '1.5s' }}>
          <div className="animate-pulse">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0078D4" opacity="0.7"/>
              <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#0078D4" opacity="0.7"/>
            </svg>
          </div>
        </div>

        {/* GitHub Icon - Floating Animation */}
        <div className="absolute bottom-1/3 right-1/3 animate-float-slow" style={{ animationDelay: '2s' }}>
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#181717" opacity="0.7"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 animate-fade-in">
        <h1 className="text-6xl md:text-7xl font-bold mb-4">
          Hi, I'm <span className="text-blue-500 animate-pulse">Tarun</span>
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-gray-400 mb-2">
          Full Stack Developer
        </p>

        {/* Tech Stack Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 mb-8">
          <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full backdrop-blur-sm animate-slide-in-left">
            <span className="text-blue-400 font-semibold">React</span>
          </div>
          <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm animate-slide-in-up">
            <span className="text-purple-400 font-semibold">.NET Core</span>
          </div>
          <div className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full backdrop-blur-sm animate-slide-in-right">
            <span className="text-red-400 font-semibold">SQL Server</span>
          </div>
          <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full backdrop-blur-sm animate-slide-in-left" style={{ animationDelay: '0.8s' }}>
            <span className="text-cyan-400 font-semibold">Azure</span>
          </div>
          <div className="px-4 py-2 bg-gray-700/20 border border-gray-600/30 rounded-full backdrop-blur-sm animate-slide-in-up" style={{ animationDelay: '1s' }}>
            <span className="text-gray-300 font-semibold">GitHub</span>
          </div>
          <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full backdrop-blur-sm animate-slide-in-right" style={{ animationDelay: '1.2s' }}>
            <span className="text-green-400 font-semibold">Deployment</span>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <a 
            href="/projects" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          >
            View Projects
          </a>
          <a 
            href="/contact" 
            className="px-8 py-3 border border-gray-600 hover:border-gray-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800/50"
          >
            Contact Me
          </a>
        </div>
      </div>

    </section>
  );
}
  