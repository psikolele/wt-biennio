"use client";

interface PasswordToggleIconProps {
  isVisible: boolean;
  className?: string;
}

export function PasswordToggleIcon({ isVisible, className = "w-5 h-5" }: PasswordToggleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95`}
      aria-hidden="true"
    >
      {isVisible ? (
        <g className="transition-all duration-300 origin-center">
          {/* Occhio aperto vivo e attento */}
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
          {/* Pupilla con riflesso lucido */}
          <circle cx="12" cy="12" r="3.2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" />
          <circle cx="13.2" cy="10.8" r="1.1" fill="white" stroke="none" />
        </g>
      ) : (
        <g className="transition-all duration-300 origin-center">
          {/* Occhio chiuso socchiuso/ammiccante con ciglia */}
          <path d="M3 10.5c2.5 3.8 5.8 5.5 9 5.5s6.5-1.7 9-5.5" />
          {/* Ciglia sorridenti */}
          <path d="M5.5 12.8l-1.5 2.2" />
          <path d="M8.8 14.8l-0.8 2.5" />
          <path d="M12 16v2.8" />
          <path d="M15.2 14.8l0.8 2.5" />
          <path d="M18.5 12.8l1.5 2.2" />
        </g>
      )}
    </svg>
  );
}
