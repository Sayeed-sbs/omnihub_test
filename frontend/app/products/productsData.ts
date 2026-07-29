export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  description: string;
}

export const inventoryProducts: Product[] = [
  // STORAGE ARRAYS
  { _id: "s1", name: "Aegis Quantum Drive", price: 899, category: "Storage", rating: 4.9, description: "Solid-state crystalline memory arrays utilizing atomic spin encryption matrix grids." },
  { _id: "s2", name: "Cortex Vault Array", price: 450, category: "Storage", rating: 4.6, description: "High-density thermal cell hardware backup rig optimized for continuous data loads." },
  { _id: "s3", name: "Chronos Mesh Bank", price: 1200, category: "Storage", rating: 4.8, description: "Temporal parity storage block running decentralized block redundancy routines." },
  { _id: "s4", name: "Helios Micro Cell", price: 299, category: "Storage", rating: 4.5, description: "Pocket-sized rapid processing memory asset for quick telemetry downloads." },
  { _id: "s5", name: "Titan Lattice Core", price: 2400, category: "Storage", rating: 5.0, description: "Enterprise-grade high-frequency mainframe network database array layout block." },
  
  // WEARABLES & SYNCS
  { _id: "w1", name: "Neural Link Band v2", price: 1249, category: "Wearables", rating: 4.8, description: "High-fidelity biometric signal transmitter optimized for localized cybernetic automation." },
  { _id: "w2", name: "Pulse Matrix Ring", price: 599, category: "Wearables", rating: 4.6, description: "Compact micro-logic telemetry ring mapping blood chemistry changes in real-time." },

  // VOLUMETRIC DISPLAYS
  { _id: "d1", name: "HoloDisplay Prism", price: 1850, category: "Displays", rating: 4.7, description: "Volumetric true-3D lightfield projection deck emitting zero polarized ocular radiation." },
  { _id: "d2", name: "AeroHUD Visor Frame", price: 950, category: "Displays", rating: 4.4, description: "Tactical augmented projection overlay visor for close-proximity code management." },
  { _id: "d3", name: "Spectra Beam Deck", price: 1350, category: "Displays", rating: 4.6, description: "High-refresh laser grid light projection terminal for localized rendering meshes." },

  // ROBOTICS CORES
  { _id: "r1", name: "Vector AI Drone Core", price: 1999, category: "Robotics", rating: 5.0, description: "Autonomous environmental mapping processor running sub-millisecond navigation logs." },
  { _id: "r2", name: "Nexus Actuator Deck", price: 750, category: "Robotics", rating: 4.7, description: "High-torque multi-axis robotic motor control controller utilizing dynamic micro-steps." },

  // QUANTUM PROCESSORS
  { _id: "p1", name: "Cortex Processing Array", price: 2899, category: "Processors", rating: 4.9, description: "Parallel multi-node logical gate compute arrays trained to safely process encrypted market algorithms." },
  { _id: "p2", name: "Aura Logic Switcher", price: 1150, category: "Processors", rating: 4.7, description: "Cryogenic logic router block designed to accelerate micro-circuit logic paths." },
  { _id: "p3", name: "Nova Signal Engine", price: 1650, category: "Processors", rating: 4.8, description: "Sub-atomic binary parsing component driving ultra-fast processing frequency bands." }
];
