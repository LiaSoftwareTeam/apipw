# Librería API con Node.js y TursoDB

Este proyecto es una API REST construida con Node.js, Express y la base de datos TursoDB.

## Requisitos

- Node.js instalado
- Dependencias instaladas con `npm install`

## Instalación

```bash
npm install express cors @libsql/client
```

## Uso

1. Configura la URL y el token de TursoDB en `index.js`.
2. Ejecuta el servidor:

```bash
node index.js
```

3. La API estará disponible en `http://localhost:3000` con los siguientes endpoints:

- `GET /libros` - Lista de libros
- `GET /autores` - Lista de autores
- `POST /contacto` - Guardar contacto (JSON con nombre, email, mensaje)

## Notas

- CORS está habilitado para permitir acceso desde cualquier origen.
- Asegúrate de que la base de datos TursoDB esté accesible y configurada correctamente.