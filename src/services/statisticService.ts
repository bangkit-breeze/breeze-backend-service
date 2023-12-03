import { findUserStatistic } from "../repositories/statisticRepository";

const getStatistic = async (userId) => {
  const statistic = await findUserStatistic(userId);
  
  if (!statistic) {
    return null;
  }

  const vehicleEmissionCount = Number(statistic?.vehicle_emission_count ?? 0);
  const foodEmissionCount = Number(statistic?.food_emission_count ?? 0);

  const totalEmissions = vehicleEmissionCount + foodEmissionCount;

  let foodEmissionPercentage;
  let vehicleEmissionPercentage;
  // Check to avoid division by zero
  if (totalEmissions > 0) {
    foodEmissionPercentage = (foodEmissionCount / totalEmissions) * 100;
    vehicleEmissionPercentage = (vehicleEmissionCount / totalEmissions) * 100;
  }
  else{
    foodEmissionPercentage = 0;
    vehicleEmissionPercentage = 0;
  }

  return {
    foodEmissionCount,
    vehicleEmissionCount,
    foodEmissionPercentage,
    vehicleEmissionPercentage,
    foodFootprintSum: Number(statistic?.food_footprint_sum ?? 0),
    vehicleFootprintSum: Number(statistic?.vehicle_footprint_sum ?? 0),
  };
}

export { getStatistic };
