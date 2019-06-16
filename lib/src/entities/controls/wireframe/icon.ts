import { ValueProvider } from "../binding";
import { WireframeColor } from "./enums/color";
import { WireframeSize } from "./enums/size";

/**
 * Icon component for wireframe
 */
export class IconWFView {
	iconNameIndex?:  ValueProvider<number>;
	style = new IconWFStyle();
}

class IconWFStyle {
	color?: ValueProvider<WireframeColor>;
	size?: ValueProvider<WireframeSize>;
}
