import {Route, Routes} from "react-router";
import {Login} from "../pages";

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
        </Routes>
    )
};