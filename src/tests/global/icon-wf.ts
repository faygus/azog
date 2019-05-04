import { Parser } from "../../parser/code-analyse/main";
import { IIconWFViewJSON } from "../../parser/interfaces/icon-wf";
import { ViewType } from "../../parser/interfaces/types";
import { HTMLRenderer } from "../../renderer/main";
import { TestTools } from "../tools/tools";
import { IAppJSON } from "../../parser/interfaces/app";

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
