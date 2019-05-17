import { Parser } from "../../../lib/src/parser/code-analyse/main";
import { IIconWFViewJSON } from "../../../lib/src/parser/interfaces/icon-wf";
import { ViewType } from "../../../lib/src/parser/interfaces/types";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import { TestTools } from "../tools/tools";
import { IAppJSON } from "../../../lib/src/parser/interfaces/app";

export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: ViewType.ICON_WF,
				value: {
					iconName: 'calendar',
					style: {
						size: 2,
						color: 1
					}
				}
			}
		}
	};

	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
