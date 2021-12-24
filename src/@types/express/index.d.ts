// Sobrescrevendo o express, adicionando a tipagem "user" que precisamos no middleware
declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string;
    };
  }
}
