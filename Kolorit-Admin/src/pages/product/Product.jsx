import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../comps/chart/Chart"
import { Publish } from "@material-ui/icons";
import { productData } from "../../dummyData";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import app from '../../firebase'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function Product({ productData }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [comp, setComp] = useState([])
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleComplect = (event) => {
    setComp(event.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error)
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log({ ...inputs, img: downloadURL, category: cat, complect: comp });
          const product = { ...inputs, img: downloadURL, category: cat, complect: comp };
          updateProduct(productId, product, dispatch);
        });
      }
    );
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
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
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">{product.salePrice}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">categories: </span>
              <span className="productInfoValue">{product.category}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
            <div className="productFormLeft flex1">
              <label>Product Name</label>
              <input type="text" name="name" value={inputs.name} onChange={handleChange} />
              <label>Product Description</label>
              <input type="text" name="description" value={inputs.description} onChange={handleChange} />
              <label>Price</label>
              <input type="number" name="price" value={inputs.price} onChange={handleChange} />
              <label>Actual Price</label>
              <input type="number" name="salePrice" value={inputs.salePrice} onChange={handleChange} />
              <label>Code</label>
              <input type="text" name="code" value={inputs.code} onChange={handleChange} />
              <label>Promo</label>
              <input type="text" name="promo" value={inputs.promo} onChange={handleChange} />
              <label>PromoType</label>
              <input type="text" name="promoType" value={inputs.promoType} onChange={handleChange} />
              <label>Currency</label>
              <input type="text" name="currency" value={inputs.currency} onChange={handleChange} />
            </div>
            <div className="productFormLeft flex1">
              <label>char1</label>
              <input type="text" name="char1" value={inputs.char1} onChange={handleChange} />
              <label>char1a</label>
              <input type="text" name="char1a" value={inputs.char1a} onChange={handleChange} />
              <label>char2</label>
              <input type="text" name="char2" value={inputs.char2} onChange={handleChange} />
              <label>char2a</label>
              <input type="text" name="char2a" value={inputs.char2a} onChange={handleChange} />
              <label>char3</label>
              <input type="text" name="char3" value={inputs.char3} onChange={handleChange} />
              <label>char3a</label>
              <input type="text" name="char3a" value={inputs.char3a} onChange={handleChange} />
              <label>char4</label>
              <input type="text" name="char4" value={inputs.char4} onChange={handleChange} />
              <label>char4a</label>
              <input type="text" name="char4a" value={inputs.char4a} onChange={handleChange} />
            </div>
            <div className="productFormLeft flex1">
              <label>brandCountry</label>
              <input type="text" name="brandCountry" value={inputs.brandCountry} onChange={handleChange} />
              <label>originalCountry</label>
              <input type="text" name="originalCountry" value={inputs.originalCountry} onChange={handleChange} />
              <label>height</label>
              <input type="text" name="height" value={inputs.height} onChange={handleChange} />
              <label>weight</label>
              <input type="text" name="weight" value={inputs.weight} onChange={handleChange} />
              <label>width</label>
              <input type="text" name="width" value={inputs.width} onChange={handleChange} />
              <label>length</label>
              <input type="text" name="length" value={inputs.length} onChange={handleChange} />
              <label>singleProd</label>
              <input type="text" name="singleProd" value={inputs.singleProd} onChange={handleChange} />
              <label>Brand</label>
              <input type="text" name="brand" value={inputs.brand} onChange={handleChange} />
              <label>Category</label>
              <input type="text" name="category" value={inputs.category} onChange={handleCat} />
              <label>Complect</label>
              <input type="text" name="complect" value={inputs.complect} onChange={handleComplect} />
              <label>In Stock</label>
              <select name="inStock" id="idStock" onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <button onClick={handleClick} className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
