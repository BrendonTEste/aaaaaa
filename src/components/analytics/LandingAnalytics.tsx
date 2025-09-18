import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, TrendingUp, Eye, Users, Target, Clock, 
  MousePointer, Smartphone, Globe, BarChart3, Zap,
  MapPin, Monitor, Activity, Gauge
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, FunnelChart, Funnel, LabelList
} from 'recharts';
import { useAnalytics } from '../../contexts/AnalyticsContext';

interface LandingAnalyticsProps {
  onBack: () => void;
}

const LandingAnalytics: React.FC<LandingAnalyticsProps> = ({ onBack }) => {
  const { analytics } = useAnalytics();

  const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1', '#84CC16'];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <motion.button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors mr-6"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </motion.button>
            <h1 className="text-2xl font-bold text-gray-900">Analytics da Landing Page</h1>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs Principais */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visitas Totais</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totalVisits)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15.2%
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visitantes Únicos</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.uniqueVisitors)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.8%
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa Conversão</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +0.8%
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa Rejeição</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.bounceRate}%</p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                  -2.1%
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tempo Médio</p>
                <p className="text-2xl font-bold text-gray-900">{formatTime(analytics.avgTimeOnPage)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +23s
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Leads Gerados</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.leadsGenerated)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +18.5%
                </p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Visitas Diárias */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Visitas e Conversões Diárias
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics.dailyVisits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="visits" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="conversions" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Funil de Conversão */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Funil de Conversão
            </h3>
            <div className="space-y-4">
              {analytics.funnelSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{step.step}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{formatNumber(step.visitors)}</span>
                      <span className="text-sm font-bold text-purple-600">{step.conversionRate}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-1000" 
                      style={{ 
                        width: `${step.conversionRate}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Origem dos Leads e Performance de CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Origem dos Leads */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-green-600" />
              Origem dos Leads
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.leadSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ source, percentage }) => `${source} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance de CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <MousePointer className="w-5 h-5 mr-2 text-orange-600" />
              Performance dos CTAs
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.ctaClicks} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="button" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="clicks" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Segmentação de Usuários */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Localização */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-600" />
              Top Localizações
            </h3>
            <div className="space-y-4">
              {analytics.locationData.slice(0, 5).map((location, index) => (
                <div key={location.location} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-gray-700 font-medium text-sm">{location.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{formatNumber(location.visitors)}</span>
                    <span className="text-sm text-gray-500">{location.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dispositivos */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Monitor className="w-5 h-5 mr-2 text-blue-600" />
              Dispositivos
            </h3>
            <div className="space-y-4">
              {analytics.deviceData.map((device, index) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-gray-700 font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${device.percentage}%`, 
                          backgroundColor: COLORS[index % COLORS.length] 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Navegadores */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-purple-600" />
              Navegadores
            </h3>
            <div className="space-y-4">
              {analytics.browserData.map((browser, index) => (
                <div key={browser.browser} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-gray-700 font-medium">{browser.browser}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{formatNumber(browser.visitors)}</span>
                    <span className="text-sm text-gray-500">{browser.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Métricas Avançadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Scroll Depth */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-indigo-600" />
              Profundidade de Scroll
            </h3>
            <div className="space-y-4">
              {analytics.scrollDepth.map((depth, index) => (
                <div key={depth.depth} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{depth.depth} da página</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full transition-all duration-1000" 
                        style={{ 
                          width: `${depth.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-12">{depth.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Técnica */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Gauge className="w-5 h-5 mr-2 text-green-600" />
              Performance Técnica
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-900">Tempo de Carregamento</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{analytics.pageLoadTime}s</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium text-gray-900">Score Mobile</span>
                </div>
                <span className="text-lg font-bold text-green-600">{analytics.mobileScore}/100</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Monitor className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-medium text-gray-900">Score Desktop</span>
                </div>
                <span className="text-lg font-bold text-purple-600">{analytics.desktopScore}/100</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Heatmap de Cliques */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <MousePointer className="w-5 h-5 mr-2 text-red-600" />
            Mapa de Calor - Elementos Mais Clicados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {analytics.heatmapData.map((element, index) => (
              <div key={element.element} className="text-center p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                >
                  {element.clicks}
                </div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm">{element.element}</h4>
                <p className="text-xs text-gray-600">{element.percentage}% dos cliques</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingAnalytics;