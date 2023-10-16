/** @format */
import { Route, Routes } from 'react-router-dom';
import { path } from './ultils/path';
import { Home, Login, MotelRoom, OfficePremises, Public, Register, RentHouse, RentalApartment } from './pages/public';
import Modal from './components/modal/Modal';
import { useSelector } from 'react-redux';

function App() {
    const { isShowModal, childrenModal } = useSelector(state => state.app);

    return (
        <div className="font-main text-[14px] h-full min-h-screen relative bg-[#f5f5f5]">
            {isShowModal && <Modal>{childrenModal}</Modal>}
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.RENT_HOUSE} element={<RentHouse />} />
                    <Route path={path.RENTAL_APARTMENT} element={<RentalApartment />} />
                    <Route path={path.OFFICE_PREMISES} element={<OfficePremises />} />
                    <Route path={path.MOTEL_ROOM} element={<MotelRoom />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.REGISTER} element={<Register />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
