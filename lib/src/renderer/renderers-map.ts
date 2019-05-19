import { IComponentRenderer2 } from "./interfaces/component-renderer2";
import { IBaseRenderer2 } from "./interfaces/base-renderer2";
import { LabelWFView } from "../parser/entities/controls/wireframe/label";
import { IconWFView } from "../parser/entities/controls/wireframe/icon";
import { UniColorWFView } from "../parser/entities/controls/wireframe/uniColor";
import { LayersView } from "../parser/entities/layers";
import { RouterView } from "../parser/entities/router";
import { ForLoopView } from "../parser/entities/for-loop";
import { LayoutView } from "../parser/entities/layout";
import { LabelWFRenderer } from "./wireframe/label";
import { IconWFRenderer } from "./wireframe/icon";
import { UniColorWFRenderer } from "./wireframe/unicolor";
import { LayersRenderer } from "./layers";
import { RouterRenderer } from "./router";
import { ForLoopRenderer } from "./for-loop";
import { LayoutRenderer } from "./layout";
import { ImageView } from "../parser/entities/controls/image";
import { ImageRenderer } from "./controls/image";
import { ConditionalView } from "../parser/entities/if";
import { ConditionalViewRenderer } from "./if";

export function getRenderersMap(componentRenderer: IComponentRenderer2): Map<any, IBaseRenderer2<any>> {
	const map = new Map<any, IBaseRenderer2<any>>([
		[LabelWFView, new LabelWFRenderer()],
		[IconWFView, new IconWFRenderer()],
		[UniColorWFView, new UniColorWFRenderer()],
		[LayersView, new LayersRenderer(componentRenderer)],
		[RouterView, new RouterRenderer(componentRenderer)],
		[ForLoopView, new ForLoopRenderer(componentRenderer)],
		[LayoutView, new LayoutRenderer(componentRenderer)],
		[ImageView, new ImageRenderer()],
		[ConditionalView, new ConditionalViewRenderer(componentRenderer)],
		// ... TODO
	]);
	return map;
}
