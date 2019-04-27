import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/config';
import { Connection } from 'typeorm';
import { User } from '../entity/User';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.database) protected connection: Connection,
  ) { }

  public addUser() {
    const user = new User();
    user.email = 'khalid@outlook.com.au';
    user.firstName = 'Khalid';
    user.lastName = 'Saifullah';
    user.isActive = true;

    this.connection.manager.save(user).then(console.log);
  }
}
