import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { CropPrediction } from './pages/CropPrediction';
import { FertilizerRecommendation } from './pages/FertilizerRecommendation';
import { DiseaseDetection } from './pages/DiseasePrediction';
import { Blogs } from './pages/Blogs';
import { AdminDashboard } from './pages/AdminDashboard';
import { Settings } from './pages/Settings';
import { AddBlog } from './pages/addBlog';
import { AdminLogin } from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/blogs" element={<Blogs />} />
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
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
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
              path="/add-blog"
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
    </Router>
  );
}

export default App;
