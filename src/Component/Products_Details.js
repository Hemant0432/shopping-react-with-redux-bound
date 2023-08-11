import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NavBar } from "./Navbar";
import { useDispatch } from "react-redux";
import { addToCart, removeCart } from "./slicers/slicers";
import { CartComponent } from "./cart.component";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ProductsDetails() {
  const [ProducDetail, setProducDetail] = useState({});
  const [Immo, setImmo] = useState([]);
  const [Imag2, setImag2] = useState('');
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${params.id}`)
      .then((response) => {
        setProducDetail(response.data);
      });
    axios
      .get(`https://dummyjson.com/products/${params.id}`)
      .then((response) => {
        setImmo(response.data.images);

        if (Imag2 == undefined || Imag2 != null) {
          setImag2(response.data.images[0]);
        }
      });
  }, []);


  function ChangeColor(e) {
    setImag2(e.target.src)
    // alert(e.target.src);
  }

  function AddToCartClick(ProducDetail) {
    dispatch(addToCart(ProducDetail))
    setShow(true);
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <div>
        <NavBar />
      <div className="container-fluid pb-4">
        <div className="row">
          <div className="col-1" style={{ flexDirection: "column", }}>
            {Immo.map((Imag) => (

              <img className="mt-2 p- border border-dark p-2" src={Imag} width={'120px'} onMouseOver={ChangeColor} />
            ))}
          </div>
          <div className="col-4 ps-5 pt-4">
            <img
              src={Imag2}
              style={{ width: "395px", height: '290px' }}
            />

          </div>
          <div className="col-5 w-50">
            <label className="fw-bold">Name:-</label>
            <p className="h3">{ProducDetail.title}</p>
            <label className="fw-bold">Description:-</label>
            <p>{ProducDetail.description}</p>

            <label className="fw-bold">Price:-</label>&nbsp; &#x20B9; {ProducDetail.price} <br />

            <label className="fw-bold">DiscountPercentage:-</label> &nbsp;{ProducDetail.discountPercentage} %<br />

            <label className="fw-bold">Rating:-</label> &nbsp;{ProducDetail.rating} <br />

            <label className="fw-bold">Stock:-</label> &nbsp;{ProducDetail.stock} <br />
            <label className="fw-bold">Brand:-</label> &nbsp;{ProducDetail.brand} <br />
            <label className="fw-bold">Category:-</label> &nbsp;{ProducDetail.category} <br />
            <div className="d-flex justify-content-between pt-3">
              <button className="btn btn-primary" name={ProducDetail.id} onClick={() => AddToCartClick(ProducDetail)}>Buy Now</button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="h4">Cart Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>Product:-&nbsp;{ProducDetail.title} is added to your cart</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Close
                  </Button>

                </Modal.Footer>
              </Modal>
              <div>
                <Link className="btn btn-primary" style={{ textDecoration: "none" }} to="/Account">
                  <i class="bi bi-arrow-left-square"></i> Back To Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
