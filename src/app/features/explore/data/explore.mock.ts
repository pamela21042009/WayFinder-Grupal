export type ExploreFilter = 'all' | 'cases' | 'updates' | 'nearby';

export interface ExploreCase {
  id: string;
  personName: string;
  image: string;
  city: string;
  country: string;
  reported: string;
  description: string;
  publishedDaysAgo: number;
  status: 'En difusión' | 'Actualizado';
  nearby: boolean;
}

export interface ExploreUpdate {
  id: string;
  author: string;
  initials: string;
  published: string;
  caseName: string;
  message: string;
}

export const exploreFilters: { id: ExploreFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'Todos', icon: 'flame-outline' },
  { id: 'cases', label: 'Casos', icon: 'alert-circle-outline' },
  { id: 'updates', label: 'Actualizaciones', icon: 'refresh-outline' },
  { id: 'nearby', label: 'Cerca de ti', icon: 'location-outline' },
];

export const exploreCities = ['Todas las ciudades', 'Santo Domingo', 'Santiago de los Caballeros'];
export const exploreDateRanges = ['Cualquier fecha', 'Últimos 7 días', 'Últimos 30 días'];
export const exploreStatuses = ['Todos los estados', 'En difusión', 'Actualizado'];

// Static data for the explore layout until a cases service is connected.
export const exploreCases: ExploreCase[] = [
  {
    id: 'case-001',
    personName: 'Valeria Rodríguez',
    image: 'assets/images/cases/case-valeria.webp',
    city: 'Santo Domingo',
    country: 'República Dominicana',
    reported: '14 oct. 2026',
    description: 'Vista por última vez en una zona pública de la ciudad. Cualquier información puede ayudar.',
    publishedDaysAgo: 2,
    status: 'En difusión',
    nearby: true,
  },
  {
    id: 'case-002',
    personName: 'Daniel Torres',
    image: 'assets/images/cases/case-daniel.webp',
    city: 'Santiago de los Caballeros',
    country: 'República Dominicana',
    reported: '12 oct. 2026',
    description: 'La publicación reúne información general compartida por la comunidad.',
    publishedDaysAgo: 5,
    status: 'Actualizado',
    nearby: false,
  },
];

export const exploreUpdates: ExploreUpdate[] = [
  {
    id: 'update-001',
    author: 'María López',
    initials: 'ML',
    published: 'Hace 2 h',
    caseName: 'Valeria Rodríguez',
    message: 'Se recibió nueva información sobre el caso. Gracias por compartirla.',
  },
];
