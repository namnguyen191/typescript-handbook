const fish = [
  'neon tetra',
  'dwarf rainbow',
  'neon rasbora',
  'celestial rasbora'
] as const;

type Rasbora = (typeof fish)[2 | 3];
type AllFish = (typeof fish)[number];
