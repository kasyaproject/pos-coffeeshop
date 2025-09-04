interface IMenu {
  _id?: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  isActive?: boolean;
}

export type { IMenu };
