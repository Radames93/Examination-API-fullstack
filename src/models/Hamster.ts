export interface Hamster {
  map(arg0: (hamster: any) => JSX.Element): import("react").ReactNode;
  name: string;
  age: number;
  favFood: string;
  loves:string;
  imgName:string;
  wins: number;
  defeats: number;
  games: number;
  id: string;
}

export interface Data {
  name: string;
  age: number;
  favFood: string;
  loves: string;
  imgName: string;
  wins: number;
  defeats: number;
  games: number;
}
