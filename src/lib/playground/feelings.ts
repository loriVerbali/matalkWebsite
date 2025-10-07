import type { Category } from "./types";

// Use public URLs instead of imports to avoid build issues
const getAssetUrl = (path: string) => `/playground/feelings/${path}`;

export const feelingsData: Category[] = [
  {
    key: "goodBody",
    label: {
      en: "My Body Feels Good",
      es: "Mi Cuerpo Se Siente Bien",
      pt: "Meu Corpo Se Sente Bem",
    },
    categoryImage: getAssetUrl("goodPhysical.jpg"),
    tiles: [
      {
        key: "comfortable",
        label: { en: "Comfortable", es: "Cómodo", pt: "Confortável" },
        assetPath: getAssetUrl("goodBody/comfortable.jpg"),
      },
      {
        key: "relaxed",
        label: { en: "Relaxed", es: "Relajado", pt: "Relaxado" },
        assetPath: getAssetUrl("goodBody/relaxed.jpg"),
      },
      {
        key: "ok",
        label: { en: "I'm OK", es: "Estoy Bien", pt: "Estou Bem" },
        assetPath: getAssetUrl("goodBody/ok.jpg"),
      },
      {
        key: "warm",
        label: { en: "Warm", es: "Cálido", pt: "Quente" },
        assetPath: getAssetUrl("goodBody/warm.jpg"),
      },
      {
        key: "strong",
        label: { en: "Strong", es: "Fuerte", pt: "Forte" },
        assetPath: getAssetUrl("goodBody/strong.jpg"),
      },
      {
        key: "energetic",
        label: { en: "Energetic", es: "Energético", pt: "Energético" },
        assetPath: getAssetUrl("goodBody/energetic.jpg"),
      },
    ],
  },
  {
    key: "goodFeelings",
    label: {
      en: "My Feelings Are Good",
      es: "Mis Sentimientos Son Buenos",
      pt: "Meus Sentimentos São Bons",
    },
    categoryImage: getAssetUrl("goodEmotional.jpg"),
    tiles: [
      {
        key: "happy",
        label: { en: "Happy", es: "Feliz", pt: "Feliz" },
        assetPath: getAssetUrl("goodFeelings/happy.jpg"),
      },
      {
        key: "excited",
        label: { en: "Excited", es: "Emocionado", pt: "Animado" },
        assetPath: getAssetUrl("goodFeelings/excited.jpg"),
      },
      {
        key: "loved",
        label: { en: "Loved", es: "Amado", pt: "Amado" },
        assetPath: getAssetUrl("goodFeelings/loved.jpg"),
      },
      {
        key: "calm",
        label: { en: "Calm", es: "Tranquilo", pt: "Calmo" },
        assetPath: getAssetUrl("goodFeelings/calm.jpg"),
      },
      {
        key: "proud",
        label: { en: "Proud", es: "Orgulloso", pt: "Orgulhoso" },
        assetPath: getAssetUrl("goodFeelings/proud.jpg"),
      },
      {
        key: "silly",
        label: { en: "Silly", es: "Tonto", pt: "Bobo" },
        assetPath: getAssetUrl("goodFeelings/silly.jpg"),
      },
    ],
  },
  {
    key: "badFeelings",
    label: {
      en: "My Feelings Are Bad",
      es: "Mis Sentimientos Son Malos",
      pt: "Meus Sentimentos São Ruins",
    },
    categoryImage: getAssetUrl("badEmotional.jpg"),
    tiles: [
      {
        key: "sad",
        label: { en: "Sad", es: "Triste", pt: "Triste" },
        assetPath: getAssetUrl("badFeeling/sad.jpg"),
      },
      {
        key: "bored",
        label: { en: "Bored", es: "Aburrido", pt: "Entediado" },
        assetPath: getAssetUrl("badFeeling/bored.jpg"),
      },
      {
        key: "scared",
        label: { en: "Scared", es: "Asustado", pt: "Assustado" },
        assetPath: getAssetUrl("badFeeling/scared.jpg"),
      },
      {
        key: "worried",
        label: { en: "Worried", es: "Preocupado", pt: "Preocupado" },
        assetPath: getAssetUrl("badFeeling/worried.jpg"),
      },
      {
        key: "embarrassed",
        label: { en: "Embarrassed", es: "Avergonzado", pt: "Envergonhado" },
        assetPath: getAssetUrl("badFeeling/embarrassed.jpg"),
      },
      {
        key: "angry",
        label: { en: "Angry", es: "Enojado", pt: "Bravo" },
        assetPath: getAssetUrl("badFeeling/angry.jpg"),
      },
    ],
  },
  {
    key: "badBody",
    label: {
      en: "My Body Feels Bad",
      es: "Mi Cuerpo Se Siente Mal",
      pt: "Meu Corpo Se Sente Mal",
    },
    categoryImage: getAssetUrl("badPhysical.jpg"),
    tiles: [
      {
        key: "cold",
        label: { en: "Cold", es: "Frío", pt: "Frio" },
        assetPath: getAssetUrl("badBody/cold.jpg"),
      },
      {
        key: "hurt",
        label: { en: "Hurt", es: "Herido", pt: "Machucado" },
        assetPath: getAssetUrl("badBody/hurt.jpg"),
      },
      {
        key: "sick",
        label: { en: "Sick", es: "Enfermo", pt: "Doente" },
        assetPath: getAssetUrl("badBody/sick.jpg"),
      },
      {
        key: "tired",
        label: { en: "Tired", es: "Cansado", pt: "Cansado" },
        assetPath: getAssetUrl("badBody/tired.jpg"),
      },
      {
        key: "dizzy",
        label: { en: "Dizzy", es: "Mareado", pt: "Tonto" },
        assetPath: getAssetUrl("badBody/dizzy.jpg"),
      },
      {
        key: "itchy",
        label: { en: "Itchy", es: "Con Picazón", pt: "Com Coceira" },
        assetPath: getAssetUrl("badBody/itchy.jpg"),
      },
    ],
  },
];
