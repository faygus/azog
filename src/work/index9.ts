import { BaseParsing, ComponentCollectionBuiler } from "../builder/code-analyse/base-parsing";
import { HTMLRenderer } from "../renderer/html-renderer";

export function run(): void {
	const views = {
		1: {
			"type": "layout2",
			"value": {
				"direction": "row",
				"children": [
					{
						"size": {
							"value": 100,
							"unit": "px"
						},
						"spaceWithPrevious": 20
					},
					{
						"size": {
							"value": 90,
							"unit": "px"
						},
						"spaceWithPrevious": 30
					},
				]
			}
		},
		2: {
			"type": "viewComposition",
			"value": {
				"parentView": 1,
				"children": [
					{
						"id": 5
					},
					{
						"id": 4,
						"directive": {
							"name": "if",
							"data": {
								"condition": {
									"propertyName": "show"
								}
							}
						}
					},
				]
			}
		},
		3: {
			"type": "labelWF",
			"value": {
				"text": "hello"
			}
		},
		4: {
			"type": "labelWF",
			"value": {
				"text": "world"
			}
		},
		5: {
			"type": "iconWF",
			"value": {
				"iconName": "calendar"
			}
		}
	};

	const viewModels = {
	};

	const viewMockData = {
	};

	const componentCollections = new ComponentCollectionBuiler(views, viewModels, viewMockData);
	const parser = new BaseParsing(componentCollections);

	const component = parser.getView(2);
	HTMLRenderer.render(component);
}
