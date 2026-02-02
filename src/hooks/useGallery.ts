import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client-public';

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  sort_order: number | null;
  is_published: boolean | null;
  created_at: string;
}

// Fetch published gallery for public
export function usePublicGallery() {
  return useQuery({
    queryKey: ['public-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('is_published', true)
        .order('sort_order');

      if (error) throw error;
      return data as GalleryItem[];
    },
  });
}

// Admin: Fetch all gallery items
export function useAdminGallery() {
  return useQuery({
    queryKey: ['admin-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      return data as GalleryItem[];
    },
  });
}

// Create gallery item
export function useCreateGalleryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (galleryData: Partial<GalleryItem>) => {
      const insertData = {
        title: galleryData.title || '',
        description: galleryData.description,
        image_url: galleryData.image_url || '',
        category: galleryData.category,
        sort_order: galleryData.sort_order,
        is_published: galleryData.is_published,
      };
      const { data, error } = await supabase
        .from('gallery')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      queryClient.invalidateQueries({ queryKey: ['public-gallery'] });
    },
  });
}

// Update gallery item
export function useUpdateGalleryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...galleryData }: Partial<GalleryItem> & { id: string }) => {
      const { data, error } = await supabase
        .from('gallery')
        .update(galleryData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      queryClient.invalidateQueries({ queryKey: ['public-gallery'] });
    },
  });
}

// Delete gallery item
export function useDeleteGalleryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      queryClient.invalidateQueries({ queryKey: ['public-gallery'] });
    },
  });
}
