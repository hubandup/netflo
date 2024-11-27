import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  MinusCircle,
  PlusCircle,
  X,
  Eye,
  RotateCcw,
  Download,
  Check,
  AlertCircle,
  MessageSquare,
  Clock,
  History,
  Settings,
  ZoomIn,
  ZoomOut,
  Move,
  Grid,
  Type,
  PaintBucket,
  Ruler,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const VersionComparisonAdvanced = () => {
  const [activeTab, setActiveTab] = useState('comparison');
  const [comparisonMode, setComparisonMode] = useState('side-by-side');
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(true);
  const [analysisMode, setAnalysisMode] = useState('visual');
  const [showTimeline, setShowTimeline] = useState(false);

  // States pour les différents types d'analyse
  const [pixelComparison, setPixelComparison] = useState(true);
  const [fontAnalysis, setFontAnalysis] = useState(true);
  const [layoutAnalysis, setLayoutAnalysis] = useState(true);
  const [colorAnalysis, setColorAnalysis] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Tools */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4">
        {[
          { icon: Eye, label: 'Vue', mode: 'visual' },
          { icon: Grid, label: 'Pixels', mode: 'pixel' },
          { icon: Type, label: 'Texte', mode: 'text' },
          { icon: PaintBucket, label: 'Couleurs', mode: 'color' },
          { icon: Ruler, label: 'Mesures', mode: 'measure' }
        ].map(({ icon: Icon, label, mode }) => (
          <button
            key={mode}
            onClick={() => setAnalysisMode(mode)}
            className={`p-3 rounded-lg mb-2 ${
              analysisMode === mode ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
            title={label}
          >
            <Icon size={24} />
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Comparaison avancée</h1>
              <div className="flex items-center space-x-2">
                <select className="border rounded-md px-3 py-1">
                  <option>Version 2.0</option>
                  <option>Version 1.8</option>
                  <option>Version 1.5</option>
                </select>
                <ArrowRight className="text-gray-400" size={20} />
                <select className="border rounded-md px-3 py-1">
                  <option>Version 1.8</option>
                  <option>Version 1.5</option>
                  <option>Version 1.0</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setComparisonMode(mode => mode === 'side-by-side' ? 'overlay' : 'side-by-side')}
                className={`px-3 py-1 rounded-md ${
                  comparisonMode === 'side-by-side' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'border hover:bg-gray-50'
                }`}
              >
                Mode {comparisonMode === 'side-by-side' ? 'côte à côte' : 'superposition'}
              </button>
              
              <button
                onClick={() => setShowTimeline(!showTimeline)}
                className={`px-3 py-1 rounded-md ${
                  showTimeline ? 'bg-blue-50 text-blue-600' : 'border hover:bg-gray-50'
                }`}
              >
                Timeline
              </button>

              <button
                onClick={() => setShowAnalysisPanel(!showAnalysisPanel)}
                className="px-3 py-1 border rounded-md hover:bg-gray-50"
              >
                Analyse
              </button>

              <div className="flex items-center border rounded-md">
                <button className="px-2 py-1 hover:bg-gray-50">
                  <ZoomOut size={20} />
                </button>
                <span className="px-2 border-x">100%</span>
                <button className="px-2 py-1 hover:bg-gray-50">
                  <ZoomIn size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Panel */}
        {showTimeline && (
          <div className="border-b bg-white p-4">
            <div className="flex items-center space-x-4 overflow-x-auto">
              {[...Array(5)].map((_, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-64 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Version {2.0 - index * 0.2}</span>
                    <span className="text-sm text-gray-500">il y a {index + 1}j</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {index === 0 ? 'Modification des couleurs' : 'Ajustements de mise en page'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Comparison Area */}
        <div className="flex-1 flex">
          {/* Documents Area */}
          <div className="flex-1 flex">
            {comparisonMode === 'side-by-side' ? (
              <>
                <div className="flex-1 p-4">
                  <div className="h-full bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <img 
                      src="/api/placeholder/800/600" 
                      alt="Version A"
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="h-full bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <img 
                      src="/api/placeholder/800/600" 
                      alt="Version B"
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 p-4">
                <div className="h-full bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="relative">
                    <img 
                      src="/api/placeholder/800/600" 
                      alt="Overlay"
                      className="max-w-full max-h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-50" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Panel */}
          {showAnalysisPanel && (
            <div className="w-96 bg-white border-l overflow-auto">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Analyse détaillée</h3>
              </div>

              <div className="p-4">
                {/* Analyse Pixel */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Analyse Pixel par Pixel</h4>
                    <span className="text-sm text-green-600">98% similaire</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Zones modifiées</span>
                      <span>12 régions</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Plus grande différence</span>
                      <span>Region #4 (15%)</span>
                    </div>
                  </div>
                </div>

                {/* Analyse des polices */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Analyse typographique</h4>
                    <span className="text-sm text-yellow-600">3 changements</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-yellow-50 rounded text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Titre principal</span>
                        <span className="text-yellow-600">Police modifiée</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Arial → Helvetica</span>
                        <span>24px → 28px</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analyse des couleurs */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Analyse colorimétrique</h4>
                    <span className="text-sm text-blue-600">5 modifications</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: 'Couleur primaire', old: '#1A73E8', new: '#2196F3' },
                      { name: 'Arrière-plan', old: '#F8F9FA', new: '#FFFFFF' }
                    ].map((color, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{color.name}</span>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-6 h-6 rounded border" 
                            style={{ backgroundColor: color.old }} 
                          />
                          <ArrowRight size={16} className="text-gray-400" />
                          <div 
                            className="w-6 h-6 rounded border" 
                            style={{ backgroundColor: color.new }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analyse du layout */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Analyse de mise en page</h4>
                    <span className="text-sm text-purple-600">2 changements</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-purple-50 rounded text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Espacement header</span>
                        <span className="text-purple-600">+12px</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-2">
                    Générer le rapport complet
                  </button>
                  <button className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Exporter les différences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionComparisonAdvanced;