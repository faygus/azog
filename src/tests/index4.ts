import { BaseParsing, ComponentCollectionBuiler } from "../parser/code-analyse/base-parsing";
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
						"child": 2
					},
					{
						"height": {
							"value": 200,
							"unit": "px"
						},
						"child": 3
					},
				]
			}
		},
		2: {
			"type": "labelWF",
			"value": {
				"text": "hey"
			}
		},
		3: {
			"type": "layers",
			"value": {
				"children": [
					{
						"positioner": {
							"padding": 20
						},
						"zIndex": 2,
						"child": 2,
						"mainLayer": true
					},
					{
						"positioner": {
							"padding": 0
						},
						"zIndex": 1,
						"child": 5
					},
				]
			}
		},
		4: {
			"type": "uniColorWF",
			"value": {
				"color": 0
			}
		},
		5: {
			"type": "uniColorWF",
			"value": {
				"color": {
					"propertyName": "color"
				}
			}
		}
	};

	const viewModels = {
		5: {
			"properties": {
				"color": "string"
			}
		}
	};

	const viewMockData = {
		5: {
			"color": {
				"loop": true,
				"values": [
					{
						"timeout": 0,
						"value": 2
					},
					{
						"timeout": 1000,
						"value": 3
					},
				]
			}
		}
	};

	const componentCollections = new ComponentCollectionBuiler(views, viewModels, viewMockData);
	const parser = new BaseParsing(componentCollections);

	const component = parser.getView(1);
	HTMLRenderer.render(component);
}
