import { Parser } from "../../../lib/src/parsing/main";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import appJSON from '../../../tests/json/label-wf';
import { TestTools } from "../tools/tools";

export function run(): void {
	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
