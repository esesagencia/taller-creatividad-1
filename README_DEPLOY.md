# Guía de Despliegue y Configuración

## 1. Configuración de Firebase (Obligatorio para el Plot Twist)

Para que el "Plot Twist" funcione remotamente (que puedas activarlo desde tu móvil y se actualice en las pantallas de todos), necesitas un proyecto de Firebase gratuito.

1. Ve a [console.firebase.google.com](https://console.firebase.google.com/) y crea un nuevo proyecto (ej: `taller-creatividad`).
2. En el menú lateral, ve a **Build** > **Realtime Database**.
3. Haz clic en **Create Database**. Elige la ubicación (bélgica o usa la que sea) y selecciona **Start in Test Mode** (esto permitirá leer/escribir sin autenticación compleja durante 30 días, perfecto para el taller).
4. Ve a la configuración del proyecto (icono de engranaje > Project Settings).
5. Baja hasta **Your apps** y selecciona el icono de web (`</>`).
6. Ponle un nombre y registrarla.
7. Copia las claves que aparecen en `const firebaseConfig = { ... }`.

## 2. Despliegue en Vercel

1. Sube este código a un repositorio de GitHub (o usa Vercel CLI).
2. Importa el proyecto en Vercel.
3. En la configuración del proyecto en Vercel, ve a **Environment Variables**.
4. Añade las siguientes variables con los valores que copiaste de Firebase:

```
VITE_FIREBASE_API_KEY=AIzaSyCoENPZIAOl6bXafc0cTLvHDDt26CjfNhA
VITE_FIREBASE_AUTH_DOMAIN=taller-creatividad-2db72.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://taller-creatividad-2db72-default-rtdb.europe-west1.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=taller-creatividad-2db72
VITE_FIREBASE_STORAGE_BUCKET=taller-creatividad-2db72.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=616041636744
VITE_FIREBASE_APP_ID=1:616041636744:web:4b42760929dc63a666903d
```

## 3. Uso durante el Taller

### Vista del Alumno

Comparte la URL principal con tu equipo: `https://tu-proyecto.vercel.app/`

### Vista del Profesor (Panel de Control)

Entra tú desde tu móvil a: `https://tu-proyecto.vercel.app/admin`

Desde ahí podrás ver si el Plot Twist está activo y pulsar el botón para activarlo/desactivarlo. Todos los alumnos verán el banner de alerta instantáneamente.
