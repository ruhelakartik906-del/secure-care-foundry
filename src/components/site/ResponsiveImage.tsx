import type { ImgHTMLAttributes } from "react";
import { responsiveImage, sectionImageSizes } from "@/lib/responsive-images";
import dimensions from "@/lib/image-dimensions.json";

export function ResponsiveImage({ src, sizes = sectionImageSizes, decoding = "async", ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  const size = dimensions[src as keyof typeof dimensions];
  return <img width={size?.width} height={size?.height} {...props} {...responsiveImage(src)} sizes={sizes} decoding={decoding} />;
}