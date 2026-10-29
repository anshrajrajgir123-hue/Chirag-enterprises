import React from 'react';

export const BrandLogoMark: React.FC<{ className?: string }> = ({
  className = 'w-14 h-10',
}) => {
  return (
    <img
      src="/assets/chirag-logo.png"
      alt="Chirag Enterprises Logo"
      className={`${className} object-contain shrink-0`}
      loading="eager"
    />
  );
};
