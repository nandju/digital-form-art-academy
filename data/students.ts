import type { Student } from "@/types";

const FIRST_NAMES = [
  "Aïcha", "Moussa", "Fatou", "Ibrahim", "Aminata", "Kwame", "Awa", "Yao",
  "Adjoa", "Souleymane", "Nadia", "Jean-Marc", "Ramata", "Didier", "Chiamaka",
  "Paul", "Salimata", "Eric", "Grace", "Mamadou", "Léa", "Hamed", "Sandrine",
  "Franck", "Kadiatou", "Bassirou", "Marie-Claire", "Ousmane", "Rokia",
  "Emmanuel", "Aissata", "Kevin", "Fatoumata", "David", "Abdoulaye", "Nafissatou",
  "Junior", "Bintou", "Samuel", "Zeinab", "Christian", "Aya", "Moussa",
];

const LAST_NAMES = [
  "Koné", "Diarra", "Ndiaye", "Traoré", "Bamba", "Mensah", "Cissé", "N'Guessan",
  "Boateng", "Bah", "El Amrani", "Kouassi", "Sow", "Abessolo", "Okafor",
  "Mbeki", "Ouédraogo", "Assogba", "Adeyemi", "Fall", "Guei", "Toure",
  "Nkouka", "Zoungrana", "Diallo", "Sarr", "Nguema", "Camara", "Tetteh",
  "Barry", "Yao", "Keita", "Owusu", "Mwangi", "Sy", "Diop", "Coulibaly",
  "Adjei", "Sangare", "Nzeza",
];

const CITIES = [
  "Abidjan, Côte d'Ivoire", "Abidjan, Côte d'Ivoire", "Abidjan, Côte d'Ivoire",
  "Yamoussoukro, Côte d'Ivoire", "Bouaké, Côte d'Ivoire", "San-Pédro, Côte d'Ivoire",
  "Korhogo, Côte d'Ivoire", "Daloa, Côte d'Ivoire", "Abidjan, Côte d'Ivoire",
  "Dakar, Sénégal", "Bamako, Mali", "Accra, Ghana",
  "Lagos, Nigéria", "Cotonou, Bénin", "Ouagadougou, Burkina Faso",
  "Libreville, Gabon", "Conakry, Guinée", "Brazzaville, Congo",
  "Douala, Cameroun", "Lomé, Togo", "Niamey, Niger", "Kinshasa, RDC",
];

export const STUDENTS: Student[] = Array.from({ length: 320 }, (_, index) => {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
  const lastName = LAST_NAMES[(index * 3 + 1) % LAST_NAMES.length];
  const fullName = `${firstName} ${lastName}`;
  const coursesEnrolled = 1 + (index % 8);
  const coursesCompleted = Math.min(coursesEnrolled, index % 6);

  return {
    id: `student-${String(index + 1).padStart(3, "0")}`,
    firstName,
    lastName,
    fullName,
    avatar: `/assets/avatars/student-${String((index % 24) + 1).padStart(2, "0")}.jpg`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@exemple.com`
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""),
    location: CITIES[index % CITIES.length],
    joinedAt: `20${23 + (index % 3)}-0${1 + (index % 9)}-1${index % 9}`,
    coursesEnrolled,
    coursesCompleted,
    certificatesEarned: coursesCompleted,
  };
});
