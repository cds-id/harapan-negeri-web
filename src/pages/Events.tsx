import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, ArrowRight, Heart, BookOpen, Award, TrendingUp, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import PageBlank from "@/components/PageBlank";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Bakti Sosial Kesehatan Gratis",
      description: "Pemeriksaan kesehatan gratis untuk masyarakat kurang mampu di Jakarta Timur",
      date: "25 Maret 2024",
      time: "08:00 - 15:00 WIB",
      location: "Puskesmas Kramat Jati, Jakarta Timur",
      category: "Kesehatan",
      participants: "200 peserta",
      status: "Pendaftaran Dibuka",
      icon: Heart,
      color: "bg-success",
      details: [
        "Pemeriksaan dokter umum",
        "Cek tekanan darah dan gula darah",
        "Konsultasi gizi",
        "Pembagian obat gratis",
        "Edukasi kesehatan"
      ]
    },
    {
      id: 2,
      title: "Workshop Digital Marketing untuk UMKM",
      description: "Pelatihan digital marketing dan e-commerce untuk pelaku UMKM di Bogor",
      date: "2 April 2024",
      time: "09:00 - 16:00 WIB",
      location: "Gedung Serbaguna Bogor",
      category: "Pelatihan",
      participants: "50 peserta",
      status: "Segera Dibuka",
      icon: Award,
      color: "bg-info",
      details: [
        "Strategi pemasaran digital",
        "Optimasi media sosial",
        "Teknik fotografi produk",
        "Manajemen toko online",
        "Sertifikat pelatihan"
      ]
    },
    {
      id: 3,
      title: "Program Beasiswa Anak Negeri 2024",
      description: "Pemberian beasiswa pendidikan untuk 50 anak berprestasi dari keluarga kurang mampu",
      date: "15 April 2024",
      time: "10:00 - 12:00 WIB",
      location: "Aula Yayasan, Jakarta Pusat",
      category: "Pendidikan",
      participants: "50 penerima beasiswa",
      status: "Seleksi Berlangsung",
      icon: BookOpen,
      color: "bg-primary",
      details: [
        "Beasiswa untuk SD, SMP, SMA",
        "Bantuan biaya sekolah",
        "Buku dan alat tulis",
        "Bimbingan belajar",
        "Monitoring prestasi"
      ]
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Bakti Sosial Ramadan 2024",
      description: "Distribusi 500 paket sembako untuk keluarga kurang mampu",
      date: "15 Maret 2024",
      location: "Jakarta Pusat",
      category: "Bakti Sosial",
      participants: "500 keluarga",
      status: "Selesai",
      impact: "500 paket sembako terdistribusi"
    },
    {
      id: 5,
      title: "Pelatihan Menjahit untuk Ibu-Ibu PKK",
      description: "Workshop keterampilan menjahit dan fashion design",
      date: "20 Februari 2024",
      location: "Tangerang",
      category: "Pelatihan",
      participants: "30 peserta",
      status: "Selesai",
      impact: "30 ibu-ibu mendapat keterampilan baru"
    },
    {
      id: 6,
      title: "Pemeriksaan Kesehatan Gratis",
      description: "Program kesehatan untuk masyarakat Depok",
      date: "28 Februari 2024",
      location: "Depok",
      category: "Kesehatan",
      participants: "200 peserta",
      status: "Selesai",
      impact: "200 orang mendapat pemeriksaan kesehatan"
    }
  ];

  const eventStats = [
    { number: "25+", label: "Event per Tahun", icon: Calendar },
    { number: "2,500+", label: "Total Peserta", icon: Users },
    { number: "15", label: "Kota Jangkauan", icon: MapPin },
    { number: "95%", label: "Tingkat Kepuasan", icon: Star }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Kesehatan": return "bg-success";
      case "Pelatihan": return "bg-info";
      case "Pendidikan": return "bg-primary";
      case "Bakti Sosial": return "bg-secondary";
      default: return "bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendaftaran Dibuka": return "text-success border-success";
      case "Segera Dibuka": return "text-warning border-warning";
      case "Seleksi Berlangsung": return "text-info border-info";
      case "Selesai": return "text-muted border-muted";
      default: return "text-muted border-muted";
    }
  };

  return (
    <PageBlank
      title="Acara & Kegiatan"
      description="Ikuti berbagai acara dan kegiatan yang diselenggarakan Yayasan Harapan Bagimu Negeri untuk membangun Indonesia yang lebih baik"
    >
      <div className="text-center mb-16">
        <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-primary">
          3 Event Mendatang
        </Badge>
      </div>

        {/* Event Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {eventStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-0 shadow-soft text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Events Tabs */}
        <section className="mb-16">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upcoming" className="text-lg py-3">
                <Calendar className="mr-2 h-5 w-5" />
                Event Mendatang
              </TabsTrigger>
              <TabsTrigger value="past" className="text-lg py-3">
                <CheckCircle className="mr-2 h-5 w-5" />
                Event Selesai
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

              <div className="space-y-6">
                {upcomingEvents.map((event) => {
                  const Icon = event.icon;
                  return (
                    <Card key={event.id} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                        {/* Event Info */}
                        <div className="lg:col-span-2">
                          <CardHeader className="p-0 mb-4">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center">
                                <div className={`w-16 h-16 ${event.color} rounded-xl flex items-center justify-center mr-4`}>
                                  <Icon className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                                  <div className="flex items-center gap-4">
                                    <Badge variant="outline" className={getCategoryColor(event.category) + " text-white"}>
                                      {event.category}
                                    </Badge>
                                    <Badge variant="outline" className={getStatusColor(event.status)}>
                                      {event.status}
                                    </Badge>
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
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-primary mr-2" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-primary mr-2" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-primary mr-2" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-primary mr-2" />
                              <span>{event.participants}</span>
                            </div>
                          </div>
                        </div>

                        {/* Event Features */}
                        <div>
                          <h4 className="font-semibold mb-4">Yang Akan Anda Dapatkan:</h4>
                          <ul className="space-y-2 mb-6">
                            {event.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-success mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{detail}</span>
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full" size="lg">
                            Daftar Sekarang
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Past Events */}
            <TabsContent value="past" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Event yang Telah Selesai</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Lihat dampak dan pencapaian dari event-event yang telah kami selenggarakan
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="border-0 shadow-soft">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${getCategoryColor(event.category)} text-white text-xs`}>
                          {event.category}
                        </Badge>
                        <Badge variant="outline" className="text-muted border-muted">
                          {event.status}
                        </Badge>
                      </div>

                      <CardTitle className="text-xl line-clamp-2">
                        {event.title}
                      </CardTitle>

                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {event.participants}
                        </div>
                      </div>

                      <div className="bg-light-gray p-3 rounded-lg">
                        <p className="text-sm font-medium text-success">Dampak:</p>
                        <p className="text-sm text-muted-foreground">{event.impact}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                <Button size="lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Lihat Jadwal Event
                </Button>
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
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                  <Heart className="mr-2 h-5 w-5" />
                  Daftar Event
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/get-involved">
                    Menjadi Relawan
                    <Users className="ml-2 h-5 w-5" />
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
