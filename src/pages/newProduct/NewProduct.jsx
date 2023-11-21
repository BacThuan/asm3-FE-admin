import "./newProduct.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { productInputs } from "../../formSource";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Sidebar from "../../components/sidebar/Sidebar";
import { api } from "../../api/api";
const NewProduct = () => {
  const [files, setFiles] = useState(null);

  const [info, setInfo] = useState(null);
  const [productListImage, setListImage] = useState([]);
  const search = useLocation().search;
  const params = new URLSearchParams(search).get("id");
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      try {
        if (params !== null) {
          const product = await axios.get(`${api}/products/${params}`, {
            withCredentials: true,
          });
          const data = product.data;
          setInfo(data);
          setListImage(data.img);
        }
      } catch (err) {
        if (window.confirm(err.response.data.message)) {
          navigate("/");
        }
      }
    };
    getProduct();
  }, [params]);

  // change info
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // submit
  const handlesubmit = async (e) => {
    e.preventDefault();

    let listImage = [];
    if (params === null && files.length !== 4) {
      return alert("Chỉ được chọn 4 ảnh");
    }

    // if have new image, send them to firebase to get url
    if (files !== null) {
      const getUrl = await Promise.all(
        Array.from(files).map(async (file) => {
          return await uploadBytes(
            ref(storage, `images-asm3/${file.name}` + v4()),
            file
          ).then(async (ref) => {
            return await getDownloadURL(ref.ref);
          });
        })
      );

      listImage.push(...getUrl);
    }

    try {
      // add new
      if (params === null) {
        info.img = listImage;
        await axios.post(`${api}/products`, info, { withCredentials: true });
      }
      // update
      else {
        info.img = productListImage;
        await axios.put(`${api}/products/${info._id}`, info, {
          withCredentials: true,
        });
      }
      navigate("/products");
    } catch (err) {
      if (window.confirm(err.response.data.message)) {
        navigate("/");
      }
    }
  };

  return (
    <div className="newHotel">
      <Sidebar />
      <div className="newHotelContainer">
        <div className="newhtop">
          <h1>Add New Hotels</h1>
        </div>
        <div className="newhForm">
          <form onSubmit={handlesubmit}>
            {params === null && (
              <div className="formInput">
                <label htmlFor="file">
                  Chọn 4 ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
                  (Lưu ý ảnh đầu tiên sẽ là ảnh chính )
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
            )}
            {productInputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                {input.id !== "long_desc" && (
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    required={true}
                    defaultValue={info ? info[`${input.id}`] : ""}
                  />
                )}

                {input.id === "long_desc" && (
                  <textarea
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    required={true}
                    defaultValue={info ? info[`${input.id}`] : ""}
                  />
                )}
              </div>
            ))}

            <br></br>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
