import React, { Component } from "react";
import { ListGroup, ListGroupItem, Badge } from "react-bootstrap";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComplete: false,
      index: -1,
    };
  }

//   =======================================open full review function========================================

  openReview = (ind) => {
    this.setState({
      index: ind,
      showComplete: true,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h3>Ratings & Reviews:</h3>
        <ListGroup>
          {this.props.reviews.map((review, index) => (
            <ListGroupItem key={index} onClick={() => this.openReview(index)}>
              <Badge variant="light">{review.stars}</Badge>
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/929/929424.svg"
                height="20px"
                width="20px"
                alt="stars"
              />{" "}
              <span className="title">{review.title}</span>
              <p className="content">{review.content}</p>
              {this.state.showComplete && index === this.state.index && (
                <React.Fragment>
                  <p className="user">
                    <span className="tagOption">User:</span>
                    {review.customerId.name}
                  </p>
                  <p className="product">
                    <span className="tagOption">Product:</span>{" "}
                    {review.productId.name}
                  </p>
                  <p className="status">Status: {review.status}</p>
                </React.Fragment>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default Review;
