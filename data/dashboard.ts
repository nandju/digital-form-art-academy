export const MONTHS_FR = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
];

export const studentLearningHours = MONTHS_FR.slice(0, 8).map((month, index) => ({
  month,
  heures: [6, 9, 7, 12, 10, 14, 11, 16][index],
}));

export const studentProgressData = [
  { name: "Terminées", value: 4 },
  { name: "En cours", value: 3 },
  { name: "Non commencées", value: 2 },
];

export const trainerRevenueData = MONTHS_FR.map((month, index) => ({
  month,
  revenus: [420, 510, 480, 650, 720, 690, 840, 910, 780, 960, 1040, 1180][index] * 1000,
}));

export const trainerEnrollmentsData = MONTHS_FR.slice(0, 8).map((month, index) => ({
  month,
  inscriptions: [45, 62, 58, 90, 110, 96, 130, 154][index],
}));

export const adminRevenueData = MONTHS_FR.map((month, index) => ({
  month,
  revenus: [3.2, 3.8, 4.1, 4.6, 5.2, 5.0, 6.1, 6.8, 6.4, 7.2, 7.9, 8.6][index] * 1000000,
}));

export const adminUsersGrowth = MONTHS_FR.map((month, index) => ({
  month,
  utilisateurs: [1200, 1450, 1720, 2100, 2480, 2950, 3400, 3980, 4520, 5100, 5820, 6500][index],
}));

export const categoryDistribution = [
  { name: "Développement", value: 32 },
  { name: "Design", value: 18 },
  { name: "Marketing", value: 15 },
  { name: "Data & IA", value: 14 },
  { name: "Bureautique", value: 12 },
  { name: "Autres", value: 9 },
];

export const paymentMethodsDistribution = [
  { name: "Mobile Money", value: 58 },
  { name: "Carte bancaire", value: 27 },
  { name: "Virement", value: 15 },
];
