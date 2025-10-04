import { BarChart3, Users, FileText, TrendingUp, Activity } from 'lucide-react';

export function AdminDashboard() {
  const stats = [
    { icon: <Users className="h-8 w-8" />, label: 'Total Users', value: '1,248', change: '+12%', color: 'bg-blue-500' },
    { icon: <Activity className="h-8 w-8" />, label: 'Predictions Today', value: '342', change: '+8%', color: 'bg-green-500' },
    { icon: <FileText className="h-8 w-8" />, label: 'Total Blogs', value: '48', change: '+3%', color: 'bg-purple-500' },
    { icon: <TrendingUp className="h-8 w-8" />, label: 'Success Rate', value: '95.4%', change: '+2%', color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Crop Prediction', time: '5 minutes ago', status: 'success' },
    { user: 'Jane Smith', action: 'Disease Detection', time: '12 minutes ago', status: 'success' },
    { user: 'Mike Johnson', action: 'Fertilizer Recommendation', time: '18 minutes ago', status: 'success' },
    { user: 'Sarah Williams', action: 'Crop Prediction', time: '25 minutes ago', status: 'success' },
    { user: 'David Brown', action: 'Disease Detection', time: '32 minutes ago', status: 'failed' },
  ];

  const topCrops = [
    { name: 'Rice', predictions: 145, percentage: 35 },
    { name: 'Wheat', predictions: 112, percentage: 27 },
    { name: 'Cotton', predictions: 87, percentage: 21 },
    { name: 'Maize', predictions: 71, percentage: 17 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage AgriHelp platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-green-600 text-sm mt-1">{stat.change} from last week</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
              <Activity className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {activity.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Top Predicted Crops</h2>
              <BarChart3 className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topCrops.map((crop, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">{crop.name}</span>
                    <span className="text-sm text-gray-600">{crop.predictions} predictions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${crop.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all font-semibold">
              Manage Users
            </button>
            <button className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all font-semibold">
              Manage Blogs
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

