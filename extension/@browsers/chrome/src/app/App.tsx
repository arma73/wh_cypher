import { useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useUIType } from "./hooks";
import { setupStore } from "@shared/store";

import "styles/tailwind.css";
import type { FC } from "react";

const { store } = setupStore();

const App: FC = () => {
    const uiType = useUIType();

    useEffect(() => {
        if (uiType === "tab") {
            document.body.style.height = "100vh";
        }
    }, [uiType]);

    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
};

export default App;
