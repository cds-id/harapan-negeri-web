import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, CheckCircle, Image } from 'lucide-react';
import { toast } from 'sonner';
import { uploadImage } from '@/lib/supabase-helpers';
import { useCreateDonation, usePublicCampaigns, Campaign } from '@/hooks/useCampaigns';

interface DonationConfirmFormProps {
  onSuccess?: () => void;
}

const DonationConfirmForm = ({ onSuccess }: DonationConfirmFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    campaign_id: '',
    donor_name: '',
    donor_email: '',
    donor_phone: '',
    amount: '',
    message: '',
    is_anonymous: false,
    payment_method: '',
    proof_image_url: '',
  });

  const { data: campaigns } = usePublicCampaigns();
  const createDonation = useCreateDonation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage(file, 'donations');
      if (url) {
        setFormData((prev) => ({ ...prev, proof_image_url: url }));
        toast.success('Bukti pembayaran berhasil diupload');
      } else {
        toast.error('Gagal mengupload bukti pembayaran');
      }
    } catch (error) {
      toast.error('Gagal mengupload bukti pembayaran');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.donor_name.trim()) {
      toast.error('Nama donatur harus diisi');
      return;
    }

    if (!formData.amount || parseInt(formData.amount) <= 0) {
      toast.error('Jumlah donasi harus diisi');
      return;
    }

    if (!formData.proof_image_url) {
      toast.error('Bukti pembayaran harus diupload');
      return;
    }

    setIsSubmitting(true);
    try {
      await createDonation.mutateAsync({
        campaign_id: formData.campaign_id || null,
        donor_name: formData.donor_name,
        donor_email: formData.donor_email || null,
        donor_phone: formData.donor_phone || null,
        amount: parseInt(formData.amount),
        message: formData.message || null,
        is_anonymous: formData.is_anonymous,
        payment_method: formData.payment_method || null,
        proof_image_url: formData.proof_image_url,
      });

      setIsSubmitted(true);
      toast.success('Konfirmasi donasi berhasil dikirim!');
      onSuccess?.();
    } catch (error) {
      toast.error('Gagal mengirim konfirmasi donasi');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-soft">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Terima Kasih!</h3>
          <p className="text-muted-foreground">
            Konfirmasi donasi Anda telah dikirim. Tim kami akan memverifikasi pembayaran Anda dalam 1x24 jam.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                campaign_id: '',
                donor_name: '',
                donor_email: '',
                donor_phone: '',
                amount: '',
                message: '',
                is_anonymous: false,
                payment_method: '',
                proof_image_url: '',
              });
            }}
          >
            Donasi Lagi
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader>
        <CardTitle>Konfirmasi Donasi</CardTitle>
        <CardDescription>
          Silakan isi form di bawah ini setelah melakukan transfer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaign">Kampanye (Opsional)</Label>
            <Select
              value={formData.campaign_id}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, campaign_id: value === 'general' ? '' : value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kampanye atau donasi umum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">Donasi Umum</SelectItem>
                {campaigns?.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    {campaign.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Donor Name */}
          <div className="space-y-2">
            <Label htmlFor="donor_name">Nama Donatur *</Label>
            <Input
              id="donor_name"
              value={formData.donor_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, donor_name: e.target.value }))
              }
              placeholder="Nama lengkap Anda"
              required
            />
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="is_anonymous"
              checked={formData.is_anonymous}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, is_anonymous: checked }))
              }
            />
            <Label htmlFor="is_anonymous" className="text-sm">
              Sembunyikan nama saya (Anonim)
            </Label>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="donor_email">Email</Label>
              <Input
                id="donor_email"
                type="email"
                value={formData.donor_email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, donor_email: e.target.value }))
                }
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="donor_phone">No. WhatsApp</Label>
              <Input
                id="donor_phone"
                value={formData.donor_phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, donor_phone: e.target.value }))
                }
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </div>

          {/* Amount and Payment Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Jumlah Donasi (Rp) *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, amount: e.target.value }))
                }
                placeholder="100000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment_method">Metode Pembayaran</Label>
              <Select
                value={formData.payment_method}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, payment_method: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih metode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer_bca">Transfer BCA</SelectItem>
                  <SelectItem value="qris">QRIS</SelectItem>
                  <SelectItem value="gopay">GoPay</SelectItem>
                  <SelectItem value="ovo">OVO</SelectItem>
                  <SelectItem value="dana">DANA</SelectItem>
                  <SelectItem value="shopeepay">ShopeePay</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Proof Upload */}
          <div className="space-y-2">
            <Label>Bukti Pembayaran *</Label>
            <div className="flex items-center gap-4">
              {formData.proof_image_url ? (
                <div className="relative">
                  <img
                    src={formData.proof_image_url}
                    alt="Bukti Pembayaran"
                    className="h-24 w-24 rounded object-cover border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, proof_image_url: '' }))
                    }
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <div className="h-24 w-24 rounded border-2 border-dashed border-muted flex items-center justify-center">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  {formData.proof_image_url ? 'Ganti Gambar' : 'Upload Bukti'}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  Format: JPG, PNG. Maks 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Pesan / Doa (Opsional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Tulis pesan atau doa Anda..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            Kirim Konfirmasi Donasi
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationConfirmForm;
