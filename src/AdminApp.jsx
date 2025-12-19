import { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, set, onValue } from 'firebase/database';
import './App.css'; // Reusamos estilos base

function AdminApp() {
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const plotTwistRef = ref(db, 'plottwist/active');
        const unsubscribe = onValue(plotTwistRef, (snapshot) => {
            setActive(snapshot.val() || false);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const togglePlotTwist = () => {
        set(ref(db, 'plottwist/active'), !active);
    };

    const resetGame = () => {
        if (confirm('¿Estás seguro? Esto desactivará el plot twist para todos.')) {
            set(ref(db, 'plottwist/active'), false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="header" style={{ borderRadius: '12px', marginBottom: '2rem' }}>
                <h2>🎮 Panel de Control</h2>
                <p>Ejercicio Creatividad: Campaña Exprés</p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Estado del Plot Twist</h3>

                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <>
                        <div style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            background: active ? '#fee2e2' : '#dcfce7',
                            color: active ? '#991b1b' : '#166534',
                            fontWeight: 'bold',
                            marginBottom: '2rem',
                            fontSize: '1.25rem'
                        }}>
                            {active ? '🚨 ACTIVADO (Presupuesto 11.000€)' : '✅ INACTIVO (Presupuesto 16.000€)'}
                        </div>

                        <button
                            onClick={togglePlotTwist}
                            style={{
                                width: '100%',
                                padding: '1.5rem',
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                background: active ? '#4b5563' : '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            {active ? 'DESACTIVAR' : '🚨 ACTIVAR PLOT TWIST'}
                        </button>
                    </>
                )}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <a href="/" style={{ color: '#6b7280', textDecoration: 'underline' }}>Ir a la vista del alumno</a>
            </div>
        </div>
    );
}

export default AdminApp;
