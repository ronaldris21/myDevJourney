import BaseEntity from './BaseEntity';
import { required, length, isEmail, isInteger, isPhone, entity, persist, id } from '../decorators'

@entity("hero")
export default class Hero extends BaseEntity {
    @id
    id: string;

    @persist
    @required
    @length(3, 100)
    username: string;

    @persist
    power: string;
}