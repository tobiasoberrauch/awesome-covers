export interface PublicDomainSong {
  id: string;
  title: string;
  composer: string;
  year: number;
  composerDied: number;
  description: string;
  /** URL to the audio file – place MP3s in /public/audio/pd/ */
  audioUrl: string;
}

export const PUBLIC_DOMAIN_SONGS: PublicDomainSong[] = [
  {
    id: "fur-elise",
    title: "Für Elise",
    composer: "Ludwig van Beethoven",
    year: 1810,
    composerDied: 1827,
    description: "Eines der bekanntesten Klavierstücke der Welt",
    audioUrl: "/audio/pd/fur-elise.mp3",
  },
  {
    id: "eine-kleine-nachtmusik",
    title: "Eine kleine Nachtmusik",
    composer: "Wolfgang Amadeus Mozart",
    year: 1787,
    composerDied: 1791,
    description: "Mozarts berühmte Serenade in G-Dur",
    audioUrl: "/audio/pd/eine-kleine-nachtmusik.mp3",
  },
  {
    id: "toccata-fugue-d-minor",
    title: "Toccata und Fuge d-Moll",
    composer: "Johann Sebastian Bach",
    year: 1708,
    composerDied: 1750,
    description: "Das dramatischste Orgelwerk aller Zeiten",
    audioUrl: "/audio/pd/toccata-fugue-d-minor.mp3",
  },
  {
    id: "nocturne-op9-no2",
    title: "Nocturne Op. 9 Nr. 2",
    composer: "Frédéric Chopin",
    year: 1832,
    composerDied: 1849,
    description: "Romantische Klavierpoesie in Es-Dur",
    audioUrl: "/audio/pd/nocturne-op9-no2.mp3",
  },
  {
    id: "clair-de-lune",
    title: "Clair de Lune",
    composer: "Claude Debussy",
    year: 1905,
    composerDied: 1918,
    description: "Impressionistisches Meisterwerk – Mondschein in Musik",
    audioUrl: "/audio/pd/clair-de-lune.mp3",
  },
  {
    id: "hall-mountain-king",
    title: "In der Halle des Bergkönigs",
    composer: "Edvard Grieg",
    year: 1875,
    composerDied: 1907,
    description: "Spannungsgeladenes Crescendo aus Peer Gynt",
    audioUrl: "/audio/pd/hall-mountain-king.mp3",
  },
  {
    id: "swan-lake",
    title: "Schwanensee – Thema",
    composer: "Pjotr Iljitsch Tschaikowski",
    year: 1876,
    composerDied: 1893,
    description: "Das ikonische Ballett-Thema",
    audioUrl: "/audio/pd/swan-lake.mp3",
  },
  {
    id: "four-seasons-spring",
    title: "Die vier Jahreszeiten – Frühling",
    composer: "Antonio Vivaldi",
    year: 1725,
    composerDied: 1741,
    description: "Lebhafte Barockmusik voller Energie",
    audioUrl: "/audio/pd/four-seasons-spring.mp3",
  },
  {
    id: "blue-danube",
    title: "An der schönen blauen Donau",
    composer: "Johann Strauss II",
    year: 1867,
    composerDied: 1899,
    description: "Der berühmteste Walzer der Welt",
    audioUrl: "/audio/pd/blue-danube.mp3",
  },
  {
    id: "moonlight-sonata",
    title: "Mondscheinsonate (1. Satz)",
    composer: "Ludwig van Beethoven",
    year: 1801,
    composerDied: 1827,
    description: "Melancholische Klaviermusik in cis-Moll",
    audioUrl: "/audio/pd/moonlight-sonata.mp3",
  },
  {
    id: "canon-in-d",
    title: "Kanon in D-Dur",
    composer: "Johann Pachelbel",
    year: 1680,
    composerDied: 1706,
    description: "Die bekannteste Akkordfolge der Musikgeschichte",
    audioUrl: "/audio/pd/canon-in-d.mp3",
  },
  {
    id: "ride-of-the-valkyries",
    title: "Ritt der Walküren",
    composer: "Richard Wagner",
    year: 1870,
    composerDied: 1883,
    description: "Epische Orchestermusik voller Dramatik",
    audioUrl: "/audio/pd/ride-of-the-valkyries.mp3",
  },
];
