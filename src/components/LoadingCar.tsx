export function LoadingCar({message}: {message: string}) {

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/5 backdrop-blur-xs">
      <div className="flex flex-col items-center justify-center p-6 bg-mist-50/90 rounded-lg border border-gray-100 min-w-62">
        <div className="relative w-32 h-12 overflow-hidden mb-4">
          <div className="text-4xl absolute animate-drive-left right-0">🚗</div>
          <div className="absolute bottom-0 w-full h-0.5 bg-gray-200"></div>
        </div>
        <p className="text-gray-600 font-bold tracking-tight animate-pulse text-center">{message}</p>

        <style>{`
          @keyframes drive-left {
            0% { transform: translateX(150%); }
            100% { transform: translateX(-250%); }
          }
          .animate-drive-left {
            animation: drive-left 2s linear infinite;
          }  
        `}</style>
      </div>
    </div>
  );
}