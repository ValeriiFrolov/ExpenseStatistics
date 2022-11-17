import { BaseEntity } from './BaseEntity';
import { Receipt } from './Receipt';
import { Product } from './Product';
import { GUID } from '../app.type';

export class ReceiptDetail extends BaseEntity {
    //public receipt?: Receipt;
    public receiptId?: GUID;
    public product?: Product;
    public amount?: number;
    public quantity?: number;
}