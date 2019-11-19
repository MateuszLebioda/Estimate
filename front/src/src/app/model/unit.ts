import {Role} from './role.enum';

export class Unit {
  id: number;
  bottom: string;
  top: string;
  role: Role;
  actual: boolean;
  user: number;
}
