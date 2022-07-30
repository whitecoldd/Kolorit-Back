import "../newProduct/newproduct.css";
import { addBrand } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function NewBrand() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs };
    addBrand(product, dispatch);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Brand</h1>
      <form className="addProductForm">
        <div className="addProductItem">
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="name"
            type="text"
            placeholder="Makita"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
