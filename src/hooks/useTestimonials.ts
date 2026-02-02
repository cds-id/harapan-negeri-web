import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client-public';

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  avatar_url: string | null;
  rating: number | null;
  is_published: boolean | null;
  created_at: string;
}

// Fetch published testimonials for public
export function usePublicTestimonials() {
  return useQuery({
    queryKey: ['public-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Testimonial[];
    },
  });
}

// Admin: Fetch all testimonials
export function useAdminTestimonials() {
  return useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Testimonial[];
    },
  });
}

// Create testimonial
export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonialData: Partial<Testimonial>) => {
      const insertData = {
        name: testimonialData.name || '',
        role: testimonialData.role,
        content: testimonialData.content || '',
        avatar_url: testimonialData.avatar_url,
        rating: testimonialData.rating,
        is_published: testimonialData.is_published,
      };
      const { data, error } = await supabase
        .from('testimonials')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['public-testimonials'] });
    },
  });
}

// Update testimonial
export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...testimonialData }: Partial<Testimonial> & { id: string }) => {
      const { data, error } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['public-testimonials'] });
    },
  });
}

// Delete testimonial
export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['public-testimonials'] });
    },
  });
}
