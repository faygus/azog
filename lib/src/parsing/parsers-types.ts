import { forLoopParser } from "./parsers/for-loop";
import { iconWFParser } from "./parsers/icon-wf";
import { imageParser } from "./parsers/image";
import { labelWFParser } from "./parsers/label-wf";
import { layersParser } from "./parsers/layers";
import { layoutParser } from "./parsers/layout";
import { routerParser } from "./parsers/router";
import { uniColorWFParser } from "./parsers/uni-color-wf";
import { ViewType } from "../interfaces/types/view-types";
import { conditionalViewParser } from "./parsers/if";

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
