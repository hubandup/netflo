import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  BarChart2,
  Brain,
  Settings,
  TrendingUp,
  Sliders,
  Settings2,
  RefreshCw,
  Gauge,
  ArrowUp,
  ArrowDown,
  Trash2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const WorkflowPrediction = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('predictions');

  const [cacheSettings, setCacheSettings] = useState({
    maxSize: 1024, // MB
    ttl: 3600, // seconds
    cleanupInterval: 300 // seconds
  });

  const [alertThresholds, setAlertThresholds] = useState({
    memoryUsage: 80, // percentage
    cpuUsage: 70, // percentage
    responseTime: 1000, // ms
    errorRate: 5 // percentage
  });

  // Données simulées de prédiction
  const predictionData = [
    {
      timestamp: '2024-03-20 10:00',
      metric: 'CPU Usage',
      current: 45,
      predicted: 75,
      confidence: 0.85,
      recommendation: 'Planifier une augmentation de capacité dans 2h'
    },
    {
      timestamp: '2024-03-20 10:00',
      metric: 'Memory Usage',
      current: 60,
      predicted: 85,
      confidence: 0.92,
      recommendation: 'Activer le nettoyage proactif du cache'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        {/* Header avec bouton de configuration */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Prédiction de Performance</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 flex items-center"
          >
            <Settings2 size={20} className="mr-2" />
            Configuration
          </button>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-3 gap-6">
          {/* Zone de prédiction */}
          <div className="col-span-2 space-y-6">
            {/* Prédictions ML */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center">
                  <Brain size={20} className="mr-2" />
                  Prédictions ML
                </h2>
                <select className="border rounded-lg px-3 py-1">
                  <option>Prochaines 2 heures</option>
                  <option>Prochaines 6 heures</option>
                  <option>Prochain 24 heures</option>
                </select>
              </div>

              <div className="space-y-4">
                {predictionData.map((prediction, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Gauge size={20} className="mr-2 text-blue-600" />
                        <span className="font-medium">{prediction.metric}</span>
                      </div>
                      <span className="text-sm text-gray-500">{prediction.timestamp}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Actuel</div>
                        <div className="text-2xl font-semibold">{prediction.current}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Prédit</div>
                        <div className="text-2xl font-semibold text-red-600">{prediction.predicted}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Confiance</div>
                        <div className="text-2xl font-semibold text-blue-600">{prediction.confidence * 100}%</div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded p-3 flex items-start">
                      <AlertCircle size={16} className="mr-2 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-yellow-600">Recommandation</div>
                        <div className="text-sm text-yellow-700">{prediction.recommendation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Graphique de tendance */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Tendances et Prédictions</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[...Array(24)].map((_, i) => ({
                      time: i,
                      actual: Math.random() * 50 + 20,
                      predicted: Math.random() * 50 + 30
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      stroke="#4F46E5"
                      fill="#4F46E5"
                      fillOpacity={0.1}
                      name="Utilisation actuelle"
                    />
                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.1}
                      name="Prédiction"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Configuration avancée */}
          <div className="space-y-6">
            {/* Paramètres du cache */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Settings size={20} className="mr-2" />
                Paramètres du Cache
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taille maximale du cache (MB)
                  </label>
                  <input
                    type="number"
                    value={cacheSettings.maxSize}
                    onChange={(e) => setCacheSettings({
                      ...cacheSettings,
                      maxSize: parseInt(e.target.value)
                    })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée de vie (secondes)
                  </label>
                  <input
                    type="number"
                    value={cacheSettings.ttl}
                    onChange={(e) => setCacheSettings({
                      ...cacheSettings,
                      ttl: parseInt(e.target.value)
                    })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Intervalle de nettoyage (secondes)
                  </label>
                  <input
                    type="number"
                    value={cacheSettings.cleanupInterval}
                    onChange={(e) => setCacheSettings({
                      ...cacheSettings,
                      cleanupInterval: parseInt(e.target.value)
                    })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Seuils d'alerte */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <AlertCircle size={20} className="mr-2" />
                Seuils d'Alerte
              </h2>
              <div className="space-y-4">
                {Object.entries(alertThresholds).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        value={value}
                        onChange={(e) => setAlertThresholds({
                          ...alertThresholds,
                          [key]: parseInt(e.target.value)
                        })}
                        min="0"
                        max="100"
                        className="flex-1"
                      />
                      <span className="w-12 text-right">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Règles de nettoyage */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Trash2 size={20} className="mr-2" />
                Règles de Nettoyage
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">Nettoyage LRU</div>
                    <div className="text-sm text-gray-500">Supprimer les éléments les moins utilisés</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">Nettoyage TTL</div>
                    <div className="text-sm text-gray-500">Supprimer les éléments expirés</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">Nettoyage proactif</div>
                    <div className="text-sm text-gray-500">Anticiper les besoins en mémoire</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowPrediction;