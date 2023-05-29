import { Pipe, PipeTransform } from '@angular/core';
import { ReceiverStatus } from '../../../enums/receiver-status.enum';
import { ReliableSign } from '../enums/reliable-sign.enum';

@Pipe({
    name: 'reliableClass',
    pure: false,
})
export class ReliableClassPipe implements PipeTransform {
    transform(receiverStatus: ReceiverStatus): string {
        return (
            ReliableSign[receiverStatus] ?? ReliableSign.reliableGrayClass
        );
    }
}
