-- Add proof_image_url column for payment proof upload
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS proof_image_url text;

-- Add admin approval fields
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS verified_at timestamp with time zone;
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS verified_by uuid;
ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS admin_notes text;

-- Update RLS to allow admins to update donations for approval
DROP POLICY IF EXISTS "Admins can update donations" ON public.donations;
CREATE POLICY "Admins can update donations" 
ON public.donations 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete donations
DROP POLICY IF EXISTS "Admins can delete donations" ON public.donations;
CREATE POLICY "Admins can delete donations" 
ON public.donations 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));