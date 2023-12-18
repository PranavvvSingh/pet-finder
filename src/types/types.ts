export type petType = {
  id: number;
  name: string;
  type: string;
  subtype: string;
  price: number;
  image: string;
  description: string;
};
export type partialPetsType = Omit<petType, "description" | "subtype" | "type">;
export type auth = {
  email: string,
  password: string
}
