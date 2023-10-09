/** @format */
import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/path";
import { Home, Public } from "./pages/public";

function App() {
    return (
        <div className="w-full font-main h-full min-h-screen overflow-y-auto">
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
