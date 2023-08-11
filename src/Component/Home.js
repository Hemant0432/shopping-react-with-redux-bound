import {  Route, Routes } from "react-router-dom";
import { FormValidationTwo } from "./FormValidation";
import { ValidationSuccess } from "./ValidationSuccess2";
import { NavBar } from "./Navbar";
import { ProductsDetails } from "./Products_Details";
import { YourCart } from "./Your-Cart";

export function Home() {

    return (
        <div>
                <Routes>
                    <Route path="*" element={<FormValidationTwo/>}/>
                    <Route path="/Home" element={<FormValidationTwo/>}/>
                    <Route path="/Home" element={<NavBar/>}/>
                    <Route path="/Account" element={<ValidationSuccess/>}/>
                    <Route path="/Product-Details/:id" element={<ProductsDetails/>}/>
                    <Route path="/YourCart" element={<YourCart/>}/>
                </Routes>
        </div>
    )
}