import { useState, useRef } from 'react';
import { Droplets, Loader2, FlaskConical, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { predictFertilizer } from '../services/api';
import fertilizerData from '../../../backend/notebooks/fertilizer-recommend.json';

export function FertilizerRecommendation() {
  const [formData, setFormData] = useState({
    temperature: 0,
    moisture: 0,
    rainfall: 0,
    ph: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    carbon: 0,
    soil: '',
    crop: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'soil' || name === 'crop' ? value : parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const recommendation = await predictFertilizer(formData);
      const recommendedFertilizer = fertilizerData.find(
        (f) => f['Fertilizer Name'].toLowerCase() === recommendation.fertilizer.toLowerCase()
      );
      const imageUrl = recommendedFertilizer
        ? `http://localhost:5000${recommendedFertilizer['Image-path'].replace('/backend', '')}`
        : '';
      setResult({ ...recommendation, imageUrl });
      setLoading(false);
    } catch (error) {
      console.error('Recommendation failed:', error);
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('fertilizer-recommendation-result.pdf');
      });
    }
  };

  const soilTypes = ['Sandy', 'Loamy', 'Clay', 'Red', 'Black'];
  const cropTypes = ['Rice', 'Wheat', 'Cotton', 'Maize', 'Sugarcane', 'Pulses', 'Barley', 'Millets'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full">
              <Droplets className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Fertilizer Recommendation</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized fertilizer recommendations based on your soil nutrients and crop type
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Input Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moisture (%)
                  </label>
                  <input
                    type="number"
                    name="moisture"
                    value={formData.moisture}
                    onChange={handleInputChange}
                    min={0}
                    max={100}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    pH Level
                  </label>
                  <input
                    type="number"
                    name="ph"
                    value={formData.ph}
                    onChange={handleInputChange}
                    min={0}
                    max={14}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nitrogen (kg/ha)
                  </label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phosphorus (kg/ha)
                  </label>
                  <input
                    type="number"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Potassium (kg/ha)
                  </label>
                  <input
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carbon (%)
                  </label>
                  <input
                    type="number"
                    name="carbon"
                    value={formData.carbon}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Type
                  </label>
                  <select
                    name="soil"
                    value={formData.soil}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select Soil Type</option>
                    {soilTypes.map((soil) => (
                      <option key={soil} value={soil}>
                        {soil}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Type
                  </label>
                  <select
                    name="crop"
                    value={formData.crop}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select Crop</option>
                    {cropTypes.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Recommend Fertilizer</span>
                )}
              </button>
            </form>
          </div>

          <div>
            {result ? (
              <div ref={resultRef} className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommendation Result</h2>
                <div className="space-y-6">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={result.imageUrl}
                      alt={result.fertilizer}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Recommended Fertilizer</span>
                      <span className="text-sm font-medium text-blue-600">
                        {result.confidence}% Confidence
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800">{result.fertilizer}</h3>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">{result.description}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  {(() => {
                    if (!result.fertilizer) return null;
                    const recommendedFertilizer = fertilizerData.find(f => f["Fertilizer Name"].toLowerCase() === result.fertilizer.toLowerCase());

                    if (!recommendedFertilizer) {
                      return (
                        <div className="mt-8 text-center text-gray-500">
                          <p>Detailed information for "{result.fertilizer}" is not yet available.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                          <FlaskConical className="h-6 w-6 mr-2 text-blue-600" />
                          Learn More About {recommendedFertilizer["Fertilizer Name"]}
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-700">Reason for Use</h4>
                            <p className="text-gray-600">{recommendedFertilizer["Reason for Use"]}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Advantages</h4>
                            <p className="text-gray-600">{recommendedFertilizer["Advantages"]}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Disadvantages</h4>
                            <p className="text-gray-600">{recommendedFertilizer["Disadvantages"]}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700">Usage Tips</h4>
                            <p className="text-gray-600">{recommendedFertilizer["Usage Tips"]}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  <button
                    onClick={handleExport}
                    className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all flex items-center justify-center space-x-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Export Results</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Droplets className="h-24 w-24 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Enter parameters and click Recommend to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}