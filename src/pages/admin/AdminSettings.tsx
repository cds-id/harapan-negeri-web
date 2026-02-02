import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Info } from 'lucide-react';
import ContactSettingsForm from '@/components/admin/ContactSettingsForm';
import AboutSettingsForm from '@/components/admin/AboutSettingsForm';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola pengaturan website dan informasi organisasi</p>
      </div>

      <Tabs defaultValue="contact" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Kontak
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Tentang Kami
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <ContactSettingsForm />
        </TabsContent>

        <TabsContent value="about">
          <AboutSettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
