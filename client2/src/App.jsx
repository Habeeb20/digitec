




// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';  // ← Import this
import { useEffect } from 'react';
import Auth from './pages/Auth';
import { useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import Home from './pages/Home';
import ProductsPage from './pages/MarketPlace';
import About from './pages/About';
// Layout Component
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const Layout2 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
   
    </div>
  );
};


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        {/* Toaster must be inside Router but outside Routes so it's always present */}
        <Toaster
          position="top-center"     // or "top-right", "bottom-center", etc.
          richColors                // Beautiful colors (success green, error red)
          closeButton               // Optional: adds X button
          toastOptions={{
            duration: 5000,
            style: {
              fontSize: '14px',
            },
          }}
        />
<ScrollToTop />
        <Routes>
      
  
            <Route path="/" element={<Home />} />
            
  
            <Route path="/about" element={<About />} />
            
            <Route path='/market' element={<ProductsPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
        

 


          {/* 404 */}
          <Route path="*" element={
            <Layout>
              <div className="flex items-center justify-center min-h-screen text-gray-600 text-xl">
                404 - Page Not Found
              </div>
            </Layout>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;