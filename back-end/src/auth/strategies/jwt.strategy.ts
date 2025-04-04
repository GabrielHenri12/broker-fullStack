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
      const decoded = jwt.verify(token, secretKey) as {
        id: string;
        exp: number;
      };
      const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
      if (decoded.exp < currentTime) {
        console.error('Token expirado');
        return null;
      }
      return decoded.id;
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }
}
