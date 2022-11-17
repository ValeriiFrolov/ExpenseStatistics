import { GUID } from './../app.type';
import { User } from './User';

export abstract class BaseEntity {
    public id?: GUID;
    public createdOn?: Date;
    public createdBy?: User;
}