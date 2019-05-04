import { Unit } from "../../parser/entities/unit";

export function convertUnitForHtml(unit: Unit): string {
	const map = {
		[Unit.POURCENTAGE]: '%',
		[Unit.PX]: 'px'
	};
	return map[unit];
}
