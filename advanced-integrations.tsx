import React, { useState } from 'react';
import {
  Globe,
  Webhook,
  MessageSquare,
  Link,
  Code,
  Variable,
  Puzzle,
  Plus,
  X,
  ChevronDown,
  Settings,
  PlayCircle,
  Edit,
  Lock,
  RefreshCw,
  Database,
  History,
  CheckCircle,
  ArrowLeftRight,
  AlertCircle
} from 'lucide-react';

const AdvancedIntegrations = () => {
  // États pour les onglets et la sélection
  const [selectedTab, setSelectedTab] = useState('oauth');
  const [showTestPanel, setShowTestPanel] = useState(false);

  // Données mockées des connexions
  const integrations = [
    {
      id: 1,
      name: 'Slack - Marketing',
      type: 'slack',
      status: 'connected',
      lastSync: '2024-03-15 14:30'
    },
    {
      id: 2,
      name: 'Jira - Production',
      type: 'jira',
      status: 'pending',
      lastSync: null
    }
  ];

  // État pour les templates
  const [activeTemplate, setActiveTemplate] = useState({
    id: 1,
    name: 'Notification standard',
    version: 3,
    content: '{{user.name}} a requis votre validation pour {{project.name}}',
    variables: ['user.name', 'project.name']
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation principale */}
      <div className="w-80 bg-white border-r">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Intégrations</h2>
          
          {/* Liste des intégrations */}
          <div className="space-y-2">
            {integrations.map(integration => (
              <div
                key={integration.id}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      {integration.type === 'slack' ? (
                        <MessageSquare className="text-blue-600" />
                      ) : (
                        <Puzzle className="text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-sm text-gray-500">
                        {integration.status === 'connected' ? (
                          <span className="text-green-600 flex items-center">
                            <CheckCircle size={12} className="mr-1" />
                            Connecté
                          </span>
                        ) : (
                          <span className="text-yellow-600 flex items-center">
                            <AlertCircle size={12} className="mr-1" />
                            En attente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bouton d'ajout */}
          <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400">
            <Plus size={20} className="mr-2" />
            Nouvelle intégration
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="bg-white rounded-lg shadow">
            {/* Onglets */}
            <div className="border-b">
              <nav className="flex">
                {[
                  { id: 'oauth', label: 'Authentification', icon: Lock },
                  { id: 'sync', label: 'Synchronisation', icon: RefreshCw },
                  { id: 'mapping', label: 'Mapping', icon: ArrowLeftRight }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-6 py-4 flex items-center space-x-2 border-b-2 ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Contenu des onglets */}
            <div className="p-6">
              {selectedTab === 'oauth' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Configuration OAuth</h3>
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">Identifiants OAuth</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Client ID</label>
                          <input type="text" className="mt-1 block w-full border rounded-md shadow-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Client Secret</label>
                          <input type="password" className="mt-1 block w-full border rounded-md shadow-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Redirect URI</label>
                          <input type="text" className="mt-1 block w-full border rounded-md shadow-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">Permissions</h4>
                      <div className="space-y-2">
                        {['Lecture des projets', 'Écriture des commentaires', 'Gestion des utilisateurs'].map((scope) => (
                          <label key={scope} className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="ml-2">{scope}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'sync' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Configuration de la synchronisation</h3>
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">Paramètres de synchronisation</h4>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="ml-2">Synchronisation automatique</span>
                        </label>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Fréquence</label>
                          <select className="mt-1 block w-full border rounded-md">
                            <option>Toutes les 5 minutes</option>
                            <option>Toutes les 15 minutes</option>
                            <option>Toutes les heures</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">Historique des synchronisations</h4>
                      <div className="space-y-2">
                        {[
                          { status: 'success', time: '14:30', message: 'Synchronisation réussie' },
                          { status: 'error', time: '13:15', message: 'Erreur de connexion' }
                        ].map((log, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                            <div className="flex items-center">
                              {log.status === 'success' ? (
                                <CheckCircle size={16} className="text-green-500 mr-2" />
                              ) : (
                                <AlertCircle size={16} className="text-red-500 mr-2" />
                              )}
                              <span>{log.message}</span>
                            </div>
                            <span className="text-sm text-gray-500">{log.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'mapping' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Configuration du mapping</h3>
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">Mapping des champs</h4>
                      <div className="space-y-4">
                        {[1, 2, 3].map((index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <select className="block w-full border rounded-md">
                              <option>Champ source</option>
                            </select>
                            <ArrowLeftRight size={20} className="text-gray-400 flex-shrink-0" />
                            <select className="block w-full border rounded-md">
                              <option>Champ destination</option>
                            </select>
                            <button className="text-gray-400 hover:text-gray-600">
                              <X size={20} />
                            </button>
                          </div>
                        ))}
                        <button className="text-blue-600 hover:text-blue-700">
                          + Ajouter un mapping
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedIntegrations;