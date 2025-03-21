"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Check, Save } from 'lucide-react';
import ZielgruppePageSkeleton from './page-skeleton';

// 🔹 **Formular-Daten Typisierung**
interface ZielgruppeFormData {
  contentType: string;
  niche: string[];
  targetAudience: string;
  ageRange: [number, number];
  gender: string[];
  location: string[];
  influencers: string;
  notes: string;
}

export default function ZielgruppePage() {
  // ✅ **useState-Hooks ALLE oben**
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState<ZielgruppeFormData>({
    contentType: '',
    niche: [],
    targetAudience: '',
    ageRange: [18, 65],
    gender: [],
    location: [],
    influencers: '',
    notes: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ **Skeleton zuerst returnen (kein Hook nach `return`)**
  if (isLoading) {
    return <ZielgruppePageSkeleton />;
  }

  // 🔹 **Allgemeiner Handler für Checkboxen**
  const handleCheckboxChange = (field: keyof ZielgruppeFormData, value: string) => {
setFormData(prev => ({
  ...prev,
  [field]: (prev[field] as string[]).includes(value) 
    ? (prev[field] as string[]).filter(item => item !== value) 
    : [...(prev[field] as string[]), value]
}));
  };

  // 🔹 **Altersbereich ändern**
  const handleAgeRangeChange = (values: number[]) => {
    setFormData(prev => ({ ...prev, ageRange: [values[0], values[1]] as [number, number] }));
  };

  // 🔹 **Formular speichern**
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      console.log('Gespeicherte Daten:', formData);
      setIsLoading(false);
      setIsSaved(true);

      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 1000);
  };

  // 🔹 **Daten für Checkboxen**
  const options = {
    niches: ["Fitness", "Reisen", "Vanlife", "Trading", "Invest", "Kosmetik", "Gaming"],
    genders: ["männlich", "weiblich", "divers"],
    locations: ["Deutschland", "Österreich", "Schweiz", "Europaweit", "Weltweit"]
  };

  return (
    <>
      <Header title="Zielgruppenanalyse" subtitle="Definiere deine Instagram-Zielgruppe" />

      <Tabs defaultValue="formular" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="formular">Zielgruppe definieren</TabsTrigger>
          <TabsTrigger value="uebersicht">Übersicht</TabsTrigger>
        </TabsList>

        <TabsContent value="formular">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 🔹 Content Type */}
            <Card>
              <CardHeader>
                <CardTitle>📸 Welche Art von Content postest du?</CardTitle>
                <CardDescription>z.B. Kochvideos, Fitness, Musik</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Beschreibe deinen Content..."
                  value={formData.contentType}
                  onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* 🔹 Niche */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 Wähle deine Nische</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {options.niches.map(niche => (
                  <Label key={niche} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={formData.niche.includes(niche)} onCheckedChange={() => handleCheckboxChange('niche', niche)} />
                    {niche}
                  </Label>
                ))}
              </CardContent>
            </Card>

            {/* 🔹 Altersbereich */}
            <Card>
              <CardHeader>
                <CardTitle>👶👵 Alter der Zielgruppe</CardTitle>
              </CardHeader>
              <CardContent>
                <Slider
                  defaultValue={[formData.ageRange[0], formData.ageRange[1]]}
                  max={100}
                  step={1}
                  min={13}
                  onValueChange={handleAgeRangeChange}
                />
                <p className="text-sm text-muted-foreground mt-2">Alter: {formData.ageRange[0]} - {formData.ageRange[1]} Jahre</p>
              </CardContent>
            </Card>

            {/* 🔹 Geschlecht */}
            <Card>
              <CardHeader>
                <CardTitle>⚤ Geschlecht der Zielgruppe</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                {options.genders.map(gender => (
                  <Label key={gender} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={formData.gender.includes(gender)} onCheckedChange={() => handleCheckboxChange('gender', gender)} />
                    {gender}
                  </Label>
                ))}
              </CardContent>
            </Card>

            {/* 🔹 Standort */}
            <Card>
              <CardHeader>
                <CardTitle>🌍 Geografie der Zielgruppe</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {options.locations.map(location => (
                  <Label key={location} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={formData.location.includes(location)} onCheckedChange={() => handleCheckboxChange('location', location)} />
                    {location}
                  </Label>
                ))}
              </CardContent>
            </Card>

            {/* 🔹 Weitere Informationen */}
            <Card>
              <CardHeader>
                <CardTitle>📝 Weitere Anmerkungen</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Zusätzliche Details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* 🔹 Speichern */}
            <div className="flex justify-end">
              <Button type="submit" className="gap-2" disabled={isLoading}>
                {isLoading ? <>Speichern...</> : isSaved ? <><Check size={16} /> Gespeichert</> : <><Save size={16} /> Speichern</>}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </>
  );
}
