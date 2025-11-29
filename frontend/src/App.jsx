import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { CropPrediction } from './pages/CropPrediction';
import { FertilizerRecommendation } from './pages/FertilizerRecommendation';
import { DiseaseDetection } from "./pages/DiseasePrediction";
import { Blogs } from './pages/Blogs';

import { Settings } from './pages/Settings';
import { AddBlog } from './pages/addBlog';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route
            path="/crop-prediction"
            element={
              <ProtectedRoute>
                <CropPrediction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fertilizer"
            element={
              <ProtectedRoute>
                <FertilizerRecommendation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disease-detection"
            element={
              <ProtectedRoute>
                <DiseaseDetection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addBlog"
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;