import React, { useState } from 'react';
import { 
  Bug, 
  Play, 
  Pause, 
  StepForward,
  SkipForward, 
  RotateCcw,
  ListStart,
  ListEnd,
  Plus,
  FileText,
  Code,
  PieChart,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const WorkflowDebug = () => {
  const [breakpoints, setBreakpoints] = useState([2, 5]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  // État pour les variables actuelles
  const [variables, setVariables] = useState({
    document: {
      id: "doc-001",
      type: "marketing",
      size: 1024,
      status: "pending"
    },
    workflow: {
      currentStep: 1,
      startTime: "2024-03-20T10:00:00",
      assignee: "user-123"
    },
    user: {
      id: "user-123",
      role: "manager",
      department: "marketing"
    }
  });

  // Historique d'exécution
  const [executionHistory] = useState([
    {
      step: 1,
      type: 'condition',
      result: true,
      time: '10:00:01',
      variables: { document: { type: 'marketing' } }
    },
    {
      step: 2,
      type: 'action',
      result: 'completed',
      time: '10:00:02',
      variables: { workflow: { status: 'in_progress' } }
    }
  ]);

  // Tests automatisés
  const [testScenarios] = useState([
    {
      name: 'Validation Marketing',
      assertions: [
        { condition: 'document.type === "marketing"', status: 'passed' },
        { condition: 'user.role === "manager"', status: 'passed' },
        { condition: 'workflow.status === "completed"', status: 'failed' }
      ],
      coverage: 85
    },
    {
      name: 'Validation Technique',
      assertions: [
        { condition: 'document.size < 5000', status: 'passed' },
        { condition: 'document.format === "pdf"', status: 'warning' }
      ],
      coverage: 92
    }
  ]);

  const handleAddBreakpoint = (step) => {
    setBreakpoints([...breakpoints, step]);
  };

  const handleRemoveBreakpoint = (step) => {
    setBreakpoints(breakpoints.filter(bp => bp !== step));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Panneau de débogage */}
        <div className="space-y-6">
          {/* Contrôles de débogage */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <Bug size={20} className="mr-2" />
                Débogage
              </h2>
            </div>
            <div className="p-4">
              <div className="flex space-x-2 mb-6">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Play size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Pause size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <StepForward size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <RotateCcw size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Points d'arrêt */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Points d'arrêt</h3>
                  <div className="space-y-2">
                    {breakpoints.map(step => (
                      <div key={step} className="flex items-center justify-between p-2 bg-red-50 rounded">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                          <span>Étape {step}</span>
                        </div>
                        <button 
                          onClick={() => handleRemoveBreakpoint(step)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => handleAddBreakpoint(breakpoints.length + 1)}
                      className="w-full px-3 py-2 border border-dashed rounded text-gray-500 hover:text-gray-700"
                    >
                      + Ajouter un point d'arrêt
                    </button>
                  </div>
                </div>

                {/* Variables courantes */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Variables courantes</h3>
                  <div className="bg-gray-800 text-gray-200 p-4 rounded-lg">
                    <pre className="text-sm overflow-auto">
                      {JSON.stringify(variables, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historique d'exécution */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <Activity size={20} className="mr-2" />
                Historique d'exécution
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {executionHistory.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded">
                    <div className="text-sm text-gray-500">
                      {entry.time}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Étape {entry.step}</div>
                      <div className="text-sm text-gray-600">{entry.type}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-sm ${
                      entry.result === true || entry.result === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {typeof entry.result === 'boolean' ? 
                        (entry.result ? 'Succès' : 'Échec') : 
                        entry.result
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tests automatisés */}
        <div className="space-y-6">
          {/* Scénarios de test */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <FileText size={20} className="mr-2" />
                Scénarios de test
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {testScenarios.map((scenario, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{scenario.name}</h3>
                      <div className="text-sm text-gray-500">
                        Couverture: {scenario.coverage}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      {scenario.assertions.map((assertion, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <code className="text-sm">{assertion.condition}</code>
                          <div className={`flex items-center ${
                            assertion.status === 'passed' ? 'text-green-600' :
                            assertion.status === 'failed' ? 'text-red-600' :
                            'text-yellow-600'
                          }`}>
                            {assertion.status === 'passed' && <CheckCircle2 size={16} />}
                            {assertion.status === 'failed' && <XCircle size={16} />}
                            {assertion.status === 'warning' && <AlertTriangle size={16} />}
                            <span className="ml-2 text-sm">{assertion.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button className="w-full px-4 py-2 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700">
                  + Ajouter un scénario
                </button>
              </div>
            </div>
          </div>

          {/* Rapport de couverture */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <PieChart size={20} className="mr-2" />
                Rapport de couverture
              </h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Couverture globale</div>
                  <div className="text-2xl font-bold text-blue-600">88%</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Tests réussis</div>
                  <div className="text-2xl font-bold text-green-600">92%</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conditions</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Actions</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Branches</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '78%' }} />
                    </div>
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

export default WorkflowDebug;