import React, { useState } from 'react';
import { 
  Folder, File, Upload, Users, Settings, Menu,
  Clock, CheckCircle, AlertCircle, BarChart,
  Calendar, Filter, Search, PlusCircle
} from 'lucide-react';

const AproveDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="font-bold text-xl">ProofFlow</h1>
        </div>

        <nav className="mt-6">
          <div className="px-4 mb-2">
            <button className="w-full flex items-center space-x-2 bg-blue-600 text-white p-2 rounded">
              <PlusCircle size={20} />
              <span>Nouveau projet</span>
            </button>
          </div>

          <div className="space-y-1">
            {['Dashboard', 'Workflows', 'Productions', 'Templates', 'Analytics'].map(item => (
              <button
                key={item}
                onClick={() => setActiveView(item.toLowerCase())}
                className={`w-full flex items-center space-x-3 px-4 py-2 ${
                  activeView === item.toLowerCase() ? 'bg-gray-800' : 'hover:bg-gray-800'
                }`}
              >
                {item === 'Dashboard' && <BarChart size={20} />}
                {item === 'Workflows' && <Clock size={20} />}
                {item === 'Productions' && <Folder size={20} />}
                {item === 'Templates' && <File size={20} />}
                {item === 'Analytics' && <BarChart size={20} />}
                <span>{item}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Workflows rapides */}
        <div className="mt-8 px-4">
          <h3 className="text-sm font-semibold mb-2 text-gray-400">WORKFLOWS RAPIDES</h3>
          <div className="space-y-1">
            {['BAT Marketing', 'Validation Web', 'Production Print'].map(workflow => (
              <button
                key={workflow}
                onClick={() => setSelectedWorkflow(workflow)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-800 rounded"
              >
                {workflow}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50">
                <Filter size={20} />
                <span>Filtres</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Calendar size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Users size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'En attente', value: '12', icon: Clock, color: 'blue' },
                  { label: 'En cours', value: '8', icon: AlertCircle, color: 'yellow' },
                  { label: 'Approuvés', value: '45', icon: CheckCircle, color: 'green' },
                  { label: 'En retard', value: '3', icon: AlertCircle, color: 'red' }
                ].map(stat => (
                  <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                      </div>
                      <stat.icon size={24} className={`text-${stat.color}-500`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Activités récentes</h2>
                </div>
                <div className="p-4">
                  <ActivityList />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Right Sidebar - Workflow Details */}
      {selectedWorkflow && (
        <div className="w-80 bg-white border-l">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{selectedWorkflow}</h3>
              <button
                onClick={() => setSelectedWorkflow(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-4">
            <WorkflowDetails workflow={selectedWorkflow} />
          </div>
        </div>
      )}
    </div>
  );
};

const ActivityList = () => {
  const activities = [
    {
      id: 1,
      user: 'Sophie Martin',
      action: 'a approuvé',
      item: 'Banner_V2.pdf',
      time: 'Il y a 5 min'
    },
    {
      id: 2,
      user: 'Thomas Dubois',
      action: 'a commenté',
      item: 'Newsletter_Q1.pdf',
      time: 'Il y a 15 min'
    },
    // ... autres activités
  ];

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="font-medium">{activity.item}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const WorkflowDetails = ({ workflow }) => {
  const steps = [
    { name: 'Création', status: 'completed' },
    { name: 'Révision interne', status: 'current' },
    { name: 'Validation client', status: 'upcoming' },
    { name: 'Production', status: 'upcoming' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-2">PROGRESSION</h4>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.name} className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                step.status === 'completed' ? 'bg-green-500 text-white' :
                step.status === 'current' ? 'bg-blue-500 text-white' :
                'bg-gray-200'
              }`}>
                {step.status === 'completed' && <CheckCircle size={14} />}
                {step.status === 'current' && <Clock size={14} />}
              </div>
              <span className={step.status === 'upcoming' ? 'text-gray-500' : 'font-medium'}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AproveDashboard;