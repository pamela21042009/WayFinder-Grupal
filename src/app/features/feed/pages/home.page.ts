import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonToast } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { notificationsOutline, searchOutline } from 'ionicons/icons';
import { feedPosts, type FeedPost } from '../data/feed-posts.mock';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { PostCardComponent } from '../components/post-card/post-card.component';

addIcons({ notificationsOutline, searchOutline });

type FeedTab = 'for-you' | 'following' | 'recent';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [BottomNavigationComponent, FormsModule, IonContent, IonIcon, IonToast, PostCardComponent, RouterLink],
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
  readonly posts: FeedPost[] = feedPosts.map((post) => ({ ...post }));

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
}
