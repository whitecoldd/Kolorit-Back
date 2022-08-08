import "../newProduct/newproduct.css";
import { addSubsubcategory } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
export default function NewCategory() {
  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  if (typeof window !== "undefined") {
    injectStyle();
  }
  const handleClick = (e) => {
    e.preventDefault()
    const product = {
      ...inputs,
      subcat: cat,
    };
    addSubsubcategory(product, dispatch);
    toast("Product added!");
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New 3rd Order Category</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>SubSubCategory</label>
          <input
            name="name"
            type="text"
            placeholder="drills"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>SubCategory</label>
          <input
            name="subcat"
            type="text"
            placeholder="drills"
            onChange={handleCat}
          />
        </div>
        <div className="addProductItem">
          <label>Language</label>
          <select name="lng" onChange={handleChange}>
            <option value="ru">ru</option>
            <option value="ro">ro</option>
            <option value="en">en</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
