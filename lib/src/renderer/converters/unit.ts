import { Unit } from "../../models/views/unit";
import { Distance } from "../../models/views/size";

export function convertUnitForHtml(unit: Unit): string {
	const map = {
		[Unit.POURCENTAGE]: '%',
		[Unit.PX]: 'px'
	};
	return map[unit];
}

export function convertDistanceForHtml(distance: Distance): string {
	const unitHtml = convertUnitForHtml(distance.unit);
	return distance.value + unitHtml;
}