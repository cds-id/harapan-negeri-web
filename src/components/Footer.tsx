import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const TikTokIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );

  return (
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
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Ikuti Kami</h4>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/harapanbagimunegeri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com/harapanbagimunegeri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://tiktok.com/@harapanbagimunegeri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
                <a
                  href="https://youtube.com/@harapanbagimunegeri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Tentang Kami</Link></li>
              <li><Link to="/programs" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Program</Link></li>
              <li><Link to="/donate" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">Donasi</Link></li>
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
            © 2026 Yayasan Harapan Bagimu Negeri. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
