import {
  CHECKERBOARD_SQUARES,
  CORNER_PATHS,
  type CornerPosition,
} from '../utils/lgpsmLogic';

interface CornerBracketProps {
  position: CornerPosition;
  className?: string;
}

export function CornerBracketSvg({ position, className = 'text-current' }: CornerBracketProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`lgpsm-corner ${className}`.trim()}
    >
      <path
        d={CORNER_PATHS[position]}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function CheckerboardSvg() {
  return (
    <svg
      viewBox="0 0 36 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="lgpsm-checker inline-block align-middle translate-y-0.5 shrink-0 text-current"
    >
      {CHECKERBOARD_SQUARES.map((sq) => (
        <rect
          key={sq.id}
          x={sq.x}
          y={sq.y}
          width={sq.size}
          height={sq.size}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export function WireframeGlobeSvg({ className = 'text-current' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`lgpsm-globe shrink-0 ${className}`.trim()}
    >
      {/* Outer circle r=28 */}
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Equator line */}
      <line
        x1="4"
        y1="32"
        x2="60"
        y2="32"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* 2 horizontal ellipses */}
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="10"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="20"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Meridian line */}
      <line
        x1="32"
        y1="4"
        x2="32"
        y2="60"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* 2 vertical ellipses */}
      <ellipse
        cx="32"
        cy="32"
        rx="10"
        ry="28"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="20"
        ry="28"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
