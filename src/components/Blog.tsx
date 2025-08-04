import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Filter,
  Search,
  Tag,
} from "lucide-react";
import { analytics } from "../utils/analytics";
import {
  BlogPost,
  BlogFilters,
  getBlogPosts,
  filterBlogPosts,
  getAllTags,
  getAllAuthors,
} from "./blog-data.ts";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BlogProps {
  onBack: () => void;
}

export function Blog({ onBack }: BlogProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filters, setFilters] = useState<BlogFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const blogPosts = getBlogPosts();
    setPosts(blogPosts);
    setAvailableTags(getAllTags());
    setAvailableAuthors(getAllAuthors());
  }, []);

  useEffect(() => {
    let filtered = filterBlogPosts(posts, filters);

    if (searchTerm) {
      filtered = filtered.filter(
        (post: BlogPost) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag: string) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredPosts(filtered);
  }, [posts, filters, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");

    analytics.trackInteraction("Blog Filters Cleared", {
      previous_filters: filters,
      search_term: searchTerm,
    });
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-violet-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Button
            onClick={() => setSelectedPost(null)}
            variant="ghost"
            className="mb-8 hover:bg-violet-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <article className="card">
            {selectedPost.imageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPost.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-violet-100 text-violet-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-6 text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedPost.author}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-sm">{selectedPost.authorRole}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedPost.publishDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedPost.readTime} min read</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {selectedPost.content}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="hover:bg-violet-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Verbali <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Insights, stories, and updates from the world of AI-powered AAC
            technology
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            {/* Search Bar - Always visible on mobile */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => {
                    const newSearchTerm = e.target.value;
                    setSearchTerm(newSearchTerm);
                    if (newSearchTerm.length > 2) {
                      analytics.trackInteraction("Blog Search", {
                        search_term: newSearchTerm,
                        results_count: filteredPosts.length,
                      });
                    }
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Toggle Button */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors min-h-[44px] px-3 py-2 rounded-lg hover:bg-violet-50"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
                {Object.keys(filters).some(
                  (key) => filters[key as keyof BlogFilters] !== undefined
                ) && (
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs px-2 py-0.5"
                  >
                    Active
                  </Badge>
                )}
              </button>

              {/* Clear Filters - Mobile */}
              {(Object.keys(filters).some(
                (key) => filters[key as keyof BlogFilters] !== undefined
              ) ||
                searchTerm) && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Clear
                </Button>
              )}
            </div>

            {/* Collapsible Filters */}
            {showFilters && (
              <div className="space-y-3 pt-3 border-t border-violet-600/10">
                <Select
                  value={filters.tag || "all-tags"}
                  onValueChange={(value) => {
                    const newFilters = {
                      ...filters,
                      tag: value === "all-tags" ? undefined : value,
                    };
                    setFilters(newFilters);

                    analytics.trackInteraction("Blog Filter Applied", {
                      filter_type: "tag",
                      filter_value: value === "all-tags" ? "all" : value,
                      previous_filters: filters,
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <Tag className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-tags">All Tags</SelectItem>
                    {availableTags.map((tag: string) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.author || "all-authors"}
                  onValueChange={(value) => {
                    const newFilters = {
                      ...filters,
                      author: value === "all-authors" ? undefined : value,
                    };
                    setFilters(newFilters);

                    analytics.trackInteraction("Blog Filter Applied", {
                      filter_type: "author",
                      filter_value: value === "all-authors" ? "all" : value,
                      previous_filters: filters,
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Authors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-authors">All Authors</SelectItem>
                    {availableAuthors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.featured?.toString() || "all-posts"}
                  onValueChange={(value) =>
                    setFilters((prev: BlogFilters) => ({
                      ...prev,
                      featured:
                        value === "true"
                          ? true
                          : value === "false"
                          ? false
                          : undefined,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Featured Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-posts">All Posts</SelectItem>
                    <SelectItem value="true">Featured Only</SelectItem>
                    <SelectItem value="false">Regular Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Desktop Layout - Unchanged */}
          <div className="hidden sm:flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Select
                value={filters.tag || "all-tags"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    tag: value === "all-tags" ? undefined : value,
                  }))
                }
              >
                <SelectTrigger className="w-40">
                  <Tag className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-tags">All Tags</SelectItem>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.author || "all-authors"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    author: value === "all-authors" ? undefined : value,
                  }))
                }
              >
                <SelectTrigger className="w-48">
                  <User className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Authors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-authors">All Authors</SelectItem>
                  {availableAuthors.map((author) => (
                    <SelectItem key={author} value={author}>
                      {author}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.featured?.toString() || "all-posts"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    featured:
                      value === "true"
                        ? true
                        : value === "false"
                        ? false
                        : undefined,
                  }))
                }
              >
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-posts">All Posts</SelectItem>
                  <SelectItem value="true">Featured</SelectItem>
                  <SelectItem value="false">Regular</SelectItem>
                </SelectContent>
              </Select>

              {(Object.keys(filters).some(
                (key) => filters[key as keyof BlogFilters] !== undefined
              ) ||
                searchTerm) && (
                <Button onClick={clearFilters} variant="outline" size="sm">
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {!searchTerm && !Object.keys(filters).length && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 mt-8">
              Featured Articles
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {posts
                .filter((post) => post.featured)
                .slice(0, 2)
                .map((post) => (
                  <Card
                    key={post.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                    onClick={() => {
                      setSelectedPost(post);
                      analytics.trackInteraction("Blog Post Viewed", {
                        post_id: post.id,
                        post_title: post.title,
                        post_author: post.author,
                        post_tags: post.tags,
                        post_category: "featured",
                        read_time: post.readTime,
                      });
                    }}
                  >
                    {post.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-violet-600 text-white">
                            Featured
                          </Badge>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-violet-100 text-violet-600 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.publishDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 mt-8">
            {searchTerm || Object.keys(filters).length
              ? "Search Results"
              : "Recent Articles"}
            <span className="text-lg font-normal text-slate-500 ml-2">
              ({filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"})
            </span>
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 text-lg mb-2">
                No articles found
              </div>
              <p className="text-slate-500">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  onClick={() => {
                    setSelectedPost(post);
                    analytics.trackInteraction("Blog Post Viewed", {
                      post_id: post.id,
                      post_title: post.title,
                      post_author: post.author,
                      post_tags: post.tags,
                      post_category: "regular",
                      read_time: post.readTime,
                    });
                  }}
                >
                  {post.imageUrl && (
                    <div className="relative h-40 overflow-hidden">
                      <ImageWithFallback
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {post.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-violet-600 text-white text-xs">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.slice(0, 2).map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-violet-100 text-violet-600 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="truncate">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
