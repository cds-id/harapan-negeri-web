import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Home, Heart, Users, MapPin, ArrowRight, CheckCircle, Loader2, GraduationCap, Briefcase, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicPrograms } from "@/hooks/usePrograms";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Heart,
  Briefcase,
  Shield,
  BookOpen,
  Users,
  Home,
};

const Programs = () => {
  const { data: programs, isLoading } = usePublicPrograms();


  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Memuat program...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Program Kami
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Berbagai program pemberdayaan dan bantuan untuk membangun masa depan Indonesia yang lebih baik
          </p>
          <Badge variant="outline" className="text-lg px-6 py-2 border-primary text-primary">
            {programs?.length || 0} Program Aktif
          </Badge>
        </div>


        {/* Main Programs */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Program Utama</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Program-program yang sedang berjalan dan memberikan dampak nyata bagi masyarakat
            </p>
          </div>

          {programs && programs.length > 0 ? (
            <div className="space-y-8">
              {programs.map((program, index) => {
                const IconComponent = iconMap[program.icon || 'Heart'] || Heart;
                const colors = ['bg-primary', 'bg-secondary', 'bg-info', 'bg-success'];
                return (
                  <Card key={program.id} className="border-0 shadow-soft hover:shadow-medium transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                      {/* Program Info */}
                      <div className="lg:col-span-2">
                        <CardHeader className="p-0 mb-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <div className={`w-16 h-16 ${colors[index % 4]} rounded-xl flex items-center justify-center mr-4`}>
                                <IconComponent className="h-8 w-8 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                                <div className="flex items-center gap-4">
                                  <Badge variant="outline" className="text-success border-success">
                                    Aktif
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                          <CardDescription className="text-base leading-relaxed">
                            {program.description}
                          </CardDescription>
                        </CardHeader>

                        {/* Content Preview */}
                        {program.content && (
                          <div className="mb-4">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {program.content}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Program Image / Placeholder */}
                      <div className="flex flex-col justify-center">
                        {program.image_url ? (
                          <img 
                            src={program.image_url} 
                            alt={program.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-48 bg-light-gray rounded-lg flex items-center justify-center">
                            <IconComponent className="h-16 w-16 text-primary/30" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border-0 shadow-soft">
              <CardContent className="py-12 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Belum ada program yang tersedia</p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="border-0 shadow-soft bg-primary text-primary-foreground">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Bergabunglah Dengan Program Kami
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Setiap kontribusi Anda dapat memberikan dampak besar bagi masa depan Indonesia. Mari bersama-sama membangun negeri ini.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/donate">
                    Donasi Sekarang
                    <Heart className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Programs;