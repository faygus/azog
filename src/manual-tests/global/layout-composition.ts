import { Parser } from "../../../lib/src/parsing/main";
import { IAppJSON } from "../../../lib/src/interfaces/types/app";
import { HTMLRenderer } from "../../../lib/src/renderer/main";
import { TestTools } from "../tools/tools";

export function run(): void {
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: 'composition',
				value: {
					hostId: 2,
					children: {
						'header': 3,
						'content': 4,
					}
				}
			},
			2: {
				type: 'layout',
				value: {
					direction: 'column',
					children: [
						{
							size: 150,
							componentInfos: {
								ref: 'header'
							}
						},
						{
							size: 10
						},
						{
							size: 200,
							componentInfos: {
								ref: 'content'
							}
						},
					]
				}
			},
			3: {
				type: 'uniColorWF',
				value: {
					color: 1
				}
			},
			4: {
				type: 'labelWF',
				value: {
					text: 'i am the content'
				}
			}
		}
	};

	const parser = new Parser(appJSON);
	const component = parser.parse(1);
	HTMLRenderer.render(component, TestTools.getRootHtml());
}
