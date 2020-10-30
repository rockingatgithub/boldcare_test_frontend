import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";

class Review extends Component {
  render() {
    return (
      <Col>
        <ListGroup>
          {this.props.reviews.map((review, index) => (
            <ListGroupItem key={index}>{review.title}</ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    );
  }
}

export default Review;
