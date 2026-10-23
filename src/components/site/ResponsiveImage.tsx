import type { ImgHTMLAttributes } from "react";
import { responsiveImage, sectionImageSizes } from "@/lib/responsive-images";

export function ResponsiveImage({ src, sizes = sectionImageSizes, decoding = "async", ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
  return <img {...props} {...responsiveImage(src)} sizes={sizes} decoding={decoding} />;
}