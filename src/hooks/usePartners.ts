import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client-public';

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  sort_order: number | null;
  is_active: boolean | null;
  created_at: string;
}

// Fetch active partners for public
export function usePublicPartners() {
  return useQuery({
    queryKey: ['public-partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      return data as Partner[];
    },
  });
}

// Admin: Fetch all partners
export function useAdminPartners() {
  return useQuery({
    queryKey: ['admin-partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      return data as Partner[];
    },
  });
}

// Create partner
export function useCreatePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (partnerData: Partial<Partner>) => {
      const insertData = {
        name: partnerData.name || '',
        logo_url: partnerData.logo_url,
        website_url: partnerData.website_url,
        description: partnerData.description,
        sort_order: partnerData.sort_order,
        is_active: partnerData.is_active,
      };
      const { data, error } = await supabase
        .from('partners')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      queryClient.invalidateQueries({ queryKey: ['public-partners'] });
    },
  });
}

// Update partner
export function useUpdatePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...partnerData }: Partial<Partner> & { id: string }) => {
      const { data, error } = await supabase
        .from('partners')
        .update(partnerData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      queryClient.invalidateQueries({ queryKey: ['public-partners'] });
    },
  });
}

// Delete partner
export function useDeletePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('partners').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      queryClient.invalidateQueries({ queryKey: ['public-partners'] });
    },
  });
}
