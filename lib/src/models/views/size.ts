import { Unit } from "./unit";

export type Distance = {value: number, unit: Unit};
export type Size = Distance | 'full' | 'auto';
