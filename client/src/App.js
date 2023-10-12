/** @format */
import { Route, Routes } from 'react-router-dom';
import { path } from './ultils/path';
import { Home, Login, Public, Register } from './pages/public';
import Modal from './components/modal/Modal';
import { useSelector } from 'react-redux';

function App() {
    const { isShowModal, childrenModal } = useSelector(state => state.app);

    return (
        <div className="font-main h-full min-h-screen relative bg-[#f5f5f5]">
            {isShowModal && <Modal>{childrenModal}</Modal>}
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
