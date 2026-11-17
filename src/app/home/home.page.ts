import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonToast } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  add,
  calendarOutline,
  chatbubbleOutline,
  compassOutline,
  ellipsisHorizontal,
  globeOutline,
  heart,
  heartOutline,
  home,
  informationCircle,
  locationOutline,
  mailOutline,
  megaphoneOutline,
  notificationsOutline,
  personOutline,
  searchOutline,
  shareSocialOutline,
} from 'ionicons/icons';

addIcons({
  add,
  calendarOutline,
  chatbubbleOutline,
  compassOutline,
  ellipsisHorizontal,
  globeOutline,
  heart,
  heartOutline,
  home,
  informationCircle,
  locationOutline,
  mailOutline,
  megaphoneOutline,
  notificationsOutline,
  personOutline,
  searchOutline,
  shareSocialOutline,
});

type FeedTab = 'for-you' | 'following' | 'recent';

interface FeedPost {
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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [FormsModule, IonContent, IonIcon, IonToast, RouterLink],
})
export class HomePage {
  activeTab: FeedTab = 'for-you';
  searchTerm = '';
  toastOpen = false;
  toastMessage = '';

  readonly tabs: { id: FeedTab; label: string }[] = [
    { id: 'for-you', label: 'Para ti' },
    { id: 'following', label: 'Siguiendo' },
    { id: 'recent', label: 'Recientes' },
  ];

  // Static sample content for the UI until the feed service is connected.
  readonly posts: FeedPost[] = [
    {
      id: 'case-001',
      author: 'María Fernández',
      authorInitials: 'MF',
      published: 'Hace 2 h',
      subject: 'Valeria Rodríguez',
      image: 'assets/feed/case-valeria.webp',
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
      image: 'assets/feed/case-daniel.webp',
      city: 'Santiago de los Caballeros',
      reported: '12 oct. 2026',
      description: 'Fue visto con una sudadera gris. Consulta y comparte únicamente la información pública del caso.',
      likes: 1100,
      comments: 178,
      following: false,
      liked: false,
    },
  ];

  get visiblePosts(): FeedPost[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    return this.posts.filter((post) => {
      const matchesTab = this.activeTab !== 'following' || post.following;
      const searchable = `${post.author} ${post.subject} ${post.city} ${post.description}`.toLocaleLowerCase();
      return matchesTab && (!query || searchable.includes(query));
    });
  }

  selectTab(tab: FeedTab): void {
    this.activeTab = tab;
  }

  toggleLike(post: FeedPost): void {
    post.liked = !post.liked;
  }

  async sharePost(post: FeedPost): Promise<void> {
    const shareText = `WayFinder · ${post.subject} · ${post.city}.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'WayFinder', text: shareText, url: window.location.href });
        return;
      }
      await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      this.showToast('Enlace copiado.');
    } catch {
      this.showToast('No se pudo compartir desde este dispositivo.');
    }
  }

  showToast(message: string): void {
    this.toastMessage = message;
    this.toastOpen = true;
  }

  formatCount(count: number, liked = false): string {
    const total = count + (liked ? 1 : 0);
    return total >= 1000 ? `${(total / 1000).toFixed(total % 1000 === 0 ? 0 : 1)}K` : `${total}`;
  }
}
