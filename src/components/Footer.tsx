import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
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
  );
};

export default Footer;