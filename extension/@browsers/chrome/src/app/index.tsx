import LogoSVG from "svgr/logo.svg";

import "styles/tailwind.css";
import type { FC } from "react";

const App: FC = () => {
    return (
        <div className="bg-red-400">
            <LogoSVG />
            <h1>Main</h1>
        </div>
    );
};

export default App;
