import { model, Schema } from 'mongoose';
import { AirQualityResponse } from '../types';

interface AirQualityDoc extends AirQualityResponse {
  createdAt: Date
  updateAt: Date
}

const airQualitySchema = new Schema<AirQualityDoc>(
  {
    ts: { type: String, required: true },
    aqius: { type: Number, required: true },
    mainus: { type: String, required: true },
    aqicn: { type: Number, required: true },
    maincn: { type: String, required: true }
  },
  { timestamps: true }
);

export default model<AirQualityDoc>('AirQuality', airQualitySchema);
