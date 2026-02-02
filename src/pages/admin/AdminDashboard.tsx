import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminNews } from '@/hooks/useNews';
import { useAdminPrograms } from '@/hooks/usePrograms';
import { useAdminEvents } from '@/hooks/useEvents';
import { useAdminCampaigns, useAdminDonations } from '@/hooks/useCampaigns';
import { useAdminContactMessages } from '@/hooks/useContact';
import { formatCurrency } from '@/lib/supabase-helpers';
import {
  Newspaper,
  FolderKanban,
  Calendar,
  Heart,
  MessageSquare,
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react';

const AdminDashboard = () => {
  const { data: news } = useAdminNews();
  const { data: programs } = useAdminPrograms();
  const { data: events } = useAdminEvents();
  const { data: campaigns } = useAdminCampaigns();
  const { data: donations } = useAdminDonations();
  const { data: messages } = useAdminContactMessages();

  const publishedNews = news?.filter((n) => n.is_published).length || 0;
  const activePrograms = programs?.filter((p) => p.is_active).length || 0;
  const upcomingEvents = events?.filter((e) => e.is_published).length || 0;
  const activeCampaigns = campaigns?.filter((c) => c.is_active).length || 0;
  const unreadMessages = messages?.filter((m) => !m.is_read).length || 0;

  const totalDonations = donations?.reduce((sum, d) => sum + d.amount, 0) || 0;
  const totalDonors = donations?.length || 0;

  const stats = [
    {
      title: 'Berita Dipublish',
      value: publishedNews,
      icon: Newspaper,
      color: 'bg-info',
    },
    {
      title: 'Program Aktif',
      value: activePrograms,
      icon: FolderKanban,
      color: 'bg-success',
    },
    {
      title: 'Event Aktif',
      value: upcomingEvents,
      icon: Calendar,
      color: 'bg-warning',
    },
    {
      title: 'Kampanye Aktif',
      value: activeCampaigns,
      icon: Heart,
      color: 'bg-primary',
    },
    {
      title: 'Total Donasi',
      value: formatCurrency(totalDonations),
      icon: DollarSign,
      color: 'bg-secondary',
    },
    {
      title: 'Total Donatur',
      value: totalDonors,
      icon: Users,
      color: 'bg-info',
    },
    {
      title: 'Pesan Belum Dibaca',
      value: unreadMessages,
      icon: MessageSquare,
      color: 'bg-destructive',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang di Admin Panel Yayasan Harapan Bagimu Negeri
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-primary-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Berita Terbaru</CardTitle>
            <CardDescription>5 berita terakhir yang ditambahkan</CardDescription>
          </CardHeader>
          <CardContent>
            {news?.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.is_published ? 'Dipublish' : 'Draft'}
                  </p>
                </div>
              </div>
            )) || <p className="text-muted-foreground text-sm">Belum ada berita</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pesan Masuk Terbaru</CardTitle>
            <CardDescription>5 pesan terakhir yang masuk</CardDescription>
          </CardHeader>
          <CardContent>
            {messages?.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.subject || 'Tanpa subjek'}
                  </p>
                </div>
                {!item.is_read && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-primary" />
                )}
              </div>
            )) || <p className="text-muted-foreground text-sm">Belum ada pesan</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
