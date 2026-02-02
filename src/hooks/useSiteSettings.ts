import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client-public';

export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  updated_at: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  addressDetail: string;
  hoursWeekday: string;
  hoursWeekend: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  youtube: string;
  mapsEmbed: string;
  organizationName: string;
  organizationTagline: string;
}

export interface AboutInfo {
  background: string;
  vision: string;
  missions: string[];
  values: { title: string; description: string; icon: string }[];
  programs: { title: string; description: string; icon: string }[];
  structure: { position: string; name: string }[];
  legalNpwp: string;
  legalKemenkumham: string;
  legalNotaris: string;
}

// Fetch all site settings
export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;
      return data as SiteSetting[];
    },
  });
}

// Fetch contact info specifically
export function useContactInfo() {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .like('key', 'contact_%')
        .or('key.like.organization_%');

      if (error) throw error;

      // Convert array to object for easy access
      const settings: Record<string, string> = {};
      (data as SiteSetting[]).forEach((item) => {
        settings[item.key] = item.value || '';
      });

      return {
        phone: settings.contact_phone || '',
        email: settings.contact_email || '',
        address: settings.contact_address || '',
        addressDetail: settings.contact_address_detail || '',
        hoursWeekday: settings.contact_hours_weekday || '',
        hoursWeekend: settings.contact_hours_weekend || '',
        whatsapp: settings.contact_whatsapp || '',
        instagram: settings.contact_instagram || '',
        facebook: settings.contact_facebook || '',
        youtube: settings.contact_youtube || '',
        mapsEmbed: settings.contact_maps_embed || '',
        organizationName: settings.organization_name || '',
        organizationTagline: settings.organization_tagline || '',
      } as ContactInfo;
    },
  });
}

// Fetch about page info
export function useAboutInfo() {
  return useQuery({
    queryKey: ['about-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .like('key', 'about_%');

      if (error) throw error;

      const settings: Record<string, string> = {};
      (data as SiteSetting[]).forEach((item) => {
        settings[item.key] = item.value || '';
      });

      const parseJSON = <T>(value: string, fallback: T): T => {
        try {
          return value ? JSON.parse(value) : fallback;
        } catch {
          return fallback;
        }
      };

      return {
        background: settings.about_background || '',
        vision: settings.about_vision || '',
        missions: parseJSON<string[]>(settings.about_missions, []),
        values: parseJSON<{ title: string; description: string; icon: string }[]>(settings.about_values, []),
        programs: parseJSON<{ title: string; description: string; icon: string }[]>(settings.about_programs, []),
        structure: parseJSON<{ position: string; name: string }[]>(settings.about_structure, []),
        legalNpwp: settings.about_legal_npwp || '',
        legalKemenkumham: settings.about_legal_kemenkumham || '',
        legalNotaris: settings.about_legal_notaris || '',
      } as AboutInfo;
    },
  });
}

// Get a single setting value
export function useSetting(key: string) {
  return useQuery({
    queryKey: ['site-setting', key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .maybeSingle();

      if (error) throw error;
      return data?.value || null;
    },
  });
}

// Admin: Update a setting
export function useUpdateSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      // Try to update first
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', key)
        .maybeSingle();

      if (existing) {
        const { data, error } = await supabase
          .from('site_settings')
          .update({ value, updated_at: new Date().toISOString() })
          .eq('key', key)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('site_settings')
          .insert({ key, value })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      queryClient.invalidateQueries({ queryKey: ['contact-info'] });
    },
  });
}

// Admin: Update multiple settings at once
export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Record<string, string>) => {
      const updates = Object.entries(settings).map(async ([key, value]) => {
        const { data: existing } = await supabase
          .from('site_settings')
          .select('id')
          .eq('key', key)
          .maybeSingle();

        if (existing) {
          return supabase
            .from('site_settings')
            .update({ value, updated_at: new Date().toISOString() })
            .eq('key', key);
        } else {
          return supabase
            .from('site_settings')
            .insert({ key, value });
        }
      });

      await Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      queryClient.invalidateQueries({ queryKey: ['contact-info'] });
    },
  });
}
