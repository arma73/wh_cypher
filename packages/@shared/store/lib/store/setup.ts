import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import { rootSaga } from "./sagas";

import type { Store } from "redux";
import type { IAppState } from "./reducers";

const sagaMiddleware = createSagaMiddleware();

export const setupStore = () => {
    const store: Store<IAppState> = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    return { store };
};
