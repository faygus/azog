import { EnumConverter } from "../../utils/base-enum-converter";
import { WireframeSize } from "../../../models/views/controls/wireframe/enums/size";

export class WireframeSizeConverter extends EnumConverter<WireframeSize> {
	constructor() {
		super({
			[WireframeSize.SMALL]: '10px',
			[WireframeSize.MEDIUM]: '20px',
			[WireframeSize.HIGH]: '30px',
		});
	}
}
