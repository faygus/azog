import { Converter } from "./base-converter";
import { WireframeColor } from "../../../../builder/entities/controls/wireframe/enums/color";

export class WireframeColorConverter extends Converter<WireframeColor> {
	constructor() {
		super({
			[WireframeColor.BLACK]: '#000',
			[WireframeColor.DARK_GRAY]: '#555',
			[WireframeColor.LIGHT_GRAY]: '#aaa',
			[WireframeColor.WHITE]: '#fff',
		});
	}
}
