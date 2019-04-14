/**
 * Vertical list of menu icons
 */
export const VIEW_11 = {
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
						"value": 70,
						"unit": "px"
					},
					"child": {
						"id": 12,
						"inputs": {
							"iconName": {
								"propertyName": "item"
							},
							/*"selected": {
								"function": {
									"name": "isSelected",
									"args": [
										"item"
									]
								}
							}*/
						}
					}
				}
			}
		]
	}
}