export const learningFoundation = [
  {
    id: 'small-steps',
    title: 'Små steg, tydlig start',
    description:
      'Varje ämne börjar med en lugn startzon, en kort uppgift och en första vinst inom någon minut.',
  },
  {
    id: 'coach-first',
    title: 'Coach före facit',
    description:
      'OpenAI används först för att ge ledtrådar och språkstöd, sedan för rättning och nästa steg.',
  },
  {
    id: 'same-loop',
    title: 'Samma lärloop i alla ämnen',
    description:
      'Starta, träna, visa att du kan. Den rytmen återkommer oavsett om barnet öppnar matematik eller geografi.',
  },
  {
    id: 'mobile-focus',
    title: 'Mobilvänligt utan brus',
    description:
      'Korta paneler, tydliga val och låg visuell stress gör att innehållet alltid står i centrum.',
  },
]

export const routeBlueprint = [
  {
    path: '/',
    title: 'Portalens startsida',
    purpose:
      'Landningsyta för trygg start, ämnesval och en gemensam pedagogisk grund för hela plattformen.',
    details: [
      'plugg.pro som tydlig huvudadress och varumärkesyta',
      'prioriterad länk till Matematik som första ämne',
      'kort överblick av hur coach, träning och rättning fungerar',
    ],
  },
  {
    path: '/matematik',
    title: 'Första live-ämnet',
    purpose:
      'Startämnet med återanvändbar struktur: ämnesintro, träningsflöde, AI-coach och lugn rättning.',
    details: [
      'första uppdraget är redan byggt',
      'ämnesramen går att kopiera till nästa ämne',
      'samma API-yta används för coachning och bedömning',
    ],
  },
  {
    path: '/geografi, /historia, /biologi',
    title: 'Nästa ämnesrutter',
    purpose:
      'Förberedda routes under samma app och samma Render-service, med samma design- och lärmodell.',
    details: [
      'egna introduktioner per ämne',
      'återbruk av komponenter, innehållsmallar och API-endpoints',
      'kan gå live ett ämne i taget utan att ändra plattformens kärna',
    ],
  },
  {
    path: '/api/status, /api/coach, /api/evaluate',
    title: 'Gemensam backend',
    purpose:
      'En enda Node-service på Render sköter statiska filer, ämnesroutes och OpenAI-anrop.',
    details: [
      'Responses API för coachning och rättning',
      'samma säkerhetsyta för API-nycklar',
      'fungerar ihop med portalens SPA-routing',
    ],
  },
]

export const mathLaunchPlan = [
  {
    id: 'entry',
    step: 'Fas 1',
    title: 'Kom igång snabbt',
    description:
      'Matematik öppnar med en enda tydlig uppgift, coachknapp och ett språk som känns tryggt snarare än testigt.',
    status: 'live',
  },
  {
    id: 'practice',
    step: 'Fas 2',
    title: 'Bygg träningsbanor',
    description:
      'Nästa steg är fler uppdrag inom taluppfattning, huvudräkning och problemlösning men i samma återanvändbara ämnesskal.',
    status: 'soon',
  },
  {
    id: 'progress',
    step: 'Fas 3',
    title: 'Visa framsteg lugnt',
    description:
      'När grunden sitter kan vi lägga till sparad progression, fler nivåer och enklare lärar- eller föräldraöversikter.',
    status: 'planned',
  },
]

