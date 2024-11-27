import React, { useState } from 'react';
import { 
  GripVertical, 
  Clock, 
  Users, 
  Mail, 
  Settings,
  ChevronDown,
  X,
  Plus
} from 'lucide-react';

const WorkflowSteps = () => {
  const [steps, setSteps] = useState([
    {
      id: 1,
      type: 'review',
      name: 'Révision interne',
      assignees: ['user1'],
      deadline: 24
    },
    {
      id: 2,
      type: 'approval',
      name: 'Validation chef de projet',
      assignees: ['user2'],
      deadline: 48
    },
    {
      id: 3,
      type: 'notification',
      name: 'Notification client',
      recipients: ['client@email.com'],
    }
  ]);

  const [draggedStep, setDraggedStep] = useState(null);
  const [dragOverStep, setDragOverStep] = useState(null);

  const handleDragStart = (e, step) => {
    setDraggedStep(step);
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedStep(null);
    setDragOverStep(null);
  };

  const handleDragOver = (e, step) => {
    e.preventDefault();
    if (step.id !== draggedStep?.id) {
      setDragOverStep(step);
    }
  };

  const handleDrop = (e, targetStep) => {
    e.preventDefault();
    
    if (draggedStep && targetStep.id !== draggedStep.id) {
      const newSteps = [...steps];
      const draggedIndex = steps.findIndex(step => step.id === draggedStep.id);
      const targetIndex = steps.findIndex(step => step.id === targetStep.id);
      
      newSteps.splice(draggedIndex, 1);
      newSteps.splice(targetIndex, 0, draggedStep);
      
      setSteps(newSteps);
    }
    
    setDraggedStep(null);
    setDragOverStep(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuration du workflow</h1>
          <p className="text-gray-600 mt-1">Configurez et organisez les étapes de validation</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Plus size={20} className="mr-2" />
          Ajouter une étape
        </button>
      </div>

      {/* Steps List */}
      <div className="space-y-4 max-w-4xl">
        {steps.map((step, index) => (
          <div
            key={step.id}
            draggable
            onDragStart={(e) => handleDragStart(e, step)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, step)}
            onDrop={(e) => handleDrop(e, step)}
            className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
              dragOverStep?.id === step.id ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <div className="p-4">
              {/* Step Header */}
              <div className="flex items-center space-x-4">
                <div className="cursor-move">
                  <GripVertical className="text-gray-400" />
                </div>
                
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{index + 1}</span>
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={step.name}
                    onChange={(e) => {
                      const newSteps = steps.map(s => 
                        s.id === step.id ? { ...s, name: e.target.value } : s
                      );
                      setSteps(newSteps);
                    }}
                    className="font-medium text-gray-900 bg-transparent border-none focus:ring-0 p-0"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  {step.type === 'review' || step.type === 'approval' ? (
                    <>
                      <Clock size={20} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{step.deadline}h</span>
                    </>
                  ) : (
                    <Mail size={20} className="text-gray-400" />
                  )}
                  <button className="ml-4 text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Step Content */}
              <div className="mt-4 ml-16">
                {(step.type === 'review' || step.type === 'approval') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assigné à
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {step.assignees.map((userId) => (
                          <div 
                            key={userId}
                            className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1"
                          >
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <span className="text-xs text-blue-600 font-medium">SM</span>
                            </div>
                            <span className="text-sm text-gray-700">Sophie Martin</span>
                            <button className="ml-2 text-gray-400 hover:text-gray-600">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                          + Ajouter
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Délai
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={step.deadline}
                          onChange={(e) => {
                            const newSteps = steps.map(s =>
                              s.id === step.id ? { ...s, deadline: parseInt(e.target.value) } : s
                            );
                            setSteps(newSteps);
                          }}
                          className="w-20 border-gray-300 rounded-md shadow-sm"
                          min="1"
                        />
                        <span className="text-sm text-gray-500">heures</span>
                      </div>
                    </div>
                  </div>
                )}

                {step.type === 'notification' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destinataires
                    </label>
                    <input
                      type="text"
                      value={step.recipients.join(', ')}
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="email@exemple.com"
                    />
                  </div>
                )}

                {/* Step Settings */}
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

export default WorkflowSteps;