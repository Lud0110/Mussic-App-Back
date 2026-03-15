# Music App Backend

Api rest desarrollada con Node.js y Express

# Tecnologias

Node.js
Express.js
MySQL-MariaDB
JWT para autenticacion
bcryptjs para encriptacion

# Requisitos

Node.js
MySQL o XAMPP

# Instalaciones y ejecucion

Clonar el repositorio: https://github.com/Lud0110/Mussic-App-Back
Entrar a la carpeta: Music-App-Back
Instalar dependencias: npm install
Crear el archivo .env:
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=musicapp
    JWT_SECRET=musicapp_secret_key_2026
Crear la base de datos en MySQL: Abrir MySQL Workbench o phpMyAdmin, ejecutar el archivo database.sql
Correr el proyecto: npm run dev
La api esta disponible en: http://localhost:5000

# Endpoints

# Auth

POST /api/auth/register
POST /api/auth/login
Registro de usuario
Login de usuario

# Canciones

GET    /api/songs         
    Obtener todas las canciones
GET    /api/songs/:id     
    Obtener canción por ID
POST   /api/songs         
    Crear canción (admin)
PUT    /api/songs/:id     
    Actualizar canción (admin)
DELETE /api/songs/:id     
    Eliminar canción (admin)

# Artistas

GET    /api/artists       
    Obtener todos los artistas
GET    /api/artists/:id   
    Obtener artista por ID
POST   /api/artists       
    Crear artista (admin)
PUT    /api/artists/:id   
    Actualizar artista (admin)
DELETE /api/artists/:id   
    Eliminar artista (admin)

# Base de datos

3 Tablas: users, artistas, songs
Relacion: songs.artists_id -> artists.id (fk)

# Seguridad 

Contraseñas incriptadas con bcrypts
Autenticacion con JWT
Rutas protegidas con middleware
Validacion de datos en controllers