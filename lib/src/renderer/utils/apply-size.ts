import { convertUnitForHtml } from "../converters/unit";
import { Size } from "../../entities/size";

export function applySize(size: Size, htmlStyle: any, direction: 'row' | 'column'): void {
	if (typeof size === 'object') {
		const unitStr = convertUnitForHtml(size.unit);
		const sizeString = size.value + unitStr;
		if (direction === 'row') {
			htmlStyle.width = sizeString;
			htmlStyle.minWidth = sizeString;
		} else { // column
			htmlStyle.height = sizeString;
			htmlStyle.minHeight = sizeString;
		}
	} else {
		if (size === 'full') {
			htmlStyle.flex = '1';
		}
	}
}
