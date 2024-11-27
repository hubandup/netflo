import React, { useState } from 'react';
import { 
  GripVertical, 
  Clock, 
  Users, 
  Mail,
  Settings,
  ChevronDown,
  X,
  Plus,
  GitBranch,
  Zap,
  Check,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  Bot,
  Workflow,
  Split
} from 'lucide-react';

const AdvancedWorkflowSteps = () => {
  const [steps, setSteps] = useState([
    {
      id: 1,
      type: 'review',
      name: 'Révision interne',
      assignees: ['user1'],
      deadline: 24,
      rules: {
        requiredFields: ['title', 'description'],
        minApprovers: 2,
        autoReject: false
      }
    },
    {
      id: 2,
      type: 'condition',
      name: 'Vérification taille fichier',
      conditions: [
        { field: 'fileSize', operator: 'lessThan', value: 10, unit: 'MB' }
      ],
      onSuccess: 3,
      onFailure: 4
    },
    {
      id: 3,
      type: 'automation',
      name: 'Optimisation image',
      actions: [
        { type: 'compress', target: 'image', quality: 80 },
        { type: 'resize', maxWidth: 1920, maxHeight: 1080 }
      ]
    },
    {
      id: 4,
      type: 'decision',
      name: 'Point de décision',
      options: [
        { label: 'Approuver', next: 5 },
        { label: 'Révision requise', next: 1 },
        { label: 'Rejeter', next: null }
      ]
    }
  ]);

  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  const handleDragStart = (e, step) => {
    e.currentTarget.style.opacity = '0.4';
    e.dataTransfer.setData('text/plain', step.id);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    const draggedStep = steps.find(step => step.id === draggedId);
    
    if (draggedStep) {
      const newSteps = steps.filter(step => step.id !== draggedId);
      newSteps.splice(targetIndex, 0, draggedStep);
      setSteps(newSteps);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuration avancée du workflow</h1>
          <p className="text-gray-600 mt-1">Définissez des workflows complexes avec conditions et automatisations</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <button 
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <Settings size={20} className="mr-2" />
              Paramètres avancés
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Plus size={20} className="mr-2" />
            Ajouter une étape
          </button>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4 max-w-4xl">
        {steps.map((step, index) => (
          <div
            key={step.id}
            draggable
            onDragStart={(e) => handleDragStart(e, step)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
            className="bg-white rounded-lg shadow-sm border-2 border-transparent hover:border-blue-100"
          >
            <div className="p-4">
              {/* Step Header */}
              <div className="flex items-center space-x-4">
                <div className="cursor-move">
                  <GripVertical className="text-gray-400" />
                </div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.type === 'condition' ? 'bg-yellow-100' :
                  step.type === 'automation' ? 'bg-purple-100' :
                  step.type === 'decision' ? 'bg-green-100' :
                  'bg-blue-100'
                }`}>
                  {step.type === 'condition' && <GitBranch size={18} className="text-yellow-600" />}
                  {step.type === 'automation' && <Zap size={18} className="text-purple-600" />}
                  {step.type === 'decision' && <Split size={18} className="text-green-600" />}
                  {step.type === 'review' && <span className="text-blue-600 font-medium">{index + 1}</span>}
                </div>

                <div className="flex-1">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={step.name}
                      className="font-medium text-gray-900 bg-transparent border-none focus:ring-0 p-0"
                    />
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                      {step.type}
                    </span>
                  </div>
                </div>

                <button className="ml-4 text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              {/* Step Configuration */}
              <div className="mt-4 ml-16">
                {step.type === 'condition' && (
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Conditions</h4>
                      {step.conditions.map((condition, idx) => (
                        <div key={idx} className="flex items-center space-x-2 mb-2">
                          <select className="border rounded p-1 text-sm">
                            <option value="fileSize">Taille du fichier</option>
                            <option value="imageWidth">Largeur image</option>
                            <option value="imageHeight">Hauteur image</option>
                          </select>
                          <select className="border rounded p-1 text-sm">
                            <option value="lessThan">inférieur à</option>
                            <option value="greaterThan">supérieur à</option>
                            <option value="equals">égal à</option>
                          </select>
                          <input 
                            type="number" 
                            className="border rounded p-1 w-20 text-sm"
                            value={condition.value}
                          />
                          <select className="border rounded p-1 text-sm">
                            <option value="MB">MB</option>
                            <option value="px">px</option>
                            <option value="%">%</option>
                          </select>
                        </div>
                      ))}
                      <button className="text-sm text-yellow-600 hover:text-yellow-700">
                        + Ajouter une condition
                      </button>
                    </div>
                  </div>
                )}

                {step.type === 'automation' && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Actions automatiques</h4>
                      {step.actions.map((action, idx) => (
                        <div key={idx} className="flex items-center space-x-2 mb-2">
                          <select className="border rounded p-1 text-sm">
                            <option value="compress">Compression</option>
                            <option value="resize">Redimensionnement</option>
                            <option value="convert">Conversion</option>
                          </select>
                          <input 
                            type="number" 
                            className="border rounded p-1 w-20 text-sm"
                            value={action.type === 'compress' ? action.quality : action.maxWidth}
                          />
                          <select className="border rounded p-1 text-sm">
                            <option value="quality">Qualité (%)</option>
                            <option value="px">px</option>
                          </select>
                        </div>
                      ))}
                      <button className="text-sm text-purple-600 hover:text-purple-700">
                        + Ajouter une action
                      </button>
                    </div>
                  </div>
                )}

                {step.type === 'decision' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Options de décision</h4>
                      {step.options.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2 mb-2">
                          <input 
                            type="text" 
                            className="border rounded p-1 text-sm"
                            value={option.label}
                            placeholder="Label de l'option"
                          />
                          <ArrowRight size={16} className="text-gray-400" />
                          <select className="border rounded p-1 text-sm">
                            {steps.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                            <option value="null">Fin du workflow</option>
                          </select>
                        </div>
                      ))}
                      <button className="text-sm text-green-600 hover:text-green-700">
                        + Ajouter une option
                      </button>
                    </div>
                  </div>
                )}

                {step.type === 'review' && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Valideurs requis
                        </label>
                        <input 
                          type="number" 
                          className="border rounded p-1 w-20"
                          value={step.rules.minApprovers}
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Délai
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={step.deadline}
                            className="w-20 border rounded p-1"
                            min="1"
                          />
                          <span className="text-sm text-gray-500">heures</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Règles de validation</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="ml-2 text-sm">Rejet automatique après délai</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="ml-2 text-sm">Tous les champs requis</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="ml-2 text-sm">Validation unanime requise</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t">
                  <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
                    <Settings size={16} className="mr-2" />
                    Paramètres avancés
                    <ChevronDown size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedWorkflowSteps;