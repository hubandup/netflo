import React, { useState } from 'react';
import {
  GitBranch,
  Plus,
  X,
  ArrowRight,
  Check,
  Settings,
  AlertTriangle,
  BookOpen,
  FileText
} from 'lucide-react';

const WorkflowBranching = () => {
  const [selectedCondition, setSelectedCondition] = useState(null);

  const conditions = {
    operators: [
      { value: 'equals', label: 'Égal à' },
      { value: 'notEquals', label: 'Différent de' },
      { value: 'greaterThan', label: 'Supérieur à' },
      { value: 'lessThan', label: 'Inférieur à' },
      { value: 'contains', label: 'Contient' },
      { value: 'in', label: 'Dans la liste' }
    ],
    variables: [
      { value: 'document.type', label: 'Type de document' },
      { value: 'document.size', label: 'Taille du fichier' },
      { value: 'workflow.status', label: 'Statut du workflow' },
      { value: 'user.role', label: 'Rôle utilisateur' },
      { value: 'project.priority', label: 'Priorité projet' }
    ]
  };

  // Conditions et branchements avec toutes les étapes définies
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: "Validation Marketing",
      conditions: [
        {
          variable: "document.type",
          operator: "equals",
          value: "marketing",
          nextSteps: {
            true: "validation_manager",
            false: "validation_standard"
          }
        }
      ],
      steps: {
        validation_manager: {
          name: "Validation Manager Marketing",
          assignee: "marketing_manager",
          deadline: 48
        },
        validation_standard: {
          name: "Validation Standard",
          assignee: "project_manager",
          deadline: 24
        }
      }
    },
    {
      id: 2,
      name: "Traitement prioritaire",
      conditions: [
        {
          variable: "project.priority",
          operator: "equals",
          value: "high",
          nextSteps: {
            true: "urgent_review",
            false: "normal_review"
          }
        }
      ],
      steps: {
        urgent_review: {
          name: "Revue urgente",
          assignee: "senior_manager",
          deadline: 4
        },
        normal_review: {
          name: "Revue standard",
          assignee: "project_manager",
          deadline: 24
        }
      }
    }
  ]);

  // Interface de rendu
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... [Reste du code identique jusqu'aux conditions] ... */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Conditions et Branchements</h1>
            <p className="text-gray-600">Configurez la logique de routage du workflow</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Plus size={20} className="mr-2" />
            Nouvelle condition
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <GitBranch size={20} className="text-blue-600 mr-2" />
                      <h2 className="text-lg font-semibold">{branch.name}</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Settings size={18} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded text-red-500">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {branch.conditions.map((condition, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <select 
                          value={condition.variable}
                          onChange={(e) => {
                            const newBranches = [...branches];
                            newBranches[branch.id - 1].conditions[index].variable = e.target.value;
                            setBranches(newBranches);
                          }}
                          className="border rounded-lg px-3 py-2 flex-1"
                        >
                          {conditions.variables.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <select 
                          value={condition.operator}
                          onChange={(e) => {
                            const newBranches = [...branches];
                            newBranches[branch.id - 1].conditions[index].operator = e.target.value;
                            setBranches(newBranches);
                          }}
                          className="border rounded-lg px-3 py-2 flex-1"
                        >
                          {conditions.operators.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={condition.value}
                          onChange={(e) => {
                            const newBranches = [...branches];
                            newBranches[branch.id - 1].conditions[index].value = e.target.value;
                            setBranches(newBranches);
                          }}
                          className="border rounded-lg px-3 py-2 flex-1"
                          placeholder="Valeur"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 ml-8">
                        <div className="border rounded-lg p-4 bg-green-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Check size={18} className="text-green-600 mr-2" />
                              <span className="font-medium">Si vrai</span>
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-700">
                              Configurer
                            </button>
                          </div>
                          {branch.steps[condition.nextSteps.true] && (
                            <div className="bg-white rounded p-3">
                              <div className="font-medium">
                                {branch.steps[condition.nextSteps.true].name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Assigné à: {branch.steps[condition.nextSteps.true].assignee}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="border rounded-lg p-4 bg-red-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <X size={18} className="text-red-600 mr-2" />
                              <span className="font-medium">Si faux</span>
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-700">
                              Configurer
                            </button>
                          </div>
                          {branch.steps[condition.nextSteps.false] && (
                            <div className="bg-white rounded p-3">
                              <div className="font-medium">
                                {branch.steps[condition.nextSteps.false].name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Assigné à: {branch.steps[condition.nextSteps.false].assignee}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="mt-4 w-full px-4 py-2 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400">
                    + Ajouter une condition
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <BookOpen size={20} className="text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Documentation</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Variables disponibles</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <ArrowRight size={16} className="text-gray-400 mr-2" />
                      document.* (type, size, format)
                    </li>
                    <li className="flex items-center">
                      <ArrowRight size={16} className="text-gray-400 mr-2" />
                      workflow.* (status, step, assignee)
                    </li>
                    <li className="flex items-center">
                      <ArrowRight size={16} className="text-gray-400 mr-2" />
                      user.* (role, department)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Opérateurs</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <ArrowRight size={16} className="text-gray-400 mr-2" />
                      equals, notEquals - Comparaison exacte
                    </li>
                    <li className="flex items-center">
                      <ArrowRight size={16} className="text-gray-400 mr-2" />
                      contains - Recherche de texte
                    </li>
                    <li className="flex items-center">
                      <ArrowRight size={16} className="text-gray-400 mr-2" />
                      greaterThan, lessThan - Comparaisons numériques
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <FileText size={20} className="text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Exemples</h2>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Validation prioritaire",
                    description: "Si priority = 'high', assigner au manager"
                  },
                  {
                    title: "Validation technique",
                    description: "Si size > 10MB, ajouter étape de compression"
                  }
                ].map((example, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <div className="font-medium text-sm">{example.title}</div>
                    <div className="text-sm text-gray-500">{example.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBranching;