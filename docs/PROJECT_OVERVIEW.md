# WayFinder: contexto del producto

## Propósito

WayFinder es una red social para difundir casos de personas desaparecidas y organizar colaborativamente la información relacionada con cada caso. Resuelve dos problemas: las publicaciones en redes generales mezclan datos útiles con rumores y duplicados; además, las familias y responsables necesitan un lugar privado donde recibir, ordenar y revisar pistas sin exponer información sensible.

WayFinder no verifica la identidad de las personas, no confirma que una desaparición sea real, no sustituye a las autoridades ni a una investigación oficial. Un reporte, una coincidencia o una contradicción detectada por reglas nunca equivale a evidencia confirmada.

## Dos espacios conectados

### Difusión pública

- Feed de casos públicos con secciones «Para ti», «Siguiendo» y «Recientes».
- Exploración y búsqueda de casos y perfiles con filtros por país, ciudad, fechas y estado público.
- Publicaciones, actualizaciones, perfiles, comentarios, reacciones, seguimiento y enlaces compartibles.
- Los datos visibles se limitan a los campos clasificados como públicos.

### Expediente privado

Cada caso tiene un expediente separado de su publicación pública. El expediente organiza los datos completos del caso, reportes o pistas, estados, eventos cronológicos, historial y colaboración. Los reportes no se publican en comentarios ni en el feed. Sus ubicaciones, fotos y datos de contacto se muestran solo a los roles autorizados.

El análisis automático compara reportes del mismo expediente para sugerir posibles coincidencias, duplicados, contradicciones o información incompleta. No modifica, fusiona ni elimina reportes y siempre requiere revisión humana.

## Usuarios y permisos

- **Visitantes:** sin cuenta; pueden consultar contenido público, buscar, compartir enlaces, enviar información y solicitar retiradas o protección.
- **Usuarios registrados:** adultos con correo verificado; pueden crear casos, interactuar, seguir, mensajear y denunciar.
- **Responsable del caso:** administra el expediente y es el único rol que ve los datos de contacto de los informantes.
- **Editor del caso:** colabora con permisos limitados; puede revisar y clasificar reportes, añadir observaciones y preparar actualizaciones, pero no administrar colaboradores ni publicar en lugar del Responsable.
- **Moderador:** atiende denuncias y solicitudes y accede únicamente al contenido necesario para cada revisión.
- **Administrador:** además de las funciones de moderación, gestiona los roles globales.

Los roles de Responsable y Editor pertenecen a un expediente concreto; una persona puede tener roles distintos en casos distintos. Los roles de Moderador y Administrador son globales y nunca se obtienen al registrarse.

En la V1 no hay cuentas para menores de 18 años. Pueden consultar contenido público como visitantes. Las publicaciones de casos de menores muestran solo campos públicos limitados.

## Seguridad y privacidad

- Clasificar cada dato como público, privado o sensible y exponer solo lo necesario.
- Aplicar Row Level Security (RLS) a todas las tablas expuestas y políticas de Storage; ocultar un botón en la interfaz no sustituye los permisos del backend.
- Mantener privados los expedientes, reportes, mensajes, ubicaciones exactas de pistas, datos de contacto de informantes y fotos de reportes.
- Eliminar metadatos EXIF/GPS de las imágenes antes de subirlas y guardar archivos de reportes en almacenamiento privado.
- Permitir reportes de visitantes mediante una función segura con protección anti-bots y límites de frecuencia.
- Registrar cambios y decisiones relevantes en un historial que no pueda editarse desde los roles de usuario.
- No mostrar ubicación actual cuando un caso se marque como «Persona localizada».

## Límites de la primera versión

- **Uso exclusivamente académico:** solo casos ficticios o autorizados; no publicar desapariciones reales.
- Aplicación web adaptable (PWA) y aplicación Android con un mismo código Ionic/Capacitor.
- iOS, escritorio, notificaciones push y pagos quedan fuera de la entrega descrita.
- La propuesta prioriza herramientas gratuitas o de código abierto.
- Los mapas se plantean con Leaflet y OpenStreetMap; no se requiere geocodificación en tiempo real.
- La autenticación planteada es correo y contraseña con verificación de correo; no se contemplan proveedores sociales para la V1.

## Arquitectura prevista

- **Cliente:** Ionic, Angular Standalone, TypeScript y Capacitor.
- **Backend:** Supabase Auth, PostgreSQL, RLS, Storage, Realtime y Edge Functions.
- **Mapas:** Leaflet y OpenStreetMap.
- **Anti-bots:** Cloudflare Turnstile para formularios públicos.
- **Correo de Auth:** SMTP personalizado.

Esta arquitectura es el objetivo del producto; verifica el código actual antes de afirmar que una función ya está implementada. Este overview comunica el propósito y las reglas principales del producto para que el equipo pueda trabajar sin depender de la propuesta original.
