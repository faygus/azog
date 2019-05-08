import { FlexDirection } from "../entities/old-layout";
import { ParsingException, ParsingErrorType } from "./error";
import { Unit } from "../entities/unit";
import { Size, Distance } from "../entities/size";
import { ISizeJSON, IDistanceJSON } from "../interfaces/container";

export class ParsingUtils {
	static getSize(size: ISizeJSON): Size {
		if (typeof size === 'number') {
			return {
				value: size,
				unit: Unit.PX
			};
		} else if (typeof size === 'string') {
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

	static getDistance(distanceJSON: IDistanceJSON): Distance {
		if (distanceJSON === undefined) {
			throw new Error('can not parse undefined distance');
		}
		if (typeof distanceJSON === 'number') {
			return {
				value: distanceJSON,
				unit: Unit.PX
			};
		}
		const unit = this.getUnit(distanceJSON.unit);
		const res = {
			value: distanceJSON.value,
			unit: unit
		};
		return res;
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
