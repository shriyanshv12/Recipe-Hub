import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const CardPost = ({
    imageFile,
    description,
    title,
    _id,
    name,
  }) => {
    const excerpt = (str) => {
        if (str.length > 45) {
          str = str.substring(0, 45) + " ...";
        }
        return str;
      };
    return (
        <MDBCardGroup>
          <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
            <MDBCardImage
              src={imageFile}
              alt={title}
              position="top"
              style={{ maxWidth: "100%", height: "190px" }}
            />
            <div className="top-left" style={{color:"#AA98A9"}}>{name}</div>
            <MDBCardTitle className="text-center" style={{color:"#722F37"}}>{title}</MDBCardTitle>
            <MDBCardBody>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/post/${_id}`} style={{color: "#DA70D6"}}>Read More</Link>
          </MDBCardText>
          </MDBCardBody>
          </MDBCard>
          </MDBCardGroup>
    );
  };

  export default CardPost;


