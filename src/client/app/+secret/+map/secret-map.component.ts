import { style } from '@angular/animations';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { assign, find, forEach } from 'lodash';
import { MAP_SIZE, MAP_URL } from '../../../../shared/constants/map';
import { MapLocation } from '../../../../shared/types/entities/map-location';
import { ApiService } from '../../services/api/api.service';

interface OurMapLocation extends MapLocation {
  available?: boolean;
  inaccessible?: boolean;
  completed?: boolean;
}

@Component({
  selector: 'gdb-secret-map',
  templateUrl: './secret-map.component.html',
  styleUrls: ['./secret-map.component.scss'],
})
export class SecretMapComponent implements OnInit {
  mapUrlCss = `url('${MAP_URL}')`;
  stickers: OurMapLocation[];
  focusedSticker: OurMapLocation;
  readonly scaleStep = 0.2;
  readonly maxZoom = 10;
  readonly minZoom = 1;
  zoom: number = 5;

  get scale(): number {
    return 1 / (1 + this.scaleStep) ** (11 - this.zoom);
  }

  get transform(): string {
    return `scale(${this.scale})`;
  }

  @HostBinding('style.height')
  @HostBinding('style.width')
  get mapSize(): string {
    return this.scale * MAP_SIZE + 'px';
  }

  constructor(private api: ApiService) {}

  async ngOnInit() {
    this.stickers = await this.api.getMapLocations();

    const onTheBoard: Partial<OurMapLocation>[] = [
      {
        number: 1,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 2,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 3,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 4,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 5,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 6,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 7,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 8,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 9,
        completed: false,
        available: true,
        inaccessible: true,
      },
      {
        number: 10,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 13,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 14,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 15,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 18,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 19,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 20,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 21,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 22,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 23,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 26,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 27,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 28,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 31,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 35,
        completed: false,
        available: true,
        inaccessible: true,
      },
      {
        number: 36,
        completed: false,
        available: true,
        inaccessible: true,
      },
      {
        number: 37,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 38,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 43,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 46,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 51,
        completed: false,
        available: true,
        inaccessible: true,
      },
      {
        number: 52,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 53,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 54,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 68,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 70,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 72,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 73,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 76,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 81,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 82,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 83,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 93,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 17,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 47,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 44,
        completed: true,
        available: true,
        inaccessible: false,
      },
      {
        number: 48,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 29,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 16,
        completed: false,
        available: true,
        inaccessible: false,
      },
      {
        number: 39,
        completed: true,
        available: true,
        inaccessible: false,
      },
    ];

    forEach(this.stickers, sticker => assign(sticker, find(onTheBoard, { number: sticker.number })));
  }

  stickerClick(sticker: OurMapLocation) {
    this.focusedSticker = sticker;
  }

  numberClick(sticker: OurMapLocation) {
    sticker.available = !sticker.available;
  }

  checkboxClick(sticker: OurMapLocation) {
    if (sticker.inaccessible) {
      return;
    }

    sticker.completed = !sticker.completed;
  }

  @HostListener('document:keydown.escape')
  defocusStickers() {
    this.focusedSticker = null;
  }

  zoomIn() {
    this.zoom = Math.min(this.zoom + 1, this.maxZoom);
  }

  zoomOut() {
    this.zoom = Math.max(this.zoom - 1, this.minZoom);
  }
}
