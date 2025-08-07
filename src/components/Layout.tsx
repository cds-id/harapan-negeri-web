import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Phone, Mail, MapPin } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Program", href: "/programs" },
    { name: "Kampanye", href: "/campaigns" },
    { name: "Acara", href: "/events" },
    { name: "Bergabung", href: "/get-involved" },
    { name: "Berita", href: "/news" },
    { name: "Kontak", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-foreground">
                  Yayasan Harapan
                </h1>
                <p className="text-xs text-muted-foreground">Bagimu Negeri</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/get-involved">Menjadi Relawan</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/get-involved">Donasi Sekarang</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t bg-background">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/get-involved">Menjadi Relawan</Link>
                  </Button>
                  <Button size="sm" className="w-full" asChild>
                    <Link to="/get-involved">Donasi Sekarang</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Organization Info */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Yayasan Harapan Bagimu Negeri</h3>
                  <p className="text-secondary-foreground/80">Bersama Kita Peduli, Bersama Kita Berbagi</p>
                </div>
              </div>
              <p className="text-secondary-foreground/80 mb-4 max-w-md">
                Membangun masa depan bangsa dengan kasih dan kepedulian tanpa batas untuk seluruh anak negeri.
              </p>
              <div className="space-y-2">
                <p className="text-sm"><strong>NPWP:</strong> 43.072.813.9-026.000</p>
                <p className="text-sm"><strong>Registrasi:</strong> 0016126.AH.01.04.Tahun 2021</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Tentang Kami</Link></li>
                <li><Link to="/programs" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Program</Link></li>
                <li><Link to="/campaigns" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Kampanye</Link></li>
                <li><Link to="/events" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Acara</Link></li>
                <li><Link to="/news" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Berita</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <MapPin className="h-5 w-5 mt-0.5 text-secondary-foreground/60" />
                  <span className="text-sm text-secondary-foreground/80">
                    Jl. Pangeran Jayakarta 117 B16<br />
                    Kec. Sawah Besar, Jakarta Pusat
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-secondary-foreground/60" />
                  <span className="text-sm text-secondary-foreground/80">0812 8008 0600</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-secondary-foreground/60" />
                  <span className="text-sm text-secondary-foreground/80">info@harapanbagimunegeri.org</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm text-secondary-foreground/60">
              © 2024 Yayasan Harapan Bagimu Negeri. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;