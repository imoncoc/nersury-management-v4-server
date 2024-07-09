export type TProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
  availabilityStock: boolean;
  rating: number;
  thumbnail: string;
  images: string[];
  categoriesName: string;
  physicalCharacteristics: {
    height: string;
    spread: string;
    growthRate: string;
    matureHeight: string;
    matureSpread: string;
    plantingZone: string;
  };
  careInformation: {
    wateringRequirements: string;
    sunlightRequirements: string;
    soilType: string;
    fertilization: string;
    pruning: string;
    pestsAndDiseases: string;
  };
  additionalInformation: {
    origin: string;
    seasonality: string;
    hardiness: string;
    toxicity: string;
    uses: string;
  };
};
