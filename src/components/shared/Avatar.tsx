interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const classes = `${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold shrink-0`;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${classes} object-cover`}
      />
    );
  }

  return (
    <div className={`${classes} bg-indigo-500 text-white`}>
      {getInitials(name)}
    </div>
  );
}
