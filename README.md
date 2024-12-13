# Frontend de Consumo de APIs

Este proyecto es una aplicación web que consume APIs, desarrollada con React y Next.js en el frontend, y Laravel en el backend.

## Características Principales

- **Autenticación de Usuarios**: Sistema de login y manejo de sesiones utilizando tokens JWT.
- **Dashboard**: Página principal con información personalizada para el usuario autenticado.
- **Gestión de Usuarios**: Funcionalidades para agregar y editar usuarios.
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
- `/hooks`: Hooks personalizados, como `useAuth` para manejar la autenticación.
- `/pages`: Rutas y páginas de la aplicación, incluyendo el dashboard y formularios de usuario.

## Funcionalidades Destacadas

### Sistema de Autenticación
- Implementa un sistema de login seguro.
- Utiliza tokens JWT para manejar las sesiones de usuario.
- Proporciona un hook personalizado `useAuth` para gestionar el estado de autenticación en toda la aplicación.

### Dashboard
- Muestra información personalizada para el usuario autenticado.
- Incluye enlaces a las principales funcionalidades de la aplicación.

### Gestión de Usuarios
- Permite agregar nuevos usuarios con un formulario interactivo.
- Ofrece la capacidad de editar información de usuarios existentes.
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

**Agregar Usuario**
- ![Agregar Usuario](https://github.com/K451AKM/APIS-consumo2/blob/master/agregarUsuario.jpg)

**Editar Usuario**
- ![Editar Usuario](https://github.com/K451AKM/APIS-consumo2/blob/master/usuarioEditado.jpg)

**Ver Usuario**
- ![Ver Usuario](https://github.com/K451AKM/APIS-consumo2/blob/master/verUsuario.jpg)

**Eliminar Usuario**
- ![Eliminar Usuario](https://github.com/K451AKM/APIS-consumo2/blob/master/eliminarUsuario.jpg)

### Gestión de Pokémones
![Lista de Pokémones](https://github.com/K451AKM/APIS-consumo2/blob/master/pokemones.jpg)

#### Acciones de Pokémones

**Agregar Pokémon**
- ![Agregar Pokémon](https://github.com/K451AKM/APIS-consumo2/blob/master/agregarPokemon.jpg)

**Ver Pokémon**
- ![Ver Pokémon](https://github.com/K451AKM/APIS-consumo2/blob/master/verpokemon.jpg)

**Editar Pokémon**
- ![Editar Pokémon](https://github.com/K451AKM/APIS-consumo2/blob/master/editar%20pokemon.jpg)

**Eliminar Pokémon**
- ![Eliminar Pokémon](https://github.com/K451AKM/APIS-consumo2/blob/master/eliminarpokemon.jpg)

Estas capturas de pantalla proporcionan una vista previa visual de las principales funcionalidades y páginas de nuestra aplicación.

## Instalación y Configuración

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/K451AKM/APIS-consumo2/tree/master

2. **Instala las dependencias:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configura las variables de entorno:**
   - Crea un archivo \`.env.local\` en la raíz del proyecto.
   - Añade las siguientes variables, ajustando los valores según tu configuración:
     \`\`\`
     NEXT_PUBLIC_API_URL=http://tu-backend-laravel.com/api
     \`\`\`

4. **Inicia el servidor de desarrollo:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Accede a la aplicación:**
   Abre tu navegador y visita \`http://localhost:3000\` para ver la aplicación en funcionamiento.

Nota: Asegúrate de que tu backend de Laravel esté configurado y funcionando correctamente antes de iniciar el frontend.

