import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, ArrowRight, Eye, Heart, Clock, Loader2 } from "lucide-react";
import { usePublicNews, useFeaturedNews, useNewsCategories, useNewsCategoryCounts } from "@/hooks/useNews";
import { useSubscribeNewsletter } from "@/hooks/useContact";
import { formatDate } from "@/lib/supabase-helpers";
import { useToast } from "@/hooks/use-toast";

const News = () => {
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { data: allNews, isLoading: isLoadingNews } = usePublicNews({ categoryId: selectedCategory });
  const { data: featuredNews, isLoading: isLoadingFeatured } = useFeaturedNews();
  const { data: categories } = useNewsCategories();
  const { data: categoryCounts } = useNewsCategoryCounts();
  const subscribeNewsletter = useSubscribeNewsletter();

  // Get total news count (unfiltered)
  const { data: totalNews } = usePublicNews({});
  const totalCount = totalNews?.length || 0;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await subscribeNewsletter.mutateAsync(email);
      toast({
        title: "Berhasil!",
        description: "Terima kasih telah berlangganan newsletter kami.",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message || "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName?.toLowerCase()) {
      case "bakti sosial": return "bg-primary";
      case "pendidikan": return "bg-secondary";
      case "pelatihan": return "bg-info";
      case "kesehatan": return "bg-success";
      case "kerjasama": return "bg-warning";
      default: return "bg-muted";
    }
  };

  if (isLoadingNews || isLoadingFeatured) {
    return (
      <div className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Memuat berita...</span>
          </div>
        </div>
      </div>
    );
  }

  // Filter out featured news from the list only when showing all
  const recentNews = selectedCategory 
    ? allNews || []
    : allNews?.filter(n => n.id !== featuredNews?.id) || [];

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
            {totalCount} Artikel
          </Badge>
        </div>

        {/* Categories Filter */}
        {categories && categories.length > 0 && (
          <section className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
              >
                Semua
                <Badge variant="secondary" className="ml-2">
                  {totalCount}
                </Badge>
              </Button>
              {categories.map((category) => (
                <Button 
                  key={category.id} 
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                  {categoryCounts && categoryCounts[category.id] && (
                    <Badge variant="secondary" className="ml-2">
                      {categoryCounts[category.id]}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </section>
        )}

        {/* Featured News */}
        {featuredNews && (
          <section className="mb-16">
            <Card className="border-0 shadow-soft overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="aspect-video lg:aspect-square bg-light-gray flex items-center justify-center">
                  {featuredNews.image_url ? (
                    <img 
                      src={featuredNews.image_url} 
                      alt={featuredNews.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Foto Kegiatan</p>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    {featuredNews.news_categories && (
                      <Badge className={`${getCategoryColor(featuredNews.news_categories.name)} text-white`}>
                        {featuredNews.news_categories.name}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-primary border-primary">Unggulan</Badge>
                    {featuredNews.published_at && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(featuredNews.published_at)}
                      </div>
                    )}
                    {featuredNews.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {featuredNews.location}
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {featuredNews.title}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {featuredNews.author && (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {featuredNews.author}
                        </div>
                      )}
                      {featuredNews.read_time && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {featuredNews.read_time}
                        </div>
                      )}
                      {featuredNews.views !== null && featuredNews.views !== undefined && (
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {featuredNews.views}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="lg" asChild>
                      <Link to={`/news/${featuredNews.slug}`}>
                        Baca Selengkapnya
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Recent News Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Berita Terbaru</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ikuti perkembangan terbaru dari berbagai program dan kegiatan yayasan
            </p>
          </div>

          {recentNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNews.map((news) => (
                <Card key={news.id} className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-light-gray flex items-center justify-center overflow-hidden">
                    {news.image_url ? (
                      <img 
                        src={news.image_url} 
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Foto Kegiatan</p>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      {news.news_categories && (
                        <Badge className={`${getCategoryColor(news.news_categories.name)} text-white text-xs`}>
                          {news.news_categories.name}
                        </Badge>
                      )}
                      {news.views !== null && news.views !== undefined && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="h-3 w-3 mr-1" />
                          {news.views}
                        </div>
                      )}
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
                      {news.published_at && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(news.published_at)}
                        </div>
                      )}
                      {news.read_time && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {news.read_time}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {news.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {news.location}
                        </div>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/news/${news.slug}`}>
                          Baca
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-soft">
              <CardContent className="py-12 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Belum ada berita terbaru</p>
              </CardContent>
            </Card>
          )}
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
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                  required
                />
                <Button size="lg" type="submit" disabled={subscribeNewsletter.isPending}>
                  {subscribeNewsletter.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Berlangganan"
                  )}
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-4">
                Kami menghormati privasi Anda. Unsubscribe kapan saja.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default News;