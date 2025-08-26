import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { analytics } from "../utils/analytics";
import { BlogPost as BlogPostType, getBlogPostById } from "./blog-data.ts";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BlogPostProps {
  onBack: () => void;
}

export function BlogPost({ onBack }: BlogPostProps) {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      const foundPost = getBlogPostById(postId);
      if (foundPost) {
        setPost(foundPost);
        // Track blog post view
        analytics.trackPageView(`blog-post-${postId}`, {
          post_title: foundPost.title,
          post_author: foundPost.author,
          post_tags: foundPost.tags,
        });
      } else {
        // Post not found, redirect to blog
        navigate("/blog");
      }
      setLoading(false);
    }
  }, [postId, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBack = () => {
    analytics.trackInteraction("Blog Post Back Click", {
      post_id: postId,
      post_title: post?.title,
    });
    onBack();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="text-violet-600">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-violet-900 mb-4">Post Not Found</h1>
          <Button onClick={handleBack} className="bg-violet-600 hover:bg-violet-700">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-8 hover:bg-violet-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.imageUrl && (
            <div className="relative h-64 md:h-96">
              <ImageWithFallback
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                  {post.authorRole && (
                    <span className="text-sm">({post.authorRole})</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-violet-100 text-violet-800">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
