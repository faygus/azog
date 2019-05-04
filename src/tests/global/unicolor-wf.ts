import { Parser } from "../../parser/code-analyse/main";
import { ViewType } from "../../parser/interfaces/types";
import { IUniColorWFViewJSON } from "../../parser/interfaces/uni-color-wf";
import { HTMLRenderer } from "../../renderer/main";
import { TestTools } from "../tools/tools";
import { IAppJSON } from "../../parser/interfaces/app";

export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: ViewType.UNI_COLOR_WF,
				value: {
					color: 1
				}
			}
		}
	};
	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
