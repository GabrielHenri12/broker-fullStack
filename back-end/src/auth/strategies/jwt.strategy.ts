import * as jwt from 'jsonwebtoken';

export class JwtStrategy {
  generateToken(payload: object): string {
    try {
      const secretKey =
        process.env.SECRET_KEY ?? 'sasdasdasdasdsa';
      const token = jwt.sign(payload, secretKey, { expiresIn: '3h' });
      return token;
    } catch (error) {
      console.error('Erro ao gerar o token JWT:', error);
      throw new Error('Falha ao gerar o token JWT');
    }
  }

  decodeToken(token: string): string | null {
    try {
      const secretKey =
        process.env.SECRET_KEY ?? 'sasdasdasdasdsa';
      const decoded = jwt.verify(token, secretKey) as any;

      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        console.error('Token expirado');
        return null;
      }

      return decoded;
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }
}
