import { useState } from "react";
import store from "./stores/store"
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function CartComponent() {

    const [count, setCount] = useState(store.getState().store.cartCount);

  useEffect(() => {
    // Subscribe to store updates and update the count state when the store changes
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().store.cartCount);
    });

    // Unsubscribe from the store updates when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [count]);

    return (
        <button className="btn btn-success position-relative">
          <span className="bi bi-cart4"></span>
          <Link className="text-white" style={{textDecoration:'none'}} to='/YourCart'>
            Your Cart Item
            </Link>
            <span className="badge rounded rounded-circle bg-danger position-absolute">
                {count}
            </span>
        </button>
    )
}