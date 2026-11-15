# Contexto de trabajo para asistentes de código

Antes de implementar o modificar funcionalidades, lee [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md). Ese documento resume el propósito del producto y las reglas que deben respetar los cambios.

## Reglas del producto

- WayFinder combina una red social pública de casos con un expediente privado por caso para organizar reportes y colaborar.
- La V1 es un prototipo académico y se usa exclusivamente con casos ficticios o autorizados. Los casos de prueba deben identificarse como tales.
- Nunca presentes un reporte, coincidencia o análisis como verificado o como evidencia. Los resultados automáticos son sugerencias para revisión humana; nunca deben animar a acudir a un lugar o confrontar a alguien.
- Mantén separados los datos públicos, privados y sensibles. Las ubicaciones de pistas, los contactos de informantes, las fotos privadas y los datos de nacimiento no deben filtrarse a vistas, búsquedas, enlaces ni notificaciones públicas.
- La interfaz no es la barrera de seguridad: los accesos a datos deben estar protegidos en el servidor con RLS y políticas de mínimo privilegio.
- Los menores no crean cuentas en la V1. Los casos de menores tienen una publicación pública limitada.
- No incluyas claves `sb_secret_`, `service_role` ni otras credenciales privadas en código cliente o archivos destinados al navegador. La clave publishable sí se puede usar en el cliente junto con RLS correctamente configurado.
- Respeta los roles globales y por expediente descritos en el overview. No concedas permisos por confiar en datos enviados por el cliente.

## Tecnología prevista

La aplicación usa Ionic, Angular, TypeScript y Capacitor. Supabase es el backend previsto para autenticación, PostgreSQL con RLS, almacenamiento, Realtime y funciones seguras. Leaflet/OpenStreetMap se plantea para mapas y Cloudflare Turnstile para protección anti-bots. Revisa el estado real del repositorio antes de asumir que una integración o función ya está implementada.
