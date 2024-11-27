import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Activity,
  AlertCircle,
  BarChart2,
  Clock,
  Settings,
  TrendingUp,
  Zap,
  Database,
  HardDrive,
  Server,
  RefreshCcw
} from 'lucide-react';
import { 
  LineChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const WorkflowOptimized = () => {
  // État des métriques
  const [performanceMetrics, setPerformanceMetrics] = useState({
    memoryUsage: [],
    cpuUsage: [],
    executionTimes: [],
    cacheHitRate: []
  });

  // Données de démonstration
  const generatePerformanceData = () => {
    const now = Date.now();
    return Array.from({ length: 20 }, (_, i) => ({
      time: new Date(now - (19 - i) * 60000).toISOString(),
      memory: Math.random() * 100,
      cpu: 50 + Math.random() * 30,
      cacheHits: Math.random() * 100,
      latency: Math.random() * 1000
    }));
  };

  const [performanceData] = useState(generatePerformanceData());

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {[
              { 
                title: 'Cache Hit Rate', 
                value: '94.2%', 
                trend: '+2.1%',
                icon: Server,
                color: 'blue'
              },
              { 
                title: 'Avg Response Time', 
                value: '124ms', 
                trend: '-12ms',
                icon: Zap,
                color: 'green'
              },
              { 
                title: 'Memory Usage', 
                value: '2.4GB', 
                trend: '45%',
                icon: Database,
                color: 'yellow'
              },
              { 
                title: 'Active Tasks', 
                value: '284', 
                trend: '+12',
                icon: Activity,
                color: 'purple'
              }
            ].map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                    <metric.icon size={24} className={`text-${metric.color}-600`} />
                  </div>
                  <span className={`text-sm ${
                    metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm">{metric.title}</h3>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Memory Usage */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Memory Usage</h3>
                <HardDrive size={20} className="text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                    />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="memory" 
                      stroke="#4F46E5"
                      fill="#4F46E5"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CPU Usage */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">CPU Usage</h3>
                <Activity size={20} className="text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="cpu" 
                      stroke="#10B981" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cache Performance */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Cache Performance</h3>
                <Server size={20} className="text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="cacheHits" 
                      stroke="#6366F1" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Response Time</h3>
                <Clock size={20} className="text-gray-400" />
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="latency" 
                      stroke="#EC4899" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Cache Status and Alerts */}
          <div className="grid grid-cols-3 gap-6">
            {/* Cache Status */}
            <div className="bg-white rounded-lg shadow p-6 col-span-2">
              <h3 className="text-lg font-semibold mb-4">Cache Status</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rule Key
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hit Count
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { key: 'workflow.rules.1', age: '2m', hits: 145, size: '24KB' },
                      { key: 'workflow.rules.2', age: '5m', hits: 89, size: '16KB' },
                      { key: 'workflow.rules.3', age: '12m', hits: 234, size: '32KB' }
                    ].map((entry, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry.key}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.hits}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.size}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real-time Alerts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Real-time Alerts</h3>
              <div className="space-y-4">
                {[
                  { 
                    type: 'warning',
                    message: 'High memory usage detected',
                    time: '2 min ago'
                  },
                  {
                    type: 'error',
                    message: 'Cache miss rate above threshold',
                    time: '5 min ago'
                  },
                  {
                    type: 'info',
                    message: 'Auto-scaling triggered',
                    time: '12 min ago'
                  }
                ].map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg ${
                      alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                      alert.type === 'error' ? 'bg-red-50 text-red-700' :
                      'bg-blue-50 text-blue-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm opacity-75">{alert.time}</p>
                      </div>
                    </div>
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

export default WorkflowOptimized;