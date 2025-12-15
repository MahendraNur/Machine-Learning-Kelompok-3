import './home.css';

export default function Home() {
    return (
        <div className="container">
            <nav>
                <div className="nav-content">
                    <span className="logo">🧠</span>
                    <span className="brand">MindCare</span>
                </div>
            </nav>

            <main>
                <div className="hero">
                    <div className="badge">
                        <span>✨</span>
                        <span>Deteksi Anxiety Real-time</span>
                    </div>

                    <h1>
                        Deteksi Tingkat
                        <span className="gradient-text">Anxiety Anda</span>
                    </h1>

                    <p className="description">
                        Platform cerdas untuk mendeteksi dan menganalisis tingkat kecemasan dengan pendekatan yang aman dan terpercaya
                    </p>

                    <a href="/prediction" className="cta-button">
                        <span>Mulai Deteksi</span>
                        <span className="arrow">→</span>
                    </a>
                </div>

                <div className="features">
                    <div className="feature-card">
                        <div className="feature-icon icon-purple">🧠</div>
                        <h3>Analisis Mendalam</h3>
                        <p>Sistem analisis berbasis AI untuk memahami pola kecemasan Anda secara komprehensif</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon icon-pink">❤️</div>
                        <h3>Pendekatan Empatik</h3>
                        <p>Desain dengan pendekatan yang penuh perhatian dan mendukung kesehatan mental Anda</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon icon-indigo">🛡️</div>
                        <h3>Privasi Terjamin</h3>
                        <p>Data Anda tersimpan dengan aman dan hanya dapat diakses oleh Anda</p>
                    </div>
                </div>

                <div className="stats">
                    <div>
                        <div className="stat-number">95%+</div>
                        <div className="stat-label">Akurasi</div>
                    </div>
                    <div>
                        <div className="stat-number">Cepat</div>
                        <div className="stat-label">Hasil Instan</div>
                    </div>
                    <div>
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Confidential</div>
                    </div>
                </div>

                <div className="support-box">
                    <div className="support-icon">❤️</div>
                    <h3>Anda Tidak Sendirian</h3>
                    <p>
                        Kesehatan mental adalah prioritas. Platform ini dirancang untuk membantu Anda memahami dan mengelola kecemasan dengan lebih baik.
                    </p>
                </div>
            </main>

            <footer>
                <p>&copy; 2024 MindCare. Peduli Kesehatan Mental Anda</p>
            </footer>
        </div>
    );
}