import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
import { Progress } from '@/components/ui/progress';
import { Loader2, Plus, Pencil, Trash2, Upload, Image } from 'lucide-react';
import { toast } from 'sonner';
import { uploadImage, formatCurrency, calculatePercentage } from '@/lib/supabase-helpers';
import {
  useAdminCampaigns,
  useCreateCampaign,
  useUpdateCampaign,
  useDeleteCampaign,
  Campaign,
} from '@/hooks/useCampaigns';

const AdminCampaigns = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image_url: '',
    target_amount: 0,
    start_date: '',
    end_date: '',
    is_active: true,
    is_featured: false,
  });

  const { data: campaigns, isLoading } = useAdminCampaigns();
  const createMutation = useCreateCampaign();
  const updateMutation = useUpdateCampaign();
  const deleteMutation = useDeleteCampaign();

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      image_url: '',
      target_amount: 0,
      start_date: '',
      end_date: '',
      is_active: true,
      is_featured: false,
    });
    setEditingCampaign(null);
  };

  const handleOpenDialog = (campaign?: Campaign) => {
    if (campaign) {
      setEditingCampaign(campaign);
      setFormData({
        title: campaign.title,
        description: campaign.description || '',
        content: campaign.content || '',
        image_url: campaign.image_url || '',
        target_amount: campaign.target_amount || 0,
        start_date: campaign.start_date || '',
        end_date: campaign.end_date || '',
        is_active: campaign.is_active ?? true,
        is_featured: campaign.is_featured ?? false,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImage(file, 'campaigns');
      if (url) {
        setFormData((prev) => ({ ...prev, image_url: url }));
        toast.success('Gambar berhasil diupload');
      } else {
        toast.error('Gagal mengupload gambar');
      }
    } catch (error) {
      toast.error('Gagal mengupload gambar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCampaign) {
        await updateMutation.mutateAsync({ id: editingCampaign.id, ...formData });
        toast.success('Kampanye berhasil diperbarui');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Kampanye berhasil ditambahkan');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Terjadi kesalahan');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success('Kampanye berhasil dihapus');
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    } catch (error) {
      toast.error('Gagal menghapus kampanye');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kelola Kampanye Donasi</h1>
          <p className="text-muted-foreground">Tambah, edit, dan hapus kampanye donasi</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Kampanye
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kampanye</CardTitle>
          <CardDescription>{campaigns?.length || 0} kampanye total</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kampanye</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Terkumpul</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns?.map((item) => {
                const progress = calculatePercentage(
                  item.collected_amount || 0,
                  item.target_amount || 0
                );
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="h-10 w-10 rounded object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                            <Image className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium line-clamp-1">{item.title}</p>
                          {item.is_featured && (
                            <Badge variant="secondary" className="mt-1">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.target_amount || 0)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {formatCurrency(item.collected_amount || 0)}
                        </p>
                        <Progress value={progress} className="h-2 w-20" />
                        <p className="text-xs text-muted-foreground">
                          {progress}% • {item.donor_count || 0} donatur
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.is_active ? 'default' : 'outline'}>
                        {item.is_active ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <Pencil className="h-4 w-4" />
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
                );
              })}
              {(!campaigns || campaigns.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <p className="text-muted-foreground">Belum ada kampanye</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCampaign ? 'Edit Kampanye' : 'Tambah Kampanye'}
            </DialogTitle>
            <DialogDescription>
              {editingCampaign ? 'Perbarui informasi kampanye' : 'Tambah kampanye baru'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Nama Kampanye *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Singkat</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Detail Kampanye</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Gambar</Label>
              <div className="flex items-center gap-4">
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="h-20 w-20 rounded object-cover"
                  />
                )}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    Upload Gambar
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_amount">Target Donasi (Rp)</Label>
              <Input
                id="target_amount"
                type="number"
                value={formData.target_amount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    target_amount: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Tanggal Mulai</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, start_date: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">Tanggal Berakhir</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, end_date: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, is_active: checked }))
                  }
                />
                <Label htmlFor="is_active">Aktif</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, is_featured: checked }))
                  }
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingCampaign ? 'Simpan Perubahan' : 'Tambah Kampanye'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kampanye?</AlertDialogTitle>
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

export default AdminCampaigns;
