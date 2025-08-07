import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart, CreditCard, Smartphone, CheckCircle, Info, ArrowRight, QrCode, Download, Users, GraduationCap, Shield, Gift, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Donate = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);


  const bankAccount = {
    bank: "BCA",
    accountNumber: "5885377979",
    accountName: "YAY HARAPAN BAGIMU NEGERI"
  };

  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent("00020101021126650013ID.CO.BCA.WWW011893600014000300035402150008850030003540303UMI51440014ID.CO.QRIS.WWW0215ID20254016654970303UMI5204839853033605802ID5923YAY HARAPAN BAGIMU NEGE6013JAKARTA PUSAT61051073062070703A016304E171")}&size=200&centerImageUrl=https%3A%2F%2Fapi.nawasenacendekia.com%2Fstorage%2Fuser-files%2F2025%2F08%2F1754546868948-3966014f.png`;



  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qris-harapan-bagimu-negeri.png';
    link.click();
  };



  return (
    <div className="py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl -z-10 blur-3xl pointer-events-none"></div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            Donasi Terpercaya
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-6">
            Wujudkan Harapan
            <span className="block text-primary">Bersama</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Setiap donasi Anda akan memberikan dampak nyata bagi masa depan anak-anak Indonesia yang membutuhkan.
            Mari bersama membangun negeri yang lebih baik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Badge variant="secondary" className="text-lg px-6 py-2">
              💝 Donasi Bebas - Sesuai Kemampuan Anda
            </Badge>
          </div>
        </div>

        {/* Impact Stats */}
        <section className="mb-20">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground overflow-hidden relative">
            <div className="absolute inset-0 bg-white/5 opacity-30"></div>
            <CardContent className="p-12 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Dampak Nyata Donasi Anda</h2>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Setiap rupiah yang Anda donasikan telah memberikan dampak nyata bagi masa depan Indonesia
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="text-5xl font-bold mb-2 bg-white/20 rounded-lg py-4">137</div>
                  <p className="text-lg opacity-90 font-medium">Anak Terbantu</p>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 ">
                    <Heart className="h-8 w-8" />
                  </div>
                  <div className="text-5xl font-bold mb-2 bg-white/20 rounded-lg py-4">2,500+</div>
                  <p className="text-lg opacity-90 font-medium">Keluarga Terdampak</p>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div className="text-5xl font-bold mb-2 bg-white/20 rounded-lg py-4">15</div>
                  <p className="text-lg opacity-90 font-medium">Provinsi Jangkauan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Donation Methods */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Cara Berdonasi</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pilih metode donasi yang paling mudah dan nyaman untuk Anda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bank Transfer */}
            <Card className="border-0 shadow-xl group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CreditCard className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl mb-2">Transfer Bank</CardTitle>
                <CardDescription className="text-lg">Transfer langsung ke rekening resmi yayasan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 relative z-10">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border">
                  <div className="text-center space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Bank</p>
                      <p className="text-3xl font-bold text-blue-600">{bankAccount.bank}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Nomor Rekening</p>
                      <div className="flex items-center justify-center gap-3">
                        <p className="text-3xl font-mono font-bold tracking-wider bg-white px-4 py-2 rounded-lg shadow-sm">
                          {bankAccount.accountNumber}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(bankAccount.accountNumber, 'account')}
                          className="hover:bg-blue-100"
                        >
                          {copiedField === 'account' ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Atas Nama</p>
                      <p className="text-lg font-semibold bg-white px-4 py-2 rounded-lg">{bankAccount.accountName}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-lg flex items-center">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-white font-bold">!</span>
                    </div>
                    Langkah-langkah:
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Buka aplikasi mobile banking atau datang ke ATM",
                      "Pilih menu transfer ke bank BCA",
                      `Masukkan nomor rekening: ${bankAccount.accountNumber}`,
                      "Masukkan jumlah donasi sesuai kemampuan Anda",
                      "Konfirmasi transaksi",
                      "Simpan bukti transfer dan kirim ke WhatsApp kami"
                    ].map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start"
                      >
                        <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QRIS */}
            <Card className="border-0 shadow-xl group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100"></div>
              <CardHeader className="text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl mb-2">QRIS</CardTitle>
                <CardDescription className="text-lg">Scan QR code dengan aplikasi e-wallet atau mobile banking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 relative z-10">
                <div className="text-center">
                <div className="inline-block p-6 bg-white rounded-2xl shadow-lg border">
                  <img
                    src={qrCodeUrl}
                    alt="QRIS Code Yayasan Harapan Bagimu Negeri"
                    className="w-48 h-48 mx-auto rounded-lg"
                  />
                </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-lg flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-white font-bold">!</span>
                    </div>
                    Langkah-langkah:
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Buka aplikasi e-wallet (GoPay, OVO, DANA, dll) atau mobile banking",
                      "Pilih menu 'Bayar' atau 'Transfer' lalu 'Scan QR'",
                      "Scan QR code di atas",
                      "Masukkan jumlah donasi sesuai kemampuan Anda",
                      "Konfirmasi pembayaran",
                      "Screenshot bukti pembayaran"
                    ].map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start"
                      >
                        <div className="w-6 h-6 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-20">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-amber-100/30"></div>
            <CardContent className="p-10 relative z-10">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                  <Info className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-6 text-amber-900">Informasi Penting</h3>
                  <div className="grid gap-4">
                    {[
                      "100% donasi Anda akan disalurkan langsung kepada penerima manfaat tanpa potongan administrasi",
                      "Laporan penggunaan dana akan dikirimkan secara berkala via email atau WhatsApp untuk transparansi penuh",
                      "Bukti transfer dapat dikirim ke WhatsApp 0812-8008-0600 untuk konfirmasi dan tindak lanjut",
                      "Donasi bersifat sukarela dan tidak ada jumlah minimum - berikan sesuai kemampuan Anda",
                      "Semua donasi akan digunakan untuk program pendidikan, kesehatan, dan bantuan sosial"
                    ].map((note, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-amber-500/20 text-amber-700 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <p className="text-amber-800 leading-relaxed">{note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-white/50 rounded-xl border border-amber-200">
                    <h4 className="font-bold text-amber-900 mb-3">Hubungi Kami:</h4>
                    <p className="text-amber-800">
                      💬 <strong>WhatsApp:</strong> 0812-8008-0600 |
                      📧 <strong>Email:</strong> info@harapanbagimu.org
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Donate;
