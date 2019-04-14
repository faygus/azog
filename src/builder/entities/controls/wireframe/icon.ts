import { ValueProvider } from "../binding";
import { WireframeColor } from "./enums/color";
import { WireframeSize } from "./enums/size";

/**
 * Icon component for wireframe
 */
export class IconWF {
	iconName?:  ValueProvider<string>;
	style = new IconWFStyle();
}

class IconWFStyle {
	color?: ValueProvider<WireframeColor>;
	size?: ValueProvider<WireframeSize>;
}
