import React from "react";
import { useContext } from "react";
import { FormValidationTwo } from "./FormValidation"; // Import the UserDetailsContex from Home.js
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavBar } from "./Navbar";

export function ValidationSuccess() {
  const [cookie, setCookies, removeCookies] = useCookies();
  const [cookiepa, setCookiespa, removeCookiespa] = useCookies();
  const params = useParams();
  const [UserDat, setUserDat] = useState({});
  const [Product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  // Load Categiory
  function LoadCategories() {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => {
        response.data.unshift("all");
        setCategories(response.data);
      });
  }

  // Load Products
  function LoadProducts(url) {
    axios.get(url).then((response) => {
      setProduct(response.data.products);
    });
  }

  useEffect(() => {
    LoadCategories();
    LoadProducts("https://dummyjson.com/products");

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

  function handleCategoryChanged(e) {
    if (e.target.value == "all") {
      LoadProducts("https://dummyjson.com/products");
    } else {
      LoadProducts(
        `https://dummyjson.com/products/category/${e.target.value}`
      );
    }
    setCategory(e.target.value);
  }

  if (cookie["username"] == undefined || cookiepa["password"] == undefined) {
    navigate("/Login");
  }

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <select onChange={handleCategoryChanged} className="form-select mt-3">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="col-10">
            <div className="d-flex flex-wrap">
              {Product.map((item) => (
                <div className="card p-3 m-2" style={{ width: "20rem" }}>
                  <img
                    src={item.thumbnail}
                    className="card-img-top"
                    style={{ height: "260px" }}
                  />
                  <div className="card-body">
                    <p>
                      {" "}
                      Name:-{item.title} <br />
                      Price:-{item.price}
                      <br />
                      Rating:-{item.rating}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-primary  d-flex justify-content-center
                                    "
                    >
                      <Link
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        to={"/Product-Details/" + item.id}
                      >
                        Add To Cart
                      </Link>{" "}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
