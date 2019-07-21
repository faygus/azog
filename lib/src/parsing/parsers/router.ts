import { ControlParser, GetView } from "./type";
import { parseValueProvider } from "../value-provider";
import { IRouterViewJSON } from "../../interfaces/router";
import { RouterView, IRoutesParam } from "../../models/views/router";

export const routerParser: ControlParser = (viewJSON: IRouterViewJSON, getView: GetView): RouterView => {
	const routes: IRoutesParam = {};
	for (const routeName in viewJSON.routes) {
		const componentInfo = viewJSON.routes[routeName];
		routes[routeName] = {
			component: getView(componentInfo.id),
			inputs: undefined // TODO
		}
	}
	const activeRoute = parseValueProvider(viewJSON.activeRoute);
	const res = new RouterView(routes, activeRoute);
	return res;
};
