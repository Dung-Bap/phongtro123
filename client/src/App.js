/** @format */
import { Route, Routes } from 'react-router-dom';
import { path } from './ultils/path';
import { Home, Login, Public, Register } from './pages/public';

function App() {
    return (
        <div className="w-full font-main bg-[#f5f5f5] h-full min-h-screen overflow-y-auto">
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.REGISTER} element={<Register />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
