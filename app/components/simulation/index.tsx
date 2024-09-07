import { useState } from 'react';
import style from './style.module.css';

export function Simulation() {
  const [numChargePoints, setNumChargePoints] = useState(20);
  const [arrivalProbabilityMultiplier, setArrivalProbabilityMultiplier] = useState(100);
  const [carConsumption, setCarConsumption] = useState(18);
  const [chargingPower, setChargingPower] = useState(11);
  const [totalEnergyCharged, setTotalEnergyCharged] = useState(0);
  const [chargingEvents, setChargingEvents] = useState(0);

  const runSimulation = () => {
    setTotalEnergyCharged(1111);
    setChargingEvents(212);
  };

  return (
    <div className={style.container}>
      <div>
        <label>
          Number of charge points:
          <input
            type="number"
            value={numChargePoints}
            onChange={(e) => setNumChargePoints(Number(e.target.value))}
            min="1"
            max="30"
            className={style.input}
          />
        </label>
      </div>

      <div>
        <label>
          Arrival probability multiplier:
          <input
            type="range"
            min="20"
            max="200"
            value={arrivalProbabilityMultiplier}
            className={style.slider}
            onChange={(e) => setArrivalProbabilityMultiplier(Number(e.target.value))}
          />
          <span>{arrivalProbabilityMultiplier}%</span>
        </label>
      </div>

      <div>
        <label>
          Car consumption (kWh):
          <input
            type="number"
            value={carConsumption}
            onChange={(e) => setCarConsumption(Number(e.target.value))}
            className={style.input}
          />
        </label>
      </div>

      <div>
        <label>
          Charging power per charge point (kW):
          <input
            type="number"
            value={chargingPower}
            onChange={(e) => setChargingPower(Number(e.target.value))}
            className={style.input}
          />
        </label>
      </div>
      <button onClick={runSimulation} className={style.button}>Run Simulation</button>
      <div style={{ marginTop: '20px' }}>
        <h2>Results</h2>
        <p>Total energy charged: <span className={style.result}>{totalEnergyCharged} kWh</span></p>
        <p>Number of charging events per day: <span className={style.result}>{chargingEvents}</span></p>
      </div>
    </div>
  );
};