export const subjects = [
  {
    slug: 'matematik',
    name: 'Matematik',
    route: '/matematik',
    status: 'live',
    tagline: 'Första ämnet i portalen med coach, träning och rättning i samma rytm.',
    summary:
      'Barnet börjar med en kort uppgift, kan be om en ledtråd och får sedan en varm rättning som visar nästa steg.',
    levelFocus: 'Trygg start för mellan- och högstadiet',
    coachStyle: 'Kort, varm och lösningsnära',
    launchNote: 'Första live-versionen visar hur hela portalens pedagogik ska fungera i praktiken.',
    lessonFlow: ['Starta lugnt', 'Få ledtråd', 'Prova själv', 'Få återkoppling'],
    skillTracks: [
      'Taluppfattning och mönster',
      'Huvudräkning i små steg',
      'Problemlösning med tydliga ledtrådar',
    ],
    practiceModes: [
      {
        title: 'Startzon',
        description: 'En uppgift, låg tröskel och tydlig känsla av var man ska börja.',
      },
      {
        title: 'Coachläge',
        description: 'Barnet kan få en ledtråd utan att få hela svaret direkt.',
      },
      {
        title: 'Rättning',
        description: 'Återkoppling i lugn ton med nästa steg i stället för bara rätt eller fel.',
      },
    ],
    starterTask: {
      id: 'math-pattern-01',
      label: 'Första uppdraget',
      question: 'Vilket tal saknas i mönstret 24, 30, 36, __, 48?',
      expectedAnswer: '42',
      acceptedAnswers: ['42', 'fyrtiotva', 'fyrtiotvå'],
      hint:
        'Jämför skillnaden mellan varje tal. Hur mycket ökar serien varje gång?',
      explanation:
        'Mönstret ökar med 6 varje steg: 24, 30, 36, 42, 48.',
      successMessage:
        'Du såg ett återkommande mönster. Det är precis så man bygger trygg matteförståelse.',
    },
  },
  {
    slug: 'geografi',
    name: 'Geografi',
    route: '/geografi',
    status: 'soon',
    tagline: 'Nästa ämne med kartor, begrepp och resonemang i samma lugna format.',
    summary:
      'När geografi går live återanvänder vi samma lärloop men byter ut matteuppdrag mot kartor, platser och samband.',
    levelFocus: 'Trygg begreppsstart',
    coachStyle: 'Förklarande och jämförande',
    launchNote: 'Förberedd route under samma app.',
    lessonFlow: ['Starta lugnt', 'Utforska begrepp', 'Svara själv', 'Få återkoppling'],
    skillTracks: ['Kartor och världsdelar', 'Länder och huvudstäder', 'Natur och människa'],
    practiceModes: [
      { title: 'Startzon', description: 'Korta begreppsfrågor med låg tröskel.' },
      { title: 'Coachläge', description: 'Ledtrådar som hjälper barnet att minnas samband.' },
      { title: 'Rättning', description: 'Resonemang som förklarar varför ett svar stämmer.' },
    ],
  },
  {
    slug: 'historia',
    name: 'Historia',
    route: '/historia',
    status: 'planned',
    tagline: 'Tidslinjer, orsaker och följder i samma återanvändbara portalstruktur.',
    summary:
      'Historia får samma ämnesskal men med tidslinjer, personer och begrepp som första innehållspaket.',
    levelFocus: 'Lugn orientering i tid och sammanhang',
    coachStyle: 'Berättande och strukturerande',
    launchNote: 'Planerad efter geografi.',
    lessonFlow: ['Starta lugnt', 'Få stöd', 'Sätt ord på det', 'Få återkoppling'],
    skillTracks: ['Tidslinjer', 'Viktiga händelser', 'Orsak och konsekvens'],
    practiceModes: [
      { title: 'Startzon', description: 'Kort historisk fråga med tydlig kontext.' },
      { title: 'Coachläge', description: 'Ledtrådar som kopplar ihop händelser och tid.' },
      { title: 'Rättning', description: 'Respons som hjälper barnet att resonera vidare.' },
    ],
  },
  {
    slug: 'biologi',
    name: 'Biologi',
    route: '/biologi',
    status: 'planned',
    tagline: 'Kroppen, naturen och vardagsnära begrepp med samma pedagogiska kärna.',
    summary:
      'Biologi passar väl in i portalens struktur eftersom ämnet tjänar på stegvisa förklaringar och tydliga jämförelser.',
    levelFocus: 'Vardagliga exempel och trygg begreppsstart',
    coachStyle: 'Förklarande och nyfiket',
    launchNote: 'Planerad när ämnesramen för två första ämnen sitter.',
    lessonFlow: ['Starta lugnt', 'Undersök', 'Svara', 'Få återkoppling'],
    skillTracks: ['Kroppen', 'Djur och natur', 'Ekosystem och samband'],
    practiceModes: [
      { title: 'Startzon', description: 'Kort fråga med tydligt vardagsexempel.' },
      { title: 'Coachläge', description: 'Ledtrådar som översätter svåra ord till enkel svenska.' },
      { title: 'Rättning', description: 'Mjuk återkoppling som bygger förståelse steg för steg.' },
    ],
  },
]

export function getSubjectBySlug(slug) {
  return subjects.find((subject) => subject.slug === slug)
}
