import { EnumConverter } from "../../utils/base-enum-converter";
import { WireframeColor } from "../../../entities/controls/wireframe/enums/color";

export class WireframeColorConverter extends EnumConverter<WireframeColor> {
	constructor() {
		super({
			[WireframeColor.BLACK]: '#000',
			[WireframeColor.DARK_GRAY]: '#555',
			[WireframeColor.LIGHT_GRAY]: '#aaa',
			[WireframeColor.WHITE]: '#fff',
		});
	}
}
