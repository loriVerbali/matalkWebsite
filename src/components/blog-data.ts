import { BlogPost } from './blog-types';

const STORAGE_KEY = 'matalk_blog_posts';

// Default blog posts
const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AAC: How AI is Transforming Communication',
    excerpt: 'Explore how artificial intelligence is revolutionizing Augmentative and Alternative Communication, making it more intuitive and accessible than ever before.',
    content: `
# The Future of AAC: How AI is Transforming Communication

Augmentative and Alternative Communication (AAC) has come a long way since its inception. Today, we stand at the threshold of a new era where artificial intelligence is not just enhancing AAC tools but fundamentally transforming how we think about communication assistance.

## The Evolution of AAC Technology

Traditional AAC systems have served millions of users worldwide, but they often come with limitations:
- Static symbol sets that don't adapt to individual needs
- Complex navigation that can slow down communication
- Limited personalization options
- Steep learning curves for new users

## Enter AI-Powered AAC

Ma-Talk AI represents a paradigm shift in AAC technology. By leveraging advanced machine learning algorithms, we're creating systems that:

### Learn and Adapt
Our AI observes communication patterns and automatically suggests relevant symbols, phrases, and shortcuts that match each user's unique style and needs.

### Predictive Communication
Just like predictive text on smartphones, our AI anticipates what users want to say, making communication faster and more natural.

### Contextual Understanding
The system understands context, time of day, location, and social situations to provide more relevant communication options.

## Real-World Impact

The integration of AI in AAC isn't just about technology—it's about human connection. We're seeing:
- Faster communication speeds
- Increased user confidence
- Better social integration
- Reduced communication fatigue

## Looking Ahead

As we continue to develop Ma-Talk AI, we're focused on making communication as natural as possible. The future of AAC is bright, and we're excited to be part of this transformative journey.

*What aspects of AI-powered AAC are you most excited about? Share your thoughts with our community.*
    `,
    author: 'Dr. Sarah Chen',
    authorRole: 'Lead AI Researcher',
    publishDate: '2024-01-15',
    tags: ['AI', 'AAC', 'Technology', 'Innovation'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    readTime: 5
  },
  {
    id: '2',
    title: 'Building Inclusive Communication Environments',
    excerpt: 'Learn practical strategies for creating environments that support and encourage communication for all users, regardless of their communication method.',
    content: `
# Building Inclusive Communication Environments

Creating truly inclusive environments requires more than just providing AAC tools—it requires a fundamental shift in how we think about communication and accessibility.

## Understanding Communication Diversity

Every person communicates differently. Some use spoken words, others use signs, symbols, or technology. Recognizing this diversity is the first step toward inclusion.

## Key Principles for Inclusion

### 1. Presuming Competence
Always assume that individuals have something meaningful to contribute, regardless of their communication method.

### 2. Providing Wait Time
Give people adequate time to formulate and express their thoughts. Communication shouldn't be rushed.

### 3. Multiple Modalities
Offer various ways to participate and communicate—visual, auditory, gestural, and technological.

### 4. Environmental Design
Create spaces that support different communication needs:
- Good lighting for visual communication
- Quiet areas for concentration
- Accessible technology placement

## Practical Implementation

Organizations and families can start by:
- Training staff on communication diversity
- Investing in AAC technologies
- Creating communication-friendly policies
- Regular assessment and improvement

## The Ma-Talk Approach

Our platform is designed with these principles in mind, offering:
- Customizable interfaces for different needs
- Multi-modal input options
- Environmental awareness features
- Integration with existing accessibility tools

Creating inclusive communication environments benefits everyone. When we design for accessibility, we create better experiences for all users.
    `,
    author: 'Maria Rodriguez',
    authorRole: 'Inclusive Design Specialist',
    publishDate: '2024-01-10',
    tags: ['Inclusion', 'Accessibility', 'Design', 'Community'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    readTime: 4
  },
  {
    id: '3',
    title: 'AAC Success Stories: Real Users, Real Impact',
    excerpt: 'Discover inspiring stories from Ma-Talk AI users who have transformed their communication experiences and connected with their communities.',
    content: `
# AAC Success Stories: Real Users, Real Impact

The true measure of any AAC technology isn't in its features or capabilities—it's in the real-world impact it has on people's lives. Today, we're sharing some inspiring stories from our Ma-Talk AI community.

## Emma's Journey to Independence

Emma, a 12-year-old with autism, struggled with traditional AAC devices that felt overwhelming and hard to navigate. After starting with Ma-Talk AI:

"The predictive features help me say what I'm thinking faster. It's like the app understands me."

Her mother notes that Emma now initiates conversations more frequently and has gained confidence in social situations.

## David's Professional Success

David, a marketing professional who uses AAC following a stroke, needed a solution that could keep up with his fast-paced work environment:

"Ma-Talk AI learns my work vocabulary and suggests phrases I use in meetings. It's made me more effective at my job."

## The Rodriguez Family's Connection

The Rodriguez family uses Ma-Talk AI to bridge communication gaps between their son Miguel, who is non-speaking, and his siblings:

"Now family dinners are full of conversation. Miguel can joke around with his brothers and share his thoughts about school."

## What Makes the Difference

These success stories share common themes:
- **Personalization**: The AI adapts to individual communication styles
- **Speed**: Faster communication leads to more natural interactions
- **Confidence**: Users feel more empowered to express themselves
- **Connection**: Better communication strengthens relationships

## Your Story Matters

Every user's journey is unique, and we'd love to hear about yours. Whether you're a new user or have been with us since the beginning, your experience helps us improve and inspires others in the community.

*Ready to start your own success story? Join our community today.*
    `,
    author: 'James Thompson',
    authorRole: 'Community Manager',
    publishDate: '2024-01-05',
    tags: ['Success Stories', 'Community', 'User Experience', 'Impact'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    readTime: 3
  }
];

export function getBlogPosts(): BlogPost[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const posts = JSON.parse(stored);
      return Array.isArray(posts) ? posts : defaultBlogPosts;
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
  return defaultBlogPosts;
}

export function saveBlogPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving blog posts:', error);
  }
}

export function addBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
  const posts = getBlogPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString()
  };
  posts.unshift(newPost);
  saveBlogPosts(posts);
  return newPost;
}

export function updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
  const posts = getBlogPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...updates };
  saveBlogPosts(posts);
  return posts[index];
}

export function deleteBlogPost(id: string): boolean {
  const posts = getBlogPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) return false;
  
  saveBlogPosts(filteredPosts);
  return true;
}

export function filterBlogPosts(posts: BlogPost[], filters: BlogFilters): BlogPost[] {
  return posts.filter(post => {
    if (filters.featured !== undefined && post.featured !== filters.featured) {
      return false;
    }
    if (filters.tag && !post.tags.includes(filters.tag)) {
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
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function getAllAuthors(): string[] {
  const posts = getBlogPosts();
  const authorSet = new Set<string>();
  posts.forEach(post => authorSet.add(post.author));
  return Array.from(authorSet).sort();
}