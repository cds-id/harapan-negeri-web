import PageBlank from "@/components/PageBlank";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Loader2 } from "lucide-react";
import { usePublicCampaigns } from "@/hooks/useCampaigns";
import { formatCurrency, calculatePercentage } from "@/lib/supabase-helpers";
import DonationConfirmForm from "@/components/DonationConfirmForm";

const Donate = () => {
  const { data: campaigns, isLoading } = usePublicCampaigns();

  return (
    <PageBlank
      title="Donasi"
      description="Dukung misi Yayasan Harapan Bagimu Negeri untuk membangun Indonesia yang lebih baik."
    >
      <div className="max-w-5xl mx-auto">
        {/* Active Campaigns */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Memuat kampanye...</span>
          </div>
        ) : campaigns && campaigns.length > 0 ? (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Kampanye Donasi Aktif</h2>
            <div className="space-y-6">
              {campaigns.map((campaign) => {
                const percentage = calculatePercentage(campaign.collected_amount || 0, campaign.target_amount || 1);
                return (
                  <Card key={campaign.id} className="border-0 shadow-soft">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {campaign.is_featured && (
                              <Badge className="bg-primary text-white">Unggulan</Badge>
                            )}
                            <Badge variant="outline" className="text-success border-success">Aktif</Badge>
                          </div>
                          <CardTitle className="text-xl">{campaign.title}</CardTitle>
                          <CardDescription className="mt-2">{campaign.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-primary">
                              {formatCurrency(campaign.collected_amount || 0)}
                            </span>
                            <span className="text-muted-foreground">{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-3" />
                          <div className="flex justify-between text-sm mt-2 text-muted-foreground">
                            <span>Target: {formatCurrency(campaign.target_amount || 0)}</span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {campaign.donor_count || 0} donatur
                            </span>
                          </div>
                        </div>

                        {campaign.content && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {campaign.content}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Metode Pembayaran</h2>
            
            {/* QRIS Section */}
            <Card className="border-0 shadow-soft">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">Donasi via QRIS</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <img
                  src="/payment-qris.png"
                  alt="QRIS Harapan Bagimu Negeri"
                  className="w-48 h-48 object-contain mb-4 border border-muted rounded-lg"
                />
                <p className="text-muted-foreground text-center mb-3 text-sm">
                  Scan kode QRIS menggunakan aplikasi pembayaran Anda (GoPay, OVO, DANA, ShopeePay, Mobile Banking, dll).
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href="/payment-qris.png" download>
                    Unduh QRIS
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Bank Transfer Section */}
            <Card className="border-0 shadow-soft">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">Transfer Bank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-medium">Bank</span>
                    <span className="text-primary font-semibold">BCA</span>
                  </div>
                  <div className="text-primary font-mono text-2xl tracking-wider">
                    5885377979
                  </div>
                  <div className="text-sm font-medium">
                    a.n. YAY HARAPAN BAGIMU NEGERI
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Confirmation Form */}
          <div>
            <DonationConfirmForm />
          </div>
        </div>

        {/* Call to Action */}
        <section className="mt-12">
          <Card className="border-0 shadow-soft bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Setiap Donasi Berarti
              </h2>
              <p className="text-lg opacity-90 max-w-xl mx-auto">
                Sekecil apapun donasi Anda, akan memberikan dampak besar bagi mereka yang membutuhkan. Terima kasih atas kepedulian Anda.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageBlank>
  );
};

export default Donate;