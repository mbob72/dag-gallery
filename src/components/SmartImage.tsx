import Image, { type ImageProps } from 'next/image';
import { IMAGE_BLURS } from '../data/image-blurs';

export function SmartImage({ alt, blurDataURL, placeholder, ...props }: ImageProps) {
  const normalizedSrc = typeof props.src === 'string' ? props.src.split('?')[0] : undefined;
  const resolvedBlurDataURL = blurDataURL ?? (normalizedSrc ? IMAGE_BLURS[normalizedSrc] : undefined);

  return (
    <Image
      {...props}
      alt={alt}
      blurDataURL={resolvedBlurDataURL}
      placeholder={placeholder ?? (resolvedBlurDataURL ? 'blur' : 'empty')}
    />
  );
}
