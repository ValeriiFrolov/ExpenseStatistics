import { BaseEntity } from './BaseEntity';
import { GUID } from '../app.type';

export class ProductPrice extends BaseEntity {
    public productId?: GUID;
    public date?: Date;
    public price?: number;
}