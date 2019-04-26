import { FlexDirection } from "../entities/layout";
import { ParsingException, ParsingErrorType } from "./error";
import { Unit } from "../entities/unit";
import { SIZE } from "../entities/size";
import { ISizeJSON } from "../interfaces/container";

export class ParsingUtils {
	static getSize(size: ISizeJSON): SIZE {
		if (typeof size === 'string') {
			if (size === 'full') {
				return 'full';
			}
			if (size === 'auto') {
				return 'auto';
			}
		} else {
			if (typeof size === 'object') {
				if (size.value !== undefined) {
					if (size.unit !== undefined) {
						const unit = this.getUnit(size.unit);
						const res = {
							value: size.value,
							unit: unit
						};
						return res;
					}
				}
			}
		}
		throw new ParsingException(ParsingErrorType.SIZE, size);
	}

	static getUnit(unit: string): Unit {
		if (unit === 'px') {
			return Unit.PX;
		}
		if (unit === '%') {
			return Unit.POURCENTAGE;
		}
		throw new ParsingException(ParsingErrorType.UNIT);
	}

	static getDirection(direction: string): FlexDirection {
		const map: { [key: string]: FlexDirection } = {
			'row': FlexDirection.ROW,
			'column': FlexDirection.COLUMN
		};
		return map[direction];
	}
}
