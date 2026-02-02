import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean | null;
  replied_at: string | null;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean | null;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

// Admin: Fetch all contact messages
export function useAdminContactMessages() {
  return useQuery({
    queryKey: ['admin-contact-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ContactMessage[];
    },
  });
}

// Admin: Fetch newsletter subscribers
export function useAdminNewsletterSubscribers() {
  return useQuery({
    queryKey: ['admin-newsletter-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      return data as NewsletterSubscriber[];
    },
  });
}

// Create contact message (public)
export function useCreateContactMessage() {
  return useMutation({
    mutationFn: async (messageData: Partial<ContactMessage>) => {
      const insertData = {
        name: messageData.name || '',
        email: messageData.email || '',
        phone: messageData.phone,
        subject: messageData.subject,
        message: messageData.message || '',
      };
      const { data, error } = await supabase
        .from('contact_messages')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });
}

// Subscribe to newsletter (public)
export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });
}

// Admin: Mark message as read
export function useMarkMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
    },
  });
}

// Admin: Mark message as replied
export function useMarkMessageReplied() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ 
          is_read: true,
          replied_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] });
    },
  });
}
