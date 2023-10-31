/** @format */
import { Route, Routes } from 'react-router-dom';
import { path } from './ultils/path';
import { DetailPost, Home, Login, Public, Register } from './pages/public';
import Modal from './components/modal/Modal';
import { useSelector } from 'react-redux';
import { ManageLayout, ManagePost, NewPost, Personal, Wishlist } from './pages/manage';

function App() {
    const { isShowModal, childrenModal } = useSelector(state => state.app);

    return (
        <div className="font-main text-[14px] h-full min-h-screen relative bg-[#f5f5f5]">
            {isShowModal && <Modal>{childrenModal}</Modal>}
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.RENT_HOUSE} element={<Home />} />
                    <Route path={path.RENTAL_APARTMENT} element={<Home />} />
                    <Route path={path.OFFICE_PREMISES} element={<Home />} />
                    <Route path={path.MOTEL_ROOM} element={<Home />} />
                    <Route path={path.DETAIL_POST_TITLE_ID} element={<DetailPost />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.REGISTER} element={<Register />} />
                </Route>
                <Route path={path.MANAGE} element={<ManageLayout />}>
                    <Route path={path.NEW_POST} element={<NewPost />} />
                    <Route path={path.MANAGE_POST} element={<ManagePost />} />
                    <Route path={path.PERSONAL} element={<Personal />} />
                    <Route path={path.WISHLIST} element={<Wishlist />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
