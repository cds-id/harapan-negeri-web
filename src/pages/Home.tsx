import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { Heart, Users, Target, BookOpen, Award, TrendingUp, ArrowRight, Calendar, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-children.jpg";

const Home = () => {
  const heroSlides = [
    {
      image: heroImage,
      alt: "Anak-anak Indonesia yang bahagia belajar bersama"
    },
    {
      image: heroImage,
      alt: "Program beasiswa untuk anak-anak berprestasi"
    },
    {
      image: heroImage,
      alt: "Kegiatan bakti sosial di berbagai daerah"
    },
    {
      image: heroImage,
      alt: "Pelatihan keterampilan untuk masa depan"
    }
  ];

  const stats = [
    { number: "137", label: "Anak & Keluarga Terbantu", icon: Heart },
    { number: "135", label: "Ide & Program Pertumbuhan", icon: Target },
    { number: "450+", label: "Donatur & Relawan", icon: Users },
  ];

  const programs = [
    {
      title: "Beasiswa Sekolah",
      description: "Program beasiswa pendidikan untuk anak-anak kurang mampu agar tetap bisa bersekolah",
      icon: BookOpen,
      color: "bg-primary"
    },
    {
      title: "Panti Asuhan",
      description: "Menampung dan merawat anak-anak kurang mampu dengan kasih sayang dan pendidikan",
      icon: Users,
      color: "bg-secondary"
    },
    {
      title: "Bakti Sosial",
      description: "Kegiatan sosial kemasyarakatan untuk membantu sesama yang membutuhkan",
      icon: Heart,
      color: "bg-info"
    },
  ];

  const news = [
    {
      title: "Bakti Sosial Ramadan 2024",
      excerpt: "Distribusi 500 paket sembako kepada keluarga kurang mampu di Jakarta Pusat",
      date: "15 Maret 2024",
      location: "Jakarta Pusat"
    },
    {
      title: "Pelatihan Digital Marketing",
      excerpt: "50 peserta mengikuti pelatihan digital marketing gratis untuk UMKM",
      date: "10 Maret 2024",
      location: "Bogor"
    },
    {
      title: "Beasiswa 25 Anak Berprestasi",
      excerpt: "Pemberian beasiswa pendidikan untuk 25 anak berprestasi dari keluarga kurang mampu",
      date: "5 Maret 2024",
      location: "Bandung"
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Bersama Kita Peduli,<br />
                <span className="text-primary">Bersama Kita Berbagi</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Membangun masa depan bangsa dengan kasih dan kepedulian tanpa batas untuk seluruh anak negeri
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6 shadow-colored" asChild>
                  <Link to="/get-involved">
                    Donasi Sekarang
                    <Heart className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                  <Link to="/get-involved">
                    Menjadi Relawan
                    <Users className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Slideshow */}
            <div className="relative">
              <Carousel 
                className="relative overflow-hidden rounded-2xl shadow-strong"
                plugins={[
                  Autoplay({
                    delay: 4000,
                    stopOnInteraction: true,
                  }),
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {heroSlides.map((slide, index) => (
                    <CarouselItem key={index}>
                      <div className="relative">
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          className="w-full h-[500px] lg:h-[600px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
              </Carousel>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dampak Nyata Bersama
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pencapaian yang telah kami raih bersama masyarakat Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                    <p className="text-lg text-foreground font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Program Utama Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Berbagai program yang kami jalankan untuk membangun masa depan Indonesia yang lebih baik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${program.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {program.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/programs">
                Lihat Semua Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-16 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Berita & Kegiatan Terbaru
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Update terkini mengenai program dan kegiatan yayasan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {news.map((item, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {item.date}
                    <MapPin className="h-4 w-4 ml-4 mr-1" />
                    {item.location}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/news">
                Lihat Semua Berita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mari Bergabung Membangun Indonesia
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Setiap kontribusi Anda, sekecil apapun, dapat memberikan dampak besar bagi masa depan anak-anak Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/get-involved">
                Donasi Sekarang
                <Heart className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/30 text-primary hover:text-white hover:bg-white/10" asChild>
              <Link to="/contact">
                Hubungi Kami
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
