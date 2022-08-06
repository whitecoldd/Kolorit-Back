import { Link, useLocation } from "react-router-dom";
import "../product/product.css";
import Chart from "../../comps/chart/Chart";
import { Publish } from "@material-ui/icons";
import { productData } from "../../dummyData";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateAbout } from "../../redux/apiCalls";
import app from "../../firebase";
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

  const product = useSelector((state) =>
    state.about.abouts.find((product) => product._id === productId)
  );

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
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
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log({ ...inputs, img: downloadURL });
          const product = { ...inputs, img: downloadURL };
          updateAbout(productId, product, dispatch);
        });
      }
    );
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">About</h1>
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
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{product.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">language:</span>
              <span className="productInfoValue">{product.lng}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>About Us Header</label>
            <input
              type="text"
              name="header"
              value={inputs.header}
              onChange={handleChange}
            />
          </div>
          <div className="productFormLeft">
            <label>About Us Text</label>
            <textarea
              type="text"
              name="text"
              size="200"
              value={inputs.text}
              onChange={handleChange}
            />
          </div>
          <div className="productFormLeft">
            <label>About Us Year</label>
            <input
              type="number"
              name="year"
              value={inputs.year}
              onChange={handleChange}
            />
          </div>
          <div className="productFormLeft">
            <label>Language</label>
            <select name="lng" onChange={handleChange}>
              <option value="ru">ru</option>
              <option value="ro">ro</option>
              <option value="en">en</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button onClick={handleClick} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
