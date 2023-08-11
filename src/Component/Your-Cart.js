import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart, removeCart } from "./slicers/slicers";
import { useState, useEffect } from "react";
import store from "./stores/store";
import { NavBar } from "./Navbar";
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';

export function YourCart() {
  const dispatch = useDispatch();

  // Use the useSelector hook to get data from the Redux store
  const [cartStore, setcartStore] = useState(
    store.getState().store.cartItems
  );
  const [cartStCount, setcartStCount] = useState(
    store.getState().store.cartCount
  );

  useEffect(() => {
    // Subscribe to store updates and update the count state when the store changes
    const unsubscribe = store.subscribe(() => {
      setcartStore(store.getState().store.cartItems);
      setcartStCount(store.getState().store.cartCount);
    });

    // Unsubscribe from the store updates when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [cartStore]);

  // Calculate the grand total
  const grandTotal = cartStore.reduce((total, item) => total + item.price, 0);

  // State to manage the modal for each cart item
  const [showModal, setShowModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);

  // Function to handle item removal
  const handleRemoveItem = (cartItem) => {
    dispatch(removeCart(cartItem));
    setShowModal(false); // Close the modal after removal
  }

  return (
    <div>
      <NavBar />
      <h2 className="mt-3">Your Cart Item</h2>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Preview</th>
              <th>Quentity</th>
              <th>Price</th>
              <th>Remove Your Item</th>
            </tr>
          </thead>
          <tbody>
            {cartStore.map((cartStovers) => (
              <tr>
                <td>{cartStovers.title}</td>
                <td>
                  <img src={cartStovers.thumbnail} width="50" height="50" />
                </td>
                <td>
                  Qty.
                </td>
                <td>
                  {cartStovers.price}
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => { setSelectedCartItem(cartStovers); setShowModal(true); }}>Remove item</button>
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirm Removal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are You Sure To remove {selectedCartItem && selectedCartItem.title}?</Modal.Body>
                    <Modal.Footer>
                      <button className="btn btn-outline-danger" onClick={() => handleRemoveItem(selectedCartItem)}>Yes</button>
                      <button className="btn btn-outline-danger" onClick={() => setShowModal(false)}>No</button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <td className="fw-bold">Total Payable Amount</td>
            <td>
              <p className="fw-bold">Qty:- {cartStCount}</p>
            </td>
            <td>&#x20B9; &nbsp;{grandTotal.toFixed(2)}</td>
          </tfoot>
        </table>
      </div>
      <Link to="/Account" className="btn btn-primary" style={{ textDecoration: "none", position: 'fixed', right: '20px' }}>
        <i class="bi bi-arrow-left-square"></i> Back To Product
      </Link>
    </div>
  );
}

