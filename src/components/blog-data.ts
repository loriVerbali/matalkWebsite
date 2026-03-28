import baseBlogData from "./blog-data.json";
import extraBlogData from "./blog-articles-extra.json";

type RawParagraph =
  | {
      number?: number;
      format?: "normal" | "bullet";
      text: string;
    }
  | {
      number?: number;
      format: "image";
      src: string;
      alt?: string;
    };

interface RawSection {
  heading: string;
  paragraphs: RawParagraph[];
}

interface RawBlogPost {
  title: string;
  image?: string;
  author?: string;
  authorRole?: string;
  tags?: string[];
  publishDate?: string;
  featured?: boolean;
  sections: RawSection[];
  outline?: string[];
}

const blogData: RawBlogPost[] = [
  ...(baseBlogData as unknown as RawBlogPost[]),
  ...(extraBlogData as unknown as RawBlogPost[]),
];

const IMAGE_MARKER = (src: string, alt: string) =>
  `__BLOG_IMAGE_START__|${src}|${alt}|__BLOG_IMAGE_END__`;

function paragraphToString(p: RawParagraph): string {
  if ("format" in p && p.format === "image") {
    const path = p.src.startsWith("/") ? p.src : `/images/${p.src}`;
    return IMAGE_MARKER(path, p.alt ?? "");
  }
  return p.text;
}

function firstTextExcerpt(sections: RawSection[]): string {
  for (const section of sections) {
    for (const p of section.paragraphs) {
      if ("format" in p && p.format === "image") continue;
      if ("text" in p && p.text?.trim()) {
        const t = p.text.trim();
        return t.length > 200 ? t.substring(0, 200) + "..." : t;
      }
    }
  }
  return "";
}

function wordCountFromSections(sections: RawSection[]): number {
  let n = 0;
  for (const section of sections) {
    for (const p of section.paragraphs) {
      if ("text" in p && p.text) {
        n += p.text.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return n;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishDate: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
  readTime: number; // in minutes
}

export interface BlogFilters {
  tag?: string;
  featured?: boolean;
  author?: string;
}

// Transform the JSON data to match BlogPost interface
function transformBlogData(): BlogPost[] {
  return blogData.map((post, index) => {
    const content = post.sections
      .map((section) => {
        const sectionContent = section.paragraphs
          .map((paragraph) => paragraphToString(paragraph as RawParagraph))
          .join("\n\n");
        return `${section.heading}\n\n${sectionContent}`;
      })
      .join("\n\n");

    const teaser = firstTextExcerpt(post.sections);
    const excerpt =
      teaser ||
      post.title.substring(0, 200) + (post.title.length > 200 ? "..." : "");

    const words = wordCountFromSections(post.sections);

    return {
      id: `post-${index + 1}`,
      title: post.title,
      excerpt,
      content,
      author: post.author ?? "Verbali Team",
      authorRole: post.authorRole ?? "AI Communication Experts",
      publishDate: post.publishDate ?? new Date().toISOString(),
      tags: post.tags ?? ["AI", "Communication", "Technology"],
      featured: post.featured ?? index === 0,
      imageUrl: post.image ? `/images/${post.image}` : undefined,
      readTime: Math.max(1, Math.ceil(words / 200)),
    };
  });
}

export function getBlogPosts(): BlogPost[] {
  return transformBlogData();
}

export function filterBlogPosts(
  posts: BlogPost[],
  filters: BlogFilters
): BlogPost[] {
  return posts.filter((post) => {
    if (filters.tag && !post.tags.includes(filters.tag)) {
      return false;
    }
    if (filters.featured !== undefined && post.featured !== filters.featured) {
      return false;
    }
    if (filters.author && post.author !== filters.author) {
      return false;
    }
    return true;
  });
}

export function getAllTags(): string[] {
  const posts = getBlogPosts();
  const allTags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
}

export function getAllAuthors(): string[] {
  const posts = getBlogPosts();
  const allAuthors = new Set<string>();
  posts.forEach((post) => {
    allAuthors.add(post.author);
  });
  return Array.from(allAuthors);
}

export function getBlogPostById(id: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((post) => post.id === id);
}
