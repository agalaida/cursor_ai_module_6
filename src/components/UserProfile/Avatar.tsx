import { Avatar as SharedAvatar } from '../shared/Avatar';

interface AvatarProps {
  src?: string;
  name: string;
}

export function Avatar({ src, name }: AvatarProps) {
  return <SharedAvatar src={src} name={name} size="xl" />;
}
