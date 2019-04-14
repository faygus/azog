import { Unit } from "./unit";

export type DISTANCE = {value: number, unit: Unit};
export type SIZE = DISTANCE | 'full' | 'auto';
