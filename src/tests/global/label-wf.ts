import { Parser } from "../../../lib/src/parser/code-analyse/main";
import { IAppJSON } from "../../../lib/src/parser/interfaces/app";
import { ViewType } from "../../../lib/src/parser/interfaces/types";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import { TestTools } from "../tools/tools";

export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: ViewType.LABEL_WF,
				value: {
					text: 'hello',
					style: {
						size: 1,
						color: 2
					}
				}
			}
		}
	};
	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
