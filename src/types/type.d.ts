interface Items {
  carryLimit: number;
  description: string;
  gameId: number;
  icon: { id: number; kind: string; colorId: number; color: string };
  id: number;
  name: string;
  rarity: number;
  recipes: {
    amount: number;
    id: number;
    inputs: { name: string; id: number }[];
    output: { id: number };
  }[];
}
