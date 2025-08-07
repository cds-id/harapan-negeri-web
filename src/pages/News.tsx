import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, ArrowRight, Eye, Heart, Share2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const News = () => {
  const featuredNews = {
    id: 1,
    title: "Bakti Sosial Ramadan 2024: Berbagi Kebahagiaan di Bulan Suci",
    excerpt: "Yayasan Harapan Bagimu Negeri berhasil mendistribusikan 500 paket sembako kepada keluarga kurang mampu di Jakarta Pusat dalam rangka menyambut bulan suci Ramadan.",
    content: "Program bakti sosial Ramadan 2024 ini merupakan salah satu program unggulan yayasan yang telah berlangsung selama 3 tahun berturut-turut. Kegiatan ini melibatkan 50 relawan dan berhasil menjangkau 15 kelurahan di Jakarta Pusat.",
    date: "15 Maret 2024",
    location: "Jakarta Pusat",
    author: "Tim Redaksi",
    category: "Bakti Sosial",
    readTime: "5 menit",
    views: 1250,
    image: "/api/placeholder/800/400"
  };

  const recentNews = [
    {
      id: 2,
      title: "Pelatihan Digital Marketing untuk UMKM Sukses Digelar",
      excerpt: "50 peserta UMKM mengikuti pelatihan digital marketing gratis yang diselenggarakan di Bogor",
      date: "10 Maret 2024",
      location: "Bogor",
      category: "Pelatihan",
      readTime: "3 menit",
      views: 890
    },
    {
      id: 3,
      title: "25 Anak Berprestasi Terima Beasiswa Pendidikan",
      excerpt: "Pemberian beasiswa pendidikan untuk 25 anak berprestasi dari keluarga kurang mampu di Bandung",
      date: "5 Maret 2024",
      location: "Bandung",
      category: "Pendidikan",
      readTime: "4 menit",
      views: 1100
    },
    {
      id: 4,
      title: "Program Kesehatan Gratis Jangkau 200 Keluarga",
      excerpt: "Pemeriksaan kesehatan gratis dan pembagian obat-obatan untuk masyarakat di Depok",
      date: "28 Februari 2024",
      location: "Depok",
      category: "Kesehatan",
      readTime: "3 menit",
      views: 750
    },
    {
      id: 5,
      title: "Workshop Keterampilan Menjahit Diminati Ibu-Ibu PKK",
      excerpt: "30 ibu-ibu PKK antusias mengikuti workshop keterampilan menjahit di Tangerang",
      date: "20 Februari 2024",
      location: "Tangerang",
      category: "Pelatihan",
      readTime: "4 menit",
      views: 650
    },
    {
      id: 6,
      title: "Kerjasama dengan Universitas untuk Program Beasiswa",
      excerpt: "Penandatanganan MoU dengan 3 universitas untuk program beasiswa mahasiswa berprestasi",
      date: "15 Februari 2024",
      location: "Jakarta",
      category: "Kerjasama",
      readTime: "5 menit",
      views: 980
    }
  ];

  const categories = [
    { name: "Semua", count: 25, active: true },
    { name: "Bakti Sosial", count: 8, active: false },
    { name: "Pendidikan", count: 7, active: false },
    { name: "Pelatihan", count: 6, active: false },
    { name: "Kesehatan", count: 4, active: false }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Bakti Sosial": return "bg-primary";
      case "Pendidikan": return "bg-secondary";
      case "Pelatihan": return "bg-info";
      case "Kesehatan": return "bg-success";
      case "Kerjasama": return "bg-warning";
      default: return "bg-muted";
    }
  };

  return (
    <div className="py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Berita & Artikel
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Update terbaru tentang kegiatan, program, dan dampak yang telah dicapai Yayasan Harapan Bagimu Negeri
          </p>
          <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-primary">
            25+ Artikel Terbaru
          </Badge>
        </div>

        {/* Categories Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={category.active ? "default" : "outline"}
                className={`${category.active ? "" : "hover:bg-primary hover:text-primary-foreground"}`}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </section>

        {/* Featured News */}
        <section className="mb-16">
          <Card className="border-0 shadow-soft overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="aspect-video lg:aspect-square bg-light-gray flex items-center justify-center">
                <div className="text-center">
                  <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Foto Kegiatan Bakti Sosial</p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={`${getCategoryColor(featuredNews.category)} text-white`}>
                    {featuredNews.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredNews.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {featuredNews.location}
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {featuredNews.title}
                </h2>
                
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                
                <p className="text-muted-foreground mb-6">
                  {featuredNews.content}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {featuredNews.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredNews.readTime}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {featuredNews.views}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button size="lg">
                    Baca Selengkapnya
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Recent News Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Berita Terbaru</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ikuti perkembangan terbaru dari berbagai program dan kegiatan yayasan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNews.map((news) => (
              <Card key={news.id} className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                {/* Image Placeholder */}
                <div className="aspect-video bg-light-gray flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Foto Kegiatan</p>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getCategoryColor(news.category)} text-white text-xs`}>
                      {news.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                      {news.views}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg line-clamp-2">
                    {news.title}
                  </CardTitle>
                  
                  <CardDescription className="line-clamp-2">
                    {news.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {news.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {news.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {news.location}
                    </div>
                    <Button variant="ghost" size="sm">
                      Baca
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="mb-16">
          <Card className="border-0 shadow-soft bg-light-gray">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Berlangganan Newsletter
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Dapatkan update terbaru tentang program dan kegiatan yayasan langsung di email Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                />
                <Button size="lg">
                  Berlangganan
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Kami menghormati privasi Anda. Unsubscribe kapan saja.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Load More */}
        <section className="text-center">
          <Button variant="outline" size="lg">
            Muat Lebih Banyak Berita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </div>
    </div>
  );
};

export default News;