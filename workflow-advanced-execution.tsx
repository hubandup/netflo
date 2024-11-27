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
  Activity,
  GitBranch,
  Code,
  GitMerge,
  Rewind,
  Split
} from 'lucide-react';

const WorkflowAdvancedExecution = () => {
  const [workflowStatus, setWorkflowStatus] = useState('running');
  const [executionLog, setExecutionLog] = useState([]);
  const [checkpoints, setCheckpoints] = useState([]);
  const [activeRules, setActiveRules] = useState([]);
  const [parallelTasks, setParallelTasks] = useState([]);

  // Configuration avancée du workflow
  const workflowConfig = {
    steps: [
      {
        id: 1,
        name: "Vérification initiale",
        type: "parallel",
        branches: [
          {
            name: "Contrôle technique",
            rules: [
              {
                condition: "file.size < 10MB",
                action: "validateFileSize"
              },
              {
                condition: "file.type in ['jpg', 'png', 'pdf']",
                action: "validateFileType"
              }
            ]
          },
          {
            name: "Vérification métadonnées",
            rules: [
              {
                condition: "metadata.title && metadata.description",
                action: "validateMetadata"
              }
            ]
          }
        ],
        errorHandling: {
          retry: { maxAttempts: 3, delay: 5000 },
          fallback: "skipToNextStep",
          saveCheckpoint: true
        }
      },
      {
        id: 2,
        name: "Validation créative",
        type: "conditional",
        rules: [
          {
            if: "project.type == 'marketing'",
            then: [
              {
                name: "Validation Brand Manager",
                assignee: "brand_team",
                deadline: 24
              }
            ],
            else: [
              {
                name: "Validation Chef de Projet",
                assignee: "project_manager",
                deadline: 12
              }
            ]
          }
        ],
        retry: {
          conditions: ["timeout", "rejection"],
          maxAttempts: 2
        }
      }
    ]
  };

  // Gestionnaire d'exécution des règles
  const executeRule = async (rule, context) => {
    try {
      const conditionMet = await evaluateCondition(rule.condition, context);
      if (conditionMet) {
        await executeAction(rule.action, context);
      }
      return true;
    } catch (error) {
      handleRuleError(error, rule);
      return false;
    }
  };

  // Gestionnaire de point de reprise
  const createCheckpoint = () => {
    const checkpoint = {
      id: Date.now(),
      state: {
        workflowStatus,
        activeRules,
        parallelTasks
      }
    };
    setCheckpoints(prev => [...prev, checkpoint]);
    return checkpoint.id;
  };

  const restoreFromCheckpoint = async (checkpointId) => {
    const checkpoint = checkpoints.find(cp => cp.id === checkpointId);
    if (checkpoint) {
      setWorkflowStatus(checkpoint.state.workflowStatus);
      setActiveRules(checkpoint.state.activeRules);
      setParallelTasks(checkpoint.state.parallelTasks);
      addExecutionLog('info', `Restauration depuis le point de reprise ${checkpointId}`);
    }
  };

  // Gestionnaire de tâches parallèles
  const executeParallelTasks = async (tasks) => {
    const executionPromises = tasks.map(async task => {
      try {
        setParallelTasks(prev => [...prev, task.id]);
        await executeTask(task);
        setParallelTasks(prev => prev.filter(id => id !== task.id));
      } catch (error) {
        handleParallelTaskError(error, task);
      }
    });

    return Promise.allSettled(executionPromises);
  };

  // Interface utilisateur
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Panneau principal */}
      <div className="flex-1 flex flex-col">
        {/* Header avec contrôles */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Exécution avancée du workflow</h1>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>État: {workflowStatus}</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {/* Contrôles d'exécution */}
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <PlayCircle size={20} className="mr-2" />
                Exécuter
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                <Rewind size={20} className="mr-2" />
                Restaurer
              </button>
            </div>
          </div>
        </div>

        {/* Zone de visualisation principale */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Règles actives */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-medium flex items-center">
                  <Code size={20} className="mr-2" />
                  Règles actives
                </h2>
              </div>
              <div className="p-4">
                {activeRules.map((rule, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <GitBranch size={16} className="text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-sm text-gray-500">{rule.condition}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          rule.status === 'active' ? 'bg-green-100 text-green-600' : 
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {rule.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tâches parallèles */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-medium flex items-center">
                  <Split size={20} className="mr-2" />
                  Tâches parallèles
                </h2>
              </div>
              <div className="p-4">
                {parallelTasks.map((task, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <Activity size={16} className="text-purple-600" />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{task.name}</div>
                          <div className="text-sm text-gray-500">
                            Progression: {task.progress}%
                          </div>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-700">
                        <Pause size={16} />
                      </button>
                    </div>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Points de reprise */}
          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-medium flex items-center">
                <GitMerge size={20} className="mr-2" />
                Points de reprise
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {checkpoints.map((checkpoint, index) => (
                  <div key={checkpoint.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <div className="font-medium">Point de reprise #{index + 1}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(checkpoint.id).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => restoreFromCheckpoint(checkpoint.id)}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        Restaurer
                      </button>
                      <button className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded">
                        Détails
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panneau latéral - Logs et monitoring */}
      <div className="w-96 bg-white border-l">
        <div className="p-4 border-b">
          <h2 className="font-medium">Logs d'exécution</h2>
        </div>
        <div className="p-4">
          <div className="space-y-2 h-[calc(100vh-8rem)] overflow-auto">
            {executionLog.map((log, index) => (
              <div 
                key={index}
                className={`p-2 rounded text-sm ${
                  log.type === 'error' ? 'bg-red-50 text-red-700' :
                  log.type === 'success' ? 'bg-green-50 text-green-700' :
                  log.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-start">
                  {log.type === 'error' && <AlertCircle size={16} className="mr-2 flex-shrink-0 mt-0.5" />}
                  {log.type === 'success' && <CheckCircle size={16} className="mr-2 flex-shrink-0 mt-0.5" />}
                  {log.type === 'warning' && <AlertCircle size={16} className="mr-2 flex-shrink-0 mt-0.5" />}
                  <div>
                    <div className="font-medium">{log.message}</div>
                    <div className="text-xs opacity-75">{log.timestamp}</div>
                    {log.details && (
                      <pre className="mt-1 text-xs bg-black bg-opacity-5 p-1 rounded">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowAdvancedExecution;