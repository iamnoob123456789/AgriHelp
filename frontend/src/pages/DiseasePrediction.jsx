import { useState, useRef } from 'react';
import { Bug, Upload, Loader2, X, ShieldCheck, Siren, HeartPulse, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { predictDisease } from '../services/api';
import diseaseData from '../../../backend/notebooks/plant_leaf_diseases.json';

export function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

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
      const prediction = await predictDisease(selectedFile);
      const diseaseInfo = diseaseData.find(
        (d) => d.disease_name.toLowerCase() === prediction.disease.toLowerCase()
      );
      setResult({ ...prediction, details: diseaseInfo });
      setLoading(false);
    } catch (error) {
      console.error('Detection failed:', error);
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('disease-detection-result.pdf');
      });
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
              <div ref={resultRef} className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Detection Result</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Detected Disease</span>
                      <span className="text-lg font-bold text-orange-600">
                        {result.disease.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-2.5 rounded-full"
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      Confidence: {result.confidence.toFixed(2)}%
                    </div>
                  </div>

                  {result.details ? (
                    <div className="space-y-4">
                      {result.details.causes && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                            <Siren className="h-5 w-5 mr-2" /> Causes
                          </h3>
                          <p className="text-red-700">{result.details.causes}</p>
                        </div>
                      )}
                      {result.details.remedy && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                            <HeartPulse className="h-5 w-5 mr-2" /> Remedy
                          </h3>
                          <p className="text-blue-700">{result.details.remedy}</p>
                        </div>
                      )}
                      {result.details.prevention && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                            <ShieldCheck className="h-5 w-5 mr-2" /> Prevention
                          </h3>
                          <p className="text-green-700">{result.details.prevention}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      <p>Detailed information for "{result.disease}" is not yet available.</p>
                    </div>
                  )}
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