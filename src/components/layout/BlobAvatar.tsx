'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { URLS } from '@/consts/urls';

type BlobAvatarProps = {
  src: string;
  name: string;
  className?: string;
};

const getBlobUrl = (src: string): string => {
  if (!src) return '';
  try {
    const pathname = new URL(src).pathname.slice(1);
    return `${URLS.API_BLOB}?pathname=${encodeURIComponent(pathname)}`;
  } catch {
    return src;
  }
};

const BlobAvatar = ({ src, name, className }: BlobAvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    setAvatarUrl(getBlobUrl(src));
  }, [src]);

  return (
    <Avatar className={className}>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className="rounded-lg">{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default BlobAvatar;
