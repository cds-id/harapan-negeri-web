import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useContactInfo, useUpdateSettings } from '@/hooks/useSiteSettings';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';

const ContactSettingsForm = () => {
  const { data: contactInfo, isLoading } = useContactInfo();
  const updateSettings = useUpdateSettings();

  const [formData, setFormData] = useState({
    organization_name: '',
    organization_tagline: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    contact_address_detail: '',
    contact_hours_weekday: '',
    contact_hours_weekend: '',
    contact_whatsapp: '',
    contact_instagram: '',
    contact_facebook: '',
    contact_youtube: '',
    contact_maps_embed: '',
  });

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        organization_name: contactInfo.organizationName,
        organization_tagline: contactInfo.organizationTagline,
        contact_phone: contactInfo.phone,
        contact_email: contactInfo.email,
        contact_address: contactInfo.address,
        contact_address_detail: contactInfo.addressDetail,
        contact_hours_weekday: contactInfo.hoursWeekday,
        contact_hours_weekend: contactInfo.hoursWeekend,
        contact_whatsapp: contactInfo.whatsapp,
        contact_instagram: contactInfo.instagram,
        contact_facebook: contactInfo.facebook,
        contact_youtube: contactInfo.youtube,
        contact_maps_embed: contactInfo.mapsEmbed,
      });
    }
  }, [contactInfo]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings.mutateAsync(formData);
      toast.success('Pengaturan kontak berhasil disimpan');
    } catch (error) {
      toast.error('Gagal menyimpan pengaturan');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Organization Info */}
      <Card>
        <CardHeader>
          <CardTitle>Identitas Organisasi</CardTitle>
          <CardDescription>Nama dan tagline yayasan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="organization_name">Nama Organisasi</Label>
            <Input
              id="organization_name"
              value={formData.organization_name}
              onChange={(e) => handleChange('organization_name', e.target.value)}
              placeholder="Yayasan Harapan Bagimu Negeri"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="organization_tagline">Tagline</Label>
            <Input
              id="organization_tagline"
              value={formData.organization_tagline}
              onChange={(e) => handleChange('organization_tagline', e.target.value)}
              placeholder="Bersama Kita Peduli, Bersama Kita Berbagi"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Kontak</CardTitle>
          <CardDescription>Telepon, email, dan alamat</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contact_phone">Telepon</Label>
              <Input
                id="contact_phone"
                value={formData.contact_phone}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                placeholder="0812 8008 0600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_whatsapp">WhatsApp</Label>
              <Input
                id="contact_whatsapp"
                value={formData.contact_whatsapp}
                onChange={(e) => handleChange('contact_whatsapp', e.target.value)}
                placeholder="6281280080600"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact_email">Email</Label>
            <Input
              id="contact_email"
              type="email"
              value={formData.contact_email}
              onChange={(e) => handleChange('contact_email', e.target.value)}
              placeholder="info@yayasan.org"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact_address">Alamat</Label>
            <Input
              id="contact_address"
              value={formData.contact_address}
              onChange={(e) => handleChange('contact_address', e.target.value)}
              placeholder="Jl. Pangeran Jayakarta 117 B16"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact_address_detail">Detail Alamat</Label>
            <Input
              id="contact_address_detail"
              value={formData.contact_address_detail}
              onChange={(e) => handleChange('contact_address_detail', e.target.value)}
              placeholder="Kec. Sawah Besar, Jakarta Pusat"
            />
          </div>
        </CardContent>
      </Card>

      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Jam Operasional</CardTitle>
          <CardDescription>Jadwal pelayanan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contact_hours_weekday">Senin - Jumat</Label>
              <Input
                id="contact_hours_weekday"
                value={formData.contact_hours_weekday}
                onChange={(e) => handleChange('contact_hours_weekday', e.target.value)}
                placeholder="09:00 - 17:00 WIB"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_hours_weekend">Sabtu - Minggu</Label>
              <Input
                id="contact_hours_weekend"
                value={formData.contact_hours_weekend}
                onChange={(e) => handleChange('contact_hours_weekend', e.target.value)}
                placeholder="Tutup"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Media Sosial</CardTitle>
          <CardDescription>Link akun media sosial</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contact_instagram">Instagram</Label>
              <Input
                id="contact_instagram"
                value={formData.contact_instagram}
                onChange={(e) => handleChange('contact_instagram', e.target.value)}
                placeholder="https://instagram.com/yayasan"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_facebook">Facebook</Label>
              <Input
                id="contact_facebook"
                value={formData.contact_facebook}
                onChange={(e) => handleChange('contact_facebook', e.target.value)}
                placeholder="https://facebook.com/yayasan"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact_youtube">YouTube</Label>
            <Input
              id="contact_youtube"
              value={formData.contact_youtube}
              onChange={(e) => handleChange('contact_youtube', e.target.value)}
              placeholder="https://youtube.com/@yayasan"
            />
          </div>
        </CardContent>
      </Card>

      {/* Maps Embed */}
      <Card>
        <CardHeader>
          <CardTitle>Google Maps</CardTitle>
          <CardDescription>URL embed untuk peta lokasi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="contact_maps_embed">Maps Embed URL</Label>
            <Textarea
              id="contact_maps_embed"
              value={formData.contact_maps_embed}
              onChange={(e) => handleChange('contact_maps_embed', e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={updateSettings.isPending} className="w-full md:w-auto">
        {updateSettings.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        Simpan Pengaturan Kontak
      </Button>
    </form>
  );
};

export default ContactSettingsForm;
