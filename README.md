# Frontend de Consumo de APIs

Este proyecto es una aplicación web que consume APIs, desarrollada con React y Next.js en el frontend, y Laravel en el backend.

## Características Principales

- **Autenticación de Usuarios**: Sistema de login y manejo de sesiones utilizando tokens JWT [^4].
- **Dashboard**: Página principal con información personalizada para el usuario autenticado [^5].
- **Gestión de Usuarios**: Funcionalidades para agregar [^6] y editar [^8] usuarios.
- **Diseño Responsivo**: Interfaz adaptable a diferentes dispositivos y tamaños de pantalla.

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Next.js**: Framework de React que permite renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG).
- **Tailwind CSS**: Framework de CSS utilizado para el diseño y estilizado de la aplicación.

### Backend
- **Laravel**: Framework de PHP utilizado para desarrollar la API RESTful.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- `/app`: Contiene los componentes principales de la aplicación Next.js.
- `/components`: Componentes reutilizables de React.
- `/hooks`: Hooks personalizados, como \`useAuth\` para manejar la autenticación .
- `/pages`: Rutas y páginas de la aplicación, incluyendo el dashboard y formularios de usuario .

## Funcionalidades Destacadas

### Sistema de Autenticación
- Implementa un sistema de login seguro.
- Utiliza tokens JWT para manejar las sesiones de usuario.
- Proporciona un hook personalizado \`useAuth\` para gestionar el estado de autenticación en toda la aplicación.

### Dashboard
- Muestra información personalizada para el usuario autenticado.
- Incluye enlaces a las principales funcionalidades de la aplicación .

### Gestión de Usuarios
- Permite agregar nuevos usuarios con un formulario interactivo.
- Ofrece la capacidad de editar información de usuarios existentes .
- Implementa validación de formularios y manejo de errores.

## Capturas de Pantalla

### Página de Inicio
![Página de Inicio](https://github.com/K451AKM/APIS-consumo2/blob/master/pagina%20inicio.jpg)

### Página de Login
![Página de Login](https://github.com/K451AKM/APIS-consumo2/blob/master/login.jpg)

### Dashboard
![Dashboard](https://github.com/K451AKM/APIS-consumo2/blob/master/ds.jpg)

### Gestión de Usuarios
![Lista de Usuarios](https://github.com/K451AKM/APIS-consumo2/blob/master/usersC.jpg)

#### Acciones de Usuario
- ![Agregar Usuario](https://github.com/K451AKM/APIS-consumo2/blob/master/agregarUsuario.jpg)
- ![Editar Usuario](https://raw.githubusercontent.com/tu-usuario/tu-repo/main/screenshots/editar-usuario.png)
- ![Ver Usuario](https://raw.githubusercontent.com/tu-usuario/tu-repo/main/screenshots/ver-usuario.png)
- ![Eliminar Usuario](https://github.com/K451AKM/APIS-consumo2/blob/master/eliminarUsuario.jpg)

### Gestión de Pokémones
![Lista de Pokémones](https://github.com/K451AKM/APIS-consumo2/blob/master/pokemones.jpg)

#### Acciones de Pokémones
- ![Agregar Pokémon](https://github.com/K451AKM/APIS-consumo2/blob/master/agregarPokemon.jpg)
- ![Ver Pokémon](https://github.com/K451AKM/APIS-consumo2/blob/master/verpokemon.jpg)
- ![Editar Pokémon](https://github.com/K451AKM/APIS-consumo2/blob/master/editar%20pokemon.jpg)
- ![Eliminar Pokémon](https://github.com/K451AKM/APIS-consumo2/blob/master/eliminarpokemon.jpg)

Estas capturas de pantalla proporcionan una vista previa visual de las principales funcionalidades y páginas de nuestra aplicación.

## Instalación y Configuración

1. Clona el repositorio:
   \`\`\`
   git clone [URL del repositorio]
   \`\`\`

2. Instala las dependencias:
   \`\`\`
   npm install
   \`\`\`

3. Configura las variables de entorno:
   - Crea un archivo \`.env.local\` en la raíz del proyecto.
   - Añade las variables necesarias, como la URL de la API de Laravel.

4. Inicia el servidor de desarrollo:
   \`\`\`
   npm run dev
   \`\`\`

5. Abre \`http://localhost:3000\` en tu navegador para ver la aplicación.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o realiza un pull request para sugerir cambios o mejoras.

## Licencia

[Incluir información sobre la licencia del proyecto]

