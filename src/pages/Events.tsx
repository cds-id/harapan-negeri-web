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
      description="Ikuti berbagai acara dan kegiatan yang diselenggarakan Yayasan Harapan Bagimu Negeri untuk membangun Indonesia yang lebih baik"
    >
      <div className="text-center mb-16">
        <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-primary">
          {upcomingEvents?.length || 0} Event Mendatang
        </Badge>
      </div>


      {/* Events Tabs */}
      <section className="mb-16">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming" className="text-lg py-3">
              <Calendar className="mr-2 h-5 w-5" />
              Event Mendatang ({upcomingEvents?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="past" className="text-lg py-3">
              <CheckCircle className="mr-2 h-5 w-5" />
              Event Selesai ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Event Mendatang</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Jangan lewatkan kesempatan untuk berpartisipasi dalam program-program kami
              </p>
            </div>

            {upcomingEvents && upcomingEvents.length > 0 ? (
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                      {/* Event Info */}
                      <div className="lg:col-span-2">
                        <CardHeader className="p-0 mb-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mr-4">
                                <Calendar className="h-8 w-8 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                                <div className="flex items-center gap-4">
                                  <Badge variant="outline" className={getStatusColor(event.event_date)}>
                                    {getStatusText(event.event_date)}
                                  </Badge>
                                  {event.max_participants && (
                                    <span className="text-sm text-muted-foreground">
                                      <Users className="h-4 w-4 inline mr-1" />
                                      {event.current_participants || 0}/{event.max_participants} peserta
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardDescription className="text-base leading-relaxed mb-4">
                            {event.description}
                          </CardDescription>
                        </CardHeader>

                        {/* Event Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Registration Button */}
                      <div className="flex flex-col justify-center">
                        {event.content && (
                          <div className="mb-4">
                            <p className="text-sm text-muted-foreground line-clamp-4">{event.content}</p>
                          </div>
                        )}
                        {event.registration_link ? (
                          <Button className="w-full" size="lg" asChild>
                            <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                              Daftar Sekarang
                              <ExternalLink className="ml-2 h-5 w-5" />
                            </a>
                          </Button>
                        ) : (
                          <Button className="w-full" size="lg" asChild>
                            <Link to="/contact">
                              Hubungi Kami
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
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
          <TabsContent value="past" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Event yang Telah Selesai</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Lihat dampak dan pencapaian dari event-event yang telah kami selenggarakan
              </p>
            </div>

            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="border-0 shadow-soft">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-muted border-muted">
                          Selesai
                        </Badge>
                      </div>
                      <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm text-muted-foreground mb-4">
                        {event.event_date && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(event.event_date)}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                        )}
                        {event.current_participants && (
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {event.current_participants} peserta
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

      {/* Event Registration CTA */}
      <section className="mb-16">
        <Card className="border-0 shadow-soft bg-light-gray">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ingin Mengikuti Event Kami?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan orang yang telah merasakan manfaat dari program-program kami. Daftarkan diri Anda sekarang!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Hubungi Kami
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Card className="border-0 shadow-soft bg-primary text-primary-foreground">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              Mari Berpartisipasi Aktif
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Setiap kehadiran Anda dalam event kami adalah kontribusi nyata untuk membangun Indonesia yang lebih baik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  Donasi Sekarang
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageBlank>
  );
};

export default Events;