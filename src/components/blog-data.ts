import blogData from "./blog-data.json";

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
    // Create content from sections
    const content = post.sections
      .map((section) => {
        const sectionContent = section.paragraphs
          .map((paragraph) => paragraph.text)
          .join("\n\n");
        return `${section.heading}\n\n${sectionContent}`;
      })
      .join("\n\n");

    // Create excerpt from first section
    const firstSection = post.sections[0];
    const excerpt =
      firstSection.paragraphs
        .map((p) => p.text)
        .join(" ")
        .substring(0, 200) + "...";

    return {
      id: `post-${index + 1}`,
      title: post.title,
      excerpt,
      content,
      author: "Verbali Team",
      authorRole: "AI Communication Experts",
      publishDate: new Date().toISOString(), // Using current date as fallback
      tags: ["AI", "Communication", "Technology"],
      featured: index === 0, // First post is featured
      imageUrl: post.image ? `/images/${post.image}` : undefined,
      readTime: Math.ceil(content.split(" ").length / 200), // Rough estimate: 200 words per minute
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
