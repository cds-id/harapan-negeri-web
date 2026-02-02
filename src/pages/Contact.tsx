import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Users, Heart, Loader2 } from "lucide-react";
import PageBlank from "@/components/PageBlank";
import { useContactInfo } from "@/hooks/useSiteSettings";
import { useCreateContactMessage } from "@/hooks/useContact";
import { toast } from "sonner";

const Contact = () => {
  const { data: contactInfo, isLoading } = useContactInfo();
  const createMessage = useCreateContactMessage();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.message) {
      toast.error('Mohon lengkapi nama, email, dan pesan');
      return;
    }

    setIsSubmitting(true);
    try {
      await createMessage.mutateAsync({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject || null,
        message: formData.message,
      });
      toast.success('Pesan berhasil dikirim! Kami akan merespons dalam 24 jam.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      title: "Telepon",
      value: contactInfo?.phone || '-',
      description: "Hubungi kami langsung",
      icon: Phone,
      color: "bg-primary",
      href: contactInfo?.phone ? `tel:${contactInfo.phone.replace(/\s/g, '')}` : undefined,
    },
    {
      title: "Email",
      value: contactInfo?.email || '-',
      description: "Kirim pesan elektronik",
      icon: Mail,
      color: "bg-secondary",
      href: contactInfo?.email ? `mailto:${contactInfo.email}` : undefined,
    },
    {
      title: "Alamat",
      value: contactInfo?.address || '-',
      description: contactInfo?.addressDetail || '',
      icon: MapPin,
      color: "bg-info"
    },
    {
      title: "Jam Operasional",
      value: contactInfo?.hoursWeekday || '-',
      description: contactInfo?.hoursWeekend || '',
      icon: Clock,
      color: "bg-success"
    }
  ];

  const reasons = [
    {
      title: "Ingin Berdonasi",
      description: "Informasi cara berdonasi dan program yang tersedia",
      icon: Heart
    },
    {
      title: "Kerjasama & Partnership",
      description: "Menjalin kerjasama untuk program bersama",
      icon: Users
    },
    {
      title: "Pertanyaan Umum",
      description: "Informasi tentang yayasan dan kegiatan kami",
      icon: MessageCircle
    }
  ];

  if (isLoading) {
    return (
      <PageBlank title="Kontak Kami" description="Memuat...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageBlank>
    );
  }

  return (
    <PageBlank
      title="Kontak Kami"
      description="Hubungi kami untuk informasi lebih lanjut, berkolaborasi, atau bergabung dalam misi membangun Indonesia yang lebih baik"
    >
      {/* Contact Information */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((info, index) => {
            const Icon = info.icon;
            const CardWrapper = info.href ? 'a' : 'div';
            return (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-shadow text-center">
                <CardWrapper href={info.href} className={info.href ? 'block' : ''}>
                  <CardHeader>
                    <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg mb-2">{info.value}</p>
                    <CardDescription>{info.description}</CardDescription>
                  </CardContent>
                </CardWrapper>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
              <CardDescription>
                Isi formulir di bawah ini dan kami akan merespons dalam 24 jam
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nama Depan *</Label>
                    <Input
                      id="firstName"
                      placeholder="Masukkan nama depan"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nama Belakang</Label>
                    <Input
                      id="lastName"
                      placeholder="Masukkan nama belakang"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xx xxxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    placeholder="Subjek pesan Anda"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Pesan *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda di sini..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-5 w-5" />
                  )}
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map & Office Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl">Lokasi Kantor</CardTitle>
                <CardDescription>
                  Kunjungi kantor kami untuk diskusi lebih lanjut
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactInfo?.mapsEmbed ? (
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      src={contactInfo.mapsEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokasi Kantor"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Peta Lokasi</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Alamat Lengkap</p>
                      <p className="text-sm text-muted-foreground">
                        {contactInfo?.address}{contactInfo?.addressDetail ? `, ${contactInfo.addressDetail}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Telepon / WhatsApp</p>
                      <p className="text-sm text-muted-foreground">{contactInfo?.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Jam Operasional</p>
                      <p className="text-sm text-muted-foreground">
                        {contactInfo?.hoursWeekday}<br />
                        {contactInfo?.hoursWeekend}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reasons to Contact */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Mengapa Menghubungi Kami?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Berbagai alasan untuk terhubung dengan {contactInfo?.organizationName || 'kami'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {reason.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jawaban untuk pertanyaan umum tentang yayasan dan program kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Bagaimana cara berdonasi?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Anda dapat berdonasi melalui transfer bank, e-wallet, atau datang langsung ke kantor kami. Kunjungi halaman Donasi untuk informasi lengkap.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Apakah ada laporan penggunaan dana?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Ya, kami menerbitkan laporan keuangan dan kegiatan secara berkala. Laporan dapat diakses melalui website atau diminta langsung.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Bagaimana menjalin kemitraan?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Hubungi kami melalui kontak yang tersedia. Kami akan menjelaskan berbagai kesempatan kerjasama yang sesuai dengan visi Anda.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Apakah bisa mengajukan bantuan?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tentu saja. Silakan hubungi kami dengan menyertakan informasi lengkap tentang kebutuhan bantuan yang diperlukan.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Card className="border-0 shadow-soft bg-primary text-primary-foreground">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              Mari Terhubung Dengan Kami
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Setiap percakapan adalah langkah awal untuk menciptakan perubahan positif. Jangan ragu untuk menghubungi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {contactInfo?.whatsapp && (
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              )}
              {contactInfo?.email && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-primary-foreground hover:bg-white hover:text-primary"
                  asChild
                >
                  <a href={`mailto:${contactInfo.email}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    Kirim Email
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </PageBlank>
  );
};

export default Contact;
