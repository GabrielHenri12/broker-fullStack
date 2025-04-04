import * as bcrypt from 'bcrypt';

export class BcryptStrategy {
  async comparePassword(
    password: string,
    cryptPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, cryptPassword);
  }
}
