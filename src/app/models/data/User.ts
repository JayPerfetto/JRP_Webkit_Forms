import { Timestamp } from '@firebase/firestore-types';
import { UserRole } from '../UserRole';

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    lastLogin?: Timestamp;
    roles?: UserRole;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    updateUser?: User;
}
