import 'reflect-metadata';
import { LabelRenderer } from "./controls/label";
import { IconRenderer } from "./controls/icon";
import { IconWFRenderer } from "./wireframe/icon";
import { LabelWFRenderer } from "./wireframe/label";
import { DynamicViewModel } from "../dynamic-view-model";
import { Component } from "../../builder/entities/component";
import { Host } from "../../builder/entities/host";
import { ContainerRenderer } from "./container/build-container";
import { IComponentOrHostBuilder } from "./interfaces/component-builder";
import { BaseRenderer } from "./base-renderer";
import { ViewCompositionRenderer } from "./view-composition";
import { IComponentRenderer } from './interfaces/component-renderer';
import { IHostRenderer } from './interfaces/host-renderer';

export class RendererProvider {
	private _tokens = new Map();
	private _rendererTypes = [
		// ContainerRenderer,
		LabelRenderer,
		IconRenderer,
		IconWFRenderer,
		LabelWFRenderer,
		// ViewCompositionRenderer,
	];
	private _providersCache: { type: any, value: any }[] = [];

	constructor(private _componentRenderer: IComponentRenderer, private _hostRenderer: IHostRenderer) {
		for (const type of this._rendererTypes) {
			const value = new type(); // no required dependency
			this._providersCache.push({
				type,
				value
			});
		}
	}

	getComponentOrHostRenderer(): IComponentOrHostBuilder {
		return {
			build: (view: Component | Host, viewModel?: DynamicViewModel) => {
				if (view instanceof Component) {
					return this._componentRenderer.build(view, viewModel);
				}
				return this._hostRenderer.build(view, viewModel);
			}
		};
	}

	getContainerRenderer(): ContainerRenderer {
		const token = this._tokens.get(ContainerRenderer);
		if (token) return token;
		const instance = new ContainerRenderer(this.getComponentOrHostRenderer());
		this._tokens.set(ContainerRenderer, instance);
		return instance;
	}

	getControlRenderer(providerType: any): BaseRenderer<any> | undefined {
		const find = this._providersCache.find(v => v.type === providerType);
		if (!find) {
			return undefined;
		} else {
			return find.value;
		}
	}

	getComponentRenderer(): IComponentRenderer {
		return this._componentRenderer;
	}

	getViewCompositionRenderer(): ViewCompositionRenderer {
		const res = this._tokens.get(ViewCompositionRenderer);
		if (res) return res;
		const instance = new ViewCompositionRenderer(this.getComponentRenderer());
		this._tokens.set(ViewCompositionRenderer, instance);
		return instance;
	}
}
