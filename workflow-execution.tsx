import React, { useState, useEffect } from 'react';
import {
  PlayCircle,
  Pause,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  User,
  Settings,
  Activity
} from 'lucide-react';

const WorkflowExecution = () => {
  // États pour le contrôle du workflow
  const [workflowStatus, setWorkflowStatus] = useState('running'); // 'running', 'paused', 'completed', 'error'
  const [currentStep, setCurrentStep] = useState(0);
  const [executionLogs, setExecutionLogs] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Exemple de configuration du workflow
  const workflowConfig = {
    id: 'workflow-1',
    name: 'Validation BAT Marketing',
    steps: [
      {
        id: 1,
        type: 'review',
        name: 'Révision graphique',
        assignee: 'designer',
        deadline: 24,
        conditions: {
          requiredFields: ['artwork', 'specifications'],
          autoReject: false
        }
      },
      {
        id: 2,
        type: 'automation',
        name: 'Vérification technique',
        actions: ['checkResolution', 'validateColors'],
        conditions: {
          minResolution: '300dpi',
          colorSpace: 'CMYK'
        }
      },
      {
        id: 3,
        type: 'approval',
        name: 'Validation client',
        assignee: 'client',
        deadline: 48,
        conditions: {
          requireComment: true,
          requireSignature: true
        }
      }
    ]
  };

  // Gestionnaire d'exécution des étapes
  const executeStep = async (step) => {
    try {
      addExecutionLog('info', `Début de l'étape: ${step.name}`);

      switch (step.type) {
        case 'review':
          await handleReviewStep(step);
          break;
        case 'automation':
          await handleAutomationStep(step);
          break;
        case 'approval':
          await handleApprovalStep(step);
          break;
        default:
          throw new Error(`Type d'étape inconnu: ${step.type}`);
      }

      addExecutionLog('success', `Étape terminée: ${step.name}`);
    } catch (error) {
      addExecutionLog('error', `Erreur lors de l'exécution: ${error.message}`);
      setWorkflowStatus('error');
    }
  };

  // Gestionnaires spécifiques pour chaque type d'étape
  const handleReviewStep = async (step) => {
    // Vérification des conditions préalables
    if (step.conditions.requiredFields) {
      const missingFields = checkRequiredFields(step.conditions.requiredFields);
      if (missingFields.length > 0) {
        throw new Error(`Champs requis manquants: ${missingFields.join(', ')}`);
      }
    }

    // Assignation et notification
    await assignToUser(step.assignee);
    await sendNotification(step.assignee, 'review_requested');
  };

  const handleAutomationStep = async (step) => {
    for (const action of step.actions) {
      addExecutionLog('info', `Exécution de l'action: ${action}`);
      await executeAutomatedAction(action, step.conditions);
    }
  };

  const handleApprovalStep = async (step) => {
    await assignToUser(step.assignee);
    await sendNotification(step.assignee, 'approval_requested');

    if (step.conditions.requireSignature) {
      addExecutionLog('info', 'Signature électronique requise');
    }
  };

  // Fonctions utilitaires
  const checkRequiredFields = (fields) => {
    // Simulation de vérification des champs
    return [];
  };

  const assignToUser = async (userId) => {
    addExecutionLog('info', `Attribution à l'utilisateur: ${userId}`);
  };

  const sendNotification = async (userId, type) => {
    addExecutionLog('info', `Notification envoyée à: ${userId}`);
  };

  const executeAutomatedAction = async (action, conditions) => {
    // Simulation d'exécution d'action automatisée
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const addExecutionLog = (type, message) => {
    setExecutionLogs(prev => [...prev, {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toISOString()
    }]);
  };

  // Contrôles du workflow
  const pauseWorkflow = () => {
    setWorkflowStatus('paused');
    addExecutionLog('info', 'Workflow mis en pause');
  };

  const resumeWorkflow = () => {
    setWorkflowStatus('running');
    addExecutionLog('info', 'Workflow repris');
  };

  const resetWorkflow = () => {
    setWorkflowStatus('running');
    setCurrentStep(0);
    setExecutionLogs([]);
    setTimeElapsed(0);
    addExecutionLog('info', 'Workflow réinitialisé');
  };

  // Timer pour le suivi du temps écoulé
  useEffect(() => {
    let timer;
    if (workflowStatus === 'running') {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [workflowStatus]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Panneau principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{workflowConfig.name}</h1>
              <p className="text-gray-500">ID: {workflowConfig.id}</p>
            </div>
            <div className="flex items-center space-x-4">
              {workflowStatus === 'running' ? (
                <button 
                  onClick={pauseWorkflow}
                  className="flex items-center px-4 py-2 text-yellow-600 bg-yellow-50 rounded-lg"
                >
                  <Pause size={20} className="mr-2" />
                  Pause
                </button>
              ) : (
                <button 
                  onClick={resumeWorkflow}
                  className="flex items-center px-4 py-2 text-green-600 bg-green-50 rounded-lg"
                >
                  <PlayCircle size={20} className="mr-2" />
                  Reprendre
                </button>
              )}
              <button 
                onClick={resetWorkflow}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <RotateCcw size={20} className="mr-2" />
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Progression du workflow */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Progression</h2>
            </div>
            <div className="p-4">
              {workflowConfig.steps.map((step, index) => (
                <div key={step.id} className="flex items-start mb-4 last:mb-0">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < currentStep ? 'bg-green-100 text-green-600' :
                      index === currentStep ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle size={20} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    {index < workflowConfig.steps.length - 1 && (
                      <div className="h-12 w-px bg-gray-200 mx-4" />
                    )}
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{step.name}</h3>
                        <p className="text-sm text-gray-500">{step.type}</p>
                      </div>
                      {step.deadline && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={16} className="mr-1" />
                          {step.deadline}h
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panneau latéral - Logs et monitoring */}
      <div className="w-96 bg-white border-l">
        <div className="p-4 border-b">
          <h2 className="font-medium">Monitoring</h2>
        </div>
        <div className="p-4">
          {/* Statistiques */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Temps écoulé</div>
              <div className="text-2xl font-semibold">
                {Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Étape actuelle</div>
              <div className="text-2xl font-semibold">{currentStep + 1}/{workflowConfig.steps.length}</div>
            </div>
          </div>

          {/* Logs d'exécution */}
          <div>
            <h3 className="text-sm font-medium mb-2">Logs d'exécution</h3>
            <div className="space-y-2 h-96 overflow-auto">
              {executionLogs.map(log => (
                <div 
                  key={log.id}
                  className={`p-2 rounded text-sm ${
                    log.type === 'error' ? 'bg-red-50 text-red-700' :
                    log.type === 'success' ? 'bg-green-50 text-green-700' :
                    'bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-start">
                    {log.type === 'error' && <AlertCircle size={16} className="mr-2 flex-shrink-0 mt-0.5" />}
                    {log.type === 'success' && <CheckCircle size={16} className="mr-2 flex-shrink-0 mt-0.5" />}
                    {log.type === 'info' && <Activity size={16} className="mr-2 flex-shrink-0 mt-0.5" />}
                    <div>
                      <p>{log.message}</p>
                      <p className="text-xs opacity-75">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowExecution;