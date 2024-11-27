import React, { useState } from 'react';
import {
  Copy, 
  Pencil,
  Trash2,
  Plus,
  Users,
  FileText,
  Settings,
  Search,
  Filter,
  ArrowRight,
  Download,
  Upload,
  BarChart,
  Lock,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  X,
  FileDown,
  FileUp,
  UserPlus,
  Shield
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar
} from 'recharts';

const WorkflowTemplatesEnhanced = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  const performanceData = [
    { month: 'Jan', validations: 85, temps: 48 },
    { month: 'Fév', validations: 88, temps: 45 },
    { month: 'Mar', validations: 92, temps: 42 },
    { month: 'Avr', validations: 90, temps: 44 },
    { month: 'Mai', validations: 95, temps: 40 }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Templates</h1>
          <div className="space-y-2">
            {['dashboard', 'statistics', 'permissions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center p-2 rounded ${
                  activeTab === tab ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                {tab === 'dashboard' && <FileText className="mr-2" size={20} />}
                {tab === 'statistics' && <BarChart className="mr-2" size={20} />}
                {tab === 'permissions' && <Shield className="mr-2" size={20} />}
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Templates de Workflow</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowImportModal(true)}
                className="flex items-center px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                <FileUp size={20} className="mr-2" />
                Importer
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
              >
                <FileDown size={20} className="mr-2" />
                Exporter
              </button>
              <button 
                onClick={() => setShowPermissionsModal(true)}
                className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <UserPlus size={20} className="mr-2" />
                Gérer les accès
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Performance des validations</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="validations" name="Taux (%)" stroke="#4F46E5" />
                      <Line type="monotone" dataKey="temps" name="Temps (h)" stroke="#10B981" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-3 border-b last:border-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Template modifié</p>
                      <p className="text-sm text-gray-500">Il y a 2h par John Doe</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Statistiques détaillées</h3>
              {/* Add detailed statistics here */}
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Gestion des permissions</h3>
              {/* Add permissions management here */}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Exporter les templates</h3>
              <button onClick={() => setShowExportModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2">Format</label>
                <select className="w-full border rounded p-2">
                  <option>JSON</option>
                  <option>YAML</option>
                </select>
              </div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="ml-2">Inclure les statistiques</span>
              </label>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShowExportModal(false)}
              >
                Exporter
              </button>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Importer des templates</h3>
              <button onClick={() => setShowImportModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
              <Upload size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                Glissez-déposez votre fichier ici ou
                <button className="text-blue-600 hover:text-blue-700 ml-1">
                  parcourez
                </button>
              </p>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShowImportModal(false)}
              >
                Importer
              </button>
            </div>
          </div>
        </div>
      )}

      {showPermissionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-2/3 max-w-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Gestion des permissions</h3>
              <button onClick={() => setShowPermissionsModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              {['Admin', 'Éditeur', 'Lecteur'].map((role) => (
                <div key={role} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{role}</h4>
                  <div className="space-y-2">
                    {['Voir les templates', 'Modifier les templates', 'Gérer les permissions'].map((perm) => (
                      <label key={perm} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="ml-2">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setShowPermissionsModal(false)}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowTemplatesEnhanced;