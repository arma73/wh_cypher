import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { setupStore } from "@shared/store";

import "styles/tailwind.css";
import type { FC } from "react";

const { store } = setupStore();

const App: FC = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
};

export default App;
