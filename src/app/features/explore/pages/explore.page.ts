import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonToast } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  alertCircleOutline,
  arrowForward,
  calendarOutline,
  ellipsisHorizontal,
  flameOutline,
  globeOutline,
  locationOutline,
  mapOutline,
  megaphoneOutline,
  notificationsOutline,
  optionsOutline,
  peopleOutline,
  refreshOutline,
  searchOutline,
  shareSocialOutline,
  starOutline,
  trendingUpOutline,
} from 'ionicons/icons';
import {
  exploreCases,
  exploreCities,
  exploreDateRanges,
  exploreFilters,
  exploreStatuses,
  exploreUpdates,
  type ExploreCase,
  type ExploreFilter,
  type ExploreUpdate,
} from '../data/explore.mock';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';

addIcons({
  alertCircleOutline,
  arrowForward,
  calendarOutline,
  ellipsisHorizontal,
  flameOutline,
  globeOutline,
  locationOutline,
  mapOutline,
  megaphoneOutline,
  notificationsOutline,
  optionsOutline,
  peopleOutline,
  refreshOutline,
  searchOutline,
  shareSocialOutline,
  starOutline,
  trendingUpOutline,
});

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  imports: [BottomNavigationComponent, FormsModule, IonContent, IonIcon, IonToast, RouterLink],
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

  readonly filters = exploreFilters;
  readonly cities = exploreCities;
  readonly dateRanges = exploreDateRanges;
  readonly statuses = exploreStatuses;
  readonly cases: ExploreCase[] = exploreCases;
  readonly updates: ExploreUpdate[] = exploreUpdates;

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
