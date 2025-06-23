import React from 'react';

interface FeelingLuckyButtonProps {
  onClick: () => void;
}

export const FeelingLuckyButton: React.FC<FeelingLuckyButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-lg flex items-center justify-center text-2xl hover:shadow-xl transition-shadow z-50"
      aria-label="I'm feeling lucky"
    >
      🎲
    </button>
  );
}; 