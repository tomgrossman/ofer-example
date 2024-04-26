import { ForbiddenException, Injectable } from '@nestjs/common';

const EMAIL = 'user@mail.com';
const PASSWORD = 'password';

@Injectable()
export class AuthService {
  async validateUser(email: string, password: string): Promise<boolean> {
    if (email !== EMAIL || password !== PASSWORD) {
      throw new ForbiddenException('Invalid email or password');
    }

    return true;
  }
}
