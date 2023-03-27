import { Request, Response } from 'express';
import iqair from '../services/iqair';
import { catchAsync } from '../utils/catchAsyncError';

const airQualityController = {
  get: catchAsync(async (request: Request, response: Response) => {
    const { latitude, longitude } = request.query;
    const zone = { latitude: latitude as string, longitude: longitude as string };
    const airquality = await iqair.getAirQuality(zone);

    return response.status(200).json({
      status: 'success',
      result: { pollution: airquality }
    });
  }),
};

export default airQualityController;
