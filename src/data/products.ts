export interface Product {
  id: string;
  name: string;
  /** Price in SCUM Coins */
  price: number;
  image: string;
  category: string;
  command: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: "wpn-01",
    name: "AKM Assault Rifle",
    price: 599,
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&h=300&fit=crop",
    category: "Weapons",
    command: "#spawnitem AKM",
    description: "Classic 7.62mm assault rifle with reliable performance.",
  },
  {
    id: "wpn-02",
    name: "M4A1 Carbine",
    price: 699,
    image: "https://images.unsplash.com/photo-1584281722912-09d7a5e25e05?w=400&h=300&fit=crop",
    category: "Weapons",
    command: "#spawnitem M4A1",
    description: "Versatile 5.56mm carbine, great accuracy at range.",
  },
  {
    id: "wpn-03",
    name: "SVD Sniper Rifle",
    price: 899,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
    category: "Weapons",
    command: "#spawnitem SVD",
    description: "Semi-automatic marksman rifle for long-range engagements.",
  },
  {
    id: "sup-01",
    name: "Military MRE Pack",
    price: 249,
    image: "https://images.unsplash.com/photo-1585010839087-e0c2bbd0deee?w=400&h=300&fit=crop",
    category: "Supplies",
    command: "#spawnitem MRE_Pack",
    description: "Full military ration kit to sustain your survivor.",
  },
  {
    id: "sup-02",
    name: "Medical Kit",
    price: 349,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
    category: "Supplies",
    command: "#spawnitem MedKit",
    description: "Complete medical supplies for field treatment.",
  },
  {
    id: "veh-01",
    name: "SUV Vehicle Spawn",
    price: 1299,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop",
    category: "Vehicles",
    command: "#spawnvehicle SUV",
    description: "Spawn an SUV at your location for quick traversal.",
  },
  {
    id: "veh-02",
    name: "Quad Bike Spawn",
    price: 799,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop",
    category: "Vehicles",
    command: "#spawnvehicle QuadBike",
    description: "Lightweight quad bike for off-road exploration.",
  },
  {
    id: "base-01",
    name: "Base Building Kit",
    price: 999,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    category: "Base",
    command: "#spawnitem BaseBuildingKit",
    description: "Complete kit with walls, doors, and fortification materials.",
  },
  {
    id: "base-02",
    name: "Lock & Key Set",
    price: 199,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
    category: "Base",
    command: "#spawnitem LockSet",
    description: "Secure your base with military-grade locks.",
  },
  {
    id: "boost-01",
    name: "Fame Points x1000",
    price: 499,
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop",
    category: "Boosts",
    command: "#addfame 1000",
    description: "Instantly gain 1000 fame points for your character.",
  },
  {
    id: "boost-02",
    name: "Skill Reset Token",
    price: 399,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
    category: "Boosts",
    command: "#resetskills",
    description: "Reset all character skills and redistribute points.",
  },
  {
    id: "ammo-01",
    name: "Ammo Crate (7.62mm)",
    price: 299,
    image: "https://images.unsplash.com/photo-1584552532191-2ec5fe76e6a4?w=400&h=300&fit=crop",
    category: "Supplies",
    command: "#spawnitem AmmoCrate762",
    description: "Crate of 200 rounds of 7.62mm ammunition.",
  },
];

export const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
