import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Droplets, Bug, TrendingUp, Users, Award } from 'lucide-react';

export function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);
  const features = [
    {
      icon: <Sprout className="h-12 w-12" />,
      title: 'Crop Prediction',
      description: 'Get AI-powered recommendations for the best crops based on soil and climate conditions.',
      link: '/crop-prediction',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      icon: <Droplets className="h-12 w-12" />,
      title: 'Fertilizer Recommendation',
      description: 'Discover the optimal fertilizer for your crops based on soil nutrients and crop type.',
      link: '/fertilizer',
      gradient: 'from-blue-400 to-cyan-600'
    },
    {
      icon: <Bug className="h-12 w-12" />,
      title: 'Disease Detection',
      description: 'Upload leaf images to detect diseases early and get treatment recommendations.',
      link: '/disease-detection',
      gradient: 'from-orange-400 to-red-600'
    }
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: '10,000+', label: 'Happy Farmers' },
    { icon: <TrendingUp className="h-8 w-8" />, value: '50,000+', label: 'Predictions Made' },
    { icon: <Award className="h-8 w-8" />, value: '95%', label: 'Accuracy Rate' }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="w-full text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Smart Farming
              </span>
              <br />
              <span className="text-gray-800">Powered by AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AgriHelp uses advanced machine learning to help farmers make data-driven decisions
              for healthier crops and better yields.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/crop-prediction"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/blogs"
                className="bg-white text-gray-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all border-2 border-gray-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our AI-Powered Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leverage cutting-edge technology to transform your farming practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 text-green-600 font-semibold flex items-center space-x-2 group-hover:space-x-3 transition-all">
                  <span>Try Now</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-green-100 to-blue-100 text-green-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isAuthenticated ? (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="w-full text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Share Your Knowledge
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create a blog post to share your farming experiences and insights with the community.
            </p>
            <Link
              to="/addBlog"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Create Blog Post
            </Link>
          </div>
        </section>
      ) : (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="w-full text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already using AgriHelp to increase their yields
              and make smarter farming decisions.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}