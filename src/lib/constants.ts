export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "GenreFlip";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const GENRES = [
  {
    id: "hiphop",
    name: "Hip-Hop",
    emoji: "🎤",
    color: "from-amber-500 to-orange-600",
    prompt: "hip-hop rap beat, 808 bass, trap hi-hats, boom bap drums",
  },
  {
    id: "edm",
    name: "EDM",
    emoji: "🎧",
    color: "from-cyan-400 to-blue-600",
    prompt: "electronic dance music, synthesizer, heavy bass drop, four-on-the-floor beat",
  },
  {
    id: "metal",
    name: "Metal",
    emoji: "🤘",
    color: "from-red-600 to-red-900",
    prompt: "heavy metal, distorted electric guitar, double bass drums, aggressive",
  },
  {
    id: "jazz",
    name: "Jazz",
    emoji: "🎷",
    color: "from-yellow-600 to-amber-800",
    prompt: "smooth jazz, saxophone, piano, upright bass, swing rhythm, brushed drums",
  },
  {
    id: "reggae",
    name: "Reggae",
    emoji: "🌴",
    color: "from-green-500 to-yellow-500",
    prompt: "reggae, offbeat guitar skank, deep bass, one drop rhythm, dub",
  },
  {
    id: "classical",
    name: "Klassik",
    emoji: "🎻",
    color: "from-purple-400 to-indigo-600",
    prompt: "classical orchestral arrangement, strings, piano, woodwinds, symphonic",
  },
  {
    id: "lofi",
    name: "Lo-Fi",
    emoji: "🌙",
    color: "from-indigo-400 to-purple-500",
    prompt: "lo-fi hip-hop, chill beats, vinyl crackle, mellow piano, relaxing",
  },
  {
    id: "pop",
    name: "Pop",
    emoji: "🎵",
    color: "from-pink-500 to-rose-500",
    prompt: "modern pop, catchy melody, polished production, synth pop, radio-ready",
  },
] as const;

export type GenreId = (typeof GENRES)[number]["id"];
