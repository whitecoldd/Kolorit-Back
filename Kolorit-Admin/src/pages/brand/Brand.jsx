import { Link, useLocation } from "react-router-dom";
import "../product/product.css";
import Chart from "../../comps/chart/Chart"
import { Publish } from "@material-ui/icons";
import { productData } from "../../dummyData";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateBrand } from "../../redux/apiCalls";
import app from '../../firebase'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function Product({productData}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.brand.brands.find((product) => product._id === productId)
    );  

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs };
    updateBrand(productId, product, dispatch);
  };
  
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Brand</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.name}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Brand Name</label>
            <input type="text" name="name" value={inputs.name} onChange={handleChange}/>
          </div>
          <div className="productFormRight">
            <button onClick={handleClick} className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
