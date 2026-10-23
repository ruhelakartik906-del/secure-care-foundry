import otHero from "@/assets/1-modularot-hero.webp";
import otRoom from "@/assets/2-modularor-card.webp";
import diffuser from "@/assets/perforated-cleanroom-ceiling-air-diffuser.webp";
import hpl from "@/assets/hpl-modular-ot.webp";
import light from "@/assets/led-surgical-light.jpg";
import door from "@/assets/hermetic-door.jpg";
import passBox from "@/assets/pass-box.jpg";
import heroSmall from "@/assets/optimized/1-modularot-hero-640.webp.asset.json";
import heroLarge from "@/assets/optimized/1-modularot-hero-1200.webp.asset.json";
import roomSmall from "@/assets/optimized/2-modularor-card-640.webp.asset.json";
import roomLarge from "@/assets/optimized/2-modularor-card-1200.webp.asset.json";
import diffuserSmall from "@/assets/optimized/perforated-cleanroom-ceiling-air-diffuser-640.webp.asset.json";
import diffuserLarge from "@/assets/optimized/perforated-cleanroom-ceiling-air-diffuser-1200.webp.asset.json";
import hplSmall from "@/assets/optimized/hpl-modular-ot-640.webp.asset.json";
import hplLarge from "@/assets/optimized/hpl-modular-ot-1200.webp.asset.json";
import lightSmall from "@/assets/optimized/led-surgical-light-640.webp.asset.json";
import lightLarge from "@/assets/optimized/led-surgical-light-1200.webp.asset.json";
import doorSmall from "@/assets/optimized/hermetic-door-640.webp.asset.json";
import doorLarge from "@/assets/optimized/hermetic-door-1200.webp.asset.json";
import boxSmall from "@/assets/optimized/pass-box-640.webp.asset.json";
import boxLarge from "@/assets/optimized/pass-box-1200.webp.asset.json";

// Absolute asset hosting keeps CDN media available on static third-party hosts.
const assetUrl = (asset: { url: string }) => new URL(asset.url, "https://secure-care-foundry.lovable.app").href;
const variants = (small: { url: string }, large: { url: string }) => ({
  src: assetUrl(large),
  srcSet: `${assetUrl(small)} 640w, ${assetUrl(large)} 1200w`,
});
const imageVariants: Record<string, ReturnType<typeof variants>> = {
  [otHero]: variants(heroSmall, heroLarge),
  [otRoom]: variants(roomSmall, roomLarge),
  [diffuser]: variants(diffuserSmall, diffuserLarge),
  [hpl]: variants(hplSmall, hplLarge),
  [light]: variants(lightSmall, lightLarge),
  [door]: variants(doorSmall, doorLarge),
  [passBox]: variants(boxSmall, boxLarge),
};

export function responsiveImage(src: string): { src: string; srcSet?: string } {
  return imageVariants[src] ?? { src };
}

export const cardImageSizes = "(min-width: 1240px) 384px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, calc(100vw - 40px)";
export const sectionImageSizes = "(min-width: 1240px) 700px, (min-width: 1024px) 58vw, calc(100vw - 40px)";