import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, ArrowRight, Heart, CheckCircle, Star, Loader2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import PageBlank from "@/components/PageBlank";
import { usePublicEvents, useUpcomingEvents } from "@/hooks/useEvents";
import { formatDate } from "@/lib/supabase-helpers";

const Events = () => {
  const { data: allEvents, isLoading: isLoadingAll } = usePublicEvents();
  const { data: upcomingEvents, isLoading: isLoadingUpcoming } = useUpcomingEvents();

  // Separate past events (event_date < today)
  const today = new Date().toISOString().split('T')[0];
  const pastEvents = allEvents?.filter(event => event.event_date && event.event_date < today) || [];


  const getStatusColor = (eventDate: string | null) => {
    if (!eventDate) return "text-muted border-muted";
    const date = new Date(eventDate);
    const now = new Date();
    if (date < now) return "text-muted border-muted";
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) return "text-warning border-warning";
    return "text-success border-success";
  };

  const getStatusText = (eventDate: string | null) => {
    if (!eventDate) return "Tanggal TBA";
    const date = new Date(eventDate);
    const now = new Date();
    if (date < now) return "Selesai";
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) return "Segera";
    return "Pendaftaran Dibuka";
  };

  if (isLoadingAll || isLoadingUpcoming) {
    return (
      <PageBlank
        title="Acara & Kegiatan"
        description="Ikuti berbagai acara dan kegiatan yang diselenggarakan Yayasan Harapan Bagimu Negeri"
      >
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Memuat data...</span>
        </div>
      </PageBlank>
    );
  }

  return (
    <PageBlank
      title="Acara & Kegiatan"
      description="Ikuti berbagai acara dan kegiatan yang diselenggarakan Yayasan Harapan Bagimu Negeri"
    >

      {/* Events Tabs */}
      <section className="mb-12">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md mx-auto">
            <TabsTrigger value="upcoming">
              <Calendar className="mr-2 h-4 w-4" />
              Mendatang ({upcomingEvents?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="past">
              <CheckCircle className="mr-2 h-4 w-4" />
              Selesai ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-6">

            {upcomingEvents && upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                    {event.image_url && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={getStatusColor(event.event_date)}>
                          {getStatusText(event.event_date)}
                        </Badge>
                        {event.max_participants && (
                          <span className="text-xs text-muted-foreground">
                            <Users className="h-3 w-3 inline mr-1" />
                            {event.current_participants || 0}/{event.max_participants}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        {event.event_date && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-primary mr-2" />
                            <span>{formatDate(event.event_date)}</span>
                          </div>
                        )}
                        {event.event_time && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-primary mr-2" />
                            <span>{event.event_time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-primary mr-2" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        )}
                      </div>
                      {event.registration_link ? (
                        <Button className="w-full" asChild>
                          <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                            Daftar Sekarang
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      ) : (
                        <Button className="w-full" variant="outline" asChild>
                          <Link to="/contact">
                            Hubungi Kami
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-soft">
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">Belum ada event mendatang</p>
                  <p className="text-sm text-muted-foreground mt-2">Pantau terus untuk update event selanjutnya</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past" className="space-y-6">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="border-0 shadow-soft">
                    {event.image_url && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover opacity-75" />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <Badge variant="outline" className="text-muted border-muted w-fit mb-2">
                        Selesai
                      </Badge>
                      <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {event.event_date && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(event.event_date)}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-soft">
                <CardContent className="py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">Belum ada event yang selesai</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </section>
      {/* CTA */}
      <section>
        <Card className="border-0 shadow-soft bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Dukung Program Kami
            </h2>
            <p className="text-base mb-6 opacity-90 max-w-xl mx-auto">
              Setiap kontribusi Anda membantu kami menyelenggarakan lebih banyak kegiatan untuk masyarakat
            </p>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Donasi Sekarang
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </PageBlank>
  );
};

export default Events;