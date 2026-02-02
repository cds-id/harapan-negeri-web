import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, User, ArrowLeft, Eye, Clock, Share2, Heart } from "lucide-react";
import { useNewsBySlug, useIncrementNewsViews, usePublicNews } from "@/hooks/useNews";
import { formatDate } from "@/lib/supabase-helpers";
import { Skeleton } from "@/components/ui/skeleton";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: news, isLoading, error } = useNewsBySlug(slug || '');
  const { data: relatedNews } = usePublicNews({ limit: 4 });
  const incrementViews = useIncrementNewsViews();

  // Increment views on mount
  useEffect(() => {
    if (news?.id) {
      incrementViews.mutate(news.id);
    }
  }, [news?.id]);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news?.title,
          text: news?.excerpt || '',
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-64 mb-8" />
          <Skeleton className="aspect-video w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="py-12">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-soft">
            <CardContent className="py-16 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Artikel Tidak Ditemukan</h1>
              <p className="text-muted-foreground mb-6">
                Maaf, artikel yang Anda cari tidak ditemukan atau sudah tidak tersedia.
              </p>
              <Button asChild>
                <Link to="/news">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke Berita
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Filter out current article from related news
  const otherNews = relatedNews?.filter(n => n.id !== news.id).slice(0, 3) || [];

  return (
    <div className="py-12">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/news">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Berita
          </Link>
        </Button>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            {/* Category & Meta */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              {news.news_categories && (
                <Badge className={`${getCategoryColor(news.news_categories.name)} text-white`}>
                  {news.news_categories.name}
                </Badge>
              )}
              {news.published_at && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(news.published_at)}
                </div>
              )}
              {news.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {news.location}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {news.title}
            </h1>

            {/* Excerpt */}
            {news.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {news.excerpt}
              </p>
            )}

            {/* Author & Stats */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {news.author && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {news.author}
                  </div>
                )}
                {news.read_time && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {news.read_time}
                  </div>
                )}
                {news.views !== null && news.views !== undefined && (
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {news.views} views
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
            </div>
          </header>

          <Separator className="my-8" />

          {/* Featured Image */}
          {news.image_url && (
            <div className="aspect-video rounded-xl overflow-hidden mb-8 shadow-soft">
              <img 
                src={news.image_url} 
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: news.content || '' }}
          />

          {/* If content is plain text, render it properly */}
          {news.content && !news.content.includes('<') && (
            <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {news.content}
            </div>
          )}
        </article>

        <Separator className="my-12" />

        {/* Related News */}
        {otherNews.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Berita Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherNews.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/news/${item.slug}`}
                  className="group"
                >
                  <Card className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1 h-full">
                    <div className="aspect-video bg-light-gray overflow-hidden">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Heart className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      {item.news_categories && (
                        <Badge className={`${getCategoryColor(item.news_categories.name)} text-white text-xs mb-2`}>
                          {item.news_categories.name}
                        </Badge>
                      )}
                      <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      {item.published_at && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {formatDate(item.published_at)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <Card className="border-0 shadow-soft bg-primary/5 mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Dukung Program Kami
            </h3>
            <p className="text-muted-foreground mb-6">
              Setiap donasi Anda membantu kami mewujudkan lebih banyak program untuk anak-anak Indonesia
            </p>
            <Button size="lg" asChild>
              <Link to="/donate">Donasi Sekarang</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsDetail;
