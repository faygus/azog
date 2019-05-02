import { ValueProvider } from "../binding";
import { WireframeColor } from "./enums/color";
import { WireframeSize } from "./enums/size";

/**
 * Label component for wireframe
 */
export class LabelWFView {
	text?:  ValueProvider<string>;
	style = new LabelWFStyle();
}

class LabelWFStyle {
	color?: ValueProvider<WireframeColor>;
	size?: ValueProvider<WireframeSize>;
}
