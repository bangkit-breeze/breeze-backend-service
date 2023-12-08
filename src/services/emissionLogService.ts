import { createEmissionLog } from '../repositories/emissionLogRepository';
import { addExp } from '../repositories/userRepository';
import { addVehicleEmissionCount, addVehicleFootprintSum } from '../repositories/userRepository';

const emissionLog = async (userId, vehicleType, distance) => {
  let totalEmission;

  try {
    switch (vehicleType) {
      case 'bike':
        totalEmission = distance * 103;
        break;
      case 'bus':
        totalEmission = distance * 105;
        break;
      case 'car':
        totalEmission = distance * 182;
        break;
      case 'ferry':
        totalEmission = distance * 19;
        break;
      case 'plane':
        totalEmission = distance * 255;
        break;
      case 'train':
        totalEmission = distance * 41;
        break;
      default:
        throw new Error('Invalid vehicle type');
    }

    const isSuccessLogging = await createEmissionLog(userId, totalEmission);
    if (!isSuccessLogging) {
      throw new Error('Failed to log emission');
    }
    const isSuccessUpdateUser = await addExp(userId, 10);
    if (!isSuccessUpdateUser) {
      throw new Error('Failed to update user');
    }
    const isSuccessUpdateUserVehicleEmissionCount = await addVehicleEmissionCount(userId);
    if (!isSuccessUpdateUserVehicleEmissionCount) {
      throw new Error('Failed to update user vehicle emission count');
    }
    const isSuccessUpdateUserVehicleFootprintSum = await addVehicleFootprintSum(userId, totalEmission);
    if (!isSuccessUpdateUserVehicleFootprintSum) {
      throw new Error('Failed to update user vehicle footprint sum');
    }
    return isSuccessLogging;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { emissionLog };
