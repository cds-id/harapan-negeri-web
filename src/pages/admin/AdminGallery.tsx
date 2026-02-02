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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Pencil, Trash2, Upload, Image } from 'lucide-react';
import { toast } from 'sonner';
import { uploadImage } from '@/lib/supabase-helpers';
import {
  useAdminGallery,
  useCreateGalleryItem,
  useUpdateGalleryItem,
  useDeleteGalleryItem,
  GalleryItem,
} from '@/hooks/useGallery';

const AdminGallery = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    sort_order: 0,
    is_published: true,
  });

  const { data: gallery, isLoading } = useAdminGallery();
  const createMutation = useCreateGalleryItem();
  const updateMutation = useUpdateGalleryItem();
  const deleteMutation = useDeleteGalleryItem();

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: '',
      sort_order: 0,
      is_published: true,
    });
    setEditingItem(null);
  };

  const handleOpenDialog = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description || '',
        image_url: item.image_url,
        category: item.category || '',
        sort_order: item.sort_order || 0,
        is_published: item.is_published ?? true,
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
      const url = await uploadImage(file, 'gallery');
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
    if (!formData.image_url) {
      toast.error('Gambar wajib diupload');
      return;
    }
    try {
      if (editingItem) {
        await updateMutation.mutateAsync({ id: editingItem.id, ...formData });
        toast.success('Galeri berhasil diperbarui');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Galeri berhasil ditambahkan');
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
      toast.success('Galeri berhasil dihapus');
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    } catch (error) {
      toast.error('Gagal menghapus galeri');
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
          <h1 className="text-3xl font-bold text-foreground">Kelola Galeri</h1>
          <p className="text-muted-foreground">Tambah, edit, dan hapus foto galeri</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Foto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Galeri Foto</CardTitle>
          <CardDescription>{gallery?.length || 0} foto total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery?.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleOpenDialog(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setDeletingId(item.id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {item.title}
                    </p>
                    {item.category && (
                      <p className="text-white/70 text-xs">{item.category}</p>
                    )}
                  </div>
                </div>
                {!item.is_published && (
                  <div className="absolute top-2 left-2 bg-warning text-warning-foreground text-xs px-2 py-1 rounded">
                    Draft
                  </div>
                )}
              </div>
            ))}
            {(!gallery || gallery.length === 0) && (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <Image className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Belum ada foto</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Foto' : 'Tambah Foto'}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? 'Perbarui informasi foto' : 'Tambah foto baru ke galeri'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Gambar *</Label>
              <div className="flex items-center gap-4">
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="h-24 w-24 rounded object-cover"
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
              <Label htmlFor="title">Judul *</Label>
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
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                  placeholder="Kegiatan, Event, dll"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort_order">Urutan</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sort_order: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_published: checked }))
                }
              />
              <Label htmlFor="is_published">Publish</Label>
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
                {editingItem ? 'Simpan Perubahan' : 'Tambah Foto'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Foto?</AlertDialogTitle>
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

export default AdminGallery;
