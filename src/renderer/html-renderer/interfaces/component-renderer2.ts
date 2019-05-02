import { Component } from "../../../parser/entities/component";
import { IViewInserter } from "./view-inserter";

export interface IComponentRenderer2 {
	build(view: Component, inserter: IViewInserter): void;
}
