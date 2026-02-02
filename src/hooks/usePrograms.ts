import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client-public';
import { generateSlug } from '@/lib/supabase-helpers';

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  icon: string | null;
  beneficiaries: number | null;
  is_active: boolean | null;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
}

// Fetch active programs for public
export function usePublicPrograms() {
  return useQuery({
    queryKey: ['public-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      return data as Program[];
    },
  });
}

// Admin: Fetch all programs
export function useAdminPrograms() {
  return useQuery({
    queryKey: ['admin-programs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      return data as Program[];
    },
  });
}

// Create program
export function useCreateProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (programData: Partial<Program>) => {
      const slug = generateSlug(programData.title || '');
      const insertData = {
        title: programData.title || '',
        slug,
        description: programData.description,
        content: programData.content,
        image_url: programData.image_url,
        icon: programData.icon,
        beneficiaries: programData.beneficiaries,
        is_active: programData.is_active,
        sort_order: programData.sort_order,
      };
      const { data, error } = await supabase
        .from('programs')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
      queryClient.invalidateQueries({ queryKey: ['public-programs'] });
    },
  });
}

// Update program
export function useUpdateProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...programData }: Partial<Program> & { id: string }) => {
      const updates: Partial<Program> = { ...programData };
      
      if (programData.title) {
        updates.slug = generateSlug(programData.title);
      }

      const { data, error } = await supabase
        .from('programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
      queryClient.invalidateQueries({ queryKey: ['public-programs'] });
    },
  });
}

// Delete program
export function useDeleteProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('programs').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
      queryClient.invalidateQueries({ queryKey: ['public-programs'] });
    },
  });
}
