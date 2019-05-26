import { ImagesResources, Parser, HTMLRenderer, IAppJSON } from "../../lib";
import { TestTools } from "../manual-tests/tools/tools";

const image1 = require("../../assets/images/spain.png");
const image2 = require("../../assets/images/swiss.jpg");

export function run(): void {
	ImagesResources.registerImages({
		'spain': image1,
		'swiss': image2
	});
	const appJSON: IAppJSON = {
		views: {
			1: {
				type: 'uniColorWF',
				value: {
					color: 1
				}
			},
			2: { // main layout
				type: 'layout',
				value: {
					direction: 'row',
					children: [
						{
							size: 200,
							componentInfos: {
								id: 10
							}
						},
						{
							size: 40,
							componentInfos: {
								id: 4
							}
						}
					]
				}
			},
			3: {
				type: 'uniColorWF',
				value: {
					color: 2
				}
			},
			4: { // center vertically container
				type: 'layers',
				value: {
					subLayers: [
						{
							zIndex: 1,
							positionInsideHost: {
								vertical: {
									center: {
										relativeTo: 'start',
										space: {
											value: 50,
											unit: '%'
										}
									}
								},
								horizontal: {
									start: 0,
									end: 0
								}
							},
							componentInfos: {
								id: 9
							}
						}
					]
				}
			},
			5: { // main component
				type: 'layers',
				value: {
					subLayers: [
						{
							zIndex: 1,
							componentInfos: {
								id: 1
							}
						},
						{
							zIndex: 2,
							componentInfos: {
								id: 2
							}
						},
					]
				}
			},
			6: { // score square
				type: 'layers',
				value: {
					subLayers: [
						{
							zIndex: 1,
							componentInfos: {
								id: 7
							}
						},
						{
							zIndex: 2,
							componentInfos: {
								id: 8,
								inputs: {
									'score': {
										value: {
											propertyName: 'score'
										}
									}
								}
							}
						}
					]
				}
			},
			7: {
				type: 'uniColorWF',
				value: {
					color: 0
				}
			},
			8: { // score label
				type: 'labelWF',
				value: {
					text: {
						value: {
							propertyName: 'score'
						}
					},
					style: {
						color: 3,
						size: 1
					}
				}
			},
			9: { // scores column
				type: 'layout',
				value: {
					direction: 'column',
					children: [
						{
							size: 40,
							componentInfos: {
								id: 6,
								inputs: {
									'score': {
										value: {
											propertyName: 'score1'
										}
									}
								}
							}
						},
						{
							size: 3
						},
						{
							size: 40,
							componentInfos: {
								id: 6,
								inputs: {
									'score': {
										value: {
											propertyName: 'score2'
										}
									}
								}
							}
						}
					]
				}
			},
			10: { // players
				type: 'layers',
				value: {
					subLayers: [
						{
							zIndex: 1,
							positionInsideHost: {
								vertical: {
									center: {
										relativeTo: 'start',
										space: {
											value: 50,
											unit: '%'
										}
									}
								},
								horizontal: {
									start: {
										relativeTo: 'start',
										space: 20
									}
								}
							},
							componentInfos: {
								id: 17
							}
						}
					]
				}
			},
			11: {
				type: 'uniColorWF',
				value: {
					color: 2
				}
			},
			12: { // country flag
				type: 'image',
				value: {
					src: {
						value: {
							propertyName: 'country'
						}
					}
				}
			},
			13: { // center vertically container
				type: 'layers',
				value: {
					subLayers: [
						{
							zIndex: 1,
							positionInsideHost: {
								vertical: {
									center: {
										relativeTo: 'start',
										space: {
											value: 50,
											unit: '%'
										}
									}
								},
								horizontal: {
									start: 0,
									end: 0
								}
							},
							componentInfos: {
								ref: 'content'
							}
						}
					]
				}
			},
			14: {
				type: 'composition',
				value: {
					hostId: 13,
					children: {
						'content': {
							id: 15,
							inputs: {
								'country': 'spain'
							}
						}
					}
				}
			},
			15: { // player row
				type: 'layout',
				value: {
					direction: 'row',
					children: [
						{
							size: 30,
							componentInfos: {
								id: 12,
								inputs: {
									'country': {
										value: {
											propertyName: 'country'
										}
									}
								}
							}
						},
						{
							size: 10
						},
						{
							size: 'auto',
							componentInfos: {
								id: 16,
								inputs: {
									'name': {
										value: {
											propertyName: 'player'
										}
									}
								}
							}
						},
						{
							size: 20
						},
						{
							size: 'auto',
							componentInfos: {
								id: 20,
								inputs: {
									'isServing': {
										value: {
											propertyName: 'isServing'
										}
									}
								}
							}
						}
					]
				}
			},
			16: { // player name
				type: 'labelWF',
				value: {
					text: {
						value: {
							propertyName: 'name'
						}
					}
				}
			},
			17: { // players names
				type: 'layout',
				value: {
					direction: 'column',
					children: [
						{
							size: 'auto',
							componentInfos: {
								id: 15,
								inputs: {
									'player': 'Nadal',
									'country': 'spain',
									'isServing': {
										value: {
											propertyName: 'firstPlayerIsServing'
										}
									}
								}
							}
						},
						{
							size: 30
						},
						{
							size: 'auto',
							componentInfos: {
								id: 15,
								inputs: {
									'player': 'Federer',
									'country': 'swiss',
									'isServing': {
										value: {
											propertyName: 'firstPlayerIsServing'
										},
										pipe: 4
									}
								}
							}
						}
					]
				}
			},
			18: {
				type: 'uniColorWF',
				value: {
					color: 2
				}
			},
			19: {
				type: 'layers',
				value: {
					subLayers: [
						{
							zIndex: 1,
							positionInsideHost: {
								vertical: {
									center: {
										relativeTo: 'start',
										space: {
											value: 50,
											unit: '%'
										}
									},
									size: 10
								},
								horizontal: {
									center: {
										relativeTo: 'start',
										space: {
											value: 50,
											unit: '%'
										}
									},
									size: 10
								}
							},
							componentInfos: {
								id: 18
							}
						}
					]
				}
			},
			20: {
				type: 'if',
				value: {
					condition: {
						value: {
							propertyName: 'isServing'
						}
					},
					template: {
						componentId: 19
					}
				}
			}
		},
		viewModelInterfaces: {
			9: {
				properties: {
					'score1': 'string',
					'score2': 'string',
				},
			},
			17: {
				properties: {
					'firstPlayerIsServing': 'boolean'
				}
			}
		},
		mockViewModels: {
			9: {
				'score1': {
					values: [
						{
							timeout: 0,
							value: 0
						},
						{
							timeout: 1000,
							value: 1
						},
						{
							timeout: 3000,
							value: 2
						},
						{
							timeout: 4000,
							value: 3
						},
						{
							timeout: 5000,
							value: 4
						},
						{
							timeout: 6000,
							value: 5
						},
						{
							timeout: 7000,
							value: 6
						},
					]
				},
				'score2': {
					values: [
						{
							timeout: 0,
							value: 0
						},
						{
							timeout: 2000,
							value: 1
						},
					]
				},
			},
			17: {
				'firstPlayerIsServing': {
					values: [
						{
							timeout: 0,
							value: true
						},
						{
							timeout: 1000,
							value: false
						},
						{
							timeout: 2000,
							value: true
						},
						{
							timeout: 3000,
							value: false
						},
						{
							timeout: 4000,
							value: true
						},
						{
							timeout: 5000,
							value: false
						},
						{
							timeout: 6000,
							value: true
						},
						{
							timeout: 7000,
							value: false
						},
					]
				}
			}
		}
	}

	const parser = new Parser(appJSON);
	const component = parser.parse(5);
	HTMLRenderer.render(component, TestTools.getRootHtml({ width: 600, height: 200 }));
}
