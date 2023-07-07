import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPostsByUser, deletePost } from "../redux/features/postSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";


const Dashboard = () => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const { userPosts, loading } = useSelector((state) => ({ ...state.post }));
    const userId = user?.result?._id;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
          dispatch(getPostsByUser(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userId]);
      const excerpt = (str) => {
        if (str.length > 40) {
          str = str.substring(0, 40) + " ...";
        }
        return str;
      };

      if (loading) {
        return <Spinner />;
      };

      const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this recipe ?")) {
          dispatch(deletePost({ id, toast }));
        }
      };

    return (
        <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      {userPosts.length === 0 && (
        <h3>No recipes added by : {user?.result?.name}</h3>
      )}

      {userPosts.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}

      {userPosts &&
        userPosts.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      Recipe name- {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                       Description- {excerpt(item.description)}
                      </small>
                    </MDBCardText>
                    <MDBCardText className="text-start">
                        Ingredients- {item.ingredients}
                    </MDBCardText>
                    <MDBCardText className="text-start">
                       Making time- {item.time} minutes
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleDelete(item._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editPost/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
    )
     
};
export default Dashboard;
