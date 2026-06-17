'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses = {
  primary:
    'bg-yellow text-anthracite hover:bg-yellow-dark border-2 border-yellow hover:border-yellow-dark',
  secondary:
    'bg-blue text-white hover:bg-blue-light border-2 border-blue hover:border-blue-light',
  outline:
    'bg-transparent text-white border-2 border-white hover:bg-white hover:text-anthracite',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-sans font-semibold rounded transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow';

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={allClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={allClasses}>
      {children}
    </button>
  );
}
