import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { Heart, Users, Target, BookOpen, Award, ArrowRight, Calendar, MapPin, Loader2, GraduationCap, Briefcase, Shield, Home as HomeIcon } from "lucide-react";
import heroImage from "@/assets/hero-children.jpg";
import { usePublicPrograms } from "@/hooks/usePrograms";
import { usePublicNews } from "@/hooks/useNews";
import { useFeaturedCampaigns } from "@/hooks/useCampaigns";
import { usePublicTestimonials } from "@/hooks/useTestimonials";
import { formatDate, formatCurrency, calculatePercentage } from "@/lib/supabase-helpers";
import { Progress } from "@/components/ui/progress";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Heart,
  Briefcase,
  Shield,
  BookOpen,
  Users,
  Award,
  HomeIcon,
};

const Home = () => {
  const { data: programs, isLoading: isLoadingPrograms } = usePublicPrograms();
  const { data: news, isLoading: isLoadingNews } = usePublicNews(3);
  const { data: campaigns, isLoading: isLoadingCampaigns } = useFeaturedCampaigns(3);
  const { data: testimonials, isLoading: isLoadingTestimonials } = usePublicTestimonials();

  const heroSlides = [
    { image: heroImage, alt: "Anak-anak Indonesia yang bahagia belajar bersama" },
    { image: heroImage, alt: "Program beasiswa untuk anak-anak berprestasi" },
    { image: heroImage, alt: "Kegiatan bakti sosial di berbagai daerah" },
    { image: heroImage, alt: "Pelatihan keterampilan untuk masa depan" }
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
                  <Link to="/donate">
                    Donasi Sekarang
                    <Heart className="ml-2 h-5 w-5" />
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
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
            </div>
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

          {isLoadingPrograms ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {programs?.slice(0, 3).map((program, index) => {
                const IconComponent = iconMap[program.icon || 'Heart'] || Heart;
                const colors = ['bg-primary', 'bg-secondary', 'bg-info'];
                return (
                  <Card key={program.id} className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${colors[index % 3]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="h-8 w-8 text-white" />
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
          )}

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

      {/* Featured Campaigns */}
      {campaigns && campaigns.length > 0 && (
        <section className="py-16 bg-light-gray">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Kampanye Donasi
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Bantu kami mewujudkan program-program kebaikan untuk masyarakat
              </p>
            </div>

            {isLoadingCampaigns ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {campaigns.map((campaign) => {
                  const percentage = calculatePercentage(campaign.collected_amount || 0, campaign.target_amount || 1);
                  return (
                    <Card key={campaign.id} className="border-0 shadow-soft hover:shadow-medium transition-all">
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">{campaign.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Progress value={percentage} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-primary">{formatCurrency(campaign.collected_amount || 0)}</span>
                            <span className="text-muted-foreground">{percentage}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Target: {formatCurrency(campaign.target_amount || 0)}
                          </p>
                          <Button className="w-full" size="sm" asChild>
                            <Link to="/donate">Donasi Sekarang</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/donate">
                  Lihat Semua Kampanye
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Recent News */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Berita & Kegiatan Terbaru
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Update terkini mengenai program dan kegiatan yayasan
            </p>
          </div>

          {isLoadingNews ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : news && news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {news.map((item) => (
                <Card key={item.id} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {item.published_at ? formatDate(item.published_at) : 'Baru'}
                      {item.location && (
                        <>
                          <MapPin className="h-4 w-4 ml-4 mr-1" />
                          {item.location}
                        </>
                      )}
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{item.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Belum ada berita terbaru</p>
            </div>
          )}

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

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 bg-light-gray">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Testimoni
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Apa kata mereka tentang program kami
              </p>
            </div>

            {isLoadingTestimonials ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.slice(0, 4).map((testimonial) => (
                  <Card key={testimonial.id} className="border-0 shadow-soft">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground italic mb-4 line-clamp-4">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-foreground font-bold">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{testimonial.name}</p>
                          {testimonial.role && (
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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
              <Link to="/donate">
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