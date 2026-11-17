import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  chatbubbleOutline,
  ellipsisHorizontal,
  globeOutline,
  heart,
  heartOutline,
  informationCircle,
  locationOutline,
  megaphoneOutline,
  shareSocialOutline,
} from 'ionicons/icons';
import type { FeedPost } from '../../data/feed-posts.mock';

addIcons({
  calendarOutline,
  chatbubbleOutline,
  ellipsisHorizontal,
  globeOutline,
  heart,
  heartOutline,
  informationCircle,
  locationOutline,
  megaphoneOutline,
  shareSocialOutline,
});

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  imports: [IonIcon],
})
export class PostCardComponent {
  @Input({ required: true }) post!: FeedPost;

  @Output() reactionToggled = new EventEmitter<FeedPost>();
  @Output() shareRequested = new EventEmitter<FeedPost>();
  @Output() commentsRequested = new EventEmitter<FeedPost>();
  @Output() informationRequested = new EventEmitter<FeedPost>();
  @Output() menuRequested = new EventEmitter<FeedPost>();

  formatCount(count: number, liked = false): string {
    const total = count + (liked ? 1 : 0);
    return total >= 1000 ? `${(total / 1000).toFixed(total % 1000 === 0 ? 0 : 1)}K` : `${total}`;
  }
}
