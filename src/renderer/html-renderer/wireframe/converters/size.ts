import { Converter } from "./base-converter";
import { WireframeSize } from "../../../../builder/entities/controls/wireframe/enums/size";

export class WireframeSizeConverter extends Converter<WireframeSize> {
	constructor() {
		super({
			[WireframeSize.SMALL]: '10px',
			[WireframeSize.MEDIUM]: '20px',
			[WireframeSize.HIGH]: '30px',
		});
	}
}
