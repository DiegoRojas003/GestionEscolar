Gestión Escolar - Prueba Técnica Full Stack
Este proyecto es una solución integral para la gestión de alumnos, materias y notas, desarrollada bajo los requerimientos de la evaluación técnica para Desarrollador Full Stack Junior. La solución utiliza un Backend robusto en Spring Boot 3.5.4 y un Frontend dinámico en React.

Modelos: Entidades Alumno, Materia y Nota con sus respectivas relaciones (One-to-Many / Many-to-One).

Base de Datos: MySQL desplegada obligatoriamente mediante contenedores Docker.

Frontend: Aplicación en React con gestión completa de formularios y consumo de API.

Despliegue: Orquestación total mediante Docker Compose para facilitar la revisión.

Variables de Entorno
El sistema utiliza las siguientes variables para la interconexión de servicios, las cuales están integradas en el archivo de orquestación:

Backend:

DB_URI: jdbc:mysql://db:3306/gestion_escolar 

DB_USER: root 

DB_PASSWORD: root 

DB_DRIVER: com.mysql.cj.jdbc.Driver 

Frontend:

VITE_API_URL: http://localhost:8080 

Instrucciones de Ejecución
Para poner en marcha la aplicación completa (Base de datos, API y Frontend), ejecute los siguientes comandos en su terminal (Máximo 10 comandos requeridos):

Clonar el repositorio: git clone <url-de-tu-repositorio-de-github>

Acceder a la carpeta raíz: cd PRUEBA-TECNICA-DIEGO-ROJAS

Compilar el Backend (Maven): cd backend && ./mvnw clean package -DskipTests && cd ..

Desplegar servicios con Docker: docker compose up --build

Nota: El Frontend estará disponible en http://localhost:5173 y la API en http://localhost:8080.

Datos de Prueba
Siguiendo los lineamientos de la prueba, se incluye un respaldo de la base de datos en la ruta backend/sql/datos_prueba.sql. Este archivo se restaura automáticamente en el contenedor de MySQL durante el primer despliegue para permitir una validación inmediata de los requerimientos funcionales.