import { Parser } from "../../../lib/src/parsing/main";
import { IAppJSON } from "../../../lib/src/interfaces/types/app";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import { TestTools } from "../tools/tools";

export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: 'uniColorWF',
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