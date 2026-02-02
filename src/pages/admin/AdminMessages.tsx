import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, Check, Reply } from 'lucide-react';
import { toast } from 'sonner';
import {
  useAdminContactMessages,
  useMarkMessageRead,
  useMarkMessageReplied,
} from '@/hooks/useContact';
import { formatDate } from '@/lib/supabase-helpers';

const AdminMessages = () => {
  const { data: messages, isLoading } = useAdminContactMessages();
  const markReadMutation = useMarkMessageRead();
  const markRepliedMutation = useMarkMessageReplied();

  const handleMarkRead = async (id: string) => {
    try {
      await markReadMutation.mutateAsync(id);
      toast.success('Pesan ditandai sudah dibaca');
    } catch (error) {
      toast.error('Gagal menandai pesan');
    }
  };

  const handleMarkReplied = async (id: string) => {
    try {
      await markRepliedMutation.mutateAsync(id);
      toast.success('Pesan ditandai sudah dibalas');
    } catch (error) {
      toast.error('Gagal menandai pesan');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const unreadCount = messages?.filter((m) => !m.is_read).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pesan Masuk</h1>
        <p className="text-muted-foreground">
          {unreadCount > 0 ? `${unreadCount} pesan belum dibaca` : 'Semua pesan sudah dibaca'}
        </p>
      </div>

      <div className="space-y-4">
        {messages?.map((message) => (
          <Card key={message.id} className={!message.is_read ? 'border-primary' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {message.name}
                    {!message.is_read && (
                      <Badge variant="default" className="text-xs">
                        Baru
                      </Badge>
                    )}
                    {message.replied_at && (
                      <Badge variant="secondary" className="text-xs">
                        Sudah Dibalas
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {message.email}
                    </span>
                    {message.phone && <span>📞 {message.phone}</span>}
                    <span>{formatDate(message.created_at)}</span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {!message.is_read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkRead(message.id)}
                      disabled={markReadMutation.isPending}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Tandai Dibaca
                    </Button>
                  )}
                  {!message.replied_at && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkReplied(message.id)}
                      disabled={markRepliedMutation.isPending}
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      Tandai Dibalas
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {message.subject && (
                <p className="font-medium mb-2">Subjek: {message.subject}</p>
              )}
              <p className="text-muted-foreground whitespace-pre-wrap">{message.message}</p>
            </CardContent>
          </Card>
        ))}

        {(!messages || messages.length === 0) && (
          <Card>
            <CardContent className="py-12 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Belum ada pesan masuk</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
