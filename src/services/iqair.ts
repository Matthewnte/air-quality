import config from '../config';
import AirQuality from '../model';
import { AirQualityResponse, Zone } from '../types';
import api from '../utils/api';
import AppError from '../utils/appError';

const iqair = {
  /**
   *
   * @param zone the latitude and longitude of the area of interest.
   * @returns nearest city's data, using the lat/lon coordinates or user IP geolocation.
   */
  getAirQuality: async ({ latitude, longitude }: Zone): Promise<AirQualityResponse> => {
    if (!config.iqair.apiKey) {
      throw new AppError('Please provide your iqair API key in environment', 500);
    }
    // gets specified zone, if zone is specified it default to the user's IP geolocation
    const url = `${config.iqair.baseUrl}/nearest_city?lat=${latitude}&lon=${longitude}&key=${config.iqair.apiKey}`;
    const airQuality: any = await api.get<AirQualityResponse>(url);
    return airQuality.data.current.pollution;
  },

  /**
   *
   * @param airQualityData data recieved after requesting for air Quality
   * @returns logged air quality data
   */
  logAirQualityToDB: async (AirQualityData: AirQualityResponse) => {
    return await AirQuality.create(AirQualityData);
  }
};

export default iqair;
