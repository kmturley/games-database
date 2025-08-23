export enum RatingAge {
  Everyone = 'everyone',
  Everyone10Plus = 'everyone10plus',
  Teen = 'teen',
  Mature = 'mature',
  Adults = 'adults',
}

export enum RatingContent {
  AlcoholReference = 'alcohol-reference',
  Blood = 'blood',
  ComicMischief = 'comic-mischief',
  DrugReference = 'drug-reference',
  GamblingThemes = 'gambling-themes',
  Language = 'language',
  MatureHumor = 'mature-humor',
  PartialNudity = 'partial-nudity',
  SexualContent = 'sexual-content',
  SexualViolence = 'sexual-violence',
  StrongLanguage = 'strong-language',
  StrongSexualContent = 'strong-sexual-content',
  TobaccoReference = 'tobacco-reference',
  UseOfDrugs = 'use-of-drugs',
  Violence = 'violence',
  AnimatedBlood = 'animated-blood',
  BloodAndGore = 'blood-and-gore',
  CrudeHumor = 'crude-humor',
  FantasyViolence = 'fantasy-violence',
  IntenseViolence = 'intense-violence',
  Lyrics = 'lyrics',
  Nudity = 'nudity',
  RealGambling = 'real-gambling',
  SexualThemes = 'sexual-themes',
  SimulatedGambling = 'simulated-gambling',
  StrongLyrics = 'strong-lyrics',
  SuggestiveThemes = 'suggestive-themes',
  UseOfAlcohol = 'use-of-alcohol',
  UseOfTobacco = 'use-of-tobacco',
  ViolentReferences = 'violent-references',
}

export interface RatingInterface {
  age?: RatingAge;
  content?: RatingContent[];
}
