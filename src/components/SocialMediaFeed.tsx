/// <reference types="vite/client" />
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

interface IGPost {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  permalink: string;
}

export default function SocialMediaFeed() {
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
        if (!token) {
          throw new Error("Instagram access token is missing. Please add VITE_INSTAGRAM_ACCESS_TOKEN to your environment.");
        }

        const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink&access_token=${token}`);
        if (!res.ok) {
          throw new Error("Failed to fetch from Instagram API.");
        }
        
        const data = await res.json();
        
        // Filter for images/carousels to ensure we have media URLs that are easily displayable
        const media = data.data
          .filter((p: IGPost) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
          .slice(0, 4);
          
        setPosts(media);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 min-h-[250px]">
        <div className="animate-pulse flex flex-col items-center space-y-4 text-stone-400">
          <Instagram className="w-8 h-8 opacity-50" />
          <span className="text-sm tracking-wide uppercase font-medium">Loading Feed...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 w-full">
        <div className="max-w-xl mx-auto bg-stone-100/50 p-8 rounded-3xl border border-stone-200 text-center border-dashed">
          <Instagram className="w-8 h-8 text-stone-400 mx-auto mb-4" />
          <h4 className="text-lg font-serif font-bold text-stone-900 mb-2">Connect Instagram</h4>
          <p className="text-stone-600 font-light text-sm mb-4 leading-relaxed">
            {error}
          </p>
          <p className="text-stone-500 font-medium text-xs uppercase tracking-wider">
            Your latest posts will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mt-10">
      {posts.map((post, index) => (
        <motion.a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative aspect-square rounded-2xl overflow-hidden group block shadow-sm hover:shadow-xl transition-all"
        >
          <img 
            src={post.media_url} 
            alt={post.caption || 'Instagram Post'} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-stone-900/70 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-center">
            <Instagram size={28} className="mb-4 text-white/90" />
            <p className="text-sm font-light leading-relaxed line-clamp-3">
              {post.caption || 'View post on Instagram'}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
