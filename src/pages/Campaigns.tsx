import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Target, Users, Calendar, MapPin, ArrowRight, CheckCircle, Clock, TrendingUp, Gift, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";
import PageBlank from "@/components/PageBlank";

const Campaigns = () => {
  const activeCampaigns = [
    {
      id: 1,
      title: "Beasiswa Anak Yatim Piatu 2026",
      description: "Mari bersama-sama memberikan kesempatan pendidikan terbaik untuk 100 anak yatim piatu di seluruh Indonesia",
      category: "Pendidikan",
      target: 500000000,
      raised: 325000000,
      progress: 65,
      donors: 1250,
      daysLeft: 45,
      location: "Seluruh Indonesia",
      icon: BookOpen,
      color: "bg-primary",
      urgency: "Mendesak",
      benefits: [
        "Biaya sekolah untuk 100 anak",
        "Buku dan alat tulis lengkap",
        "Seragam dan perlengkapan sekolah",
        "Bimbingan belajar gratis",
        "Monitoring prestasi akademik"
      ]
    },
    {
      id: 2,
      title: "Bantuan Kesehatan untuk Lansia",
      description: "Program pemeriksaan kesehatan gratis dan bantuan obat-obatan untuk 500 lansia kurang mampu",
      category: "Kesehatan",
      target: 200000000,
      raised: 145000000,
      progress: 72,
      donors: 890,
      daysLeft: 30,
      location: "Jakarta, Bogor, Depok",
      icon: Heart,
      color: "bg-success",
      urgency: "Penting",
      benefits: [
        "Pemeriksaan kesehatan lengkap",
        "Obat-obatan gratis",
        "Konsultasi dokter spesialis",
        "Vitamin dan suplemen",
        "Program senam lansia"
      ]
    },
    {
      id: 3,
      title: "Pelatihan Keterampilan untuk Ibu Rumah Tangga",
      description: "Memberikan keterampilan menjahit, memasak, dan digital marketing untuk 200 ibu rumah tangga",
      category: "Pemberdayaan",
      target: 150000000,
      raised: 89000000,
      progress: 59,
      donors: 567,
      daysLeft: 60,
      location: "Bandung, Surabaya",
      icon: Award,
      color: "bg-info",
      urgency: "Normal",
      benefits: [
        "Pelatihan menjahit dan fashion",
        "Kursus memasak dan katering",
        "Digital marketing untuk UMKM",
        "Sertifikat kompetensi",
        "Bantuan modal usaha"
      ]
    }
  ];

  const completedCampaigns = [
    {
      id: 4,
      title: "Bantuan Korban Bencana Alam",
      description: "Bantuan darurat untuk korban banjir di Kalimantan",
      target: 300000000,
      raised: 320000000,
      progress: 107,
      donors: 2100,
      completedDate: "Januari 2026",
      impact: "1,500 keluarga terbantu"
    },
    {
      id: 5,
      title: "Renovasi Sekolah Dasar",
      description: "Perbaikan 5 sekolah dasar di daerah terpencil",
      target: 400000000,
      raised: 415000000,
      progress: 104,
      donors: 1800,
      completedDate: "Desember 2025",
      impact: "5 sekolah direnovasi, 800 siswa terbantu"
    },
    {
      id: 6,
      title: "Program Gizi Anak Balita",
      description: "Pemberian makanan bergizi untuk 300 balita",
      target: 180000000,
      raised: 185000000,
      progress: 103,
      donors: 950,
      completedDate: "November 2025",
      impact: "300 balita mendapat gizi seimbang"
    }
  ];


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Pendidikan": return "bg-primary";
      case "Kesehatan": return "bg-success";
      case "Pemberdayaan": return "bg-info";
      case "Bencana": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Mendesak": return "text-destructive border-destructive";
      case "Penting": return "text-warning border-warning";
      case "Normal": return "text-info border-info";
      default: return "text-muted border-muted";
    }
  };

  return (
    <PageBlank
      title="Kampanye Penggalangan Dana"
      description="Bergabunglah dengan ribuan donatur lainnya untuk menciptakan perubahan nyata bagi masyarakat Indonesia yang membutuhkan"
    >
      <div className="text-center mb-16">
        <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-primary">
          3 Kampanye Aktif
        </Badge>
      </div>


        {/* Campaign Tabs */}
        <section className="mb-16">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="active" className="text-lg py-3">
                <Target className="mr-2 h-5 w-5" />
                Kampanye Aktif
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-lg py-3">
                <CheckCircle className="mr-2 h-5 w-5" />
                Kampanye Selesai
              </TabsTrigger>
            </TabsList>

            {/* Active Campaigns */}
            <TabsContent value="active" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Kampanye yang Sedang Berjalan</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Bantu kami mencapai target untuk memberikan dampak maksimal bagi masyarakat
                </p>
              </div>

              <div className="space-y-8">
                {activeCampaigns.map((campaign) => {
                  const Icon = campaign.icon;
                  return (
                    <Card key={campaign.id} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                        {/* Campaign Info */}
                        <div className="lg:col-span-2">
                          <CardHeader className="p-0 mb-4">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center">
                                <div className={`w-16 h-16 ${campaign.color} rounded-xl flex items-center justify-center mr-4`}>
                                  <Icon className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-2xl mb-2">{campaign.title}</CardTitle>
                                  <div className="flex items-center gap-4">
                                    <Badge className={`${getCategoryColor(campaign.category)} text-white`}>
                                      {campaign.category}
                                    </Badge>
                                    <Badge variant="outline" className={getUrgencyColor(campaign.urgency)}>
                                      {campaign.urgency}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <CardDescription className="text-base leading-relaxed mb-4">
                              {campaign.description}
                            </CardDescription>
                          </CardHeader>

                          {/* Progress */}
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Progress Donasi</span>
                              <span className="text-sm text-muted-foreground">{campaign.progress}%</span>
                            </div>
                            <Progress value={campaign.progress} className="h-3 mb-2" />
                            <div className="flex justify-between text-sm">
                              <span className="font-semibold text-primary">
                                {formatCurrency(campaign.raised)}
                              </span>
                              <span className="text-muted-foreground">
                                dari {formatCurrency(campaign.target)}
                              </span>
                            </div>
                          </div>

                          {/* Campaign Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-primary mr-2" />
                              <span>{campaign.donors} donatur</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-primary mr-2" />
                              <span>{campaign.daysLeft} hari tersisa</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-primary mr-2" />
                              <span>{campaign.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Campaign Benefits & CTA */}
                        <div>
                          <h4 className="font-semibold mb-4">Manfaat Donasi Anda:</h4>
                          <ul className="space-y-2 mb-6">
                            {campaign.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-success mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="space-y-3">
                            <Button className="w-full" size="lg">
                              <Heart className="mr-2 h-5 w-5" />
                              Donasi Sekarang
                            </Button>
                            <Button variant="outline" className="w-full">
                              Lihat Detail
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Completed Campaigns */}
            <TabsContent value="completed" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Kampanye yang Telah Selesai</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Lihat dampak nyata dari kampanye-kampanye yang telah berhasil diselesaikan
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="border-0 shadow-soft">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-success text-white">
                          Selesai
                        </Badge>
                        <span className="text-sm text-muted-foreground">{campaign.completedDate}</span>
                      </div>

                      <CardTitle className="text-xl line-clamp-2">
                        {campaign.title}
                      </CardTitle>

                      <CardDescription className="line-clamp-2">
                        {campaign.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Target Tercapai</span>
                          <span className="text-sm text-success font-semibold">{campaign.progress}%</span>
                        </div>
                        <Progress value={Math.min(campaign.progress, 100)} className="h-2 mb-2" />
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-success">
                            {formatCurrency(campaign.raised)}
                          </span>
                          <span className="text-muted-foreground">
                            dari {formatCurrency(campaign.target)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {campaign.donors} donatur
                        </div>
                      </div>

                      <div className="bg-light-gray p-3 rounded-lg">
                        <p className="text-sm font-medium text-success">Dampak:</p>
                        <p className="text-sm text-muted-foreground">{campaign.impact}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* How to Donate */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Cara Berdonasi</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proses donasi yang mudah dan aman untuk mendukung kampanye pilihan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Pilih Kampanye", description: "Pilih kampanye yang ingin Anda dukung" },
              { step: "2", title: "Tentukan Nominal", description: "Masukkan jumlah donasi sesuai kemampuan" },
              { step: "3", title: "Pilih Metode", description: "Pilih metode pembayaran yang tersedia" },
              { step: "4", title: "Konfirmasi", description: "Konfirmasi donasi dan terima bukti donasi" }
            ].map((step, index) => (
              <Card key={index} className="border-0 shadow-soft text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Donation Impact */}
        <section className="mb-16">
          <Card className="border-0 shadow-soft bg-light-gray">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Dampak Donasi Anda
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Setiap rupiah yang Anda donasikan akan memberikan dampak nyata bagi masyarakat yang membutuhkan
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <Gift className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-primary mb-2">100%</h3>
                  <p className="text-muted-foreground">Dana langsung tersalurkan</p>
                </div>
                <div>
                  <Target className="h-16 w-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-secondary mb-2">Transparan</h3>
                  <p className="text-muted-foreground">Laporan penggunaan dana</p>
                </div>
                <div>
                  <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-success mb-2">Terverifikasi</h3>
                  <p className="text-muted-foreground">Program yang sudah terbukti</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-0 shadow-soft bg-primary text-primary-foreground">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Mulai Berdonasi Hari Ini
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Setiap donasi, sekecil apapun, dapat menciptakan perubahan besar. Mari bersama-sama membangun Indonesia yang lebih baik.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                  <Heart className="mr-2 h-5 w-5" />
                  Pilih Kampanye
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/contact">
                    Pelajari Lebih Lanjut
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
    </PageBlank>
  );
};

export default Campaigns;
