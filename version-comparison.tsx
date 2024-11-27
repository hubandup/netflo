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
  AlertCircle
} from 'lucide-react';

const VersionComparison = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showDifferences, setShowDifferences] = useState(true);
  const [comparisonMode, setComparisonMode] = useState('side-by-side'); // 'side-by-side' ou 'overlay'
  const [selectedVersion1, setSelectedVersion1] = useState('2.0');
  const [selectedVersion2, setSelectedVersion2] = useState('1.0');

  const versions = [
    { version: '2.0', date: '2024-03-15', author: 'Sophie Martin' },
    { version: '1.5', date: '2024-03-10', author: 'Thomas Dubois' },
    { version: '1.0', date: '2024-03-05', author: 'Julie Bernard' }
  ];

  const differences = [
    { type: 'color', location: 'Logo', old: '#FF5733', new: '#3366FF' },
    { type: 'text', location: 'Titre', old: 'Promotion été', new: 'Soldes été' },
    { type: 'size', location: 'Image header', old: '1200x600', new: '1600x800' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Comparaison des versions</h1>
              <div className="flex items-center space-x-2">
                <select 
                  value={selectedVersion1}
                  onChange={(e) => setSelectedVersion1(e.target.value)}
                  className="border rounded-md px-3 py-1"
                >
                  {versions.map(v => (
                    <option key={v.version} value={v.version}>Version {v.version}</option>
                  ))}
                </select>
                <ArrowRight className="text-gray-400" size={20} />
                <select
                  value={selectedVersion2}
                  onChange={(e) => setSelectedVersion2(e.target.value)}
                  className="border rounded-md px-3 py-1"
                >
                  {versions.map(v => (
                    <option key={v.version} value={v.version}>Version {v.version}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setComparisonMode(mode => mode === 'side-by-side' ? 'overlay' : 'side-by-side')}
                  className="px-3 py-1 border rounded-md hover:bg-gray-50"
                >
                  {comparisonMode === 'side-by-side' ? 'Vue superposée' : 'Vue côte à côte'}
                </button>
                <button
                  onClick={() => setShowDifferences(!showDifferences)}
                  className={`px-3 py-1 border rounded-md ${showDifferences ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  Afficher les différences
                </button>
                <div className="flex items-center space-x-2 border rounded-md px-3 py-1">
                  <button onClick={() => setZoomLevel(z => Math.max(25, z - 25))}>
                    <MinusCircle size={18} />
                  </button>
                  <span className="text-sm">{zoomLevel}%</span>
                  <button onClick={() => setZoomLevel(z => Math.min(200, z + 25))}>
                    <PlusCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {comparisonMode === 'side-by-side' ? (
              <>
                {/* Left Document */}
                <div className="flex-1 border-r">
                  <div className="h-full bg-gray-50 flex items-center justify-center">
                    <div className="relative" style={{ width: '80%', height: '80%' }}>
                      {/* Placeholder for document preview */}
                      <img 
                        src="/api/placeholder/800/600" 
                        alt="Version 1"
                        className="w-full h-full object-contain"
                      />
                      {showDifferences && differences.map((diff, index) => (
                        <div
                          key={index}
                          className="absolute"
                          style={{
                            top: `${20 + index * 10}%`,
                            left: '20%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Document */}
                <div className="flex-1">
                  <div className="h-full bg-gray-50 flex items-center justify-center">
                    <div className="relative" style={{ width: '80%', height: '80%' }}>
                      <img 
                        src="/api/placeholder/800/600" 
                        alt="Version 2"
                        className="w-full h-full object-contain"
                      />
                      {showDifferences && differences.map((diff, index) => (
                        <div
                          key={index}
                          className="absolute"
                          style={{
                            top: `${20 + index * 10}%`,
                            left: '20%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1">
                <div className="h-full bg-gray-50 flex items-center justify-center">
                  <div className="relative" style={{ width: '80%', height: '80%' }}>
                    <div className="relative">
                      <img 
                        src="/api/placeholder/800/600" 
                        alt="Overlay comparison"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-white opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Differences */}
      {showDifferences && (
        <div className="w-80 bg-white border-l overflow-auto">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Modifications détectées</h2>
            <p className="text-sm text-gray-500 mt-1">{differences.length} différences trouvées</p>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {differences.map((diff, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{diff.location}</span>
                    <span className="text-sm text-gray-500">{diff.type}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MinusCircle size={16} className="text-red-500 mr-2" />
                      <span className="text-red-600">{diff.old}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <PlusCircle size={16} className="text-green-500 mr-2" />
                      <span className="text-green-600">{diff.new}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Types de différences</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm">Couleurs</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm">Textes</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="ml-2 text-sm">Dimensions</span>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download size={20} />
                <span>Exporter le rapport</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionComparison;