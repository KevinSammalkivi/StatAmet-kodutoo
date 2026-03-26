import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 1,
    question: 'Kui suur oli Eesti rahvaarv 2024. aasta alguses Statistikaameti andmetel?',
    options: [
      'Umbes 1,1 miljonit',
      'Umbes 1,37 miljonit',
      'Umbes 1,6 miljonit',
      'Umbes 2 miljonit',
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Milline maakond on rahvaarvult Eesti suurim pärast Harjumaad?',
    options: ['Pärnumaa', 'Ida-Virumaa', 'Tartumaa'],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'Kui suur oli Eesti keskmine brutopalk 2024. aasta III kvartalis?',
    options: ['1 250 €', '1 890 €', '2 020 €'],
    correctAnswer: 1,
  },
  {
    id: 4,
    question:
      'Mitu protsenti Eesti energiatarbimisest moodustas taastuvenergia 2023. aastal?',
    options: ['Umbes 15%', 'Umbes 30%', 'Umbes 43%', 'Umbes 60%'],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: 'Mis on Eesti kõige levinum eesnimi meeste seas (2024)?',
    options: ['Andrei', 'Aleksandr', 'Jüri'],
    correctAnswer: 0,
  },
];
