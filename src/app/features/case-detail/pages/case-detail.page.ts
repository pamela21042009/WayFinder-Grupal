import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonToast } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  bookmarkOutline,
  calendarOutline,
  chatbubbleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  flagOutline,
  heart,
  heartOutline,
  informationCircleOutline,
  imagesOutline,
  locationOutline,
  personOutline,
  refreshOutline,
  shareSocialOutline,
  shieldCheckmarkOutline,
  shirtOutline,
  warningOutline,
} from 'ionicons/icons';
import { BottomNavigationComponent } from '../../../shared/components/bottom-navigation/bottom-navigation.component';
import { publicCaseDetails, type PublicCaseDetail } from '../data/case-detail.mock';

addIcons({
  arrowBackOutline,
  bookmarkOutline,
  calendarOutline,
  chatbubbleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  flagOutline,
  heart,
  heartOutline,
  informationCircleOutline,
  imagesOutline,
  locationOutline,
  personOutline,
  refreshOutline,
  shareSocialOutline,
  shieldCheckmarkOutline,
  shirtOutline,
  warningOutline,
});

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.page.html',
  imports: [BottomNavigationComponent, IonContent, IonIcon, IonToast, RouterLink],
})
export class CaseDetailPage {
  readonly caseDetail: PublicCaseDetail | undefined;
  photoIndex = 0;
  liked = false;
  following = false;
  saved = false;
  toastOpen = false;
  toastMessage = '';

  constructor(private readonly route: ActivatedRoute, private readonly location: Location, private readonly router: Router) {
    const caseId = this.route.snapshot.paramMap.get('id');
    this.caseDetail = publicCaseDetails.find((item) => item.id === caseId);
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }
    void this.router.navigateByUrl('/home');
  }

  get currentPhoto(): string | undefined {
    return this.caseDetail?.photos[this.photoIndex];
  }

  formatCount(count: number, reacted = false): string {
    const total = count + (reacted ? 1 : 0);
    return total >= 1000 ? `${(total / 1000).toFixed(total % 1000 === 0 ? 0 : 1)}K` : `${total}`;
  }

  changePhoto(direction: -1 | 1): void {
    const photoCount = this.caseDetail?.photos.length ?? 0;
    if (photoCount > 1) this.photoIndex = (this.photoIndex + direction + photoCount) % photoCount;
  }

  async shareCase(): Promise<void> {
    if (!this.caseDetail) return;
    const shareText = `WayFinder · ${this.caseDetail.personName} · ${this.caseDetail.city}.`;
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
