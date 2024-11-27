import React, { useState } from 'react';
import { 
  Activity,
  Clock, 
  ThumbsUp,
  ThumbsDown,
  Users,
  Calendar,
  AlertCircle,
  Timer,
  Filter
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedTeam, setSelectedTeam] = useState('all');

  const performanceData = [
    { month: 'Jan', approvals: 45, rejections: 12, iterations: 68 },
    { month: 'Feb', approvals: 52, rejections: 8, iterations: 72 },
    { month: 'Mar', approvals: 48, rejections: 15, iterations: 84 },
    { month: 'Apr', approvals: 58, rejections: 10, iterations: 76 },
    { month: 'Mai', approvals: 62, rejections: 7, iterations: 82 },
    { month: 'Jun', approvals: 55, rejections: 11, iterations: 78 }
  ];

  const timelineData = [
    { month: 'Jan', time: 24 },
    { month: 'Feb', time: 22 },
    { month: 'Mar', time: 28 },
    { month: 'Apr', time: 20 },
    { month: 'Mai', time: 18 },
    { month: 'Jun', time: 21 }
  ];

  const pieData = [
    { name: 'Dans les délais', value: 75 },
    { name: 'En retard', value: 25 }
  ];

  const COLORS = ['#4CAF50', '#f44336'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Tableau de bord Analytics</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border rounded-md px-3 py-2 bg-white"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="border rounded-md px-3 py-2 bg-white"
            >
              <option value="all">Toutes les équipes</option>
              <option value="marketing">Marketing</option>
              <option value="product">Produit</option>
              <option value="creative">Créatif</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-50">
            <Filter size={20} />
            <span>Filtres avancés</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: 'Temps moyen de validation',
            value: '22h',
            trend: '-10%',
            icon: Clock,
            color: 'blue' 
          },
          {
            title: 'Taux d\'approbation',
            value: '85%',
            trend: '+5%',
            icon: ThumbsUp,
            color: 'green'
          },
          {
            title: 'BATs en retard',
            value: '12',
            trend: '+2',
            icon: AlertCircle,
            color: 'red'
          },
          {
            title: 'Valideurs actifs',
            value: '24',
            trend: '+3',
            icon: Users,
            color: 'purple'
          }
        ].map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${kpi.color}-100`}>
                <kpi.icon size={24} className={`text-${kpi.color}-600`} />
              </div>
              <span className={`text-sm ${
                kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm">{kpi.title}</h3>
            <p className="text-2xl font-bold mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Performance des validations</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approvals" name="Approbations" fill="#4CAF50" />
                <Bar dataKey="rejections" name="Rejets" fill="#f44336" />
                <Bar dataKey="iterations" name="Itérations" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Temps moyen de validation</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  name="Heures" 
                  stroke="#2196F3" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Respect des délais</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
          <div className="space-y-4">
            {[
              {
                action: 'BAT approuvé',
                project: 'Banner_Homepage_V3',
                user: 'Sophie Martin',
                time: 'Il y a 2h'
              },
              {
                action: 'Nouveau commentaire',
                project: 'Newsletter_Q2',
                user: 'Thomas Dubois',
                time: 'Il y a 3h'
              },
              {
                action: 'BAT rejeté',
                project: 'Product_Launch_Visual',
                user: 'Julie Bernard',
                time: 'Il y a 5h'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.project}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50">
          Exporter en PDF
        </button>
        <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50">
          Exporter en Excel
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;