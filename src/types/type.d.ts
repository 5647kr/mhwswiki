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

interface Skills {
  description: string;
  gameId: number;
  icon: { id: number; kind: string };
  id: number;
  kind: string;
  name: string;
  ranks: SkillRank[];
}

interface SkillRank {
  description: string;
  id: number;
  level: number;
  name: string | null;
  skill: { id: number };
}

interface Charms {
  gameId: number;
  id: number;
  random: boolean;
  ranks: CharmsRanks[];
}

interface CharmsRanks {
  charm: { id: number };
  description: string;
  crafting: {
    charmRank: { id: number };
    craftable: number;
    id: number;
    materials: CharmsMaterials[];
    zennyCost: number;
  };
  id: number;
  level: number;
  name: string;
  rarity: number;
  skills: SkillRank[];
}

interface CharmsMaterials {
  id: number;
  item: {
    carryLimit: number;
    description: string;
    gameId: number;
    icon: { id: number; kind: string; colorId: number; color: string };
    id: number;
    name: string;
    rarity: number;
    recipes: string[];
    value: number;
  };
  quantity: number;
}
