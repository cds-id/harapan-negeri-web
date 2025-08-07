import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Heart, TrendingUp, Users, Target, Calendar, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Programs = () => {
  const mainPrograms = [
    {
      id: 1,
      title: "Beasiswa Anak Negeri",
      description: "Program beasiswa pendidikan untuk anak-anak dari keluarga kurang mampu di seluruh Indonesia. Memberikan dukungan biaya sekolah, buku, seragam, dan kebutuhan pendidikan lainnya.",
      icon: BookOpen,
      color: "bg-primary",
      status: "Aktif",
      beneficiaries: "137 Anak",
      locations: "15 Provinsi",
      progress: 85,
      features: [
        "Bantuan biaya sekolah bulanan",
        "Penyediaan buku dan alat tulis",
        "Seragam dan perlengkapan sekolah",
        "Bimbingan belajar gratis",
        "Monitoring prestasi akademik"
      ]
    },
    {
      id: 2,
      title: "Pelatihan Keterampilan",
      description: "Kursus gratis berbagai keterampilan seperti desain grafis, menjahit, digital marketing, dan keterampilan lainnya untuk meningkatkan kemampuan masyarakat.",
      icon: Award,
      color: "bg-secondary",
      status: "Aktif",
      beneficiaries: "450+ Peserta",
      locations: "8 Kota",
      progress: 92,
      features: [
        "Pelatihan desain grafis",
        "Kursus menjahit dan fashion",
        "Digital marketing dan e-commerce",
        "Keterampilan komputer dasar",
        "Sertifikat kompetensi"
      ]
    },
    {
      id: 3,
      title: "Bakti Sosial & Kesehatan",
      description: "Program pemeriksaan kesehatan gratis, pembagian sembako, dan bantuan kebutuhan dasar untuk masyarakat kurang mampu.",
      icon: Heart,
      color: "bg-info",
      status: "Aktif",
      beneficiaries: "2,500+ Keluarga",
      locations: "12 Daerah",
      progress: 78,
      features: [
        "Pemeriksaan kesehatan gratis",
        "Pembagian sembako rutin",
        "Bantuan obat-obatan",
        "Penyuluhan kesehatan",
        "Program gizi untuk anak"
      ]
    },
    {
      id: 4,
      title: "Program UMKM Lokal",
      description: "Pembinaan dan pendampingan usaha kecil menengah di desa-desa untuk meningkatkan ekonomi masyarakat lokal.",
      icon: TrendingUp,
      color: "bg-success",
      status: "Aktif",
      beneficiaries: "85 UMKM",
      locations: "6 Desa",
      progress: 65,
      features: [
        "Pelatihan manajemen usaha",
        "Bantuan modal usaha",
        "Pendampingan pemasaran",
        "Akses ke pasar digital",
        "Networking antar UMKM"
      ]
    }
  ];

  const upcomingPrograms = [
    {
      title: "Program Literasi Digital",
      description: "Pelatihan literasi digital untuk masyarakat pedesaan",
      launchDate: "Q2 2024",
      targetBeneficiaries: "200 Peserta"
    },
    {
      title: "Rumah Baca Komunitas",
      description: "Pembangunan perpustakaan mini di desa-desa terpencil",
      launchDate: "Q3 2024",
      targetBeneficiaries: "10 Desa"
    },
    {
      title: "Program Lingkungan Hijau",
      description: "Penanaman pohon dan edukasi lingkungan",
      launchDate: "Q4 2024",
      targetBeneficiaries: "5,000 Pohon"
    }
  ];

  const achievements = [
    { number: "137", label: "Anak Beasiswa", icon: BookOpen },
    { number: "450+", label: "Peserta Pelatihan", icon: Award },
    { number: "2,500+", label: "Keluarga Terbantu", icon: Heart },
    { number: "85", label: "UMKM Dibina", icon: TrendingUp }
  ];

  return (
    <div className="py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Program Kami
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Berbagai program pemberdayaan dan bantuan untuk membangun masa depan Indonesia yang lebih baik
          </p>
          <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-primary">
            4 Program Aktif
          </Badge>
        </div>

        {/* Achievements Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="border-0 shadow-soft text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-3xl font-bold text-primary mb-2">{achievement.number}</h3>
                    <p className="text-muted-foreground font-medium">{achievement.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Main Programs */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Program Utama</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Program-program yang sedang berjalan dan memberikan dampak nyata bagi masyarakat
            </p>
          </div>

          <div className="space-y-8">
            {mainPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card key={program.id} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    {/* Program Info */}
                    <div className="lg:col-span-2">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className={`w-16 h-16 ${program.color} rounded-xl flex items-center justify-center mr-4`}>
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline" className="text-success border-success">
                                  {program.status}
                                </Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Users className="h-4 w-4 mr-1" />
                                  {program.beneficiaries}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {program.locations}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {program.description}
                        </CardDescription>
                      </CardHeader>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Progress Program</span>
                          <span className="text-sm text-muted-foreground">{program.progress}%</span>
                        </div>
                        <Progress value={program.progress} className="h-2" />
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold mb-4">Fitur Program:</h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Upcoming Programs */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Program Mendatang</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Program-program baru yang sedang dipersiapkan untuk diluncurkan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingPrograms.map((program, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardHeader>
                  <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Peluncuran:</span>
                      <span className="text-sm font-medium">{program.launchDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Target:</span>
                      <span className="text-sm font-medium">{program.targetBeneficiaries}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-0 shadow-soft bg-primary text-primary-foreground">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Bergabunglah Dengan Program Kami
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Setiap kontribusi Anda dapat memberikan dampak besar bagi masa depan Indonesia. Mari bersama-sama membangun negeri ini.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/get-involved">
                    Donasi Sekarang
                    <Heart className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/get-involved">
                    Menjadi Relawan
                    <ArrowRight className="ml-2 h-5 w-5" />
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

export default Programs;