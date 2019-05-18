import { Parser } from "../../../lib/src/parser/code-analyse/main";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import appJSON from '../../../tests/json/image';
import { TestTools } from "../tools/tools";

export function run(): void {
	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
