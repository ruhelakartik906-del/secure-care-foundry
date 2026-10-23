export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  sections: BlogSection[];
};

// Add only articles and photos supplied by the company. All entries are public.
export const blogs: Blog[] = [];

export function findBlog(slug: string, articles: readonly Blog[] = blogs) {
  return articles.find((article) => article.slug === slug);
}