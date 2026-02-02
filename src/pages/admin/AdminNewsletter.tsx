import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, Mail } from 'lucide-react';
import { useAdminNewsletterSubscribers } from '@/hooks/useContact';
import { formatDate } from '@/lib/supabase-helpers';

const AdminNewsletter = () => {
  const { data: subscribers, isLoading } = useAdminNewsletterSubscribers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeCount = subscribers?.filter((s) => s.is_active).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Newsletter Subscribers</h1>
        <p className="text-muted-foreground">
          {activeCount} subscriber aktif dari {subscribers?.length || 0} total
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Subscriber</CardTitle>
          <CardDescription>
            Daftar email yang berlangganan newsletter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Berlangganan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers?.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {subscriber.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={subscriber.is_active ? 'default' : 'outline'}>
                      {subscriber.is_active ? 'Aktif' : 'Unsubscribed'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(subscriber.subscribed_at)}</TableCell>
                </TableRow>
              ))}
              {(!subscribers || subscribers.length === 0) && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    <Mail className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Belum ada subscriber</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNewsletter;
