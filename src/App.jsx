import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentApp from './StudentApp';
import AdminApp from './AdminApp';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StudentApp />} />
                <Route path="/admin" element={<AdminApp />} />
            </Routes>
        </Router>
    );
}

export default App;
