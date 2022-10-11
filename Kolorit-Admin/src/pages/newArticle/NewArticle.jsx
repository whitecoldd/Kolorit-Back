import "../newProduct/newproduct.css";
import { addArticle } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import app from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function NewArticle() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  if (typeof window !== "undefined") {
    injectStyle();
  }
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
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log({ ...inputs, img: downloadURL });
          const product = { ...inputs, img: downloadURL };
          addArticle(product, dispatch);
          toast("Product added!");
        });
      }
    );
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Article</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Header</label>
          <input
            name="header"
            type="text"
            placeholder="drills"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Text</label>
          <textarea
            name="text"
            type="text"
            placeholder="drills"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <textarea
            name="cat"
            type="text"
            placeholder="promos"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Language</label>
          <select name="lng" onChange={handleChange}>
            <option value={null}>---</option>

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
