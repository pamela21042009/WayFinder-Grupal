export interface FeedPost {
  id: string;
  author: string;
  authorInitials: string;
  published: string;
  subject: string;
  image: string;
  city: string;
  reported: string;
  description: string;
  likes: number;
  comments: number;
  following: boolean;
  liked: boolean;
  update?: string;
}

// Static data for the feed layout until a feed service is connected.
export const feedPosts: FeedPost[] = [
  {
    id: 'case-001',
    author: 'María Fernández',
    authorInitials: 'MF',
    published: 'Hace 2 h',
    subject: 'Valeria Rodríguez',
    image: 'assets/images/cases/case-valeria.webp',
    city: 'Santo Domingo',
    reported: '14 oct. 2026',
    description: 'Vestía una sudadera oscura y jeans. Cualquier información pública y responsable puede ayudar.',
    likes: 2300,
    comments: 324,
    following: true,
    liked: false,
    update: 'Se agregó información pública para mantener al día los detalles compartidos por la comunidad.',
  },
  {
    id: 'case-002',
    author: 'Carlos M. Pérez',
    authorInitials: 'CP',
    published: 'Hace 3 h',
    subject: 'Daniel Torres',
    image: 'assets/images/cases/case-daniel.webp',
    city: 'Santiago de los Caballeros',
    reported: '12 oct. 2026',
    description: 'Fue visto con una sudadera gris. Consulta y comparte únicamente la información pública del caso.',
    likes: 1100,
    comments: 178,
    following: false,
    liked: false,
  },
];
