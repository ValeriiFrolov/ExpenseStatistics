import { BaseEntity } from './BaseEntity';
import { ReceiptDetail } from './ReceiptDetail';

export class Receipt extends BaseEntity {
    public date?: Date;
    public totalAmount?: number;
}