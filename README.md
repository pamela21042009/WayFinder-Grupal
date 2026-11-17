# WayFinder

Aplicación creada con Ionic y Angular. El proyecto utiliza Angular Standalone y Capacitor para facilitar la futura ejecución en Android e iOS.

## ¿Qué es WayFinder?

WayFinder es una red social para difundir casos de personas desaparecidas y un espacio privado para que el equipo de cada caso organice la información recibida. Durante el desarrollo, utiliza únicamente casos ficticios o autorizados; no publiques desapariciones reales sin autorización.

Consulta [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) para conocer el propósito, los usuarios, las funciones, los límites y las reglas de privacidad del producto. Las personas que trabajen con asistentes de código también deben leer [AGENTS.md](AGENTS.md).

Para revisar los cinco ajustes recomendados a las pantallas y su orden de implementación, consulta [WayFinder_Ajustes_Boceto.pdf](docs/WayFinder_Ajustes_Boceto.pdf).

## Requisitos

- Node.js `24.16.0` (Angular 22 requiere Node.js `24.15.0` o posterior en la rama 24).
- npm `11.13.0` (incluido con Node.js).
- Git, para clonar el repositorio y compartir cambios.
- Visual Studio Code, recomendado como editor.

Estas son las versiones comunes del equipo. Node.js está indicado en `.nvmrc` y Node.js/npm están declarados en `package.json`; `.npmrc` hace que npm rechace otras versiones. Compruébalas antes de instalar:

```bash
node --version
npm --version
```

La salida esperada es `v24.16.0` y `11.13.0`. Si npm muestra otra versión, instala la fijada para el equipo:

```bash
npm install -g npm@11.13.0
```

## Versiones del proyecto

| Herramienta o paquete | Versión |
| --- | --- |
| Node.js | `24.16.0` |
| npm | `11.13.0` |
| Angular (`@angular/core`) | `22.2.4` |
| Angular CLI (`@angular/cli`) | `22.2.5` |
| Ionic Framework (`@ionic/angular`) | `9.0.10` |
| Capacitor (`@capacitor/core` y CLI) | `8.6.0` |
| Ionic CLI (`@ionic/cli`, global) | `7.2.1` |
| TypeScript | `6.0.x` |

Las dependencias de la aplicación se instalan desde `package-lock.json`. Angular CLI ya está incluido localmente; no instales Angular CLI globalmente.

## Dependencias adicionales e integraciones

En esta sección registramos las bibliotecas agregadas para integraciones, para que todo el equipo sepa qué instalar y por qué.

| Paquete | Uso | Estado | Instalación |
| --- | --- | --- | --- |
| `@fontsource/poppins` | Tipografía Poppins empaquetada localmente para la interfaz. | Instalado y registrado en `package.json` y `package-lock.json`. | `npm install @fontsource/poppins` |

Cuando el paquete se agregue al proyecto, `npm install` actualizará `package.json` y `package-lock.json`. Después, cada integrante puede ejecutar `npm ci` desde la raíz para instalar las versiones registradas. No hace falta ejecutar el comando de instalación individual si el paquete ya aparece en esos archivos.

La conexión con el backend y la autenticación están pendientes de rediseño. Por ahora, la aplicación no tiene integración de autenticación ni persistencia remota. El modelo conceptual de datos se conserva en [docs/MODELO_DATOS_Y_PERMISOS.md](docs/MODELO_DATOS_Y_PERMISOS.md) y deberá revisarse al definir la nueva arquitectura.

## Instalación

### Preparar las herramientas

Instala Node.js `24.16.0`. En Windows, puedes usar NVM para Windows:

```bash
nvm install 24.16.0
nvm use 24.16.0
```

Fija también npm en `11.13.0` y comprueba las versiones:

```bash
npm install -g npm@11.13.0
node --version
npm --version
```

La salida debe ser `v24.16.0` y `11.13.0`. Instala la versión de Ionic CLI usada por el equipo:

```bash
npm install -g @ionic/cli@7.2.1
```

### Obtener el proyecto

La primera vez, clona el repositorio y entra en su carpeta raíz:

```bash
git clone <URL_DEL_REPOSITORIO>
cd WayFinder-Grupal
```

Si ya tienes una copia local, actualízala desde la rama compartida antes de trabajar:

```bash
git pull origin main
```

Instala las dependencias exactas del proyecto desde `package-lock.json`:

```bash
npm ci
```

## Desarrollo en el navegador

Desde la raíz del repositorio, inicia la aplicación con Ionic CLI:

```bash
ionic serve
```

El servidor de desarrollo abre la aplicación en el navegador y actualiza la vista al guardar cambios. Para detenerlo, vuelve a la terminal y pulsa `Ctrl+C`.

## Compilación

Para compilar la aplicación:

```bash
npm run build
```

## Estructura inicial

- `src/app/`: componentes y rutas principales de Angular.
- `src/app/home/`: pantalla inicial de la plantilla.
- `e2e/`: pruebas de extremo a extremo con Playwright.
- `capacitor.config.ts`: configuración para empaquetar la aplicación como app nativa.
- `package.json` y `package-lock.json`: dependencias y versiones del proyecto.

## Notas para el equipo

- Ejecuta los comandos desde la raíz del repositorio.
- Conserva `package-lock.json` en Git y usa `npm ci` para instalaciones reproducibles.
- Si agregas o actualizas dependencias, ejecuta `npm install` y sube juntos `package.json` y `package-lock.json`.
- No subas `node_modules` ni `.angular`: son carpetas locales generadas automáticamente. `npm ci` vuelve a crear `node_modules`; Angular genera su caché `.angular` al ejecutar la app. Ambas están excluidas por `.gitignore`.
- Antes de empezar a trabajar, actualiza tu copia con `git pull`; después comparte los cambios mediante commits y `git push`.
- La preparación actual está orientada al navegador. Android Studio y el SDK se configurarán cuando se comience a probar la app en Android.

## Mensajes de commit

Usa el formato `tipo: descripción breve` para que el equipo identifique fácilmente el propósito de cada commit. Los tipos se escriben normalmente en inglés y la descripción puede estar en español.

| Tipo | Cuándo usarlo |
| --- | --- |
| `feat` | Agrega una funcionalidad. |
| `fix` | Corrige un error. |
| `docs` | Cambia documentación, como este README. |
| `chore` | Tareas de mantenimiento o configuración. |
| `refactor` | Reorganiza código sin cambiar su comportamiento. |
| `style` | Cambios de formato que no alteran la lógica. |
| `test` | Agrega o modifica pruebas. |
| `build` | Cambia dependencias o el proceso de compilación. |
| `ci` | Cambia automatizaciones de integración continua. |

Ejemplos:

```text
feat: agrega inicio de sesión
fix: corrige la validación del formulario
docs: documenta la instalación del proyecto
chore: configura versiones de Node y npm
```
