import React, { useState } from 'react';
import { 
  Plus, X, Settings, User, Users, Clock, Mail, 
  AlertCircle, CheckCircle, ArrowRight, GripVertical 
} from 'lucide-react';

const WorkflowBuilder = () => {
  const [workflow, setWorkflow] = useState({
    name: 'Nouveau workflow',
    steps: [
      {
        id: '1',
        type: 'review',
        name: 'Révision interne',
        assignees: ['user1'],
        settings: {
          deadline: 24,
          requireAllApprovals: true,
          allowParallel: false
        }
      }
    ]
  });

  const addStep = (type) => {
    const newStep = {
      id: `step-${Date.now()}`,
      type,
      name: getDefaultStepName(type),
      assignees: [],
      settings: getDefaultSettings(type)
    };

    setWorkflow({
      ...workflow,
      steps: [...workflow.steps, newStep]
    });
  };

  const updateStep = (stepId, updates) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    });
  };

  const removeStep = (stepId) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.filter(step => step.id !== stepId)
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Configuration du Workflow</h1>
            <p className="text-gray-600">Définissez les étapes et les conditions de validation</p>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-4 mb-6">
            {workflow.steps.map((step, index) => (
              <WorkflowStep 
                key={step.id}
                step={step}
                isLast={index === workflow.steps.length - 1}
                onUpdate={(updates) => updateStep(step.id, updates)}
                onRemove={() => removeStep(step.id)}
              />
            ))}
          </div>

          {/* Add Step Button */}
          <div className="mt-4">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white shadow-sm">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => addStep('review')}
              >
                <Plus className="inline-block w-4 h-4 mr-2" />
                Ajouter une étape de révision
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border-l"
                onClick={() => addStep('automation')}
              >
                <Settings className="inline-block w-4 h-4 mr-2" />
                Ajouter une automatisation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sidebar */}
      <div className="w-80 border-l bg-white p-6">
        <h2 className="text-lg font-semibold mb-4">Paramètres du workflow</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du workflow
            </label>
            <input
              type="text"
              value={workflow.name}
              onChange={(e) => setWorkflow({ ...workflow, name: e.target.value })}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notifications
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Notification de début</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Notification de fin</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Rappels automatiques</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Délai global
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="w-20 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
              />
              <select className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Heures</option>
                <option>Jours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowStep = ({ step, isLast, onUpdate, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative">
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <GripVertical className="text-gray-400 cursor-move" />
              <input
                type="text"
                value={step.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="font-medium text-gray-900 border-none focus:ring-0"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {isExpanded ? 'Réduire' : 'Développer'}
              </button>
              <button
                onClick={onRemove}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {isExpanded && (
            <div className="space-y-4">
              {step.type === 'review' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigné à
                    </label>
                    <AssigneeSelector 
                      value={step.assignees}
                      onChange={(assignees) => onUpdate({ assignees })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Délai
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={step.settings.deadline}
                          onChange={(e) => onUpdate({
                            settings: { ...step.settings, deadline: parseInt(e.target.value) }
                          })}
                          className="w-20 border-gray-300 rounded-md shadow-sm"
                          min="1"
                        />
                        <span className="text-sm text-gray-500">heures</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type de validation
                      </label>
                      <select
                        value={step.settings.requireAllApprovals ? 'all' : 'any'}
                        onChange={(e) => onUpdate({
                          settings: { 
                            ...step.settings, 
                            requireAllApprovals: e.target.value === 'all'
                          }
                        })}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                      >
                        <option value="all">Tous les valideurs</option>
                        <option value="any">Au moins un valideur</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={step.settings.allowParallel}
                        onChange={(e) => onUpdate({
                          settings: { ...step.settings, allowParallel: e.target.checked }
                        })}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm text-gray-600">
                        Autoriser la validation en parallèle
                      </span>
                    </label>
                  </div>
                </>
              )}

              {step.type === 'automation' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type d'automatisation
                    </label>
                    <select className="w-full border-gray-300 rounded-md shadow-sm">
                      <option value="email">Envoi d'email</option>
                      <option value="notification">Notification</option>
                      <option value="webhook">Webhook</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!isLast && (
        <div className="absolute left-6 -bottom-4 transform translate-y-1/2 z-10">
          <ArrowRight className="text-gray-400" />
        </div>
      )}
    </div>
  );
};

const AssigneeSelector = ({ value = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const users = [
    { id: 'user1', name: 'Sophie Martin', role: 'Designer' },
    { id: 'user2', name: 'Thomas Dubois', role: 'Chef de projet' },
    { id: 'user3', name: 'Julie Bernard', role: 'Directrice artistique' },
  ];

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md">
        {value.map(userId => {
          const user = users.find(u => u.id === userId);
          return (
            <div 
              key={userId}
              className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm"
            >
              <User size={14} />
              <span>{user?.name}</span>
              <button
                onClick={() => onChange(value.filter(id => id !== userId))}
                className="text-blue-400 hover:text-blue-600"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Plus size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-20">
          <div className="p-2 space-y-1">
            {users
              .filter(user => !value.includes(user.id))
              .map(user => (
                <button
                  key={user.id}
                  onClick={() => {
                    onChange([...value, user.id]);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-50 rounded"
                >
                  <User size={16} className="text-gray-400" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const getDefaultStepName = (type) => {
  switch (type) {
    case 'review':
      return 'Nouvelle étape de révision';
    case 'automation':
      return 'Nouvelle automatisation';
    default:
      return 'Nouvelle étape';
  }
};

const getDefaultSettings = (type) => {
  switch (type) {
    case 'review':
      return {
        deadline: 24,
        requireAllApprovals: true,
        allowParallel: false
      };
    case 'automation':
      return {
        type: 'email',
        config: {}
      };
    default:
      return {};
  }
};

export default WorkflowBuilder;