import { createMemoryRouter } from "react-router-dom";
import { Root, SetupWizzard, SignIn, SignUp } from "./screens";

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
    {
        path: "/signin",
        element: <SignIn />,
        loader: SignIn.loader,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
];

export const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 1,
});
