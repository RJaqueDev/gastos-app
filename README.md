# Gastos App

Aplicación móvil para el registro y control de gastos personales, desarrollada con **React Native** y **Expo**, utilizando **Firebase Firestore** como base de datos.

## Características

- Registro de gastos con monto, descripción y opción de cuotizado.
- Visualización del saldo total gastado.
- Listado de los últimos gastos en una tabla.
- Interfaz moderna usando [react-native-paper](https://callstack.github.io/react-native-paper/).
- Almacenamiento seguro en la nube con Firebase.

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/gastos-app.git
   cd gastos-app
   ```

2. **Instala las dependencias:**
   ```bash
   yarn install
   # o
   npm install
   ```

3. **Configura las variables de entorno:**
   - Copia el archivo `.env.example` a `.env` y completa tus credenciales de Firebase.

4. **Inicia la app:**
   ```bash
   expo start
   ```

## Configuración de Firebase

Debes crear un proyecto en [Firebase](https://firebase.google.com/) y obtener las credenciales de tu app web.  
Agrega estos datos en el archivo `.env`:

```env
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_DATABASE_URL=tu_database_url
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
FIREBASE_APP_ID=tu_app_id
FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

## Scripts útiles

- `expo start` — Inicia el servidor de desarrollo.
- `expo start --android` — Ejecuta en un emulador/dispositivo Android.
- `expo start --ios` — Ejecuta en un emulador/dispositivo iOS.

## Estructura del proyecto

```
/components         # Componentes reutilizables (Saldo, Fab, Transaction, LastTransactions)
\screens            # Pantallas principales (HomeScreen)
\api                # Funciones para interactuar con Firebase
\config             # Configuración de Firebase y otros servicios
```

## Licencia

MIT

---

Desarrollado por [tu nombre o usuario].