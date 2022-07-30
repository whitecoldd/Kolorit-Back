import "./newproduct.css";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import app from '../../firebase'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [comp, setComp] = useState([]);
  const dispatch = useDispatch();

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
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log({ ...inputs, img: downloadURL, category: cat, complect: comp, });
          const product = { ...inputs, img: downloadURL, category: cat, complect: comp };
          addProduct(product, dispatch);
        });
      }
    );
  };
  return (
    <>
      <div>
        <div className="newProduct">
          <h1 className="addProductTitle">New Product</h1>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="cols">
            <div className="addProductItem">
              <label>Title</label>
              <input
                name="name"
                type="text"
                placeholder="drill"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                name="description"
                type="text"
                placeholder="description..."
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Previous Price</label>
              <input
                name="price"
                type="number"
                placeholder="100"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Actual Price</label>
              <input
                name="salePrice"
                type="number"
                placeholder="100"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Currency</label>
              <input
                name="currency"
                type="text"
                placeholder="MDL"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Code</label>
              <input
                name="code"
                type="text"
                placeholder="xxxxxxxxx"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Categories</label>
              <input type="text" placeholder="drills, screwdrivers" onChange={handleCat} />
            </div>
            <div className="addProductItem">
              <label>Char #1</label>
              <input
                name="char1"
                type="text"
                placeholder="Название Характеристики"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Char #1 Answer</label>
              <input
                name="char1a"
                type="text"
                placeholder="Характеристика"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Char #2</label>
              <input
                name="char2"
                type="text"
                placeholder="Название Характеристики"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Char #2 Answer</label>
              <input
                name="char2a"
                type="text"
                placeholder="Характеристика"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Char #3</label>
              <input
                name="char3"
                type="text"
                placeholder="Название Характеристики"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Char #3 Answer</label>
              <input
                name="char3a"
                type="text"
                placeholder="Характеристика"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Char #4</label>
              <input
                name="char4"
                type="text"
                placeholder="Название Характеристики"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Char #4 Answer</label>
              <input
                name="char4a"
                type="text"
                placeholder="Характеристика"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Brand Country</label>
              <input
                name="brandCountry"
                type="text"
                placeholder="Молдова"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Original Country</label>
              <input
                name="originalCountry"
                type="text"
                placeholder="Молдова"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Complect</label>
              <input type="text" placeholder="2 аккумулятора, Инструкция..." onChange={handleComplect} />
            </div>
            <div className="addProductItem">
              <label>Sindle Product</label>
              <input
                name="singleProd"
                type="text"
                placeholder="Штука"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Brand</label>
              <input
                name="brand"
                type="text"
                placeholder="Брэнд"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Promo</label>
              <input
                name="promo"
                type="text"
                placeholder="Скидка"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Weight</label>
              <input
                name="weight"
                type="text"
                placeholder="кг"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Length</label>
              <input
                name="length"
                type="text"
                placeholder="см"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Width</label>
              <input
                name="width"
                type="text"
                placeholder="см"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Height</label>
              <input
                name="height"
                type="text"
                placeholder="см"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Stock</label>
              <select name="inStock" onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            </div>
            <button onClick={handleClick} className="addProductButton">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
