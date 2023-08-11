import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { CartComponent } from "./cart.component";
import axios from "axios";


export function NavBar() {

    const [cookie, setCookies, removeCookies] = useCookies();
    const [cookiepa, setCookiespa, removeCookiespa] = useCookies();
    const [UserDat, setUserDat] = useState({});
    const [Product, setProduct] = useState([]);
    const [Categiory, setCategiory] = useState([]);
    const navigate = useNavigate()

    // Logout Button Function
    function LogoutChange() {
        removeCookies("username");
        removeCookiespa("password");
        navigate("/Login");
    }
    // Load Categiory
    function LoadCategiory() {
        axios.get('https://dummyjson.com/products/categories')
            .then(response => {
                response.data.unshift('all')
                setCategiory(response.data)
            })
    }

    useEffect(() => {

        LoadCategiory()

        axios.get('https://dummyjson.com/products')
            .then((response) => {
                setProduct(response.data.products)
            })

        async function fetchData() {
            try {
                const response = await fetch("https://dummyjson.com/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: cookie["username"],
                        password: cookiepa["password"],
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    // console.log(data);
                    setUserDat(data); // Update state with fetched data
                } else {
                    console.log("Response not OK");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData(); // Call the async function
    }, []);


    if (cookie["username"] == undefined || cookiepa["password"] == undefined) {
        navigate("/Login");
    }
  return (
    <div >
      {/* Navbar Start */}
      <nav className="d-flex justify-content-between p-2 mt-3 bg-dark text-white " style={{width:'1590px'}}>
        <div className="d-flex justify-content-between">
          <h2>Shopping Website</h2>
          <p className="h4 ms-4 mt-2"> Hello! {UserDat.username}</p>
        </div>
        <div>
          <Link
          to="/Account"
            className=" h4 text-white pe-3"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <Link className=" h4 text-white" style={{ textDecoration: "none" }}>
            Product
          </Link>
        </div>
        <div>
          <img
            src={UserDat.image}
            className="user-avatar-sm rounded-circle bg-light me-2"
            style={{ height: "20xp", width: "30px" }}
          />
         <CartComponent/>
          <button className="btn btn-primary ms-2" onClick={LogoutChange}>
            Logout
          </button>
        </div>
      </nav>
      {/* NavBar End */}
    </div>
  );
}
