import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import {registerUser, userLogin} from "../store/slices/actionCreators.ts";
import {AppDispatch} from "../store/store.ts";
import {authenticationDataType} from "../store/slices/stateTypes.ts";

type FormProps = {
    type: "login" | "register";
};

export const Form = ({ type }: FormProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<authenticationDataType>();
    const onSubmit: SubmitHandler<authenticationDataType> = (data) => {
        if(type === 'login') {
            dispatch(userLogin(data));
        } else if(type === 'register') {
            dispatch(registerUser(data));
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center py-12 px-8 rounded-xl">
                <p className="text-3xl font-bold underline">{type === "login" ? "Login" : "Register"}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5 mt-5">
                    <input placeholder={type === "login" ? "Login" : "Register"}
                           {...register("username", {required: true})}
                           className="border py-2 px-4 rounded-lg bg-slate-100 w-60" />
                    {errors.username && <span>This field is required</span>}
                    <input
                        type={type === "register" ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {required: true, minLength: 6})}
                        className="border py-2 px-4 rounded-lg bg-slate-100 w-60" />
                    {errors.password && <span>This field is required</span>}
                    <input
                        type="submit"
                        className="cursor-pointer py-2 px-4 rounded-lg bg-slate-600 text-white w-60"/>
                </form>
            </div>
        </div>
    )
}