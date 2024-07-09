import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  availabilityStock: { type: Boolean, required: true },
  rating: { type: Number, required: true, min: 0 },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  categoriesName: { type: String, required: true },
  physicalCharacteristics: {
    height: { type: String, required: true },
    spread: { type: String, required: true },
    growthRate: { type: String, required: true },
    matureHeight: { type: String, required: true },
    matureSpread: { type: String, required: true },
    plantingZone: { type: String, required: true },
  },
  careInformation: {
    wateringRequirements: { type: String, required: true },
    sunlightRequirements: { type: String, required: true },
    soilType: { type: String, required: true },
    fertilization: { type: String, required: true },
    pruning: { type: String, required: true },
    pestsAndDiseases: { type: String, required: true },
  },
  additionalInformation: {
    origin: { type: String, required: true },
    seasonality: { type: String, required: true },
    hardiness: { type: String, required: true },
    toxicity: { type: String, required: true },
    uses: { type: String, required: true },
  },
});

export const productModel = model<TProduct>('Product', productSchema);
