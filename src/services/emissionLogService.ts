import { createEmissionLog } from '../repositories/emissionLogRepository';
import {
	addExp,
	addFoodEmissionCount,
	addFoodFootprintSum,
	addTotalCo2Removed,
} from '../repositories/userRepository';
import {
	addVehicleEmissionCount,
	addVehicleFootprintSum,
} from '../repositories/userRepository';

const vehicleEmissionLog = async (userId, vehicleType, distance) => {
	let totalEmission;
	const rewardExp = 10;

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

		const isSuccessLogging = await createEmissionLog(
			userId,
			vehicleType,
			totalEmission,
			'VEHICLE',
			rewardExp
		);
		if (!isSuccessLogging) {
			throw new Error('Failed to log emission');
		}
		const isSuccessUpdateUser = await addExp(userId, rewardExp);
		if (!isSuccessUpdateUser) {
			throw new Error('Failed to update user');
		}
		const isSuccessUpdateUserVehicleEmissionCount =
			await addVehicleEmissionCount(userId);
		if (!isSuccessUpdateUserVehicleEmissionCount) {
			throw new Error('Failed to update user vehicle emission count');
		}
		const isSuccessUpdateUserVehicleFootprintSum = await addVehicleFootprintSum(
			userId,
			totalEmission
		);
		if (!isSuccessUpdateUserVehicleFootprintSum) {
			throw new Error('Failed to update user vehicle footprint sum');
		}
		const isSuccessUpdateTotalC02 = await addTotalCo2Removed(
			userId,
			totalEmission
		);
		if (!isSuccessUpdateTotalC02) {
			throw new Error('Failed to update total C02');
		}
		return isSuccessLogging;
	} catch (err) {
		throw new Error(err.message);
	}
};

const foodEmissionLog = async (userId, foodName, totalEmission) => {
	const rewardExp = 10;

	try {
		const isSuccessLogging = await createEmissionLog(
			userId,
			foodName,
			totalEmission,
			'FOOD',
			rewardExp
		);
		if (!isSuccessLogging) {
			throw new Error('Failed to log emission');
		}
		const isSuccessUpdateUser = await addExp(userId, rewardExp);
		if (!isSuccessUpdateUser) {
			throw new Error('Failed to update user');
		}
		const isSuccessUpdateUserFoodEmissionCount =
			await addFoodEmissionCount(userId);
		if (!isSuccessUpdateUserFoodEmissionCount) {
			throw new Error('Failed to update user food emission count');
		}
		const isSuccessUpdateUserFoodFootprintSum = await addFoodFootprintSum(
			userId,
			totalEmission
		);
		if (!isSuccessUpdateUserFoodFootprintSum) {
			throw new Error('Failed to update user food footprint sum');
		}
		const isSuccessUpdateTotalC02 = await addTotalCo2Removed(
			userId,
			totalEmission
		);
		if (!isSuccessUpdateTotalC02) {
			throw new Error('Failed to update total C02');
		}
		return { isSuccessLogging, rewardExp };
	} catch (err) {
		throw new Error(err.message);
	}
};

export { vehicleEmissionLog, foodEmissionLog };
