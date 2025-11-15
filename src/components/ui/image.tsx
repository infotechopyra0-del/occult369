"use client"
import { forwardRef, type ImgHTMLAttributes, useState } from 'react'

const FALLBACK_IMAGE_URL = "/images/FALLBACK_IMAGE.png";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: 'fill' | 'fit' | 'cover' | 'contain'
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({ src, fittingType = 'cover', className, style, alt, ...props }, ref) => {
  const [imgSrc, setImgSrc] = useState<string>(src as string || FALLBACK_IMAGE_URL)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (imgSrc !== FALLBACK_IMAGE_URL) {
      setImgSrc(FALLBACK_IMAGE_URL)
      setHasError(true)
    }
  }

  if (!src) {
    return <div ref={ref as React.Ref<HTMLDivElement>} data-empty-image className={className} style={style} {...props} />
  }

  const objectFitMap = {
    fill: 'fill',
    fit: 'contain',
    cover: 'cover',
    contain: 'contain'
  }

  const imageStyle = {
    objectFit: objectFitMap[fittingType] as 'fill' | 'contain' | 'cover',
    ...style
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      ref={ref} 
      src={imgSrc} 
      alt={alt || ''}
      onError={handleError}
      data-error-image={hasError}
      className={className}
      style={imageStyle}
      {...props} 
    />
  )
})

Image.displayName = 'Image'
