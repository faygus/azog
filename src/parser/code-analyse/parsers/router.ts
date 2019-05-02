import { ControlParser, GetView } from "./type";
import { parseValueProvider } from "../value-provider";
import { IRouterJSON } from "../../interfaces/router";
import { RouterView, IRoutesParam } from "../../entities/router";

export const routerParser: ControlParser = (componentJSON: IRouterJSON, getView: GetView): RouterView => {
	const routes: IRoutesParam = {};
	for (const routeName in componentJSON.routes) {
		const componentInfo = componentJSON.routes[routeName];
		routes[routeName] = {
			component: getView(componentInfo.componentId),
			inputs: undefined // TODO
		}
	}
	const activeRoute = parseValueProvider(componentJSON.activeRoute);
	const res = new RouterView(routes, activeRoute);
	return res;
};
