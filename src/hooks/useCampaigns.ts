import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client-public';
import { generateSlug } from '@/lib/supabase-helpers';

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  target_amount: number | null;
  collected_amount: number | null;
  donor_count: number | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean | null;
  is_featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  campaign_id: string | null;
  donor_name: string;
  donor_email: string | null;
  donor_phone: string | null;
  amount: number;
  message: string | null;
  is_anonymous: boolean | null;
  payment_status: string | null;
  payment_method: string | null;
  proof_image_url: string | null;
  verified_at: string | null;
  verified_by: string | null;
  admin_notes: string | null;
  created_at: string;
  campaigns?: { title: string } | null;
}

// Fetch active campaigns for public
export function usePublicCampaigns() {
  return useQuery({
    queryKey: ['public-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Campaign[];
    },
  });
}

// Fetch featured campaigns
export function useFeaturedCampaigns(limit?: number) {
  return useQuery({
    queryKey: ['featured-campaigns', limit],
    queryFn: async () => {
      let query = supabase
        .from('campaigns')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Campaign[];
    },
  });
}

// Admin: Fetch all campaigns
export function useAdminCampaigns() {
  return useQuery({
    queryKey: ['admin-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Campaign[];
    },
  });
}

// Admin: Fetch all donations
export function useAdminDonations() {
  return useQuery({
    queryKey: ['admin-donations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('*, campaigns(title)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

// Create campaign
export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaignData: Partial<Campaign>) => {
      const slug = generateSlug(campaignData.title || '');
      const insertData = {
        title: campaignData.title || '',
        slug,
        description: campaignData.description,
        content: campaignData.content,
        image_url: campaignData.image_url,
        target_amount: campaignData.target_amount,
        start_date: campaignData.start_date,
        end_date: campaignData.end_date,
        is_active: campaignData.is_active,
        is_featured: campaignData.is_featured,
      };
      const { data, error } = await supabase
        .from('campaigns')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['public-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['featured-campaigns'] });
    },
  });
}

// Update campaign
export function useUpdateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...campaignData }: Partial<Campaign> & { id: string }) => {
      const updates: Partial<Campaign> = { ...campaignData };
      
      if (campaignData.title) {
        updates.slug = generateSlug(campaignData.title);
      }

      const { data, error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['public-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['featured-campaigns'] });
    },
  });
}

// Delete campaign
export function useDeleteCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('campaigns').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['public-campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['featured-campaigns'] });
    },
  });
}

// Create donation (public)
export function useCreateDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (donationData: Partial<Donation>) => {
      const insertData = {
        campaign_id: donationData.campaign_id,
        donor_name: donationData.donor_name || '',
        donor_email: donationData.donor_email,
        donor_phone: donationData.donor_phone,
        amount: donationData.amount || 0,
        message: donationData.message,
        is_anonymous: donationData.is_anonymous,
        payment_method: donationData.payment_method,
        proof_image_url: donationData.proof_image_url,
      };
      const { data, error } = await supabase
        .from('donations')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-donations'] });
      queryClient.invalidateQueries({ queryKey: ['public-campaigns'] });
    },
  });
}

// Update donation (admin approval)
export function useUpdateDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...donationData }: Partial<Donation> & { id: string }) => {
      const { data, error } = await supabase
        .from('donations')
        .update(donationData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-donations'] });
      queryClient.invalidateQueries({ queryKey: ['public-campaigns'] });
    },
  });
}

// Delete donation (admin)
export function useDeleteDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('donations').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-donations'] });
    },
  });
}
