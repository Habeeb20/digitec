import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Biography from './components/Biography';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <div className="bg-stone-950 text-white min-h-screen">
      <Navbar />
      <Home />
      <AboutUs />
      <Biography />
      <ContactUs />
    </div>
  );
}

export default App;