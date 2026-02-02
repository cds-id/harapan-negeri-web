import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, Eye, Trash2, Clock, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency, formatDate } from '@/lib/supabase-helpers';
import {
  useAdminDonations,
  useUpdateDonation,
  useDeleteDonation,
  Donation,
} from '@/hooks/useCampaigns';
import { useAuth } from '@/hooks/useAuth';

const AdminDonations = () => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const { user } = useAuth();
  const { data: donations, isLoading } = useAdminDonations();
  const updateMutation = useUpdateDonation();
  const deleteMutation = useDeleteDonation();

  const handleView = (donation: Donation) => {
    setSelectedDonation(donation);
    setAdminNotes(donation.admin_notes || '');
    setIsViewDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedDonation || !user) return;
    try {
      await updateMutation.mutateAsync({
        id: selectedDonation.id,
        payment_status: 'completed',
        verified_at: new Date().toISOString(),
        verified_by: user.id,
        admin_notes: adminNotes,
      });
      toast.success('Donasi berhasil diverifikasi');
      setIsViewDialogOpen(false);
    } catch (error) {
      toast.error('Gagal memverifikasi donasi');
    }
  };

  const handleReject = async () => {
    if (!selectedDonation || !user) return;
    try {
      await updateMutation.mutateAsync({
        id: selectedDonation.id,
        payment_status: 'rejected',
        verified_at: new Date().toISOString(),
        verified_by: user.id,
        admin_notes: adminNotes,
      });
      toast.success('Donasi ditolak');
      setIsViewDialogOpen(false);
    } catch (error) {
      toast.error('Gagal menolak donasi');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success('Donasi berhasil dihapus');
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    } catch (error) {
      toast.error('Gagal menghapus donasi');
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success text-white">Terverifikasi</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline" className="text-warning border-warning">Menunggu</Badge>;
    }
  };

  // Count statistics
  const pendingCount = donations?.filter(d => d.payment_status === 'pending').length || 0;
  const completedCount = donations?.filter(d => d.payment_status === 'completed').length || 0;
  const totalAmount = donations?.filter(d => d.payment_status === 'completed').reduce((acc, d) => acc + (d.amount || 0), 0) || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Kelola Donasi</h1>
        <p className="text-muted-foreground">Verifikasi dan kelola donasi yang masuk</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Menunggu Verifikasi</CardDescription>
            <CardTitle className="text-2xl text-warning">{pendingCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Terverifikasi</CardDescription>
            <CardTitle className="text-2xl text-success">{completedCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Terkumpul</CardDescription>
            <CardTitle className="text-2xl text-primary">{formatCurrency(totalAmount)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Donasi</CardTitle>
          <CardDescription>{donations?.length || 0} donasi total</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donatur</TableHead>
                <TableHead>Kampanye</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Bukti</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {item.is_anonymous ? 'Anonim' : item.donor_name}
                      </p>
                      {!item.is_anonymous && item.donor_email && (
                        <p className="text-sm text-muted-foreground">{item.donor_email}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-1">{item.campaigns?.title || 'Donasi Umum'}</p>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(item.amount)}</TableCell>
                  <TableCell>
                    {item.proof_image_url ? (
                      <a
                        href={item.proof_image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Lihat
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-sm">Tidak ada</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.payment_status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(item.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeletingId(item.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!donations || donations.length === 0) && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">Belum ada donasi</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View/Approve Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Donasi</DialogTitle>
            <DialogDescription>
              Verifikasi dan kelola donasi
            </DialogDescription>
          </DialogHeader>
          {selectedDonation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Donatur</p>
                  <p className="font-medium">
                    {selectedDonation.is_anonymous ? 'Anonim' : selectedDonation.donor_name}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Jumlah</p>
                  <p className="font-medium text-primary">{formatCurrency(selectedDonation.amount)}</p>
                </div>
                {!selectedDonation.is_anonymous && (
                  <>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedDonation.donor_email || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Telepon</p>
                      <p className="font-medium">{selectedDonation.donor_phone || '-'}</p>
                    </div>
                  </>
                )}
                <div>
                  <p className="text-muted-foreground">Metode Pembayaran</p>
                  <p className="font-medium">{selectedDonation.payment_method || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  {getStatusBadge(selectedDonation.payment_status)}
                </div>
              </div>

              {selectedDonation.message && (
                <div>
                  <p className="text-muted-foreground text-sm">Pesan</p>
                  <p className="text-sm bg-muted p-2 rounded">{selectedDonation.message}</p>
                </div>
              )}

              {selectedDonation.proof_image_url && (
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Bukti Pembayaran</p>
                  <a
                    href={selectedDonation.proof_image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={selectedDonation.proof_image_url}
                      alt="Bukti Pembayaran"
                      className="max-h-48 rounded border cursor-pointer hover:opacity-80"
                    />
                  </a>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="admin_notes">Catatan Admin</Label>
                <Textarea
                  id="admin_notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Tambahkan catatan..."
                  rows={2}
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            {selectedDonation?.payment_status === 'pending' && (
              <>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <XCircle className="mr-2 h-4 w-4" />
                  )}
                  Tolak
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={updateMutation.isPending}
                  className="bg-success hover:bg-success/90"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  )}
                  Verifikasi
                </Button>
              </>
            )}
            {selectedDonation?.payment_status !== 'pending' && (
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Tutup
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Donasi?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDonations;
