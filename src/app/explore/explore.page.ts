import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonToast } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  add,
  alertCircleOutline,
  arrowForward,
  calendarOutline,
  compass,
  ellipsisHorizontal,
  flameOutline,
  globeOutline,
  home,
  locationOutline,
  mailOutline,
  mapOutline,
  megaphoneOutline,
  notificationsOutline,
  optionsOutline,
  personOutline,
  peopleOutline,
  refreshOutline,
  searchOutline,
  shareSocialOutline,
  starOutline,
  trendingUpOutline,
} from 'ionicons/icons';

addIcons({
  add,
  alertCircleOutline,
  arrowForward,
  calendarOutline,
  compass,
  ellipsisHorizontal,
  flameOutline,
  globeOutline,
  home,
  locationOutline,
  mailOutline,
  mapOutline,
  megaphoneOutline,
  notificationsOutline,
  optionsOutline,
  personOutline,
  peopleOutline,
  refreshOutline,
  searchOutline,
  shareSocialOutline,
  starOutline,
  trendingUpOutline,
});

type ExploreFilter = 'all' | 'cases' | 'updates' | 'nearby';

interface ExploreCase {
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

interface ExploreUpdate {
  id: string;
  author: string;
  initials: string;
  published: string;
  caseName: string;
  message: string;
}

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  imports: [FormsModule, IonContent, IonIcon, IonToast, RouterLink],
})
export class ExplorePage {
  searchTerm = '';
  activeFilter: ExploreFilter = 'all';
  showFilters = false;
  mapExpanded = false;
  selectedCity = 'Todas las ciudades';
  selectedDate = 'Cualquier fecha';
  selectedStatus = 'Todos los estados';
  toastOpen = false;
  toastMessage = '';

  readonly filters: { id: ExploreFilter; label: string; icon: string }[] = [
    { id: 'all', label: 'Todos', icon: 'flame-outline' },
    { id: 'cases', label: 'Casos', icon: 'alert-circle-outline' },
    { id: 'updates', label: 'Actualizaciones', icon: 'refresh-outline' },
    { id: 'nearby', label: 'Cerca de ti', icon: 'location-outline' },
  ];

  readonly cities = ['Todas las ciudades', 'Santo Domingo', 'Santiago de los Caballeros'];
  readonly dateRanges = ['Cualquier fecha', 'Últimos 7 días', 'Últimos 30 días'];
  readonly statuses = ['Todos los estados', 'En difusión', 'Actualizado'];

  readonly cases: ExploreCase[] = [
    {
      id: 'case-001',
      personName: 'Valeria Rodríguez',
      image: 'assets/feed/case-valeria.webp',
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
      image: 'assets/feed/case-daniel.webp',
      city: 'Santiago de los Caballeros',
      country: 'República Dominicana',
      reported: '12 oct. 2026',
      description: 'La publicación reúne información general compartida por la comunidad.',
      publishedDaysAgo: 5,
      status: 'Actualizado',
      nearby: false,
    },
  ];

  readonly updates: ExploreUpdate[] = [
    {
      id: 'update-001',
      author: 'María López',
      initials: 'ML',
      published: 'Hace 2 h',
      caseName: 'Valeria Rodríguez',
      message: 'Se recibió nueva información sobre el caso. Gracias por compartirla.',
    },
  ];

  get filteredCases(): ExploreCase[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    return this.cases.filter((item) => {
      const matchesQuery = !query || `${item.personName} ${item.city} ${item.country} ${item.description}`.toLocaleLowerCase().includes(query);
      const matchesCity = this.selectedCity === 'Todas las ciudades' || item.city === this.selectedCity;
      const matchesStatus = this.selectedStatus === 'Todos los estados' || item.status === this.selectedStatus;
      const matchesDate = this.selectedDate === 'Cualquier fecha' || (this.selectedDate === 'Últimos 7 días' ? item.publishedDaysAgo <= 7 : item.publishedDaysAgo <= 30);
      const matchesFilter = this.activeFilter !== 'nearby' || item.nearby;
      return matchesQuery && matchesCity && matchesStatus && matchesDate && matchesFilter;
    });
  }

  get filteredUpdates(): ExploreUpdate[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    if (this.activeFilter === 'cases' || this.activeFilter === 'nearby') return [];
    return this.updates.filter((item) => !query || `${item.author} ${item.caseName} ${item.message}`.toLocaleLowerCase().includes(query));
  }

  selectFilter(filter: ExploreFilter): void {
    this.activeFilter = filter;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  async shareCase(item: ExploreCase): Promise<void> {
    const shareText = `WayFinder · ${item.personName} · ${item.city}.`;
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

  resetFilters(): void {
    this.selectedCity = 'Todas las ciudades';
    this.selectedDate = 'Cualquier fecha';
    this.selectedStatus = 'Todos los estados';
    this.activeFilter = 'all';
  }
}
