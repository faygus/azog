import { BaseParsing, IComponentCollection, ComponentCollectionBuiler } from "../builder/code-analyse/base-parsing";
import { HTMLRenderer } from "../renderer/html-renderer";

export function run(): void {
	const views = {
		1: {
			"type": "labelWF",
			"value": {
				"text": "Dashboard",
				"style": {
					"color": 1,
					"size": 1
				}
			}
		},
		2: {
			"type": "labelWF",
			"value": {
				"text": "hey man !",
				"style": {
					"color": 2,
					"size": 2
				}
			}
		},
		3: {
			"type": "labelWF",
			"value": {
				"text": "Calendar",
				"style": {
					"color": 1,
					"size": 2
				}
			}
		},
		4: {
			"type": "structuralDirective",
			"structuralDirective": "router",
			"value": {
				"data": {
					"routes": {
						"DASHBOARD": {
							"componentId": 1
						},
						"CONTACTS": {
							"componentId": 5
						},
						"CALENDAR": {
							"componentId": 3
						},
						"EMAIL": {
							"componentId": 9
						}
					},
					"activatedRoute": {
						"propertyName": "route"
					}
				}
			}
		},
		5: {
			"type": "iconWF",
			"value": {
				"iconName": "users",
				"style": {
					"color": 2,
					"size": 2
				}
			}
		},
		6: { // main layout
			"type": "layout",
			"value": {
				"direction": "row",
				"children": [
					{
						"width": {
							"value": 80,
							"unit": "px"
						},
						"child": {
							"id": 7,
							"inputs": {
								"route": {
									"propertyName": "route"
								}
							}
						}
					},
					{
						"width": "full",
						"child": {
							"id": 4,
							"inputs": {
								"route": {
									"propertyName": "route"
								}
							}
						}
					}
				]
			}
		},
		7: { // menu items
			"type": "layout",
			"value": {
				"direction": "column",
				"children": [
					{
						"height": {
							"value": 100,
							"unit": "px"
						},
						"child": {
							"id": 8,
							"inputs": {
								"iconName": "calendar",
								"isSelected": {
									"propertyName": "route",
									"pipe": {
										"id": 3,
										"args": {
											"comparedTo": "CALENDAR"
										}
									}
								},
							}
						}
					},
					{
						"height": {
							"value": 100,
							"unit": "px"
						},
						"child": {
							"id": 8,
							"inputs": {
								"iconName": "users",
								"isSelected": {
									"propertyName": "route",
									"pipe": {
										"id": 3,
										"args": {
											"comparedTo": "CONTACTS"
										}
									}
								}
							}
						}
					},
					{
						"height": {
							"value": 100,
							"unit": "px"
						},
						"child": {
							"id": 8,
							"inputs": {
								"iconName": "dashboard",
								"isSelected": {
									"propertyName": "route",
									"pipe": {
										"id": 3,
										"args": {
											"comparedTo": "DASHBOARD"
										}
									}
								}
							}
						}
					},
					{
						"height": {
							"value": 100,
							"unit": "px"
						},
						"child": {
							"id": 8,
							"inputs": {
								"iconName": "envelope",
								"isSelected": {
									"propertyName": "route",
									"pipe": {
										"id": 3,
										"args": {
											"comparedTo": "EMAIL"
										}
									}
								}
							}
						}
					}
				]
			}
		},
		8: { // menu item
			"type": "iconWF",
			"value": {
				"iconName": {
					"propertyName": "iconName"
				},
				"style": {
					"color": {
						"propertyName": "isSelected",
						"pipe": 2
					},
					"size": 1
				}
			}
		},
		// email view
		9: {
			"type": "layout",
			"value": {
				"direction": "row",
				"children": [
					{
						"width": {
							"value": 200,
							"unit": "px"
						},
						"child": 12
					},
					// main zone
					{
						"width": "full",
						"child": 10
					},
				]
			}
		},
		10: {
			"type": "layout",
			"value": {
				"direction": "column",
				"children": [
					{
						"height": {
							"value": 100,
							"unit": "px"
						},
						"child": 11
					},
					{
						"height": "full"
					}
				]
			}
		},
		11: {
			"type": "labelWF",
			"value": {
				"text": "header"
			}
		},
		12: {
			"type": "labelWF",
			"value": {
				"text": "navigation"
			}
		}
	};

	const viewModels = {
		4: {
			"properties": {
				"route": "string"
			},
			"inputs": {
				"route": "string"
			}
		},
		6: {
			"properties": {
				"route": "string"
			}
		},
		7: {
			"properties": {
				"route": "string"
			},
			"inputs": {
				"route": "string"
			}
		},
		8: {
			"properties": {
				"isSelected": "bool",
				"iconName": "string"
			},
			"inputs": {
				"isSelected": "bool",
				"iconName": "string"
			}
		}
	};

	const viewMockData = {
		6: {
			"route": {
				//"loop": true,
				"values": [
					/*{
						"timeout": 0,
						"value": "CALENDAR"
					},
					{
						"timeout": 1000,
						"value": "CONTACTS"
					},
					{
						"timeout": 2000,
						"value": "DASHBOARD"
					},*/
					{
						"timeout": 0,
						"value": "EMAIL"
					}
				]
			}
		}
	}

	const componentCollections = new ComponentCollectionBuiler(views, viewModels, viewMockData);
	const parser = new BaseParsing(componentCollections);

	const component = parser.getView(6);
	HTMLRenderer.render(component);
}

/*
Structural directive router
inputs:
- route: string
- routes : {route: string, componentId: number}[]
*/