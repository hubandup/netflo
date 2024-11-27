import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Share2,
  AlertCircle,
  CheckCircle,
  Settings,
  PenTool,
  Eye,
  Zap,
  ChevronRight,
  Plus,
  X,
  Timer,
  Bot
} from 'lucide-react';

const VersionComparisonCollab = () => {
  const [showCollabPanel, setShowCollabPanel] = useState(true);
  const [showAutoPanel, setShowAutoPanel] = useState(false);
  const [currentTool, setCurrentTool] = useState('annotation');
  const [selectedIssue, setSelectedIssue] = useState(null);

  const autoDetectedIssues = [
    {
      id: 1,
      type: 'layout',
      severity: 'high',
      message: 'Élément mal aligné avec la grille',
      suggestion: 'Aligner sur la grille à 12px',
      location: { x: 120, y: 250 }
    },
    {
      id: 2,
      type: 'color',
      severity: 'medium',
      message: 'Contraste insuffisant',
      suggestion: 'Augmenter le contraste à 4.5:1 minimum',
      location: { x: 350, y: 180 }
    },
    {
      id: 3,
      type: 'typography',
      severity: 'low',
      message: 'Taille de police incohérente',
      suggestion: 'Utiliser 16px selon la charte',
      location: { x: 200, y: 400 }
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Tools Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4">
        {[
          { id: 'annotation', icon: PenTool, label: 'Annoter' },
          { id: 'comment', icon: MessageSquare, label: 'Commenter' },
          { id: 'auto', icon: Bot, label: 'Auto-détection' }
        ].map(tool => (
          <button
            key={tool.id}
            onClick={() => setCurrentTool(tool.id)}
            className={`p-3 rounded-lg mb-2 ${
              currentTool === tool.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
            title={tool.label}
          >
            <tool.icon size={24} />
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Révision collaborative</h1>
            <div className="flex items-center space-x-4">
              {/* Active Users */}
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center"
                    >
                      <span className="text-sm text-blue-600 font-medium">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="ml-2 p-1 hover:bg-gray-100 rounded">
                  <Plus size={20} />
                </button>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Share2 size={20} />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex">
          {/* Document Area */}
          <div className="flex-1 p-4">
            <div className="h-full bg-white rounded-lg shadow relative">
              {/* Document Preview */}
              <img 
                src="/api/placeholder/1200/800" 
                alt="Document"
                className="w-full h-full object-contain"
              />

              {/* Annotations Overlay */}
              {currentTool === 'annotation' && (
                <div className="absolute inset-0">
                  {[
                    { x: 25, y: 30, color: 'red' },
                    { x: 45, y: 60, color: 'blue' }
                  ].map((mark, i) => (
                    <div
                      key={i}
                      className="absolute w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${mark.x}%`,
                        top: `${mark.y}%`,
                        borderColor: mark.color
                      }}
                    >
                      <span className="text-sm font-medium" style={{ color: mark.color }}>
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Auto-detected Issues Overlay */}
              {currentTool === 'auto' && (
                <div className="absolute inset-0">
                  {autoDetectedIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="absolute"
                      style={{
                        left: `${issue.location.x}px`,
                        top: `${issue.location.y}px`
                      }}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                        issue.severity === 'high' ? 'bg-red-100 text-red-600' :
                        issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <AlertCircle size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Collaboration Panel */}
          <div className="w-80 bg-white border-l">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Collaboration</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowCollabPanel(true)}
                    className={`px-3 py-1 rounded ${
                      showCollabPanel ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    Discussion
                  </button>
                  <button 
                    onClick={() => setShowAutoPanel(true)}
                    className={`px-3 py-1 rounded ${
                      showAutoPanel ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    Auto
                  </button>
                </div>
              </div>
            </div>

            {showCollabPanel && (
              <div className="p-4">
                <div className="space-y-4">
                  {/* Thread Example */}
                  {[1, 2].map((thread) => (
                    <div key={thread} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">SM</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Sophie Martin</span>
                            <span className="text-sm text-gray-500">Il y a 5min</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Le contraste du texte doit être amélioré ici.
                          </p>
                        </div>
                      </div>

                      {/* Replies */}
                      <div className="ml-11 space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">TD</span>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium">Thomas Dubois</span>
                              <span className="text-xs text-gray-500 ml-2">Il y a 2min</span>
                            </div>
                            <p className="text-sm text-gray-600">D'accord, je m'en occupe.</p>
                          </div>
                        </div>
                      </div>

                      {/* Reply Input */}
                      <div className="mt-3 ml-11">
                        <input
                          type="text"
                          placeholder="Répondre..."
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Comment Input */}
                <div className="mt-4">
                  <textarea
                    placeholder="Ajouter un commentaire..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                  <div className="mt-2 flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Commenter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showAutoPanel && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Détection automatique</h3>
                    <button className="text-sm text-blue-600">Tout valider</button>
                  </div>

                  {/* Auto-detected Issues List */}
                  {autoDetectedIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className={`p-4 rounded-lg border ${
                        selectedIssue?.id === issue.id ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <AlertCircle 
                              size={16}
                              className={
                                issue.severity === 'high' ? 'text-red-500' :
                                issue.severity === 'medium' ? 'text-yellow-500' :
                                'text-blue-500'
                              }
                            />
                            <span className="font-medium">{issue.message}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{issue.suggestion}</p>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <CheckCircle size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Action Buttons */}
                  <div className="flex justify-between mt-4">
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                      Relancer l'analyse
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Appliquer les corrections
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionComparisonCollab;