import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AnalyticsData {
  // Métricas principais (KPI)
  totalVisits: number;
  uniqueVisitors: number;
  conversionRate: number;
  bounceRate: number;
  avgTimeOnPage: number;
  
  // Conversões e funil
  leadsGenerated: number;
  leadCaptureRate: number;
  leadSources: Array<{ source: string; count: number; percentage: number }>;
  funnelSteps: Array<{ step: string; visitors: number; conversionRate: number }>;
  
  // Performance da página
  ctaClicks: Array<{ button: string; clicks: number }>;
  heatmapData: Array<{ element: string; clicks: number; percentage: number }>;
  scrollDepth: Array<{ depth: string; percentage: number }>;
  
  // Segmentação
  locationData: Array<{ location: string; visitors: number; percentage: number }>;
  deviceData: Array<{ device: string; visitors: number; percentage: number }>;
  browserData: Array<{ browser: string; visitors: number; percentage: number }>;
  
  // Dados temporais
  dailyVisits: Array<{ date: string; visits: number; conversions: number }>;
  hourlyData: Array<{ hour: string; visits: number }>;
  
  // Performance técnica
  pageLoadTime: number;
  mobileScore: number;
  desktopScore: number;
}

interface AnalyticsContextType {
  analytics: AnalyticsData;
  trackPageView: () => void;
  trackCTAClick: (buttonName: string) => void;
  trackLead: (source: string) => void;
  trackScrollDepth: (depth: number) => void;
  trackTimeOnPage: (seconds: number) => void;
  getAnalyticsSummary: () => any;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

// Mock data realista para demonstração
const initialAnalytics: AnalyticsData = {
  totalVisits: 15847,
  uniqueVisitors: 12634,
  conversionRate: 3.2,
  bounceRate: 42.8,
  avgTimeOnPage: 187, // segundos
  
  leadsGenerated: 507,
  leadCaptureRate: 3.2,
  leadSources: [
    { source: 'Google Ads', count: 203, percentage: 40.0 },
    { source: 'Facebook Ads', count: 152, percentage: 30.0 },
    { source: 'Orgânico', count: 101, percentage: 20.0 },
    { source: 'LinkedIn', count: 31, percentage: 6.1 },
    { source: 'E-mail Marketing', count: 20, percentage: 3.9 }
  ],
  
  funnelSteps: [
    { step: 'Visitou a página', visitors: 15847, conversionRate: 100 },
    { step: 'Rolou até benefícios', visitors: 11085, conversionRate: 70 },
    { step: 'Clicou em CTA', visitors: 1585, conversionRate: 10 },
    { step: 'Preencheu formulário', visitors: 634, conversionRate: 4 },
    { step: 'Converteu (Lead)', visitors: 507, conversionRate: 3.2 }
  ],
  
  ctaClicks: [
    { button: 'Solicitar Demonstração (Hero)', clicks: 892 },
    { button: 'Solicitar Demo (Header)', clicks: 423 },
    { button: 'Solicitar Demonstração Gratuita (CTA)', clicks: 270 },
    { button: 'Ver Como Funciona', clicks: 156 }
  ],
  
  heatmapData: [
    { element: 'Botão Hero CTA', clicks: 892, percentage: 35.2 },
    { element: 'Menu Navegação', clicks: 634, percentage: 25.0 },
    { element: 'Seção Benefícios', clicks: 507, percentage: 20.0 },
    { element: 'Formulário Contato', clicks: 380, percentage: 15.0 },
    { element: 'Footer Links', clicks: 127, percentage: 4.8 }
  ],
  
  scrollDepth: [
    { depth: '25%', percentage: 85.2 },
    { depth: '50%', percentage: 70.1 },
    { depth: '75%', percentage: 45.8 },
    { depth: '100%', percentage: 28.3 }
  ],
  
  locationData: [
    { location: 'São Paulo, SP', visitors: 4754, percentage: 30.0 },
    { location: 'Rio de Janeiro, RJ', visitors: 2377, percentage: 15.0 },
    { location: 'Belo Horizonte, MG', visitors: 1901, percentage: 12.0 },
    { location: 'Porto Alegre, RS', visitors: 1585, percentage: 10.0 },
    { location: 'Curitiba, PR', visitors: 1268, percentage: 8.0 },
    { location: 'Outros', visitors: 3962, percentage: 25.0 }
  ],
  
  deviceData: [
    { device: 'Desktop', visitors: 8508, percentage: 53.7 },
    { device: 'Mobile', visitors: 6031, percentage: 38.1 },
    { device: 'Tablet', visitors: 1308, percentage: 8.2 }
  ],
  
  browserData: [
    { browser: 'Chrome', visitors: 9508, percentage: 60.0 },
    { browser: 'Safari', visitors: 3169, percentage: 20.0 },
    { browser: 'Firefox', visitors: 1585, percentage: 10.0 },
    { browser: 'Edge', visitors: 1268, percentage: 8.0 },
    { browser: 'Outros', visitors: 317, percentage: 2.0 }
  ],
  
  dailyVisits: [
    { date: '01/12', visits: 1247, conversions: 42 },
    { date: '02/12', visits: 1389, conversions: 38 },
    { date: '03/12', visits: 1156, conversions: 51 },
    { date: '04/12', visits: 1523, conversions: 47 },
    { date: '05/12', visits: 1678, conversions: 62 },
    { date: '06/12', visits: 1834, conversions: 58 },
    { date: '07/12', visits: 2156, conversions: 73 }
  ],
  
  hourlyData: [
    { hour: '00h', visits: 234 },
    { hour: '06h', visits: 456 },
    { hour: '09h', visits: 1234 },
    { hour: '12h', visits: 1567 },
    { hour: '15h', visits: 1890 },
    { hour: '18h', visits: 2134 },
    { hour: '21h', visits: 1456 }
  ],
  
  pageLoadTime: 2.3,
  mobileScore: 87,
  desktopScore: 94
};

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>(initialAnalytics);

  const trackPageView = () => {
    setAnalytics(prev => ({
      ...prev,
      totalVisits: prev.totalVisits + 1
    }));
  };

  const trackCTAClick = (buttonName: string) => {
    setAnalytics(prev => ({
      ...prev,
      ctaClicks: prev.ctaClicks.map(cta => 
        cta.button === buttonName 
          ? { ...cta, clicks: cta.clicks + 1 }
          : cta
      )
    }));
  };

  const trackLead = (source: string) => {
    setAnalytics(prev => ({
      ...prev,
      leadsGenerated: prev.leadsGenerated + 1,
      leadSources: prev.leadSources.map(lead => 
        lead.source === source 
          ? { ...lead, count: lead.count + 1 }
          : lead
      )
    }));
  };

  const trackScrollDepth = (depth: number) => {
    // Implementação do tracking de scroll
    console.log(`Usuário rolou até ${depth}% da página`);
  };

  const trackTimeOnPage = (seconds: number) => {
    setAnalytics(prev => ({
      ...prev,
      avgTimeOnPage: Math.round((prev.avgTimeOnPage + seconds) / 2)
    }));
  };

  const getAnalyticsSummary = () => {
    return {
      totalVisits: analytics.totalVisits,
      leadsGenerated: analytics.leadsGenerated,
      conversionRate: analytics.conversionRate,
      topTrafficSource: analytics.leadSources[0]?.source || 'N/A',
      bounceRate: analytics.bounceRate,
      avgTimeOnPage: analytics.avgTimeOnPage
    };
  };

  // Track page view on mount
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <AnalyticsContext.Provider value={{
      analytics,
      trackPageView,
      trackCTAClick,
      trackLead,
      trackScrollDepth,
      trackTimeOnPage,
      getAnalyticsSummary
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};