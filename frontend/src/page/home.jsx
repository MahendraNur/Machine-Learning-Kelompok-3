import './home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="container">
            <div className="bg-animation"></div>
            <nav>
                <div className="nav-content">
                    <div className="logo-wrapper">
                        <span className="logo-icon">🧠</span>
                        <span className="brand">MindCare</span>
                    </div>
                </div>
            </nav>

            <main>
                <div className="hero">
                    <div className="badge pulse-animation">
                        <span className="badge-icon">✨</span>
                        <span>Deteksi Anxiety Real-time</span>
                    </div>

                    <h1>
                        Ketahui Tingkat
                        <span className="gradient-text"> Kecemasan Anda</span>
                    </h1>

                    <p className="description">
                        Platform cerdas untuk mendeteksi dan menganalisis tingkat kecemasan dengan pendekatan berbasis data yang aman, privat, dan terpercaya.
                    </p>

                    <Link to="/prediction" className="cta-button">
                        <span>Mulai Deteksi Sekarang</span>
                        <span className="arrow">→</span>
                    </Link>
                </div>

                <div className="features">
                    <div className="feature-card glass-panel">
                        <div className="feature-icon-wrapper purple-glow">
                            <span className="feature-icon">🔬</span>
                        </div>
                        <h3>Analisis Mendalam</h3>
                        <p>Sistem cerdas kami memahami pola gaya hidup dan metrik kesehatan untuk hasil yang akurat.</p>
                    </div>

                    <div className="feature-card glass-panel">
                        <div className="feature-icon-wrapper pink-glow">
                            <span className="feature-icon">❤️</span>
                        </div>
                        <h3>Pendekatan Empatik</h3>
                        <p>Desain antarmuka yang penuh perhatian, dirancang khusus untuk mendukung kesehatan mental Anda.</p>
                    </div>

                    <div className="feature-card glass-panel">
                        <div className="feature-icon-wrapper indigo-glow">
                            <span className="feature-icon">🛡️</span>
                        </div>
                        <h3>Privasi Terjamin</h3>
                        <p>Data Anda dienkripsi secara lokal dan hanya diproses untuk memberikan hasil analisis.</p>
                    </div>
                </div>

                <div className="stats glass-panel">
                    <div className="stat-item">
                        <div className="stat-number">95%<span className="stat-plus">+</span></div>
                        <div className="stat-label">Akurasi Model</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-number">&lt; 1s</div>
                        <div className="stat-label">Kecepatan Analisis</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Kerahasiaan Data</div>
                    </div>
                </div>

                <div className="support-box glass-panel">
                    <div className="support-icon bounce">🫂</div>
                    <h3>Anda Tidak Pernah Sendirian</h3>
                    <p>
                        Langkah pertama menuju kesehatan mental yang lebih baik adalah dengan memahaminya. Kami di sini untuk membantu Anda memulai perjalanan tersebut.
                    </p>
                </div>
            </main>

            <footer>
                <p>&copy; 2024 MindCare. Dibuat dengan peduli untuk kesehatan mental Anda.</p>
            </footer>
        </div>
    );
}