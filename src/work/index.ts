import { BaseParsing, IComponentCollection, ComponentCollectionBuiler } from "../builder/code-analyse/base-parsing";
import { HTMLRenderer } from "../renderer/html-renderer";

export function run(): void {
	const views = {
		1: {
			"type": "layout",
			"value": {
				"direction": "column",
				"children": [
					{
						"height": {
							"value": 200,
							"unit": "px"
						},
						"child": {
							"structuralDirective": "if",
							"data": {
								"condition": true
							},
							"template": {
								"componentId": 2
							}
						}
					},
					{
						"height": {
							"value": 100,
							"unit": "px"
						},
						"hostContent": "default"
					},
					{
						"height": {
							"value": 100,
							"unit": "px"
						},
						"child": 3
					},
				]
			}
		},
		2: {
			"type": "iconWF",
			"value": {
				"iconName": "users",
				"style": {
					"color": 0,
					"size": 2
				}
			}
		},
		3: {
			"type": "iconWF",
			"value": {
				"iconName": "calendar",
				"style": {
					"color": 1,
					"size": 2
				}
			}
		},
		4: {
			"type": "viewComposition",
			"value": {
				"hostComponentId": 1,
				"content": 5
			}
		},
		5: {
			"type": "labelWF",
			"value": {
				"text": "hey hey",
				"style": {
					"size": 2,
					"color": 1
				}
			}
		}
	};

	const componentCollections = new ComponentCollectionBuiler(views);

	const parser = new BaseParsing(componentCollections);
	const component = parser.getView(4);
	HTMLRenderer.render(component);
}
