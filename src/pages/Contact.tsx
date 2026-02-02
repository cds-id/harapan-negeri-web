import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Users, Heart } from "lucide-react";
import PageBlank from "@/components/PageBlank";

const Contact = () => {
  const contactInfo = [
    {
      title: "Telepon",
      value: "0812 8008 0600",
      description: "Hubungi kami langsung",
      icon: Phone,
      color: "bg-primary"
    },
    {
      title: "Email",
      value: "info@harapanbagimunegeri.org",
      description: "Kirim pesan elektronik",
      icon: Mail,
      color: "bg-secondary"
    },
    {
      title: "Alamat",
      value: "Jl. Pangeran Jayakarta 117 B16",
      description: "Kec. Sawah Besar, Jakarta Pusat",
      icon: MapPin,
      color: "bg-info"
    },
    {
      title: "Jam Operasional",
      value: "Senin - Jumat: 09:00 - 17:00",
      description: "Sabtu: 09:00 - 15:00",
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
      title: "Menjadi Relawan",
      description: "Bergabung sebagai relawan dalam program-program kami",
      icon: Users
    },
    {
      title: "Kerjasama & Partnership",
      description: "Menjalin kerjasama untuk program bersama",
      icon: MessageCircle
    }
  ];

  return (
    <PageBlank
      title="Kontak Kami"
      description="Hubungi kami untuk informasi lebih lanjut, berkolaborasi, atau bergabung dalam misi membangun Indonesia yang lebih baik"
    >

        {/* Contact Information */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-shadow text-center">
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
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nama Depan</Label>
                      <Input id="firstName" placeholder="Masukkan nama depan" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nama Belakang</Label>
                      <Input id="lastName" placeholder="Masukkan nama belakang" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="nama@email.com" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input id="phone" type="tel" placeholder="08xx xxxx xxxx" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subjek</Label>
                    <Input id="subject" placeholder="Subjek pesan Anda" />
                  </div>

                  <div>
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      placeholder="Tulis pesan Anda di sini..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
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
                  <div className="aspect-video bg-light-gray rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Peta Lokasi</p>
                      <p className="text-sm text-muted-foreground">
                        Jl. Pangeran Jayakarta 117 B16<br />
                        Kec. Sawah Besar, Jakarta Pusat
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Alamat Lengkap</p>
                        <p className="text-sm text-muted-foreground">
                          Jl. Pangeran Jayakarta 117 B16, Kec. Sawah Besar, Jakarta Pusat
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Telepon</p>
                        <p className="text-sm text-muted-foreground">0812 8008 0600</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Jam Operasional</p>
                        <p className="text-sm text-muted-foreground">
                          Senin - Jumat: 09:00 - 17:00<br />
                          Sabtu: 09:00 - 15:00
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
              Berbagai alasan untuk terhubung dengan Yayasan Harapan Bagimu Negeri
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
                  Anda dapat berdonasi melalui transfer bank, e-wallet, atau datang langsung ke kantor kami. Hubungi kami untuk informasi rekening donasi.
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
                <CardTitle className="text-lg">Bagaimana menjadi relawan?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Hubungi kami melalui kontak yang tersedia. Kami akan menjelaskan berbagai kesempatan volunteer yang sesuai dengan keahlian Anda.
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
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                  <Phone className="mr-2 h-5 w-5" />
                  Hubungi Sekarang
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-primary-foreground hover:bg-white hover:text-primary">
                  <Mail className="mr-2 h-5 w-5" />
                  Kirim Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
    </PageBlank>
  );
};

export default Contact;
