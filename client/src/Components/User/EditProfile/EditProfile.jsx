import React, { useState, useContext } from "react";
import classes from "./EditProfile.module.css";
import { Card, InputField, CustomButton, ProductCard } from "../../UI";
import { userAuthContext } from "../../../Contexts";

const EditProfile = () => {
  const { updateImage, updateProfile } = useContext(userAuthContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });
  const { name, email, address } = user;
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImgPreview(URL.createObjectURL(file));
    setImg(file);
  };
  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onImageUpdateHandler = (e) => {
    e.preventDefault();
    const dataArray = new FormData();
    dataArray.append("image", img, img.name);
    updateImage(dataArray);
    console.log(img);
  };

  const onUpdateProfileHandler = (e) => {
    e.preventDefault();
    updateProfile(user);
  };
  return (
    <>
      <div className={classes.outer}>
        <Card width="auto" height="auto" smooth>
          <div className={classes.inner}>
            <form className={classes.image_form}>
              <div className={classes.image_upload}>
                <ProductCard
                  image={imgPreview}
                  show={true}
                  disabled
                  alt="user_image"
                />
                <input
                  className={classes.custom_file_input}
                  type="file"
                  onChange={onImageChange}
                />
              </div>
              <CustomButton
                onClick={onImageUpdateHandler}
                filled
                label="Upload Image"
              />
            </form>

            <form
              className={classes.profile_form}
              onSubmit={onUpdateProfileHandler}
            >
              <InputField
                // reference={nameRef}
                onChange={onChangeHandler}
                type="name"
                value={name}
                label="Name"
                name="name"
                placeholder="Name"
                required
              />
              <InputField
                // reference={nameRef}
                onChange={onChangeHandler}
                type="name"
                value={address}
                label="Address"
                name="address"
                placeholder="address"
                required
              />
              <InputField
                // reference={nameRef}
                onChange={onChangeHandler}
                type="email"
                value={email}
                label="Email Address"
                name="email"
                placeholder="Email Address"
                required
              />
              <CustomButton filled label="Update" />
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default EditProfile;
