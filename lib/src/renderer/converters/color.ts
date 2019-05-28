import { IColorJSON } from "../../interfaces/utils/color";
import { Converter } from "../utils/base-converter";

export class ColorConverter extends Converter<IColorJSON> { // TODO do not use JSON interfaces
	
	convert(value: IColorJSON): string {
		return `rgb(${value.red},${value.green},${value.blue})`;
	}
}
