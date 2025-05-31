import React, {useLayoutEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "../layout";
import Dashboard from "../pages/dashboard";
import NoSidebar from "../layout/noSidebar.jsx";
import Login from "../pages/auth/login.jsx";
import PrivateRoute from "./protectedRoute.jsx";
import Error404 from "../pages/error/Error404.jsx";
import ForgotPassword from "../pages/auth/forgot-password.jsx";
import ResetPassword from "../pages/auth/reset-password.jsx";
import Logout from "../pages/auth/logout.jsx";
import Setting from "../pages/setting/index.jsx";
import User from "../pages/user/index.jsx";
import Tag from "../pages/tag/index.jsx";
import Slider from "../pages/slider/index.jsx";
import Partial from "../pages/slider/partial.jsx";
import Menu from "../pages/menu/index.jsx";
import Feature from "../pages/widget/feature.jsx";
import About from "../pages/widget/about.jsx";
import Course from "../pages/widget/course.jsx";
import Division from "../pages/widget/division.jsx";
import Admission from "../pages/widget/admission.jsx";
import Teacher from "../pages/widget/teacher.jsx";
import Category from "../pages/category/index.jsx";
import Article from "../pages/article/index.jsx";
import ArticleCreate from "../pages/article/ArticleCreate.jsx";
import ArticleEdit from "../pages/article/ArticleEdit.jsx";
import Brand from "../pages/brand/index.jsx";
import Gallery from "../pages/gallery/index.jsx";
import Event from "../pages/event/index.jsx";
import EventCreate from "../pages/event/EventCreate.jsx";
import EventEdit from "../pages/event/EventEdit.jsx";

const Router = () => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path={`${import.meta.env.BASE_URL}`} element={<Layout/>}>
                    <Route index element={<Dashboard/>} />
                    <Route path="/artikel/list" element={<Article/>} />
                    <Route path="/artikel/tambah" element={<ArticleCreate/>} />
                    <Route path="/artikel/:id/ubah" element={<ArticleEdit/>} />
                    <Route path="/artikel/tagar" element={<Tag/>} />
                    <Route path="/artikel/kategori" element={<Category/>} />
                    <Route path="/brand" element={<Brand/>} />
                    <Route path="/slider" element={<Slider/>} />
                    <Route path="/event/list" element={<Event/>} />
                    <Route path="/event/tambah" element={<EventCreate/>} />
                    <Route path="/event/:id/ubah" element={<EventEdit/>} />
                    <Route path="/galeri" element={<Gallery/>} />
                    <Route path="/slider/tambah" element={<Partial/>} />
                    <Route path="/slider/:id/ubah" element={<Partial/>} />
                    <Route path="/widget/fitur" element={<Feature/>} />
                    <Route path="/widget/tentang" element={<About/>} />
                    <Route path="/widget/lembaga" element={<Course/>} />
                    <Route path="/widget/divisi" element={<Division/>} />
                    <Route path="/widget/ppdb" element={<Admission/>} />
                    <Route path="/widget/pengurus" element={<Teacher/>} />
                    <Route path="/mainmenu" element={<Menu/>} />
                    <Route path="pengguna" element={<User/>} />
                    <Route path="pengaturan" element={<Setting/>} />
                </Route>
            </Route>
            <Route path={`${import.meta.env.BASE_URL}`} element={<NoSidebar/>}>
                {/*<Route path="auth-success" element={<Success />}></Route>*/}
                <Route path="auth/lupa-sandi" element={<ForgotPassword />}></Route>
                <Route path="auth/reset-sandi/:token" element={<ResetPassword />}></Route>
                <Route path="auth/masuk" element={<Login/>}></Route>
                <Route path="auth/keluar" element={<Logout/>}></Route>

                <Route path="errors">
                    <Route path="404" element={<Error404 />}></Route>
                {/*    <Route path="404-classic" element={<Error404Classic />}></Route>*/}
                {/*    <Route path="504-modern" element={<Error504Modern />}></Route>*/}
                {/*    <Route path="504-classic" element={<Error504Classic />}></Route>*/}
                </Route>
                <Route path="*" element={<Error404 />}></Route>

            </Route>
        </Routes>
    )
}

export default Router;