import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, Handshake, Smartphone, Building2, CheckCircle, Gift, Target } from "lucide-react";
import { Link } from "react-router-dom";

const GetInvolved = () => {
  const donationMethods = [
    {
      title: "Transfer Bank",
      description: "Transfer langsung ke rekening yayasan",
      icon: Building2,
      color: "bg-primary",
      details: [
        "Bank BCA: 1234567890",
        "Bank Mandiri: 0987654321", 
        "Bank BNI: 1122334455",
        "a.n. Yayasan Harapan Bagimu Negeri"
      ]
    },
    {
      title: "E-Wallet",
      description: "Donasi melalui dompet digital",
      icon: Smartphone,
      color: "bg-secondary",
      details: [
        "GoPay: 0812-8008-0600",
        "OVO: 0812-8008-0600",
        "DANA: 0812-8008-0600",
        "ShopeePay: 0812-8008-0600"
      ]
    },
    {
      title: "Donasi Langsung",
      description: "Kunjungi kantor kami secara langsung",
      icon: Heart,
      color: "bg-info",
      details: [
        "Jl. Pangeran Jayakarta 117 B16",
        "Kec. Sawah Besar, Jakarta Pusat",
        "Senin - Jumat: 09:00 - 17:00",
        "Sabtu: 09:00 - 15:00"
      ]
    }
  ];

  const donationPackages = [
    {
      title: "Paket Pendidikan",
      amount: "Rp 500.000",
      description: "Membantu biaya sekolah 1 anak selama 1 bulan",
      icon: Target,
      benefits: [
        "Biaya SPP bulanan",
        "Buku dan alat tulis",
        "Seragam sekolah",
        "Laporan perkembangan"
      ]
    },
    {
      title: "Paket Kesehatan",
      amount: "Rp 300.000",
      description: "Pemeriksaan kesehatan untuk 5 keluarga",
      icon: Heart,
      benefits: [
        "Pemeriksaan dokter",
        "Obat-obatan dasar",
        "Vitamin dan suplemen",
        "Konsultasi kesehatan"
      ]
    },
    {
      title: "Paket Sembako",
      amount: "Rp 200.000",
      description: "Paket sembako untuk 2 keluarga",
      icon: Gift,
      benefits: [
        "Beras 10kg",
        "Minyak goreng 2L",
        "Gula dan teh",
        "Kebutuhan pokok lainnya"
      ]
    }
  ];


  const partnershipTypes = [
    {
      title: "Corporate Partnership",
      description: "Kerjasama dengan perusahaan untuk program CSR",
      icon: Building2,
      benefits: [
        "Program CSR yang terukur",
        "Laporan dampak sosial",
        "Branding dan publikasi",
        "Tax deduction benefit"
      ]
    },
    {
      title: "Community Partnership",
      description: "Kolaborasi dengan komunitas dan organisasi",
      icon: Users,
      benefits: [
        "Jaringan yang lebih luas",
        "Resource sharing",
        "Joint program development",
        "Mutual support"
      ]
    },
    {
      title: "Educational Partnership",
      description: "Kerjasama dengan institusi pendidikan",
      icon: Target,
      benefits: [
        "Student volunteer program",
        "Research collaboration",
        "Scholarship program",
        "Knowledge sharing"
      ]
    }
  ];

  const impactStats = [
    { number: "137", label: "Anak Beasiswa", icon: Target },
    { number: "450+", label: "Relawan Aktif", icon: Users },
    { number: "2,500+", label: "Keluarga Terbantu", icon: Heart },
    { number: "15", label: "Mitra Kerjasama", icon: Handshake }
  ];

  return (
    <div className="py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bergabung Dengan Kami
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Ada banyak cara untuk berkontribusi dalam misi membangun Indonesia yang lebih baik. Pilih cara yang sesuai dengan kemampuan dan passion Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-primary">
              Donatur
            </Badge>
            <Badge variant="outline" className="text-lg px-6 py-2 border-info text-info">
              Mitra
            </Badge>
          </div>
        </div>

        {/* Impact Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-0 shadow-soft text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="mb-16">
          <Tabs defaultValue="donate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="donate" className="text-lg py-3">
                <Heart className="mr-2 h-5 w-5" />
                Donasi
              </TabsTrigger>
              <TabsTrigger value="partnership" className="text-lg py-3">
                <Handshake className="mr-2 h-5 w-5" />
                Kemitraan
              </TabsTrigger>
            </TabsList>

            {/* Donation Tab */}
            <TabsContent value="donate" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Berdonasi</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Setiap donasi Anda, sekecil apapun, dapat memberikan dampak besar bagi masa depan anak-anak Indonesia
                </p>
              </div>

              {/* Donation Packages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {donationPackages.map((pkg, index) => {
                  const Icon = pkg.icon;
                  return (
                    <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl">{pkg.title}</CardTitle>
                        <div className="text-2xl font-bold text-primary">{pkg.amount}</div>
                        <CardDescription>{pkg.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {pkg.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-success mr-2" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-4">Pilih Paket Ini</Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Donation Methods */}
              <div>
                <h3 className="text-2xl font-bold text-center mb-6">Cara Berdonasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {donationMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <Card key={index} className="border-0 shadow-soft">
                        <CardHeader className="text-center">
                          <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <CardTitle className="text-xl">{method.title}</CardTitle>
                          <CardDescription>{method.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {method.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="text-sm text-muted-foreground">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Partnership Tab */}
            <TabsContent value="partnership" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Kemitraan</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Mari berkolaborasi untuk menciptakan dampak yang lebih besar bagi masyarakat Indonesia
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {partnershipTypes.map((partnership, index) => {
                  const Icon = partnership.icon;
                  return (
                    <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl">{partnership.title}</CardTitle>
                        <CardDescription>{partnership.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h4 className="font-semibold mb-3">Manfaat:</h4>
                        <ul className="space-y-2 mb-4">
                          {partnership.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-success mr-2" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" variant="outline">Pelajari Lebih Lanjut</Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-center mb-6">Mitra Kami Saat Ini</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-light-gray rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Logo Mitra {i}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-0 shadow-soft bg-primary text-primary-foreground">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Mulai Berkontribusi Hari Ini
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Setiap langkah kecil yang Anda ambil dapat menciptakan perubahan besar. Mari bersama-sama membangun Indonesia yang lebih baik.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                  <Heart className="mr-2 h-5 w-5" />
                  Donasi Sekarang
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/contact">
                    Hubungi Kami
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default GetInvolved;