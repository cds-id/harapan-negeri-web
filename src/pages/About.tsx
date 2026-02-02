import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Users, Target, BookOpen, Award, TrendingUp, Eye, Lightbulb, Shield, Handshake, CheckCircle, Building2, FileText, Phone, MapPin } from "lucide-react";
import PageBlank from "@/components/PageBlank";
import { useAboutInfo, useContactInfo } from "@/hooks/useSiteSettings";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Users,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Eye,
  Lightbulb,
  Shield,
  Handshake,
  CheckCircle,
  Building2,
  FileText,
  Phone,
  MapPin,
};

const colorClasses = ['bg-primary', 'bg-info', 'bg-secondary', 'bg-success', 'bg-warning'];

const About = () => {
  const { data: aboutInfo, isLoading: aboutLoading } = useAboutInfo();
  const { data: contactInfo, isLoading: contactLoading } = useContactInfo();

  const isLoading = aboutLoading || contactLoading;

  if (isLoading) {
    return (
      <PageBlank
        title="Tentang Kami"
        description="Mengenal lebih dekat Yayasan Harapan Bagimu Negeri dan komitmen kami untuk membangun masa depan Indonesia yang lebih baik"
      >
        <div className="space-y-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </PageBlank>
    );
  }

  const values = aboutInfo?.values || [];
  const programs = aboutInfo?.programs || [];
  const structure = aboutInfo?.structure || [];
  const missions = aboutInfo?.missions || [];

  return (
    <PageBlank
      title="Tentang Kami"
      description="Mengenal lebih dekat Yayasan Harapan Bagimu Negeri dan komitmen kami untuk membangun masa depan Indonesia yang lebih baik"
    >
      <div className="text-center mb-16">
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
            <CardTitle className="text-3xl mb-2">{contactInfo?.organizationName || 'Yayasan Harapan Bagimu Negeri'}</CardTitle>
            <CardDescription className="text-xl text-primary font-semibold">
              "{contactInfo?.organizationTagline || 'Bersama Kita Peduli, Bersama Kita Berbagi'}"
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Background Story */}
      {aboutInfo?.background && (
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latar Belakang</h2>
          </div>
          <Card className="border-0 shadow-soft">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {aboutInfo.background}
              </p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Vision & Mission */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Visi & Misi</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          {aboutInfo?.vision && (
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {aboutInfo.vision}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Mission */}
          {missions.length > 0 && (
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
          )}
        </div>
      </section>

      {/* Core Values */}
      {values.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nilai-Nilai Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi landasan dalam setiap kegiatan dan program yayasan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = iconMap[value.icon] || Heart;
              const colorClass = colorClasses[index % colorClasses.length];
              return (
                <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
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
      )}

      {/* Featured Programs */}
      {programs.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Program Unggulan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Program-program utama yang menjadi fokus kegiatan yayasan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              const Icon = iconMap[program.icon] || Heart;
              const colorClass = colorClasses[index % colorClasses.length];
              return (
                <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center mr-4`}>
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
      )}

      {/* Organization Structure */}
      {structure.length > 0 && (
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
                {structure.map((member, index) => (
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
                    {index < structure.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Legal Information */}
      {(aboutInfo?.legalNpwp || aboutInfo?.legalKemenkumham || aboutInfo?.legalNotaris) && (
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Legalitas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Informasi legal dan registrasi yayasan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutInfo?.legalNpwp && (
              <Card className="border-0 shadow-soft">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-info rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>NPWP</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg font-mono">{aboutInfo.legalNpwp}</p>
                </CardContent>
              </Card>
            )}

            {aboutInfo?.legalKemenkumham && (
              <Card className="border-0 shadow-soft">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>Kemenkumham</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg font-mono">{aboutInfo.legalKemenkumham}</p>
                </CardContent>
              </Card>
            )}

            {aboutInfo?.legalNotaris && (
              <Card className="border-0 shadow-soft">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>SK Notaris</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg font-mono">{aboutInfo.legalNotaris}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Contact Information */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Kontak Kami</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut atau berkolaborasi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactInfo?.phone && (
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
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-lg font-mono hover:text-primary transition-colors">
                  {contactInfo.phone}
                </a>
              </CardContent>
            </Card>
          )}

          {contactInfo?.address && (
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
                  {contactInfo.address}
                  {contactInfo.addressDetail && (
                    <>
                      <br />
                      {contactInfo.addressDetail}
                    </>
                  )}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </PageBlank>
  );
};

export default About;
