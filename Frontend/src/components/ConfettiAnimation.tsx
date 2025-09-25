import React, { useEffect, useState, useMemo } from 'react';

interface ConfettiAnimationProps {
  show: boolean;
  colors?: string[];
}

interface Confetti {
  id: string;
  left: number;
  color: string;
  delay: number;
  size: number;
}

const DEFAULT_COLORS = ['#fbbf24', '#f59e0b', '#f97316', '#ec4899', '#8b5cf6'];

export function ConfettiAnimation({ show, colors }: ConfettiAnimationProps) {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  
  // Memoize colors to prevent unnecessary re-renders
  const confettiColors = useMemo(() => colors || DEFAULT_COLORS, [colors]);

  useEffect(() => {
    if (show) {
      const newConfetti: Confetti[] = [];
      for (let i = 0; i < 50; i++) {
        newConfetti.push({
          id: `confetti-${i}`,
          left: Math.random() * 100,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          delay: Math.random() * 3,
          size: Math.random() * 8 + 4,
        });
      }
      setConfetti(newConfetti);

      // Clear confetti after animation
      const timeout = setTimeout(() => {
        setConfetti([]);
      }, 6000);

      return () => clearTimeout(timeout);
    } else {
      // Clear confetti immediately when show becomes false
      setConfetti([]);
    }
  }, [show, confettiColors]);

  if (!show || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            animationDelay: `${piece.delay}s`,
            top: '-10px',
          }}
        />
      ))}
    </div>
  );
}