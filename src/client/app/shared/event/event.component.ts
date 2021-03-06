import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { clone } from 'lodash';
import { EventType } from '../../../../shared/constants/event-type';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { Event } from '../../../../shared/types/entities/event';
import { SuggestedFix } from '../../../../shared/types/entities/suggested-fix';
import { StorageKey, StorageService } from '../../services/storage/storage.service';
import { GloomhavenIcon } from '../icon/icon.enum';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'gdb-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {
  private _event: Event;
  @Input()
  set event(event: Event) {
    this._event = clone(event);
  }
  get event(): Event {
    return this._event;
  }

  @Input() readonly editable = false;

  @Output() submit: EventEmitter<SuggestedFix<Event>> = new EventEmitter<SuggestedFix<Event>>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  Icon = GloomhavenIcon;
  EventType = EventType;

  submittedBy: string;

  constructor(private popupService: PopupService, private storageService: StorageService) {
    this.submittedBy = this.storageService.load<string>(StorageKey.FixSubmittedBy);
  }

  onSubmit() {
    this.submit.emit({
      type: this.event.type === EventType.City ? SuggestedFixType.CityEvent : SuggestedFixType.RoadEvent,
      idOrNumber: this.event.number + '',
      data: this.event,
      author: this.submittedBy || null,
    });

    this.storageService.store<string>(StorageKey.FixSubmittedBy, this.submittedBy || null);
  }

  onCancel() {
    this.cancel.emit();
  }

  openListOfIconsPopup() {
    this.popupService.openIconListPopup();
  }
}
