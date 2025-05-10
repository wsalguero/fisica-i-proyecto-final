import { ResultadoTierra, SolucionMCU } from "../const/types";

export function problemaRadioyRPM(radio: number, rpm: number): SolucionMCU {
  const frecuencia = rpm / 60;
  const velocidadAngular = 2 * Math.PI * frecuencia;
  const velocidadLineal = velocidadAngular * radio;

  return {
    frecuencia,
    velocidadAngular,
    velocidadLineal,
  };
}

export function resolverTierraMCU(r: number, dias: number): ResultadoTierra {
  const omega = (2 * Math.PI) / dias; // rad/día
  const v = omega * r; // m/s
  const theta30 = omega * 30; // rad
  const a = (v * v) / r; // m/s²

  return {
    velocidadAngular: omega,
    velocidadTangencial: v,
    angulo30Dias: theta30,
    aceleracionCentripeta: a,
  };
}
