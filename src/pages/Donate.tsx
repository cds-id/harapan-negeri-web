import PageBlank from "@/components/PageBlank";
import { Button } from "@/components/ui/button";

const Donate = () => {
  return (
    <PageBlank
      title="Donasi"
      description="Dukung misi Yayasan Harapan Bagimu Negeri untuk membangun Indonesia yang lebih baik. Anda dapat berdonasi melalui QRIS atau transfer bank."
    >
      <div className="max-w-xl mx-auto flex flex-col gap-12">
        {/* QRIS Section */}
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">Donasi via QRIS</h2>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img
              src="/payment-qris.png"
              alt="QRIS Harapan Bagimu Negeri"
              className="w-56 h-56 object-contain mb-4 border border-muted rounded-lg"
            />
            <p className="text-muted-foreground text-center mb-2">
              Scan kode QRIS di atas menggunakan aplikasi pembayaran favorit Anda (GoPay, OVO, DANA, ShopeePay, Mobile Banking, dll).
            </p>
            <Button
              asChild
              className="mt-2"
              size="lg"
            >
              <a href="/payment-qris.png" download>
                Unduh QRIS
              </a>
            </Button>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-muted" />
          <span className="text-muted-foreground text-sm font-medium">atau</span>
          <div className="flex-1 h-px bg-muted" />
        </div>

        {/* Bank Transfer Section */}
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">Transfer Bank</h2>
          <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-lg">Bank</span>
                <span className="text-primary font-semibold">BCA</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-lg">Nomor Rekening</span>
                <span className="text-primary font-mono text-xl tracking-wider">5885377979</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-lg">Atas Nama</span>
                <span className="text-primary font-semibold">YAY HARAPAN BAGIMU NEGERI</span>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">
              Mohon konfirmasi donasi Anda ke kontak kami setelah transfer untuk mendapatkan tanda terima resmi.
            </div>
          </div>
        </section>
      </div>
    </PageBlank>
  );
};

export default Donate;
