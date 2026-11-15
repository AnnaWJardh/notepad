import { Link, Route, Routes } from 'react-router-dom'
import NotesPage from './pages/NotesPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

export default function App() {
    return (
        <div className="app">
            <header>
                <strong>Notepad app</strong>
                <nav>
                    <Link to="/">Anteckningar</Link>
                    <Link to="/about">Om</Link>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<NotesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </main>
        </div>
    )
}
