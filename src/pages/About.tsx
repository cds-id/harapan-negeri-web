import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Users, Target, BookOpen, Award, TrendingUp, Eye, Lightbulb, Shield, Handshake, CheckCircle, Building2, FileText, Phone, MapPin } from "lucide-react";

const About = () => {
  const coreValues = [
    {
      title: "Kepedulian",
      description: "Tanggap terhadap kebutuhan masyarakat",
      icon: Heart,
      color: "bg-primary"
    },
    {
      title: "Transparansi", 
      description: "Mengelola dana dan program secara terbuka",
      icon: Eye,
      color: "bg-info"
    },
    {
      title: "Kolaborasi",
      description: "Bersinergi dengan berbagai pihak demi tujuan bersama",
      icon: Handshake,
      color: "bg-secondary"
    },
    {
      title: "Integritas",
      description: "Bertindak jujur dan bertanggung jawab",
      icon: Shield,
      color: "bg-success"
    }
  ];

  const programs = [
    {
      title: "Beasiswa Anak Negeri",
      description: "Dukungan pendidikan bagi siswa dari keluarga tidak mampu",
      icon: BookOpen,
      color: "bg-primary"
    },
    {
      title: "Pelatihan Keterampilan",
      description: "Kursus gratis desain grafis, menjahit, digital marketing, dll",
      icon: Award,
      color: "bg-secondary"
    },
    {
      title: "Bakti Sosial dan Kesehatan Gratis",
      description: "Pemeriksaan kesehatan, pembagian sembako, dan lainnya",
      icon: Heart,
      color: "bg-info"
    },
    {
      title: "Program UMKM Lokal",
      description: "Membina dan mendampingi usaha kecil di desa-desa",
      icon: TrendingUp,
      color: "bg-success"
    }
  ];

  const organizationStructure = [
    { position: "Pembina", name: "Jemmy Jeftha Lesnussa" },
    { position: "Pengawas", name: "Bonifasius Lutu Edo" },
    { position: "Ketua", name: "Andre Febrianto & Eli Saat" },
    { position: "Sekretaris", name: "Tri H. Sirait" },
    { position: "Bendahara", name: "Johanes Jung" }
  ];

  const missions = [
    "Memberikan bantuan pendidikan kepada anak-anak kurang mampu agar mereka dapat menggapai masa depan yang lebih baik",
    "Menyalurkan dukungan sosial berupa makanan, pakaian, dan kebutuhan dasar kepada keluarga rentan di berbagai daerah",
    "Mendorong pengembangan masyarakat lokal melalui pelatihan keterampilan, kewirausahaan, dan pembinaan karakter",
    "Menanamkan nilai kasih, persatuan, dan nasionalisme kepada generasi muda Indonesia",
    "Berkolaborasi dengan masyarakat, pemerintah, dan lembaga lain untuk menciptakan program yang berkelanjutan dan inklusif"
  ];

  return (
    <div className="py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tentang Kami
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Mengenal lebih dekat Yayasan Harapan Bagimu Negeri dan komitmen kami untuk membangun masa depan Indonesia yang lebih baik
          </p>
          <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-primary">
            Lembaga Non Profit
          </Badge>
        </div>

        {/* Organization Info */}
        <section className="mb-16">
          <Card className="border-0 shadow-soft">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-10 w-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl mb-2">Yayasan Harapan Bagimu Negeri</CardTitle>
              <CardDescription className="text-xl text-primary font-semibold">
                "Bersama Kita Peduli, Bersama Kita Berbagi"
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Background Story */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latar Belakang</h2>
          </div>
          <Card className="border-0 shadow-soft">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Yayasan ini didirikan pada masa pandemi, berawal dari kepedulian terhadap sesama manusia dengan perpaduan latar belakang dari rohaniawan, pengusaha, karyawan dan pekerja sosial. Memiliki visi dan misi yang sama untuk membantu menangani pekerjaan rumah Pemerintah Republik Indonesia yang tidak bisa ditangani sepenuhnya oleh pemerintah, khususnya dalam bidang ekonomi, sosial dan budaya demi mewujudkan masyarakat yang adil dan makmur berdasarkan Pancasila dan UUD 1945.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Vision & Mission */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Visi & Misi</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Menjadi yayasan yang membangun masa depan bangsa dengan kasih dan kepedulian tanpa batas untuk seluruh anak negeri.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {missions.map((mission, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mt-1 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{mission}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nilai-Nilai Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi landasan dalam setiap kegiatan dan program yayasan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Featured Programs */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Program Unggulan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Program-program utama yang menjadi fokus kegiatan yayasan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${program.color} rounded-lg flex items-center justify-center mr-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{program.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {program.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Organization Structure */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Struktur Organisasi</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tim pengurus yang memimpin dan mengelola yayasan
            </p>
          </div>

          <Card className="border-0 shadow-soft">
            <CardContent className="p-8">
              <div className="space-y-6">
                {organizationStructure.map((member, index) => (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{member.position}</h3>
                          <p className="text-muted-foreground">{member.name}</p>
                        </div>
                      </div>
                    </div>
                    {index < organizationStructure.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Legal Information */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Legalitas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Informasi legal dan registrasi yayasan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-soft">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-info rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle>NPWP</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-mono">43.072.813.9-026.000</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Kemenkumham</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-mono">0016126.AH.01.04.Tahun 2021</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle>SK Notaris</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-mono">01</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Kontak Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut atau berkolaborasi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>Telepon</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-mono">0812 8008 0600</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <CardTitle>Alamat</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  Jl. Pangeran Jayakarta 117 B16<br />
                  Kec. Sawah Besar, Jakarta Pusat
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;