const BASE_ARRIVAL_PROB = [
  0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094,
  0.0283, 0.0283, 0.0566, 0.0566, 0.0566, 0.0755, 0.0755, 0.0755,
  0.1038, 0.1038, 0.1038, 0.0472, 0.0472, 0.0472, 0.0094, 0.0094
];

function adjustProbabilities(probMultiplier : number) : number[] {
  const scaleMultiplier = probMultiplier / 100;
  const adjustedProbabilities = BASE_ARRIVAL_PROB.map(prob => prob * scaleMultiplier);
  return adjustedProbabilities;
}

export const runSimulation = (chargePointsAmount: number, probMultiplier: number, carConsumption : number, chargingPower: number, days: number) => {
  const adjustedArrivalProb = adjustProbabilities(probMultiplier);
  const energyDeliveredPerTick = chargingPower * 0.25;
  const energyNeededPerKm = carConsumption / 100;
  const distanceCoveredPerTick = energyDeliveredPerTick / energyNeededPerKm;
  
  let totalDailyKmDemand = 0;
  let chargingEvents = 0;
  const chargePoints = new Array(chargePointsAmount).fill(0);

  for(let z = 0; z < days; z++){
    for(let i = 0; i < adjustedArrivalProb.length; i++) {
      for(let j = 0; j < 4; j++){
        const activeChargingPoints = chargePoints.filter(x => x > 0).length;
        if(activeChargingPoints > 0) {
          chargePoints.forEach((x, index) => {
            if(x > 0) {
              const rechargeableKmInTick = Math.min(distanceCoveredPerTick, x);
              chargePoints[index] = x - rechargeableKmInTick;
              totalDailyKmDemand += rechargeableKmInTick;
            }
          })
          
          if(activeChargingPoints === chargePointsAmount) continue;
        }
        
        const carArrives = Math.random() < adjustedArrivalProb[i];
        
        if(carArrives) {
          const index = chargePoints.indexOf(0);
          if(index === -1) continue;
          chargePoints[index] = getKmFromProbability(Math.random());
          if(chargePoints[index] > 0){
            chargingEvents += 1;
          };
        }
      }
    }
  }
  const result = {chargingEvents, totalEnergyCharged: totalDailyKmDemand * energyNeededPerKm};
  return result;
}

function getKmFromProbability(randomNumber : number) {
  const kmValues = [0, 5, 10, 20, 30, 50, 100, 200, 300];
  const probabilities = [0.3431, 0.3921, 0.4901, 0.6077, 0.6959, 0.8135, 0.9213, 0.9703, 0.9997];

  for (let i = 0; i < probabilities.length; i++) {
    if (randomNumber < probabilities[i]) {
      return kmValues[i];
    }
  }

  return kmValues[kmValues.length - 1];
}
