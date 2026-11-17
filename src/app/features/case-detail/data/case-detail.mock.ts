export interface PublicCaseDetail {
  id: string;
  personName: string;
  age: number;
  status: string;
  city: string;
  area: string;
  reported: string;
  lastSeenDescription: string;
  clothingDescription: string;
  publisher: string;
  publisherInitials: string;
  published: string;
  photos: string[];
  update?: string;
  likes: number;
  comments: number;
}

// Public fields only; private case records, exact locations and informant contacts stay out of this view.
export const publicCaseDetails: PublicCaseDetail[] = [
  {
    id: 'case-001',
    personName: 'Valeria Rodríguez',
    age: 16,
    status: 'Búsqueda activa',
    city: 'Santo Domingo',
    area: 'zona norte',
    reported: '14 oct. 2026',
    lastSeenDescription: 'Vista por última vez en la zona norte. Cualquier información pública y responsable puede ayudar.',
    clothingDescription: 'Sudadera oscura, jeans azules y tenis blancos.',
    publisher: 'María Fernández',
    publisherInitials: 'MF',
    published: 'Hace 2 h',
    photos: [
      'assets/images/cases/case-valeria.webp',
      'assets/images/cases/case-valeria.webp',
      'assets/images/cases/case-valeria.webp',
    ],
    update: 'Se agregó información pública para mantener al día los detalles compartidos por la comunidad.',
    likes: 2300,
    comments: 324,
  },
  {
    id: 'case-002',
    personName: 'Daniel Torres',
    age: 18,
    status: 'Búsqueda activa',
    city: 'Santiago de los Caballeros',
    area: 'referencia general',
    reported: '12 oct. 2026',
    lastSeenDescription: 'Fue visto por última vez en una zona pública de la ciudad. Cualquier información pública y responsable puede ayudar.',
    clothingDescription: 'Sudadera gris.',
    publisher: 'Carlos M. Pérez',
    publisherInitials: 'CP',
    published: 'Hace 3 h',
    photos: [
      'assets/images/cases/case-daniel.webp',
      'assets/images/cases/case-daniel.webp',
      'assets/images/cases/case-daniel.webp',
    ],
    likes: 1100,
    comments: 178,
  },
];
