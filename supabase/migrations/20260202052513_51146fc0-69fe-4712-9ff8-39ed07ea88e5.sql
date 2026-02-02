-- =============================================
-- YAYASAN HARAPAN BAGIMU NEGERI - DATABASE SCHEMA
-- =============================================

-- 1. Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin');

-- 2. Create user_roles table for admin authentication
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 3. Create profiles table for user data
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Create news_categories table
CREATE TABLE public.news_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Create news table
CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    category_id UUID REFERENCES public.news_categories(id) ON DELETE SET NULL,
    author TEXT DEFAULT 'Tim Redaksi',
    location TEXT,
    read_time TEXT DEFAULT '5 menit',
    views INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Create programs table
CREATE TABLE public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    content TEXT,
    image_url TEXT,
    icon TEXT DEFAULT 'Heart',
    beneficiaries INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 7. Create events table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    content TEXT,
    image_url TEXT,
    location TEXT,
    event_date DATE,
    event_time TEXT,
    registration_link TEXT,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 8. Create campaigns (donasi) table
CREATE TABLE public.campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    content TEXT,
    image_url TEXT,
    target_amount BIGINT DEFAULT 0,
    collected_amount BIGINT DEFAULT 0,
    donor_count INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. Create donations table
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT,
    donor_phone TEXT,
    amount BIGINT NOT NULL,
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    payment_status TEXT DEFAULT 'pending',
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 10. Create gallery table
CREATE TABLE public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 11. Create partners table
CREATE TABLE public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 12. Create testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    rating INTEGER DEFAULT 5,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 13. Create contact_messages table
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 14. Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- 15. Create site_settings table
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =============================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- =============================================
-- SECURITY DEFINER FUNCTION FOR ROLE CHECK
-- =============================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- =============================================
-- RLS POLICIES - USER ROLES
-- =============================================

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- =============================================
-- RLS POLICIES - PROFILES
-- =============================================

CREATE POLICY "Profiles are viewable by owner"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- =============================================
-- RLS POLICIES - PUBLIC READ ACCESS
-- =============================================

-- News Categories - Public read
CREATE POLICY "News categories are publicly readable"
ON public.news_categories FOR SELECT TO anon, authenticated
USING (true);

-- News - Public read for published
CREATE POLICY "Published news are publicly readable"
ON public.news FOR SELECT TO anon, authenticated
USING (is_published = true);

-- Programs - Public read for active
CREATE POLICY "Active programs are publicly readable"
ON public.programs FOR SELECT TO anon, authenticated
USING (is_active = true);

-- Events - Public read for published
CREATE POLICY "Published events are publicly readable"
ON public.events FOR SELECT TO anon, authenticated
USING (is_published = true);

-- Campaigns - Public read for active
CREATE POLICY "Active campaigns are publicly readable"
ON public.campaigns FOR SELECT TO anon, authenticated
USING (is_active = true);

-- Gallery - Public read for published
CREATE POLICY "Published gallery items are publicly readable"
ON public.gallery FOR SELECT TO anon, authenticated
USING (is_published = true);

-- Partners - Public read for active
CREATE POLICY "Active partners are publicly readable"
ON public.partners FOR SELECT TO anon, authenticated
USING (is_active = true);

-- Testimonials - Public read for published
CREATE POLICY "Published testimonials are publicly readable"
ON public.testimonials FOR SELECT TO anon, authenticated
USING (is_published = true);

-- Site Settings - Public read
CREATE POLICY "Site settings are publicly readable"
ON public.site_settings FOR SELECT TO anon, authenticated
USING (true);

-- =============================================
-- RLS POLICIES - ADMIN FULL ACCESS
-- =============================================

-- News Categories - Admin full access
CREATE POLICY "Admins can manage news categories"
ON public.news_categories FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- News - Admin full access (including unpublished)
CREATE POLICY "Admins can manage all news"
ON public.news FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Programs - Admin full access
CREATE POLICY "Admins can manage programs"
ON public.programs FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Events - Admin full access
CREATE POLICY "Admins can manage events"
ON public.events FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Campaigns - Admin full access
CREATE POLICY "Admins can manage campaigns"
ON public.campaigns FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Donations - Admin full access
CREATE POLICY "Admins can view all donations"
ON public.donations FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Gallery - Admin full access
CREATE POLICY "Admins can manage gallery"
ON public.gallery FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Partners - Admin full access
CREATE POLICY "Admins can manage partners"
ON public.partners FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Testimonials - Admin full access
CREATE POLICY "Admins can manage testimonials"
ON public.testimonials FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Contact Messages - Admin full access
CREATE POLICY "Admins can view all contact messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact messages"
ON public.contact_messages FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Newsletter - Admin full access
CREATE POLICY "Admins can view all newsletter subscribers"
ON public.newsletter_subscribers FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Site Settings - Admin can manage
CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS POLICIES - PUBLIC INSERT ACCESS
-- =============================================

-- Donations - Anyone can insert
CREATE POLICY "Anyone can create donations"
ON public.donations FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Contact Messages - Anyone can insert
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Newsletter - Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- =============================================
-- TRIGGER FUNCTIONS
-- =============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

-- Trigger for auto-profile creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_programs_updated_at
BEFORE UPDATE ON public.programs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Update campaign stats when donation is created
CREATE OR REPLACE FUNCTION public.update_campaign_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.payment_status = 'completed' AND NEW.campaign_id IS NOT NULL THEN
    UPDATE public.campaigns
    SET 
      collected_amount = collected_amount + NEW.amount,
      donor_count = donor_count + 1
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_donation_created
AFTER INSERT ON public.donations
FOR EACH ROW EXECUTE FUNCTION public.update_campaign_stats();

-- =============================================
-- STORAGE BUCKETS
-- =============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES 
  ('images', 'images', true, 5242880),
  ('documents', 'documents', false, 10485760);

-- Storage policies for images bucket (public read, admin write)
CREATE POLICY "Images are publicly accessible"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'images');

CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'images' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'images' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'images' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Storage policies for documents bucket (admin only)
CREATE POLICY "Admins can read documents"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'documents' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can upload documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'documents' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete documents"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'documents' 
  AND public.has_role(auth.uid(), 'admin')
);

-- =============================================
-- SEED DATA - NEWS CATEGORIES
-- =============================================

INSERT INTO public.news_categories (name, slug) VALUES
  ('Bakti Sosial', 'bakti-sosial'),
  ('Pendidikan', 'pendidikan'),
  ('Pelatihan', 'pelatihan'),
  ('Kesehatan', 'kesehatan'),
  ('Kerjasama', 'kerjasama');

-- =============================================
-- SEED DATA - SITE SETTINGS
-- =============================================

INSERT INTO public.site_settings (key, value) VALUES
  ('site_name', 'Yayasan Harapan Bagimu Negeri'),
  ('site_tagline', 'Bersama Kita Peduli, Bersama Kita Berbagi'),
  ('contact_email', 'info@yayasanhbn.or.id'),
  ('contact_phone', '+62 21 1234 5678'),
  ('contact_address', 'Jl. Kebaikan No. 123, Jakarta Pusat'),
  ('social_instagram', 'https://instagram.com/yayasanhbn'),
  ('social_facebook', 'https://facebook.com/yayasanhbn'),
  ('social_youtube', 'https://youtube.com/yayasanhbn');