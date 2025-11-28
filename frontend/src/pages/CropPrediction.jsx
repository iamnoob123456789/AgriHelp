import { useState } from 'react';
import { Sprout, Loader2, Leaf } from 'lucide-react';
import { predictCrop } from '../services/api';
import cropData from '../../../backend/notebooks/crop-recommend.json';

export function CropPrediction() {
  const [formData, setFormData] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    temperature: 0,
    humidity: 0,
    ph: 0,
    rainfall: 0,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const prediction = await predictCrop(formData);
      setResult(prediction);
    } catch (error) {
      console.error('Prediction failed:', error);
      setLoading(false);
    }
  };

  const inputFields = [
    { name: 'nitrogen', label: 'Nitrogen (N)', unit: 'kg/ha', min: 0, max: 150 },
    { name: 'phosphorus', label: 'Phosphorus (P)', unit: 'kg/ha', min: 0, max: 150 },
    { name: 'potassium', label: 'Potassium (K)', unit: 'kg/ha', min: 0, max: 150 },
    { name: 'temperature', label: 'Temperature', unit: '°C', min: 0, max: 50 },
    { name: 'humidity', label: 'Humidity', unit: '%', min: 0, max: 100 },
    { name: 'ph', label: 'pH Level', unit: '', min: 0, max: 14, step: 0.1 },
    { name: 'rainfall', label: 'Rainfall', unit: 'mm', min: 0, max: 500 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full">
              <Sprout className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Crop Prediction</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your soil and climate parameters to get AI-powered crop recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Input Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inputFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label} {field.unit && `(${field.unit})`}
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      min={field.min}
                      max={field.max}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Predicting...</span>
                  </>
                ) : (
                  <span>Predict Crop</span>
                )}
              </button>
            </form>
          </div>

          <div>
            {result ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Prediction Result</h2>
                <div className="space-y-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={result.imageUrl}
                      alt={result.crop}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Recommended Crop</span>
                      <span className="text-sm font-medium text-green-600">
                        {result.confidence}% Confidence
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800">{result.crop}</h3>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">
                      Based on your soil and climate conditions, <strong>{result.crop}</strong> is
                      the most suitable crop for cultivation.
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  {(() => {
                    if (!result.crop) return null;
                    const recommendedCrop = cropData.find(c => c["Crop Name"].toLowerCase() === result.crop.toLowerCase());

                    if (!recommendedCrop) {
                      return (
                        <div className="mt-8 text-center text-gray-500">
                          <p>Detailed information for "{result.crop}" is not yet available.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                          <Leaf className="h-6 w-6 mr-2 text-green-600" />
                          Learn More About {recommendedCrop["Crop Name"]}
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-700">Reason to Grow</h4>
                            <p className="text-gray-600">{recommendedCrop["Reason to Grow"]}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Advantages</h4>
                            <p className="text-gray-600">{recommendedCrop["Advantages"]}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Disadvantages</h4>
                            <p className="text-gray-600">{recommendedCrop["Disadvantages"]}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Farming Tips</h4>
                            <p className="text-gray-600">{recommendedCrop["Farming Tips"]}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Sprout className="h-24 w-24 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Enter parameters and click Predict to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}