import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Films from './pages/Films';
import Home from './pages/Home';
import Navbar from '../src/components/Navbar';
import Details from './pages/Details';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/films" element={<Films />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </>
  );
};

export default App;
