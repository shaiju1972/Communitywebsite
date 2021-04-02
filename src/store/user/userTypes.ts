// application
import { IUser } from '~/interfaces/user';

export interface IUserState {
    current: IUser | null;
    propertyCategories:any,
    locations:any
}
