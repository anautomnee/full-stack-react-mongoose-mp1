import {Route, Routes} from "react-router";
import {Login, Register} from "../pages";

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    )
};