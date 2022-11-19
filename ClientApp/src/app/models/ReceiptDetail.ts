import { BaseEntity } from './BaseEntity';
import { Receipt } from './Receipt';
import { Product } from './Product';
import { GUID } from '../app.type';

export class ReceiptDetail extends BaseEntity {
    public receiptId?: GUID;
    public productId?: GUID;
    public amount?: number;
    public quantity?: number;
}