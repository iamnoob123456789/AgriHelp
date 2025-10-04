import { useState } from 'react';
import { Bug, Upload, Loader2, X } from 'lucide-react';

export function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
    }
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    setResult(null);

    try {
      // This would be your actual API call
      // const prediction = await detectDisease(selectedFile);
      // setResult(prediction);
      
      // Mock response for demonstration
      setTimeout(() => {
        setResult({
          disease: "Leaf Rust",
          confidence: 92,
          remedies: [
            "Apply copper-based fungicide every 7-10 days",
            "Remove and destroy infected leaves",
            "Ensure proper air circulation around plants",
            "Avoid overhead watering to reduce moisture on leaves"
          ]
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Detection failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-orange-400 to-red-600 rounded-full">
              <Bug className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Disease Detection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload a leaf image to detect diseases and receive treatment recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Leaf Image</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                {!previewUrl ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-12 w-12 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {selectedFile && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Selected file:</span> {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Size:</span>{' '}
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !selectedFile}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Detecting...</span>
                  </>
                ) : (
                  <span>Detect Disease</span>
                )}
              </button>
            </form>
          </div>

          <div>
            {result ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Detection Result</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Detected Disease</span>
                      <span className="text-sm font-medium text-orange-600">
                        {result.confidence}% Confidence
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800">{result.disease}</h3>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Recommended Remedies:</h4>
                    <ul className="space-y-2">
                      {result.remedies.map((remedy, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 bg-orange-50 border border-orange-200 rounded-lg p-3"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{remedy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {result.disease === 'Healthy' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-semibold">
                        Great news! Your plant appears to be healthy. Keep up the good care!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Bug className="h-24 w-24 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Upload an image and click Detect to see results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}