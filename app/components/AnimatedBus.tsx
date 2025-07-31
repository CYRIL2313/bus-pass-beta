'use client';

export default function AnimatedBus() {
  return (
    <div className="relative w-full h-32 overflow-hidden mb-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-bounce">
          <svg
            viewBox="0 0 200 80"
            className="w-48 h-20 text-blue-600"
            fill="currentColor"
          >
            {/* Bus body */}
            <rect x="20" y="25" width="140" height="35" rx="8" className="fill-blue-500" />
            
            {/* Bus windows */}
            <rect x="30" y="30" width="25" height="15" rx="2" className="fill-blue-200" />
            <rect x="60" y="30" width="25" height="15" rx="2" className="fill-blue-200" />
            <rect x="90" y="30" width="25" height="15" rx="2" className="fill-blue-200" />
            <rect x="120" y="30" width="25" height="15" rx="2" className="fill-blue-200" />
            
            {/* Bus front */}
            <rect x="160" y="30" width="15" height="25" rx="8" className="fill-blue-600" />
            
            {/* Wheels */}
            <circle cx="40" cy="65" r="8" className="fill-gray-800" />
            <circle cx="130" cy="65" r="8" className="fill-gray-800" />
            <circle cx="40" cy="65" r="4" className="fill-gray-400" />
            <circle cx="130" cy="65" r="4" className="fill-gray-400" />
            
            {/* Headlights */}
            <circle cx="170" cy="35" r="3" className="fill-yellow-300" />
            <circle cx="170" cy="45" r="3" className="fill-yellow-300" />
          </svg>
        </div>
      </div>
      
      {/* Road lines */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700">
        <div className="h-full w-full bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400 opacity-60 animate-pulse"></div>
      </div>
    </div>
  );
}