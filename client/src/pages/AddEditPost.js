import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBValidationItem,
} from "mdb-react-ui-kit";

import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../redux/features/postSlice";


const initialState = {
  title: "",
  description: "",
  ingredients: "",
  time: "",

};

const AddEditPost = () => {
  const [postData, setPostData] = useState(initialState);
  const { error, userPosts } = useSelector((state) => ({
    ...state.post,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, ingredients, time } = postData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singlePost = userPosts.find((post) => post._id === id);
      console.log(singlePost);
      setPostData({ ...singlePost });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && ingredients && time) {
        const updatedPostData = { ...postData, name: user?.result?.name };
      if (!id) {
        dispatch(createPost({ updatedPostData, navigate, toast }));
      } else {
        dispatch(updatePost({ id, updatedPostData, toast, navigate }));
      }
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  
  const handleClear = () => {
    setPostData({ title: "", description: "", ingredients: "", time: "" });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Post" : "Add Post"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
          <MDBValidationItem className='col-md-12' feedback='Please enter title' invalid>
              <MDBInput
                label="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control" 
                required
              />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-12' feedback='Please enter description' invalid>
              <MDBInput
                label="Enter Description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                textarea
                rows={4}
              />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-12' feedback='Please enter ingredients' invalid>
              <MDBInput
                label="Enter Ingredients"
                type="text"
                value={ingredients}
                name="ingredients"
                onChange={onInputChange}
                className="form-control"
                required
                textarea
                rows={4}
              />
            </MDBValidationItem>
            <MDBValidationItem className='col-md-12' feedback='Please enter making time' invalid>
              <MDBInput
                label="Enter making time"
                type="number"
                value={time}
                name="time"
                onChange={onInputChange}
                className="form-control"
                required
                textarea
                rows={4}
              />
            </MDBValidationItem>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditPost;