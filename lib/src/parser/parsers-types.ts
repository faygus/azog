import { forLoopParser } from "./code-analyse/parsers/for-loop";
import { iconWFParser } from "./code-analyse/parsers/icon-wf";
import { imageParser } from "./code-analyse/parsers/image";
import { labelWFParser } from "./code-analyse/parsers/label-wf";
import { layersParser } from "./code-analyse/parsers/layers";
import { layoutParser } from "./code-analyse/parsers/layout";
import { routerParser } from "./code-analyse/parsers/router";
import { uniColorWFParser } from "./code-analyse/parsers/uni-color-wf";
import { ViewType } from "./interfaces/types/view-types";
import { conditionalViewParser } from "./code-analyse/parsers/if";

export const parsersMap: { [key: string]: any } = { // TODO parser type
	[ViewType.LABEL_WF]: labelWFParser,
	[ViewType.ICON_WF]: iconWFParser,
	[ViewType.UNI_COLOR_WF]: uniColorWFParser,
	[ViewType.LAYERS]: layersParser,
	[ViewType.ROUTER]: routerParser,
	[ViewType.FOR_LOOP]: forLoopParser,
	[ViewType.LAYOUT]: layoutParser,
	[ViewType.IMAGE]: imageParser,
	[ViewType.IF]: conditionalViewParser,
	// ... TODO
};
