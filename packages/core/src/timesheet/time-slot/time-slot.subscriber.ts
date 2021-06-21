import { EntitySubscriberInterface, EventSubscriber, RemoveEvent } from "typeorm";
import * as moment from 'moment';
import { IScreenshot } from "@gauzy/contracts";
import { TimeSlot } from "./../time-slot.entity";
import { FileStorage } from "./../../core/file-storage";

@EventSubscriber()
export class TimeSlotSubscriber implements EntitySubscriberInterface<TimeSlot> {
    /**
    * Indicates that this subscriber only listen to TimeSlot events.
    */
    listenTo() {
        return TimeSlot;
    }

    /**
    * Called after entity is loaded.
    */
    afterLoad(entity: TimeSlot) {
		entity.stoppedAt = moment(entity.startedAt).add(10, 'minutes').toDate();
    }

    /**
    * Called before entity removal.
    */
    beforeRemove(event: RemoveEvent<TimeSlot>) {
        console.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
        if (event.entityId && event.entity.screenshots) {
            const { screenshots } = event.entity;
            if (screenshots instanceof Array && screenshots.length > 0) {
                screenshots.forEach((screenshot: IScreenshot) => {
                    (async () => {
                        const instance = await new FileStorage().getProvider().getInstance();
                        if (screenshot.file) {
                            instance.deleteFile(screenshot.file);
                        }
                        if (screenshot.thumb) {
                            instance.deleteFile(screenshot.thumb);
                        }
                    })();
                });
            }
        }
    }
}