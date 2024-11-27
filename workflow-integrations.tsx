import React, { useState } from 'react';
import {
  Globe,
  Webhook,
  MessageSquare,
  Link,
  Code,
  Variable,
  Puzzle,
  Plus,
  X,
  ChevronDown,
  Settings,
  PlayCircle,
  Edit
} from 'lucide-react';

const WorkflowIntegrations = () => {
  const [selectedTab, setSelectedTab] = useState('integrations');
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: 'Notification Jira',
      url: 'https://api.jira.com/webhook',
      events: ['validation.approved', 'validation.rejected'],
      headers: { 'Authorization': 'Bearer {{JIRA_TOKEN}}' }
    }
  ]);

  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      type: 'slack',
      name: 'Canal Marketing',
      config: {
        channel: '#marketing-approvals',
        mentions: ['@marketing-team']
      }
    }
  ]);

  const [variables, setVariables] = useState([
    {
      id: 1,
      name: 'PROJECT_NAME',
      value: '{{project.name}}',
      description: 'Nom du projet courant'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Intégrations & Variables</h1>
        <p className="text-gray-600 mt-1">Configurez les intégrations externes et les variables dynamiques</p>
      </div>

      {/* Main Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex">
            {[
              { id: 'integrations', label: 'Intégrations', icon: Link },
              { id: 'webhooks', label: 'Webhooks', icon: Webhook },
              { id: 'variables', label: 'Variables', icon: Variable },
              { id: 'templates', label: 'Templates', icon: Code }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-4 flex items-center space-x-2 border-b-2 ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'webhooks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Webhooks configurés</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus size={20} className="mr-2" />
                  Ajouter un webhook
                </button>
              </div>

              <div className="space-y-4">
                {webhooks.map(webhook => (
                  <div key={webhook.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{webhook.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{webhook.url}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Edit size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <PlayCircle size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {webhook.events.map(event => (
                        <span key={event} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'integrations' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Available Integrations */}
                {[
                  { id: 'slack', name: 'Slack', description: 'Notifications en temps réel', icon: MessageSquare },
                  { id: 'teams', name: 'Microsoft Teams', description: 'Messages et alertes', icon: MessageSquare },
                  { id: 'jira', name: 'Jira', description: 'Création et mise à jour de tickets', icon: Puzzle },
                  { id: 'asana', name: 'Asana', description: 'Gestion des tâches', icon: Puzzle },
                  { id: 'github', name: 'GitHub', description: 'Intégration avec les PR', icon: Code },
                  { id: 'zapier', name: 'Zapier', description: 'Automatisations personnalisées', icon: Webhook }
                ].map(integration => (
                  <div key={integration.id} className="border rounded-lg p-6 hover:border-blue-500 cursor-pointer">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <integration.icon size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-500">{integration.description}</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                      Configurer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'variables' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Variables dynamiques</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus size={20} className="mr-2" />
                  Ajouter une variable
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valeur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 relative">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {variables.map(variable => (
                      <tr key={variable.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {variable.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {variable.value}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {variable.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            Modifier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'templates' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Templates personnalisés</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                  <Plus size={20} className="mr-2" />
                  Nouveau template
                </button>
              </div>

              <div className="space-y-6">
                {/* Template Example */}
                <div className="border rounded-lg">
                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Notification marketing</h3>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit size={20} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <pre className="bg-gray-50 p-4 rounded-lg text-sm">
{`Hi {{user.name}},

New approval request for {{project.name}}:
- Type: {{document.type}}
- Status: {{workflow.status}}
- Deadline: {{workflow.deadline}}

{{#if urgent}}
⚠️ This is urgent!
{{/if}}

Click here to review: {{workflow.url}}`}
                    </pre>
                  </div>
                </div>

                {/* Metadata Conditions */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Conditions sur métadonnées</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <select className="border rounded p-2">
                        <option>document.type</option>
                        <option>project.category</option>
                        <option>workflow.priority</option>
                      </select>
                      <select className="border rounded p-2">
                        <option>equals</option>
                        <option>contains</option>
                        <option>startsWith</option>
                      </select>
                      <input type="text" className="border rounded p-2" placeholder="Valeur" />
                      <button className="text-red-600 hover:text-red-700">
                        <X size={20} />
                      </button>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      + Ajouter une condition
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowIntegrations;