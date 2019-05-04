import { Component } from "../../entities/component";

export type GetView = (componentId: number) => Component;
export type ControlParser = (componentJSON: any, getView: GetView) => any;
