import { createMemoryRouter } from "react-router-dom";
import { Root, SetupWizzard } from "./screens";

import type { RouteObject } from "react-router-dom";

const routes: Array<RouteObject> = [
    {
        path: "/",
        element: <Root />,
        loader: Root.loader,
    },
    {
        path: "/setup",
        element: <SetupWizzard />,
        loader: SetupWizzard.loader,
    },
];

export const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 1,
});
