import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../Redux/apiCalls";
import { useDispatch } from "react-redux";
export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [prog, setprog] = useState("");
  const dispatch = useDispatch();
  const handelChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handelCat = (e) => {
    setCategories(e.target.value.split(","));
  };

  const handelClick = (e) => {
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
        setprog("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            categories: categories,
            img: downloadURL,
          };
          addProduct(dispatch, product);
          console.log({
            ...inputs,
            categories: categories,
            img: downloadURL,
          });
        });
      }
    );
  };
  return (
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
        <div className="addProductItem">
          <label>Title</label>
          <input
            onChange={handelChange}
            name="title"
            type="text"
            placeholder="title.."
          />
        </div>
        <div className="addProductItem">
          <label>Desc</label>
          <input
            onChange={handelChange}
            name="desc"
            type="text"
            placeholder="desc.."
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            onChange={handelChange}
            name="price"
            type="number"
            placeholder="Price"
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            onChange={handelCat}
            name="categories"
            type="text"
            placeholder="shirt,coat"
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select onChange={handelChange} name="inStock">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <button onClick={handelClick} className="addProductButton">
            Create
          </button>
          <span style={{ marginLeft: 20 }}>{prog}</span>
        </div>
      </form>
    </div>
  );
}
