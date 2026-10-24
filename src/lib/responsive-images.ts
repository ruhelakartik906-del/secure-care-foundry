import imageDimensions from "./image-dimensions.json";
const otHero = "/images/modular-ot-hero.webp";
const otRoom = "/images/modular-ot-room.webp";
const diffuser = "/images/perforated-cleanroom-ceiling-air-diffuser.webp";
const hpl = "/images/hpl-modular-ot.webp";
const light = "/images/led-surgical-light.webp";
const door = "/images/hermetic-ot-door.webp";
const passBox = "/images/pass-box.webp";
// Same-origin public files are copied unchanged into every static-host deployment.
const variants = (name: string) => ({
  src: `/images/optimized/${name}-1200.webp`,
  srcSet: `/images/optimized/${name}-640.webp 640w, /images/optimized/${name}-1200.webp 1200w`,
});
const imageVariants: Record<string, ReturnType<typeof variants>> = {
  [otHero]: variants("modular-ot-hero"),
  [otRoom]: variants("modular-ot-room"),
  [diffuser]: variants("perforated-cleanroom-ceiling-air-diffuser"),
  [hpl]: variants("hpl-modular-ot"),
  [light]: variants("led-surgical-light"),
  [door]: variants("hermetic-ot-door"),
  [passBox]: variants("pass-box"),
};

export function responsiveImage(src: string): { src: string; srcSet?: string } {
  if (!src.startsWith("/images/") || src.includes("/optimized/") || src.includes("unicare-logo")) return { src };
  const name = src.slice("/images/".length).replace(/\.webp$/, "");
  const desktop = imageVariants[src] ?? { src };
  const mobile = `/images/optimized/${name}-768.webp`;
  return { src: desktop.src, srcSet: `${mobile} 768w, ${desktop.src} ${imageVariants[src] ? 1200 : (imageDimensions[src as keyof typeof imageDimensions]?.width ?? 1200)}w` };
}

export const cardImageSizes = "(min-width: 1240px) 384px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, calc(100vw - 40px)";
export const sectionImageSizes = "(min-width: 1240px) 700px, (min-width: 1024px) 58vw, calc(100vw - 40px)";