import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { generateSlug } from '@/lib/supabase-helpers';

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category_id: string | null;
  author: string | null;
  location: string | null;
  read_time: string | null;
  views: number | null;
  is_featured: boolean | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  news_categories?: NewsCategory | null;
}

// Fetch published news for public
export function usePublicNews(limit?: number) {
  return useQuery({
    queryKey: ['public-news', limit],
    queryFn: async () => {
      let query = supabase
        .from('news')
        .select('*, news_categories(*)')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as News[];
    },
  });
}

// Fetch featured news
export function useFeaturedNews() {
  return useQuery({
    queryKey: ['featured-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*, news_categories(*)')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as News | null;
    },
  });
}

// Admin: Fetch all news
export function useAdminNews() {
  return useQuery({
    queryKey: ['admin-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*, news_categories(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as News[];
    },
  });
}

// Fetch news categories
export function useNewsCategories() {
  return useQuery({
    queryKey: ['news-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as NewsCategory[];
    },
  });
}

// Create news
export function useCreateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newsData: Partial<News>) => {
      const slug = generateSlug(newsData.title || '');
      const insertData = {
        title: newsData.title || '',
        slug,
        excerpt: newsData.excerpt,
        content: newsData.content,
        image_url: newsData.image_url,
        category_id: newsData.category_id,
        author: newsData.author,
        location: newsData.location,
        read_time: newsData.read_time,
        is_featured: newsData.is_featured,
        is_published: newsData.is_published,
        published_at: newsData.is_published ? new Date().toISOString() : null,
      };
      const { data, error } = await supabase
        .from('news')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      queryClient.invalidateQueries({ queryKey: ['public-news'] });
      queryClient.invalidateQueries({ queryKey: ['featured-news'] });
    },
  });
}

// Update news
export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...newsData }: Partial<News> & { id: string }) => {
      const updates: Partial<News> = { ...newsData };
      
      if (newsData.title) {
        updates.slug = generateSlug(newsData.title);
      }
      
      if (newsData.is_published && !newsData.published_at) {
        updates.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('news')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      queryClient.invalidateQueries({ queryKey: ['public-news'] });
      queryClient.invalidateQueries({ queryKey: ['featured-news'] });
    },
  });
}

// Delete news
export function useDeleteNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      queryClient.invalidateQueries({ queryKey: ['public-news'] });
      queryClient.invalidateQueries({ queryKey: ['featured-news'] });
    },
  });
}
