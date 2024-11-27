import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Terminal,
  GitBranch,
  Activity,
  Code,
  FileText
} from 'lucide-react';

const WorkflowTesting = () => {
  const [simulationState, setSimulationState] = useState('idle'); // idle, running, paused, completed
  const [currentStep, setCurrentStep] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);

  // Exemple de workflow complexe avec conditions imbriquées
  const complexWorkflow = {
    id: 'workflow-1',
    conditions: [
      {
        type: 'group',
        operator: 'AND',
        conditions: [
          {
            type: 'simple',
            field: 'document.type',
            operator: 'equals',
            value: 'marketing'
          },
          {
            type: 'group',
            operator: 'OR',
            conditions: [
              {
                type: 'simple',
                field: 'project.priority',
                operator: 'equals',
                value: 'high'
              },
              {
                type: 'simple',
                field: 'document.size',
                operator: 'greaterThan',
                value: 10
              }
            ]
          }
        ]
      }
    ]
  };

  // Données de test pour la simulation
  const testData = {
    document: { type: 'marketing', size: 15 },
    project: { priority: 'high' },
    user: { role: 'manager' }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Panneau de test */}
          <div className="col-span-2 space-y-6">
            {/* Contrôles de simulation */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  <Terminal size={20} className="mr-2" />
                  Simulation du workflow
                </h2>
              </div>
              <div className="p-6">
                <div className="flex space-x-4 mb-6">
                  <button 
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setSimulationState('running')}
                  >
                    <Play size={20} className="mr-2" />
                    Démarrer
                  </button>
                  <button 
                    className="flex items-center px-4 py-2 border rounded hover:bg-gray-50"
                    onClick={() => setSimulationState('paused')}
                  >
                    <Pause size={20} className="mr-2" />
                    Pause
                  </button>
                  <button 
                    className="flex items-center px-4 py-2 border rounded hover:bg-gray-50"
                    onClick={() => setSimulationState('idle')}
                  >
                    <RotateCcw size={20} className="mr-2" />
                    Réinitialiser
                  </button>
                </div>

                {/* Visualisation de l'état */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">État de la simulation</div>
                      <div className="text-sm text-gray-500">Étape {currentStep + 1} / 5</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${
                      simulationState === 'running' ? 'bg-green-100 text-green-600' :
                      simulationState === 'paused' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {simulationState.charAt(0).toUpperCase() + simulationState.slice(1)}
                    </div>
                  </div>

                  {/* Variables d'environnement */}
                  <div className="bg-gray-800 text-gray-100 p-4 rounded font-mono text-sm">
                    <div className="mb-2 text-gray-400">// Variables d'environnement</div>
                    {Object.entries(testData).map(([key, value]) => (
                      <div key={key}>
                        {key}: {JSON.stringify(value, null, 2)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats des tests */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  <Activity size={20} className="mr-2" />
                  Résultats des tests
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { type: 'success', message: 'Condition 1: document.type vérifié' },
                    { type: 'success', message: 'Condition 2: project.priority vérifié' },
                    { type: 'warning', message: 'Branche conditionnelle: chemin alternatif disponible' },
                    { type: 'error', message: 'Validation finale: signature manquante' }
                  ].map((result, index) => (
                    <div 
                      key={index}
                      className={`flex items-start p-3 rounded ${
                        result.type === 'success' ? 'bg-green-50 text-green-700' :
                        result.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}
                    >
                      {result.type === 'success' && <CheckCircle size={20} className="mr-2 mt-0.5" />}
                      {result.type === 'warning' && <AlertTriangle size={20} className="mr-2 mt-0.5" />}
                      {result.type === 'error' && <XCircle size={20} className="mr-2 mt-0.5" />}
                      <div>
                        <div className="font-medium">{result.message}</div>
                        <div className="text-sm opacity-75">Étape {index + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Panneau des conditions avancées */}
          <div className="space-y-6">
            {/* Éditeur de conditions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  <Code size={20} className="mr-2" />
                  Conditions avancées
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {/* Groupe de conditions */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <GitBranch size={18} className="text-blue-600 mr-2" />
                        <span className="font-medium">Groupe de conditions</span>
                      </div>
                      <select className="border rounded px-2 py-1 text-sm">
                        <option value="AND">ET (AND)</option>
                        <option value="OR">OU (OR)</option>
                      </select>
                    </div>

                    {/* Conditions imbriquées */}
                    <div className="space-y-3 ml-6">
                      <div className="p-3 bg-gray-50 rounded border">
                        <div className="flex items-center justify-between mb-2">
                          <input 
                            type="text" 
                            value="document.type" 
                            className="border rounded px-2 py-1"
                          />
                          <select className="border rounded px-2 py-1 mx-2">
                            <option>equals</option>
                            <option>contains</option>
                          </select>
                          <input 
                            type="text" 
                            value="marketing" 
                            className="border rounded px-2 py-1"
                          />
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-600 font-medium">OU</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <input 
                              type="text" 
                              value="project.priority" 
                              className="border rounded px-2 py-1"
                            />
                            <select className="border rounded px-2 py-1 mx-2">
                              <option>equals</option>
                              <option>greaterThan</option>
                            </select>
                            <input 
                              type="text" 
                              value="high" 
                              className="border rounded px-2 py-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400">
                    + Ajouter une condition
                  </button>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  <FileText size={20} className="mr-2" />
                  Documentation
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Opérateurs logiques</h3>
                    <ul className="text-sm space-y-2">
                      <li>ET (AND): Toutes les conditions doivent être vraies</li>
                      <li>OU (OR): Au moins une condition doit être vraie</li>
                      <li>NON (NOT): Inverse la condition</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Expressions complexes</h3>
                    <ul className="text-sm space-y-2">
                      <li>Groupes de conditions imbriqués</li>
                      <li>Conditions multiples par groupe</li>
                      <li>Priorité des opérateurs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTesting;