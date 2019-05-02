export const ROOT = {
	"type": "layout",
	"value": {
		"direction": "column",
		"children": [
			{
				"structuralDirective": "for",
				"data": {
					"list": {
						"propertyName": "list",
						"variable": "item"
					}
				},
				"template": {
					"height": {
						"value": 80,
						"unit": "px"
					},
					"width": {
						"value": 120,
						"unit": "px"
					},
					"child": {
						"id": 9,
						"inputs": {
							"text": {
								"propertyName": "item"
							}
						}
					}
				}
			}
		]
	}
}
/*{
	"type": "layout",
	"value":
	{
		"direction": "row",
		"children": [
			{
				"width": {
					"value": 100,
					"unit": "px"
				},
				"child": 1
			},
			{
				"width": {
					"value": 100,
					"unit": "px"
				},
				"child": 8
			},
			{
				"width": "full",
				"child": {
					"structuralDirective": "if",
					"data": {
						"condition": {
							"propertyName": "show"
						}
					},
					"template": {
						"componentId": 7,
					}
				}
			},
		]
	}
};
*/