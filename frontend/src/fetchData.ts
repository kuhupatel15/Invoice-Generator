import axios from "axios";
import baseUrl from '../utils/baseUrl'
import { Product } from "./pages/AddProducts";
interface LoginParams {
    username?: string;
    password: string;
    email: string;
}
interface PDFParams {
    productList: Product[];
    total_charge: number;
    total_amount: number;
    gst:number;
}
export const LogIn = async ({  password, email }:LoginParams) => {
    try {
        let response = await baseUrl.post(
            "/levitation/login",
            {  password, email },
            {}
        );
        localStorage.setItem("token", response.data.token);
        // toast.success(response.data.msg);
        return response;
    } catch (error) {
        console.log(error);
        // toast.error(error.response.data.msg);
    }
};

export const Register = async ({ email, username, password }:LoginParams) => {
    try {
        let response = await baseUrl.post(
            "/levitation/register",
            { email, username, password },
            {}
        );
        localStorage.setItem("token", response.data.token);
        // toast.success(response.data.msg);
        return response;
    } catch (error) {
        console.log(error);
        // toast.error(error.response.data.msg);
    }
};

export const GeneratePDF = async ({ productList,total_charge,gst,total_amount }:PDFParams) => {
    try {
        let response = await baseUrl.post(
            "/levitation/addproducts",
            { productList,total_charge,gst,total_amount },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },responseType:'blob'
            }
        );
        // toast.success(response.data.msg);
        return response;
    } catch (error) {
        console.log(error);
        // toast.error(error.response.data.msg);
    }
};