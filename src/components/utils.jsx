export function createPageUrl(page, params) {
  let path;
  switch (page) {
    case 'Home':
      path = '/';
      break;
    case 'BlogPost':
      // If params.slug is provided, use it directly to construct the path
      path = params && params.slug ? `/blog/${params.slug}` : '/blog/:slug';
      break;
    case 'AdminBlogPosts':
      path = '/admin/blog';
      break;
    case 'TermOfUse':
      path = '/termsofuse';
      break;
    case 'PrivacyPolicy':
      path = '/privacypolicy';
      break;
    case 'MaTalkPrivacyPolicy':
      path = '/matalk-ai-privacy-policy';
      break;
    default:
      path = '/'; // Default to home for unknown pages
  }

  // This part is more for dynamic segments like :slug, not simple query strings
  // For query strings, you'd append them like `path + "?key=value"`
  // However, the current structure of createPageUrl replaces placeholders.
  if (params && path.includes(':')) { // Only process params if path has placeholders
    Object.keys(params).forEach((key) => {
      if (path.includes(`:${key}`)) {
        path = path.replace(`:${key}`, params[key]);
      }
    });
  }

  return path;
}