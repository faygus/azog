import { Parsing } from "./parsing";
import { Container } from "../entities/container";
import { Component } from "../entities/component";
import { BaseParsing } from "./base-parsing";
import { WireframeParsing } from "./wireframe/parsing";

export class CodeParser {
	static parseApp(componentId: number, wireframeMode = true): Component {
		let parser: BaseParsing;
		if (wireframeMode) {
			parser = new WireframeParsing();
		} else {
			parser = new Parsing();
		}
		return parser.getView(componentId);
	}
}
