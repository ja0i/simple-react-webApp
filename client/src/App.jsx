import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Post from './components/Post.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </Router>
  );
}
