import { useLoaderData, redirect } from "react-router-dom";

import type { LoaderFunction } from "react-router-dom";

const loader: LoaderFunction = () => {
    const isAuthorized = false;

    if (!isAuthorized) {
        throw redirect("/setup");
    }

    return {
        name: "test event",
    };
};

const Root = () => {
    const data = useLoaderData();

    return <div>Root {(data as { name: string }).name}</div>;
};

Root.loader = loader;
export default Root;
