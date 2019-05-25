import { HTMLRenderer, IAppJSON, Parser } from "../../../lib";
import { TestTools } from "../tools/tools";

/**
 * Try to represent a layout (horizontal or vertical)
 * with a static content
 */
export function run(): void {
	const dataJSON: IAppJSON = {
		views: {
			1: {
				type: 'layout',
				value: {
					direction: 'row',
					children: [
						{
							size: 200,
							componentInfos: {
								id: 2
							}
						},
						{
							size: 20
						},
						{
							size: 100,
							componentInfos: {
								id: 3
							}
						},
						{
							size: 5
						},
						{
							size: 100,
							componentInfos: {
								id: 4
							}
						}
					]
				}
			},
			2: {
				type: 'uniColorWF',
				value: {
					color: 0
				}
			},
			3: {
				type: 'uniColorWF',
				value: {
					color: 1
				}
			},
			4: {
				type: 'uniColorWF',
				value: {
					color: 2
				}
			}
		}
	};
	const parser = new Parser(dataJSON);
	const view = parser.parse(1);
	HTMLRenderer.render(view, TestTools.getRootHtml());
}
