"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Zap, Crown, ChevronRight, Clock, CreditCard, XCircle, Gift } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import PlaenePageSkeleton from './page-skeleton';

// Mock user subscription data
const userSubscription = {
  plan: 'basic',
  periodStart: '2024-03-01',
  periodEnd: '2024-04-01',
  billingCycle: 'monthly',
  price: 9.99,
  status: 'active',
  features: [
    'Basis Instagram-Analyse',
    'Follower-Tracking',
    'Content-Ideen',
    'Bis zu 1 Instagram-Account'
  ],
  remainingDays: 10
};

const plans = [
  {
    id: 'basic',
    name: 'Basis',
    price: 9.99,
    description: 'Für Einsteiger, die ihre Instagram-Präsenz verstehen wollen',
    features: [
      'Basis Instagram-Analyse',
      'Follower-Tracking',
      'Content-Ideen',
      'Bis zu 1 Instagram-Account'
    ],
    highlighted: false,
    icon: <Zap className="h-5 w-5 text-blue-400" />
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    description: 'Für fortgeschrittene Instagram-Nutzer und Content Creator',
    features: [
      'Erweiterte Instagram-Analyse',
      'Follower-Tracking',
      'KI-Content-Ideen',
      'Zielgruppen-Analyse',
      'Hashtag-Optimierung',
      'Bis zu 3 Instagram-Accounts'
    ],
    highlighted: true,
    icon: <Crown className="h-5 w-5 text-yellow-400" />
  },
  {
    id: 'business',
    name: 'Business',
    price: 39.99,
    description: 'Für Profis und Unternehmen mit mehreren Konten',
    features: [
      'Vollständige Instagram-Analyse',
      'Konkurrenz-Analyse',
      'KI-Content-Strategie',
      'Zielgruppen-Segmentierung',
      'Hashtag-Optimierung',
      'Content-Kalender',
      'Prioritäts-Support',
      'Bis zu 10 Instagram-Accounts'
    ],
    highlighted: false,
    icon: <Crown className="h-5 w-5 text-purple-400" />
  }
];

export default function PlansPage() {
  // ✅ **Alle useState-Hooks oben**
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showRetentionOffer, setShowRetentionOffer] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(userSubscription.plan);

  const currentPlan = plans.find(plan => plan.id === userSubscription.plan);

  // Berechnung der Tage bis zur Verlängerung
  const daysUntilRenewal = userSubscription.remainingDays;
  const renewalPercentage = 100 - (daysUntilRenewal / 30) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1700);
    return () => clearTimeout(timer);
  }, []);

  // ✅ **Alle Event-Handler definiert**
  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    setShowRetentionOffer(true);
  };

  const handleKeepSubscription = () => {
    setShowCancelConfirm(false);
    setShowRetentionOffer(false);
  };

  const handleAcceptOffer = () => {
    setShowRetentionOffer(false);
  };

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
  };

  // ✅ **Fix für bedingte Hooks: Skeleton vorab rendern**
  if (isLoading) {
    return <PlaenePageSkeleton />;
  }

  return (
    <>
      <Header
        title="Mitgliedschaft & Abonnement"
        subtitle="Verwalte dein InstaGrowth-Abonnement und entdecke weitere Pläne"
      />

      <Tabs defaultValue="current" className="w-full space-y-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Mein Abonnement</TabsTrigger>
          <TabsTrigger value="plans">Verfügbare Pläne</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {showRetentionOffer ? (
            <Card className="border border-pink-500/20 bg-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-pink-500" />
                  <span>Spezielles Angebot für dich!</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>50% Rabatt auf dein nächstes Abo!</p>
                <div className="flex gap-4">
                  <Button onClick={handleAcceptOffer}>Angebot annehmen</Button>
                  <Button variant="outline" onClick={handleKeepSubscription}>Ablehnen</Button>
                </div>
              </CardContent>
            </Card>
          ) : showCancelConfirm ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span>Abonnement kündigen?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Bist du sicher, dass du dein Abonnement kündigen möchtest?</p>
                <div className="flex gap-4">
                  <Button variant="destructive" onClick={handleConfirmCancel}>
                    Ja, kündigen
                  </Button>
                  <Button variant="outline" onClick={handleKeepSubscription}>
                    Nein, behalten
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{currentPlan?.name} Plan</CardTitle>
                <CardDescription>Nächste Abrechnung am {userSubscription.periodEnd}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{currentPlan?.description}</p>
                <Button variant="destructive" onClick={handleCancelClick}>Kündigen</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
