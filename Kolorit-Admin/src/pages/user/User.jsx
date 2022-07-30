import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { updateUser } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.users.userslist.find((product) => product._id === productId)
  );

  const [inputs, setInputs] = useState({});
  const [address, setAddress] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleAddress = (e) => {
    setAddress(e.target.value.split(","));
  };
  const handleClick = (e) => {
    e.preventDefault();
    const product = { ...inputs };
    updateUser(productId, product, dispatch);
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {product.fname} {product.lname}
              </span>
              <span className="userShowUserTitle">{product.userName}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{product.username}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{product.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{product.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{product.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fname"
                  placeholder="first name"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lname"
                  placeholder="last Name"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="email@email.email"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+37312345667"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="address, address, address"
                  className="userUpdateInput"
                  onChange={handleAddress}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
