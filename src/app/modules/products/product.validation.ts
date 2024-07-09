import { z } from 'zod';

const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required.' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required.' }),
  price: z
    .number()
    .min(0, { message: 'Price must be greater than or equal to 0.' }),
  stock: z
    .number()
    .min(0, { message: 'Stock must be greater than or equal to 0.' }),
  availabilityStock: z.boolean(),
  rating: z
    .number()
    .min(0, { message: 'Rating must be greater than or equal to 0.' }),
  thumbnail: z.string().url({ message: 'Thumbnail must be a valid URL.' }),
  images: z
    .array(z.string().url())
    .min(1, { message: 'At least one image URL is required.' }),
  categoriesName: z.string().min(1, { message: 'Category name is required.' }),
  physicalCharacteristics: z.object({
    height: z.string().min(1, { message: 'Height description is required.' }),
    spread: z.string().min(1, { message: 'Spread description is required.' }),
    growthRate: z
      .string()
      .min(1, { message: 'Growth rate description is required.' }),
    matureHeight: z
      .string()
      .min(1, { message: 'Mature height description is required.' }),
    matureSpread: z
      .string()
      .min(1, { message: 'Mature spread description is required.' }),
    plantingZone: z
      .string()
      .min(1, { message: 'Planting zone description is required.' }),
  }),
  careInformation: z.object({
    wateringRequirements: z
      .string()
      .min(1, { message: 'Watering requirements description is required.' }),
    sunlightRequirements: z
      .string()
      .min(1, { message: 'Sunlight requirements description is required.' }),
    soilType: z
      .string()
      .min(1, { message: 'Soil type description is required.' }),
    fertilization: z
      .string()
      .min(1, { message: 'Fertilization description is required.' }),
    pruning: z.string().min(1, { message: 'Pruning description is required.' }),
    pestsAndDiseases: z
      .string()
      .min(1, { message: 'Pests and diseases description is required.' }),
  }),
  additionalInformation: z.object({
    origin: z.string().min(1, { message: 'Origin description is required.' }),
    seasonality: z
      .string()
      .min(1, { message: 'Seasonality description is required.' }),
    hardiness: z
      .string()
      .min(1, { message: 'Hardiness description is required.' }),
    toxicity: z
      .string()
      .min(1, { message: 'Toxicity description is required.' }),
    uses: z.string().min(1, { message: 'Uses description is required.' }),
  }),
});

export default productValidationSchema;
