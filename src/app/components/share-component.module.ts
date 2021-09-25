import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NotificationBellComponent } from './notification-bell/notification-bell.component';

@NgModule({
    declarations: [NotificationBellComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [NotificationBellComponent]
})

export class ShareComponentModule {}