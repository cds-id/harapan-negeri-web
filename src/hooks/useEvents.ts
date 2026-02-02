import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { generateSlug } from '@/lib/supabase-helpers';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  location: string | null;
  event_date: string | null;
  event_time: string | null;
  registration_link: string | null;
  max_participants: number | null;
  current_participants: number | null;
  is_active: boolean | null;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
}

// Fetch published events for public
export function usePublicEvents() {
  return useQuery({
    queryKey: ['public-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });
}

// Fetch upcoming events
export function useUpcomingEvents(limit?: number) {
  return useQuery({
    queryKey: ['upcoming-events', limit],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Event[];
    },
  });
}

// Admin: Fetch all events
export function useAdminEvents() {
  return useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Event[];
    },
  });
}

// Create event
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventData: Partial<Event>) => {
      const slug = generateSlug(eventData.title || '');
      const insertData = {
        title: eventData.title || '',
        slug,
        description: eventData.description,
        content: eventData.content,
        image_url: eventData.image_url,
        location: eventData.location,
        event_date: eventData.event_date,
        event_time: eventData.event_time,
        registration_link: eventData.registration_link,
        max_participants: eventData.max_participants,
        is_active: eventData.is_active,
        is_published: eventData.is_published,
      };
      const { data, error } = await supabase
        .from('events')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['public-events'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-events'] });
    },
  });
}

// Update event
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...eventData }: Partial<Event> & { id: string }) => {
      const updates: Partial<Event> = { ...eventData };
      
      if (eventData.title) {
        updates.slug = generateSlug(eventData.title);
      }

      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['public-events'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-events'] });
    },
  });
}

// Delete event
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['public-events'] });
      queryClient.invalidateQueries({ queryKey: ['upcoming-events'] });
    },
  });
}
