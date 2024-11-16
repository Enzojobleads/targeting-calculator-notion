import * as React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const getVariantClasses = (variant: BadgeProps['variant'] = 'default') => {
  switch (variant) {
    case 'secondary':
      return 'bg-gray-100 text-gray-900 hover:bg-gray-200';
    case 'destructive':
      return 'bg-red-100 text-red-900 hover:bg-red-200';
    case 'outline':
      return 'border border-gray-200 text-gray-900';
    default:
      return 'bg-blue-100 text-blue-900 hover:bg-blue-200';
  }
};

export function Badge({ 
  className = '', 
  variant = 'default', 
  ...props 
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${getVariantClasses(variant)} ${className}`}
      {...props}
    />
  );
}
