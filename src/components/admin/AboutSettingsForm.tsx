import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAboutInfo, useUpdateSettings } from '@/hooks/useSiteSettings';
import { toast } from 'sonner';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

interface ProgramItem {
  title: string;
  description: string;
  icon: string;
}

interface StructureItem {
  position: string;
  name: string;
}

const iconOptions = ['Heart', 'Eye', 'Handshake', 'Shield', 'BookOpen', 'Users', 'Target', 'Award', 'TrendingUp', 'Lightbulb'];

const AboutSettingsForm = () => {
  const { data: aboutInfo, isLoading } = useAboutInfo();
  const updateSettings = useUpdateSettings();

  const [background, setBackground] = useState('');
  const [vision, setVision] = useState('');
  const [missions, setMissions] = useState<string[]>(['']);
  const [values, setValues] = useState<ValueItem[]>([{ title: '', description: '', icon: 'Heart' }]);
  const [programs, setPrograms] = useState<ProgramItem[]>([{ title: '', description: '', icon: 'Heart' }]);
  const [structure, setStructure] = useState<StructureItem[]>([{ position: '', name: '' }]);
  const [legalNpwp, setLegalNpwp] = useState('');
  const [legalKemenkumham, setLegalKemenkumham] = useState('');
  const [legalNotaris, setLegalNotaris] = useState('');

  useEffect(() => {
    if (aboutInfo) {
      setBackground(aboutInfo.background);
      setVision(aboutInfo.vision);
      setMissions(aboutInfo.missions.length > 0 ? aboutInfo.missions : ['']);
      setValues(aboutInfo.values.length > 0 ? aboutInfo.values : [{ title: '', description: '', icon: 'Heart' }]);
      setPrograms(aboutInfo.programs.length > 0 ? aboutInfo.programs : [{ title: '', description: '', icon: 'Heart' }]);
      setStructure(aboutInfo.structure.length > 0 ? aboutInfo.structure : [{ position: '', name: '' }]);
      setLegalNpwp(aboutInfo.legalNpwp);
      setLegalKemenkumham(aboutInfo.legalKemenkumham);
      setLegalNotaris(aboutInfo.legalNotaris);
    }
  }, [aboutInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredMissions = missions.filter(m => m.trim() !== '');
    const filteredValues = values.filter(v => v.title.trim() !== '');
    const filteredPrograms = programs.filter(p => p.title.trim() !== '');
    const filteredStructure = structure.filter(s => s.position.trim() !== '' && s.name.trim() !== '');

    try {
      await updateSettings.mutateAsync({
        about_background: background,
        about_vision: vision,
        about_missions: JSON.stringify(filteredMissions),
        about_values: JSON.stringify(filteredValues),
        about_programs: JSON.stringify(filteredPrograms),
        about_structure: JSON.stringify(filteredStructure),
        about_legal_npwp: legalNpwp,
        about_legal_kemenkumham: legalKemenkumham,
        about_legal_notaris: legalNotaris,
      });
      toast.success('Pengaturan Tentang Kami berhasil disimpan');
    } catch (error) {
      toast.error('Gagal menyimpan pengaturan');
    }
  };

  // Mission handlers
  const addMission = () => setMissions([...missions, '']);
  const removeMission = (index: number) => setMissions(missions.filter((_, i) => i !== index));
  const updateMission = (index: number, value: string) => {
    const updated = [...missions];
    updated[index] = value;
    setMissions(updated);
  };

  // Value handlers
  const addValue = () => setValues([...values, { title: '', description: '', icon: 'Heart' }]);
  const removeValue = (index: number) => setValues(values.filter((_, i) => i !== index));
  const updateValue = (index: number, field: keyof ValueItem, value: string) => {
    const updated = [...values];
    updated[index] = { ...updated[index], [field]: value };
    setValues(updated);
  };

  // Program handlers
  const addProgram = () => setPrograms([...programs, { title: '', description: '', icon: 'Heart' }]);
  const removeProgram = (index: number) => setPrograms(programs.filter((_, i) => i !== index));
  const updateProgram = (index: number, field: keyof ProgramItem, value: string) => {
    const updated = [...programs];
    updated[index] = { ...updated[index], [field]: value };
    setPrograms(updated);
  };

  // Structure handlers
  const addStructure = () => setStructure([...structure, { position: '', name: '' }]);
  const removeStructure = (index: number) => setStructure(structure.filter((_, i) => i !== index));
  const updateStructure = (index: number, field: keyof StructureItem, value: string) => {
    const updated = [...structure];
    updated[index] = { ...updated[index], [field]: value };
    setStructure(updated);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Background */}
      <Card>
        <CardHeader>
          <CardTitle>Latar Belakang</CardTitle>
          <CardDescription>Sejarah dan cerita pendirian yayasan</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="Ceritakan latar belakang pendirian yayasan..."
            rows={5}
          />
        </CardContent>
      </Card>

      {/* Vision */}
      <Card>
        <CardHeader>
          <CardTitle>Visi</CardTitle>
          <CardDescription>Visi jangka panjang yayasan</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            placeholder="Tuliskan visi yayasan..."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Missions */}
      <Card>
        <CardHeader>
          <CardTitle>Misi</CardTitle>
          <CardDescription>Langkah-langkah untuk mencapai visi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {missions.map((mission, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={mission}
                onChange={(e) => updateMission(index, e.target.value)}
                placeholder={`Misi ${index + 1}`}
                className="flex-1"
              />
              {missions.length > 1 && (
                <Button type="button" variant="outline" size="icon" onClick={() => removeMission(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addMission} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Tambah Misi
          </Button>
        </CardContent>
      </Card>

      {/* Core Values */}
      <Card>
        <CardHeader>
          <CardTitle>Nilai-Nilai Inti</CardTitle>
          <CardDescription>Prinsip dasar yang dipegang yayasan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {values.map((value, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Nilai {index + 1}</span>
                {values.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeValue(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={value.title}
                  onChange={(e) => updateValue(index, 'title', e.target.value)}
                  placeholder="Judul nilai"
                />
                <select
                  value={value.icon}
                  onChange={(e) => updateValue(index, 'icon', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <Input
                value={value.description}
                onChange={(e) => updateValue(index, 'description', e.target.value)}
                placeholder="Deskripsi nilai"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addValue} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Tambah Nilai
          </Button>
        </CardContent>
      </Card>

      {/* Featured Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Program Unggulan</CardTitle>
          <CardDescription>Program utama yang dijalankan yayasan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {programs.map((program, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Program {index + 1}</span>
                {programs.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeProgram(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  value={program.title}
                  onChange={(e) => updateProgram(index, 'title', e.target.value)}
                  placeholder="Nama program"
                />
                <select
                  value={program.icon}
                  onChange={(e) => updateProgram(index, 'icon', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <Textarea
                value={program.description}
                onChange={(e) => updateProgram(index, 'description', e.target.value)}
                placeholder="Deskripsi program"
                rows={2}
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addProgram} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Tambah Program
          </Button>
        </CardContent>
      </Card>

      {/* Organization Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Struktur Organisasi</CardTitle>
          <CardDescription>Susunan pengurus yayasan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {structure.map((member, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={member.position}
                onChange={(e) => updateStructure(index, 'position', e.target.value)}
                placeholder="Jabatan"
                className="flex-1"
              />
              <Input
                value={member.name}
                onChange={(e) => updateStructure(index, 'name', e.target.value)}
                placeholder="Nama"
                className="flex-1"
              />
              {structure.length > 1 && (
                <Button type="button" variant="outline" size="icon" onClick={() => removeStructure(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addStructure} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Tambah Pengurus
          </Button>
        </CardContent>
      </Card>

      {/* Legal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Legalitas</CardTitle>
          <CardDescription>Informasi legal dan registrasi yayasan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="legal_npwp">NPWP</Label>
              <Input
                id="legal_npwp"
                value={legalNpwp}
                onChange={(e) => setLegalNpwp(e.target.value)}
                placeholder="43.072.813.9-026.000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="legal_kemenkumham">Kemenkumham</Label>
              <Input
                id="legal_kemenkumham"
                value={legalKemenkumham}
                onChange={(e) => setLegalKemenkumham(e.target.value)}
                placeholder="0016126.AH.01.04.Tahun 2021"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="legal_notaris">SK Notaris</Label>
              <Input
                id="legal_notaris"
                value={legalNotaris}
                onChange={(e) => setLegalNotaris(e.target.value)}
                placeholder="01"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={updateSettings.isPending} className="w-full md:w-auto">
        {updateSettings.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        Simpan Pengaturan Tentang Kami
      </Button>
    </form>
  );
};

export default AboutSettingsForm;
