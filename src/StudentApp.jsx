import { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue } from 'firebase/database';
import './App.css';

function StudentApp() {
  // Estado para la navegación
  const [activeTab, setActiveTab] = useState('reto');

  // Estados para el formulario
  const [contexto, setContexto] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [posicionamiento, setPosicionamiento] = useState('');
  const [arquetipo, setArquetipo] = useState('');
  const [arquetipoExpanded, setArquetipoExpanded] = useState(null);
  const [tonos, setTonos] = useState([]);
  const [promesa, setPromesa] = useState('');
  const [publico, setPublico] = useState('');
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [ejeCentral, setEjeCentral] = useState('');
  const [canales, setCanales] = useState([{ servicio: '', objetivo: '', contenido: '' }]);
  const [flujoHolistico, setFlujoHolistico] = useState('');
  const [kpi, setKpi] = useState('');

  // Plot Twist - Suscripción a Firebase
  const [plotTwistActive, setPlotTwistActive] = useState(false);

  // Escuchar cambios en Firebase
  useEffect(() => {
    const plotTwistRef = ref(db, 'plottwist/active');
    const unsubscribe = onValue(plotTwistRef, (snapshot) => {
      const isActive = snapshot.val();
      setPlotTwistActive(isActive || false);

      // Opcional: Vibrar o sonido si se activa
      if (isActive) {
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Cargar datos del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ejercicio-creatividad');
    if (saved) {
      const data = JSON.parse(saved);
      setContexto(data.contexto || '');
      setObjetivo(data.objetivo || '');
      setPosicionamiento(data.posicionamiento || '');
      setArquetipo(data.arquetipo || '');
      setTonos(data.tonos || []);
      setPromesa(data.promesa || '');
      setPublico(data.publico || '');
      setServiciosSeleccionados(data.serviciosSeleccionados || []);
      setEjeCentral(data.ejeCentral || '');
      setCanales(data.canales || [{ servicio: '', objetivo: '', contenido: '' }]);
      setFlujoHolistico(data.flujoHolistico || '');
      setKpi(data.kpi || '');
    }
  }, []);

  // Guardar en localStorage cada vez que cambia algo
  useEffect(() => {
    const data = {
      contexto,
      objetivo,
      posicionamiento,
      arquetipo,
      tonos,
      promesa,
      publico,
      serviciosSeleccionados,
      ejeCentral,
      canales,
      flujoHolistico,
      kpi
    };
    localStorage.setItem('ejercicio-creatividad', JSON.stringify(data));
  }, [contexto, objetivo, posicionamiento, arquetipo, tonos, promesa, publico, serviciosSeleccionados, ejeCentral, canales, flujoHolistico, kpi]);

  // Datos
  const contextos = [
    {
      id: 'apertura',
      titulo: 'Apertura desde cero',
      descripcion: 'Nuevo restaurante, sin clientes previos, ubicación competida'
    },
    {
      id: 'cambio',
      titulo: 'Cambio de concepto',
      descripcion: 'Era un restaurante genérico, ahora se especializa en sushi'
    },
    {
      id: 'expansion',
      titulo: 'Expansión/segunda ubicación',
      descripcion: 'Ya tienen un local con éxito, abren uno nuevo en otra zona'
    }
  ];

  const objetivos = [
    {
      id: 'impacto',
      titulo: 'Impacto rápido',
      descripcion: 'Resultados inmediatos, llenar el restaurante en las primeras semanas, maximizar reservas desde el día 1'
    },
    {
      id: 'crecimiento',
      titulo: 'Crecimiento sostenido',
      descripcion: 'Balance entre visibilidad inicial y construcción de base de clientes recurrentes en 3-6 meses'
    },
    {
      id: 'marca',
      titulo: 'Construcción de marca',
      descripcion: 'Inversión a largo plazo en reputación, comunidad y posicionamiento premium, resultados a 6-12 meses'
    }
  ];

  const posicionamientos = [
    { id: 'elegante', nombre: 'Elegante/Premium', descripcion: 'Experiencia gastronómica exclusiva, atención al detalle, ambiente sofisticado' },
    { id: 'casual', nombre: 'Casual/Cercano', descripcion: 'Sushi para todos los días, accesible, ambiente relajado y amigable' },
    { id: 'experiencial', nombre: 'Experiencial/Innovador', descripcion: 'Show cooking, fusión, propuestas sorprendentes, experimentación' },
    { id: 'tradicional', nombre: 'Tradicional/Auténtico', descripcion: 'Técnica japonesa pura, respeto por la tradición, maestro sushiman certificado' },
    { id: 'sostenible', nombre: 'Sostenible/Consciente', descripcion: 'Producto local y de temporada, pesca responsable, compromiso medioambiental' },
    { id: 'social', nombre: 'Social/Comunitario', descripcion: 'Punto de encuentro, espacio para compartir, eventos y experiencias grupales' },
    { id: 'fusion', nombre: 'Fusion/Cosmopolita', descripcion: 'Mezcla de culturas culinarias, sushi con toques mediterráneos o latinos, apertura internacional' }
  ];

  const arquetipos = [
    {
      id: 'sabio',
      nombre: 'El Sabio',
      caracteristicas: 'Conocimiento, expertise, tradición, maestría técnica',
      mensaje: 'El conocimiento es poder',
      ejemplo: 'Marca que educa sobre la cultura del sushi, muestra el proceso, habla de ingredientes',
      color: '#3b82f6'
    },
    {
      id: 'creador',
      nombre: 'El Creador',
      caracteristicas: 'Innovación, arte culinario, originalidad, expresión',
      mensaje: 'Si puedes imaginarlo, puedes crearlo',
      ejemplo: 'Marca que presenta el sushi como obra de arte, experimenta, crea propuestas únicas',
      color: '#8b5cf6'
    },
    {
      id: 'amante',
      nombre: 'El Amante',
      caracteristicas: 'Placer sensorial, seducción, experiencia, pasión',
      mensaje: 'Solo se vive una vez',
      ejemplo: 'Marca que apela a los sentidos, al romanticismo, a los momentos especiales',
      color: '#ec4899'
    },
    {
      id: 'explorador',
      nombre: 'El Explorador',
      caracteristicas: 'Aventura, atrevimiento, descubrimiento, fusión',
      mensaje: 'No te conformes con lo ordinario',
      ejemplo: 'Marca que invita a salir de la zona de confort, probar nuevas combinaciones',
      color: '#f59e0b'
    },
    {
      id: 'cuidador',
      nombre: 'El Cuidador',
      caracteristicas: 'Bienestar, nutrición, cuidado, protección',
      mensaje: 'Cuida de ti y de lo que te rodea',
      ejemplo: 'Marca enfocada en salud, sostenibilidad, producto responsable',
      color: '#10b981'
    },
    {
      id: 'gobernante',
      nombre: 'El Gobernante',
      caracteristicas: 'Exclusividad, liderazgo, excelencia, estatus',
      mensaje: 'El poder no es para todos',
      ejemplo: 'Marca premium, selecta, con lista de espera, experiencia VIP',
      color: '#6366f1'
    },
    {
      id: 'hombre-comun',
      nombre: 'El Hombre Común',
      caracteristicas: 'Cercanía, honestidad, autenticidad, accesibilidad',
      mensaje: 'Todos somos iguales',
      ejemplo: 'Marca que democratiza el sushi, sin pretensiones, para cualquiera',
      color: '#64748b'
    }
  ];

  const tonosDisponibles = [
    { id: 'sofisticado', nombre: 'Sofisticado', descripcion: 'Lenguaje cuidado, refinado, elegante' },
    { id: 'cercano', nombre: 'Cercano', descripcion: 'Tú a tú, amigable, conversacional' },
    { id: 'divertido', nombre: 'Divertido', descripcion: 'Humor, juegos de palabras, desenfadado' },
    { id: 'educativo', nombre: 'Educativo', descripcion: 'Informativo, didáctico, experto' },
    { id: 'sensorial', nombre: 'Sensorial', descripcion: 'Descriptivo, evocador, que apela a los sentidos' },
    { id: 'inspirador', nombre: 'Inspirador', descripcion: 'Motivacional, aspiracional, emotivo' },
    { id: 'directo', nombre: 'Directo', descripcion: 'Sin rodeos, claro, pragmático' },
    { id: 'provocador', nombre: 'Provocador', descripcion: 'Retador, disruptivo, que cuestiona' },
    { id: 'nostalgico', nombre: 'Nostálgico', descripcion: 'Tradicional, con historia, evocador del pasado' }
  ];

  const publicosEjemplo = [
    {
      nombre: 'Millennials foodies (25-35 años)',
      descripcion: 'Buscan experiencias gastronómicas para compartir en redes, valoran la calidad y la estética'
    },
    {
      nombre: 'Parejas ocasionales (30-45 años)',
      descripcion: 'Buscan planes especiales, cenas románticas, celebraciones, dispuestos a gastar más'
    },
    {
      nombre: 'Profesionales urbanos (28-40 años)',
      descripcion: 'Comidas de trabajo, cenas después de la oficina, valoran rapidez sin sacrificar calidad'
    },
    {
      nombre: 'Familias jóvenes (35-50 años)',
      descripcion: 'Buscan opciones saludables, ambiente tranquilo, menús para compartir'
    },
    {
      nombre: 'Estudiantes universitarios (20-25 años)',
      descripcion: 'Presupuesto ajustado, buscan opciones de menú del día o promos, ambiente informal'
    },
    {
      nombre: 'Turistas y visitantes',
      descripcion: 'Buscan experiencias locales auténticas, referencias online, conveniencia en el centro'
    },
    {
      nombre: 'Comunidad japonesa/asiática local',
      descripcion: 'Valoran autenticidad, técnica correcta, ingredientes tradicionales'
    }
  ];

  const servicios = {
    branding: [
      { id: 'identidad-completa', nombre: 'Identidad visual completa', descripcion: 'logo, paleta, tipografía, aplicaciones', precio: 3500 },
      { id: 'manual-marca', nombre: 'Manual de marca básico', precio: 1200 },
      { id: 'diseno-carta', nombre: 'Diseño de carta/menú', descripcion: 'físico + digital', precio: 800 },
      { id: 'senaletica', nombre: 'Señalética interior', descripcion: 'carteles, vinilos, decoración', precio: 600 },
      { id: 'packaging', nombre: 'Packaging', descripcion: 'cajas, bolsas, servilletas branded', precio: 900 },
      { id: 'foto-producto', nombre: 'Fotografía producto', descripcion: 'platos individuales, 20 fotos', precio: 1200 },
      { id: 'foto-ambiente', nombre: 'Fotografía ambiente', descripcion: 'espacio, equipo, experiencia', precio: 1000 }
    ],
    web: [
      { id: 'web-completa', nombre: 'Web completa con sistema de reservas', precio: 4000 },
      { id: 'landing', nombre: 'Landing page de campaña específica', precio: 1200 },
      { id: 'web-basica', nombre: 'Web básica informativa', descripcion: 'sin reservas online', precio: 2200 },
      { id: 'app', nombre: 'App de reservas y pedidos', precio: 5500 },
      { id: 'fidelizacion', nombre: 'Sistema de fidelización digital', precio: 1800 }
    ],
    marketing: [
      { id: 'paid-media', nombre: 'Estrategia Paid Media', descripcion: 'Meta + Google Ads, gestión 3 meses', precio: 2500 },
      { id: 'inversion-publi', nombre: 'Inversión publicitaria Paid Media', descripcion: 'presupuesto campaña', precio: 2000 },
      { id: 'social-media', nombre: 'Gestión Social Media', descripcion: 'contenido + community, 3 meses', precio: 2200 },
      { id: 'email-marketing', nombre: 'Email Marketing', descripcion: 'setup + automatizaciones + 3 meses', precio: 1200 },
      { id: 'seo-local', nombre: 'SEO local + Google My Business', precio: 1500 },
      { id: 'influencers', nombre: 'Estrategia de influencers locales', descripcion: 'selección + coordinación', precio: 1000 },
      { id: 'contenidos', nombre: 'Marketing de contenidos', descripcion: 'blog + recetas + storytelling', precio: 1400 }
    ],
    audiovisual: [
      { id: 'spot', nombre: 'Spot publicitario 30"', descripcion: 'concepto + producción + postpro', precio: 3800 },
      { id: 'video-corporativo', nombre: 'Video corporativo 2-3min', descripcion: 'historia, equipo, proceso', precio: 2500 },
      { id: 'reels-15', nombre: 'Pack 15 reels/stories', descripcion: 'contenido dinámico para RRSS', precio: 1800 },
      { id: 'reels-8', nombre: 'Pack 8 reels/stories básico', precio: 1000 },
      { id: 'foto-premium', nombre: 'Sesión fotográfica producto premium', descripcion: '40 fotos editadas', precio: 1800 },
      { id: 'cobertura-evento', nombre: 'Cobertura evento inauguración', descripcion: 'foto + video', precio: 1200 }
    ],
    experiencia: [
      { id: 'evento-inauguracion', nombre: 'Evento de inauguración', descripcion: 'coordinación + prensa + invitados', precio: 2500 },
      { id: 'foodbloggers', nombre: 'Colaboración con foodbloggers', descripcion: 'degustaciones + contenido', precio: 800 },
      { id: 'popup', nombre: 'Experiencia de marca pop-up', descripcion: 'stand en mercado/evento', precio: 1500 },
      { id: 'embajadores', nombre: 'Programa de embajadores/comunidad', descripcion: 'estrategia 3 meses', precio: 1000 }
    ],
    tradicional: [
      { id: 'flyers', nombre: 'Flyers + buzoneo zona', descripcion: 'diseño + 5.000 uds + distribución', precio: 800 },
      { id: 'prensa', nombre: 'Publicidad en prensa local', descripcion: '3 inserciones', precio: 1200 },
      { id: 'valla', nombre: 'Valla publicitaria', descripcion: '1 mes en ubicación estratégica', precio: 2000 },
      { id: 'mupi', nombre: 'Mupi cercanos', descripcion: '2 ubicaciones x 1 mes', precio: 1400 }
    ]
  };

  // Funciones
  const toggleServicio = (categoria, servicio) => {
    const existe = serviciosSeleccionados.find(s => s.id === servicio.id);
    if (existe) {
      setServiciosSeleccionados(serviciosSeleccionados.filter(s => s.id !== servicio.id));
    } else {
      setServiciosSeleccionados([...serviciosSeleccionados, { ...servicio, categoria }]);
    }
  };

  const toggleTono = (tonoId) => {
    if (tonos.includes(tonoId)) {
      setTonos(tonos.filter(t => t !== tonoId));
    } else if (tonos.length < 2) {
      setTonos([...tonos, tonoId]);
    } else {
      alert('Solo puedes elegir 2 tonos');
    }
  };

  const agregarCanal = () => {
    setCanales([...canales, { servicio: '', objetivo: '', contenido: '' }]);
  };

  const actualizarCanal = (index, campo, valor) => {
    const nuevosCanales = [...canales];
    nuevosCanales[index][campo] = valor;
    setCanales(nuevosCanales);
  };

  const eliminarCanal = (index) => {
    setCanales(canales.filter((_, i) => i !== index));
  };

  const calcularProgreso = () => {
    let completados = 0;
    let total = 8;

    if (contexto) completados++;
    if (objetivo) completados++;
    if (posicionamiento) completados++;
    if (arquetipo) completados++;
    if (tonos.length === 2) completados++;
    if (promesa) completados++;
    if (publico) completados++;
    if (serviciosSeleccionados.length > 0) completados++;

    return Math.round((completados / total) * 100);
  };

  const totalGastado = serviciosSeleccionados.reduce((sum, item) => sum + item.precio, 0);
  const presupuestoFinal = plotTwistActive ? 11000 : 16000;
  const presupuestoRestante = presupuestoFinal - totalGastado;
  const progreso = calcularProgreso();

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>EJERCICIO: <span>CAMPAÑA EXPRÉS</span></h1>
        <p>Entrenando la creatividad a través de límites estratégicos</p>
      </div>

      {/* Plot Twist Banner */}
      {plotTwistActive && (
        <div className="plottwist-banner">
          <div className="plottwist-icon">🚨</div>
          <h2>PLOT TWIST</h2>
          <p>El presupuesto se ha reducido a <strong>11.000€</strong></p>
          <p className="plottwist-subtitle">Adapta tu estrategia ahora</p>
        </div>
      )}

      {/* Barra de progreso */}
      <div className="progress-bar-container">
        <div className="progress-info">
          <span className="progress-label">Progreso: {progreso}%</span>
          <span className="progress-budget">
            Presupuesto: <strong>{presupuestoRestante.toLocaleString()}€</strong> de {presupuestoFinal.toLocaleString()}€
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progreso}%` }}></div>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav">
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'reto' ? 'active' : ''}`}
            onClick={() => setActiveTab('reto')}
          >
            🎯 El Reto
          </button>
          <button
            className={`nav-tab ${activeTab === 'estrategia' ? 'active' : ''}`}
            onClick={() => setActiveTab('estrategia')}
          >
            🎨 Estrategia
          </button>
          <button
            className={`nav-tab ${activeTab === 'presupuesto' ? 'active' : ''}`}
            onClick={() => setActiveTab('presupuesto')}
          >
            💰 Presupuesto
          </button>
          <button
            className={`nav-tab ${activeTab === 'activacion' ? 'active' : ''}`}
            onClick={() => setActiveTab('activacion')}
          >
            🚀 Activación
          </button>
          <button
            className={`nav-tab ${activeTab === 'resumen' ? 'active' : ''}`}
            onClick={() => setActiveTab('resumen')}
          >
            📊 Mi Propuesta
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container">

        {/* TAB 1: EL RETO */}
        {activeTab === 'reto' && (
          <div className="section active">
            <div className="intro-box">
              <h2>¿Por qué hacemos esto?</h2>
              <p><strong>La creatividad no es algo que se relacione exclusivamente con el arte.</strong> Para mí, es la herramienta que nos impulsa a los humanos a buscar soluciones. En la ciencia hay mucha creatividad, y en la tecnología también.</p>
              <p>Pero <strong>la creatividad necesita límites</strong>, porque sin ellos todo es ilimitado y perdemos foco. Hoy vamos a hacer un ejercicio para entrenar nuestra creatividad eligiendo nosotros mismos los límites que queremos añadirle.</p>
              <p>A través de restricciones de presupuesto, tiempo y objetivos, veremos cómo la creatividad se potencia cuando tiene un marco claro donde desenvolverse.</p>
            </div>

            <div className="briefing-box">
              <h2>📋 Briefing del Cliente</h2>
              <div className="briefing-item">
                <h3>Negocio: Restaurante de Sushi en Valencia</h3>
              </div>

              <div className="briefing-item">
                <strong>Recursos:</strong>
                <ul>
                  <li>Presupuesto: <strong>{presupuestoFinal.toLocaleString()}€</strong></li>
                  <li>Plazo: Campaña de lanzamiento (3 meses)</li>
                  <li>Equipo: Los servicios de ESES Agency a tu disposición</li>
                </ul>
              </div>
            </div>

            <h3 className="section-title">Contexto del negocio (elige UNO)</h3>
            <div className="cards-grid">
              {contextos.map(ctx => (
                <div
                  key={ctx.id}
                  className={`option-card ${contexto === ctx.id ? 'selected' : ''}`}
                  onClick={() => setContexto(ctx.id)}
                >
                  <div className="option-number">{contexto === ctx.id && '✓'}</div>
                  <h4>{ctx.titulo}</h4>
                  <p>{ctx.descripcion}</p>
                </div>
              ))}
            </div>

            <h3 className="section-title">Objetivo estratégico (elige UNO)</h3>
            <div className="cards-grid">
              {objetivos.map(obj => (
                <div
                  key={obj.id}
                  className={`option-card ${objetivo === obj.id ? 'selected' : ''}`}
                  onClick={() => setObjetivo(obj.id)}
                >
                  <div className="option-number">{objetivo === obj.id && '✓'}</div>
                  <h4>{obj.titulo}</h4>
                  <p>{obj.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ESTRATEGIA */}
        {activeTab === 'estrategia' && (
          <div className="section active">
            <h3 className="section-title">Posicionamiento de Marca (elige UNO)</h3>
            <div className="cards-grid-small">
              {posicionamientos.map(pos => (
                <div
                  key={pos.id}
                  className={`option-card-small ${posicionamiento === pos.id ? 'selected' : ''}`}
                  onClick={() => setPosicionamiento(pos.id)}
                >
                  <div className="check-icon">{posicionamiento === pos.id && '✓'}</div>
                  <h4>{pos.nombre}</h4>
                  <p>{pos.descripcion}</p>
                </div>
              ))}
            </div>

            <h3 className="section-title">Arquetipo de Marca (elige UNO)</h3>
            <div className="arquetipos-grid">
              {arquetipos.map(arq => (
                <div
                  key={arq.id}
                  className={`arquetipo-card ${arquetipo === arq.id ? 'selected' : ''}`}
                  style={{ borderLeftColor: arq.color }}
                  onClick={() => {
                    setArquetipo(arq.id);
                    setArquetipoExpanded(arquetipoExpanded === arq.id ? null : arq.id);
                  }}
                >
                  <div className="arquetipo-header">
                    <h4>{arq.nombre}</h4>
                    <div className="check-icon">{arquetipo === arq.id && '✓'}</div>
                  </div>
                  <p className="arquetipo-mensaje">"{arq.mensaje}"</p>
                  {arquetipoExpanded === arq.id && (
                    <div className="arquetipo-expanded">
                      <p><strong>Características:</strong> {arq.caracteristicas}</p>
                      <p><strong>Ejemplo:</strong> {arq.ejemplo}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3 className="section-title">Tono de Comunicación (elige DOS)</h3>
            <div className="tonos-grid">
              {tonosDisponibles.map(tono => (
                <div
                  key={tono.id}
                  className={`tono-card ${tonos.includes(tono.id) ? 'selected' : ''}`}
                  onClick={() => toggleTono(tono.id)}
                >
                  <div className="check-icon">{tonos.includes(tono.id) && '✓'}</div>
                  <h4>{tono.nombre}</h4>
                  <p>{tono.descripcion}</p>
                </div>
              ))}
            </div>
            <p className="helper-text">{tonos.length}/2 tonos seleccionados</p>

            <h3 className="section-title">Promesa de Marca</h3>
            <div className="form-group">
              <p className="helper-text">Escribe UNA frase que resuma la promesa única de este restaurante.</p>
              <textarea
                value={promesa}
                onChange={(e) => setPromesa(e.target.value)}
                placeholder="Ejemplo: 'Cada pieza cuenta una historia' o 'Sushi honesto, sabor auténtico'"
                rows="3"
              ></textarea>
            </div>

            <h3 className="section-title">Público Objetivo</h3>
            <div className="publico-ejemplos">
              <p className="helper-text">Inspírate en estos perfiles:</p>
              <div className="publico-grid">
                {publicosEjemplo.map((pub, idx) => (
                  <div key={idx} className="publico-card">
                    <h4>{pub.nombre}</h4>
                    <p>{pub.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <textarea
                value={publico}
                onChange={(e) => setPublico(e.target.value)}
                placeholder="Define tu público objetivo (1-2 perfiles principales)..."
                rows="4"
              ></textarea>
            </div>
          </div>
        )}

        {/* TAB 3: PRESUPUESTO */}
        {activeTab === 'presupuesto' && (
          <div className="section active">
            <div className="presupuesto-header">
              <h2>Presupuesto Total: {presupuestoFinal.toLocaleString()}€</h2>
              <div className="presupuesto-contador">
                <div className="contador-item">
                  <span className="contador-label">Gastado</span>
                  <span className="contador-value gastado">{totalGastado.toLocaleString()}€</span>
                </div>
                <div className="contador-item">
                  <span className="contador-label">Restante</span>
                  <span className={`contador-value ${presupuestoRestante < 0 ? 'negativo' : presupuestoRestante < 500 ? 'warning' : 'disponible'}`}>
                    {presupuestoRestante.toLocaleString()}€
                  </span>
                </div>
              </div>
              <div className="presupuesto-barra">
                <div
                  className="presupuesto-fill"
                  style={{
                    width: `${Math.min((totalGastado / presupuestoFinal) * 100, 100)}%`,
                    backgroundColor: presupuestoRestante < 0 ? '#ef4444' : presupuestoRestante < 500 ? '#f59e0b' : '#10b981'
                  }}
                ></div>
              </div>
            </div>

            {Object.entries(servicios).map(([categoria, items]) => (
              <div key={categoria} className="servicios-categoria">
                <h3 className="categoria-titulo">
                  {categoria === 'branding' && '🎨 Branding & Diseño'}
                  {categoria === 'web' && '💻 Desarrollo Web & Digital'}
                  {categoria === 'marketing' && '📱 Marketing Digital'}
                  {categoria === 'audiovisual' && '🎥 Contenido Audiovisual'}
                  {categoria === 'experiencia' && '✨ Experiencia & Activaciones'}
                  {categoria === 'tradicional' && '📰 Tradicional & OOH'}
                </h3>
                <div className="servicios-grid">
                  {items.map(servicio => {
                    const seleccionado = serviciosSeleccionados.find(s => s.id === servicio.id);
                    return (
                      <div
                        key={servicio.id}
                        className={`servicio-card ${seleccionado ? 'selected' : ''}`}
                        onClick={() => toggleServicio(categoria, servicio)}
                      >
                        <div className="servicio-check">
                          <input
                            type="checkbox"
                            checked={!!seleccionado}
                            readOnly
                          />
                        </div>
                        <div className="servicio-info">
                          <h4>{servicio.nombre}</h4>
                          {servicio.descripcion && <p>{servicio.descripcion}</p>}
                        </div>
                        <div className="servicio-precio">
                          {servicio.precio.toLocaleString()}€
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: ACTIVACIÓN */}
        {activeTab === 'activacion' && (
          <div className="section active">
            <h3 className="section-title">Eje Central de Campaña</h3>
            <div className="form-group">
              <p className="helper-text">¿Qué va a ser el "corazón" de tu campaña? ¿Qué elemento conectará todo?</p>
              <textarea
                value={ejeCentral}
                onChange={(e) => setEjeCentral(e.target.value)}
                placeholder="Ejemplo: 'Un spot emocional que se amplifica en redes' o 'Una serie de contenido educativo sobre la cultura del sushi'"
                rows="3"
              ></textarea>
            </div>

            <h3 className="section-title">Estrategia por Canal</h3>
            <p className="helper-text">Para cada servicio que hayas elegido, define su estrategia:</p>

            {canales.map((canal, index) => (
              <div key={index} className="canal-form">
                <div className="canal-header">
                  <h4>Canal #{index + 1}</h4>
                  {canales.length > 1 && (
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarCanal(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Servicio</label>
                    <input
                      type="text"
                      value={canal.servicio}
                      onChange={(e) => actualizarCanal(index, 'servicio', e.target.value)}
                      placeholder="Ej: Gestión Social Media"
                    />
                  </div>
                  <div className="form-group">
                    <label>Objetivo específico</label>
                    <input
                      type="text"
                      value={canal.objetivo}
                      onChange={(e) => actualizarCanal(index, 'objetivo', e.target.value)}
                      placeholder="Ej: Generar comunidad y engagement"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Tipo de contenido/acción</label>
                  <textarea
                    value={canal.contenido}
                    onChange={(e) => actualizarCanal(index, 'contenido', e.target.value)}
                    placeholder="Describe qué tipo de contenido o acciones realizarás..."
                    rows="2"
                  ></textarea>
                </div>
              </div>
            ))}

            <button className="btn-agregar" onClick={agregarCanal}>
              + Agregar otro canal
            </button>

            <h3 className="section-title">Pensamiento Holístico</h3>
            <div className="form-group">
              <p className="helper-text">¿Cómo se conectan todos tus canales? Describe el recorrido del usuario o cómo se potencian entre sí.</p>
              <textarea
                value={flujoHolistico}
                onChange={(e) => setFlujoHolistico(e.target.value)}
                placeholder="Ejemplo: 'Spot en Instagram Ads → Tráfico a Landing con reserva → Email de bienvenida → Remarketing en Meta → Contenido en Social Media para crear comunidad'"
                rows="4"
              ></textarea>
            </div>

            <h3 className="section-title">KPI Principal</h3>
            <div className="form-group">
              <p className="helper-text">¿Cómo medirías el éxito de esta campaña?</p>
              <input
                type="text"
                value={kpi}
                onChange={(e) => setKpi(e.target.value)}
                placeholder="Ejemplo: 'Nº de reservas en el primer mes' o 'Tasa de ocupación del restaurante'"
              />
            </div>
          </div>
        )}

        {/* TAB 5: RESUMEN */}
        {activeTab === 'resumen' && (
          <div className="section active">
            <div className="resumen-container">
              <h2>📊 Tu Propuesta Completa</h2>

              <div className="resumen-seccion">
                <h3>🎯 El Reto</h3>
                <div className="resumen-item">
                  <strong>Contexto:</strong> {contextos.find(c => c.id === contexto)?.titulo || 'No seleccionado'}
                </div>
                <div className="resumen-item">
                  <strong>Objetivo:</strong> {objetivos.find(o => o.id === objetivo)?.titulo || 'No seleccionado'}
                </div>
              </div>

              <div className="resumen-seccion">
                <h3>🎨 Estrategia de Marca</h3>
                <div className="resumen-item">
                  <strong>Posicionamiento:</strong> {posicionamientos.find(p => p.id === posicionamiento)?.nombre || 'No seleccionado'}
                </div>
                <div className="resumen-item">
                  <strong>Arquetipo:</strong> {arquetipos.find(a => a.id === arquetipo)?.nombre || 'No seleccionado'}
                </div>
                <div className="resumen-item">
                  <strong>Tonos:</strong> {tonos.map(t => tonosDisponibles.find(td => td.id === t)?.nombre).join(', ') || 'No seleccionados'}
                </div>
                <div className="resumen-item">
                  <strong>Promesa:</strong> {promesa || 'No definida'}
                </div>
                <div className="resumen-item">
                  <strong>Público:</strong> {publico || 'No definido'}
                </div>
              </div>

              <div className="resumen-seccion">
                <h3>💰 Distribución de Presupuesto</h3>
                <div className="resumen-presupuesto">
                  <div className="presupuesto-total-box">
                    <span>Total Gastado:</span>
                    <strong className={presupuestoRestante < 0 ? 'negativo' : ''}>{totalGastado.toLocaleString()}€</strong>
                  </div>
                  <div className="presupuesto-total-box">
                    <span>Presupuesto Disponible:</span>
                    <strong>{presupuestoFinal.toLocaleString()}€</strong>
                  </div>
                  <div className="presupuesto-total-box">
                    <span>Restante:</span>
                    <strong className={presupuestoRestante < 0 ? 'negativo' : presupuestoRestante < 500 ? 'warning' : 'disponible'}>
                      {presupuestoRestante.toLocaleString()}€
                    </strong>
                  </div>
                </div>

                {serviciosSeleccionados.length > 0 ? (
                  <div className="servicios-seleccionados">
                    {serviciosSeleccionados.map(servicio => (
                      <div key={servicio.id} className="servicio-resumen">
                        <span>{servicio.nombre}</span>
                        <strong>{servicio.precio.toLocaleString()}€</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No has seleccionado servicios</p>
                )}
              </div>

              <div className="resumen-seccion">
                <h3>🚀 Estrategia de Activación</h3>
                <div className="resumen-item">
                  <strong>Eje Central:</strong> {ejeCentral || 'No definido'}
                </div>
                {canales.filter(c => c.servicio).length > 0 && (
                  <div className="canales-resumen">
                    <strong>Canales:</strong>
                    {canales.filter(c => c.servicio).map((canal, idx) => (
                      <div key={idx} className="canal-resumen">
                        <div><strong>{canal.servicio}</strong></div>
                        <div>Objetivo: {canal.objetivo}</div>
                        <div>Acción: {canal.contenido}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="resumen-item">
                  <strong>Flujo Holístico:</strong> {flujoHolistico || 'No definido'}
                </div>
                <div className="resumen-item">
                  <strong>KPI:</strong> {kpi || 'No definido'}
                </div>
              </div>

              <div className="resumen-acciones">
                <button
                  className="btn-primary"
                  onClick={() => window.print()}
                >
                  📄 Imprimir Propuesta
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    if (window.confirm('¿Estás seguro? Esto borrará toda tu propuesta.')) {
                      localStorage.removeItem('ejercicio-creatividad');
                      window.location.reload();
                    }
                  }}
                >
                  🔄 Reiniciar Ejercicio
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentApp;
