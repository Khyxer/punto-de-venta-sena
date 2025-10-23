# 📚 Sistema punto de venta SENA

## Desarrollado por NOVA348

Como ejecutar el proyecto en local:

## 📋 Requisitos Previos

Antes de comenzar, necesitas tener instalado lo siguiente en tu computadora:

### 1. **Node.js y npm**

- Descarga e instala Node.js desde: https://nodejs.org/
- Recomendado: versión LTS (Long Term Support)
- npm viene incluido con Node.js
- Para verificar que se instaló correctamente, abre una terminal y ejecuta:
  ```bash
  node --version
  npm --version
  ```

### 2. **pnpm**

- Después de instalar Node.js, instala pnpm globalmente ejecutando:
  ```bash
  npm install -g pnpm
  ```
- Verifica la instalación:
  ```bash
  pnpm --version
  ```

### 3. **MongoDB**

- Descarga MongoDB Community Server desde: https://www.mongodb.com/try/download/community
- **En Windows:**
  - Ejecuta el instalador y sigue las instrucciones
  - Asegúrate de marcar la opción "Install MongoDB as a Service"
- **En Mac:**
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  ```
- **En Linux (Ubuntu/Debian):**
  ```bash
  sudo apt-get install mongodb
  ```

### 4. **Git**

- Descarga e instala Git desde: https://git-scm.com/downloads
- Verifica la instalación:
  ```bash
  git --version
  ```

---

## 🚀 Pasos para Ejecutar el Proyecto

### Paso 1: Clonar el Repositorio

Abre una terminal en la carpeta donde quieres guardar el proyecto y ejecuta:

```bash
git clone https://github.com/Khyxer/punto-de-venta-sena.git
cd punto-de-venta-sena
```

---

### Paso 2: Configurar el Frontend

1. Navega a la carpeta del frontend:

   ```bash
   cd frontend
   ```

   (O el nombre de la carpeta donde está el código de React)

2. Instala las dependencias con pnpm:

   ```bash
   pnpm install
   ```

3. Una vez terminada la instalación, puedes iniciar el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

4. Deberías ver un mensaje indicando que el servidor está corriendo, generalmente en `http://localhost:5173`

> **⚠️ Importante:** Deja esta terminal abierta mientras trabajas en el proyecto.

---

### Paso 3: Configurar el Backend

1. Abre una **nueva terminal** (deja la anterior corriendo)

2. Navega a la carpeta del backend:

   ```bash
   cd backend
   ```

   (O el nombre de la carpeta donde está el código del servidor)

3. Instala las dependencias con npm:

   ```bash
   npm install
   ```

4. Una vez terminada la instalación, inicia el servidor backend:

   ```bash
   npm run dev
   ```

5. Deberías ver un error relacionado con la base de datos pero no pasa nada, ya que aun no la hemos iniciado

> **⚠️ Importante:** Deja esta terminal abierta mientras trabajas en el proyecto.

---

### Paso 4: Iniciar MongoDB

1. Abre **otra terminal nueva** (ahora tendrás 3 terminales abiertas)

2. Inicia MongoDB con el comando:

   ```bash
   mongod
   ```

3. Si MongoDB se inicia correctamente, verás varios mensajes en la terminal y uno que dice "waiting for connections"

> **💡 Nota:** En algunos sistemas, MongoDB puede iniciarse automáticamente como servicio. Si el comando `mongod` da error diciendo que ya está corriendo, significa que está activo y puedes continuar.

**Solución de problemas comunes con MongoDB:**

- **Error: "Data directory not found"**

  ```bash
  # Crea la carpeta de datos manualmente
  sudo mkdir -p /data/db
  sudo chown -R `id -un` /data/db
  ```

- **Error: "Address already in use"**
  - MongoDB ya está corriendo, puedes continuar sin problema

---

## ✅ Verificación

Si todo está configurado correctamente, deberías tener:

- ✅ **Terminal 1:** Frontend corriendo con `pnpm dev` (puerto 5173)
- ✅ **Terminal 2:** Backend corriendo con `npm run dev` (puerto 3000 o similar)
- ✅ **Terminal 3:** MongoDB corriendo con `mongod`

Ahora puedes abrir tu navegador y acceder a:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## 🛑 Detener los Servicios

Cuando termines de trabajar:

1. En cada terminal, presiona `Ctrl + C` para detener los servicios
2. Para MongoDB, después de `Ctrl + C`, espera a que se cierre correctamente

---

## 📝 Variables de Entorno

Para configurar las variables de entorno debes tomar de ejemplo el archivo `.env.example` copiar su contenido y crear un archivo `.env` al mismo nivel que el archivo `.env.example` y pegar el contenido copiado reemplazando los valores por los valores de tu entorno (si es que son diferentes):

---

## ❓ Problemas Comunes

### "command not found: pnpm"

- No instalaste pnpm globalmente. Ejecuta: `npm install -g pnpm`

### "Cannot connect to MongoDB"

- MongoDB no está corriendo. Abre una terminal y ejecuta: `mongod`

### "Port already in use"

- Ya tienes otro proceso usando ese puerto. Cierra otras aplicaciones o cambia el puerto en la configuración

### Los cambios no se reflejan en el navegador

- Guarda el archivo que modificaste
- Verifica que el servidor esté corriendo sin errores en la terminal

---

## 📚 Recursos Útiles

- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de MongoDB](https://www.mongodb.com/docs/)
- [Documentación de pnpm](https://pnpm.io/)
