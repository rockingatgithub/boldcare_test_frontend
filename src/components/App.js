import React, { Component } from "react";
import {
  Col,
  Container,
  Row,
  Dropdown,
  DropdownButton,
  Form,
  Button,
  Modal,
  Card,
} from "react-bootstrap";

import Review from "./Review";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      users: [],
      reviews: [],
      product: {},
      customer: {},
      pid: "",
      cid: "",
      title: "",
      description: "",
      showSuccess: false,
      showUser: false,
      showProduct: false,
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:9000/product/getProducts")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          products: res.data,
        });
      });
    fetch("http://localhost:9000/user/getUsers")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          users: res.data,
        });
      });

    fetch("http://localhost:9000/review/getReviews")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          reviews: res.data,
        });
      });
  };

  productSelect = (id) => {
    this.setState(
      {
        pid: id,
      },
      () => {
        console.log(this.state.pid);
        this.displayProduct();
      }
    );
  };

  userSelect = (id) => {
    this.setState(
      {
        cid: id,
      },
      () => {
        console.log(this.state.cid);
        this.displayUser();
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, pid, cid } = this.state;

    if (title.length === 0) {
      console.log("Enter title for review");
      return;
    }
    if (description.length === 0) {
      console.log("Enter description for review");
      return;
    }
    if (pid.length === 0) {
      console.log("Choose the product for review");
      return;
    }
    if (cid.length === 0) {
      console.log("Choose a user for review");
      return;
    }

    let obj = {
      title: title,
      content: description,
      productId: pid,
      customerId: cid,
      stars: 5,
      status: "Accepted",
    };
    fetch("http://localhost:9000/review/addReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          showSuccess: true,
        });
        // console.log("You have successfully reviewed this product", res);
      });
  };

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  displayProduct = () => {
    fetch(`http://localhost:9000/product/info/${this.state.pid}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          showProduct: true,
          product: res.data,
        });
      });
  };

  displayUser = () => {
    fetch(`http://localhost:9000/user/info/${this.state.cid}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          showUser: true,
          customer: res.data,
        });
      });
  };

  getUserReviews = () => {
    fetch(`http://localhost:9000/review/userAll/${this.state.cid}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          reviews: res.data,
        });
      });
  };

  getProductReviews = () => {
    fetch(`http://localhost:9000/review/productAll/${this.state.pid}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          reviews: res.data,
        });
      });
  };

  getTypeOfReviews = (type) => {
    fetch(`http://localhost:9000/review/reviewType/${type}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          reviews: res.data,
        });
      });
  };

  handleClose = () => {
    this.setState({
      showSuccess: false,
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <DropdownButton
              id="dropdown-basic-button"
              title="Select Product For Review"
            >
              {this.state.products.map((product, index) => (
                <Dropdown.Item
                  onClick={() => this.productSelect(product._id)}
                  key={index}
                >
                  {product.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button" title="Select User">
              {this.state.users.map((user, index) => (
                <Dropdown.Item
                  onClick={() => this.userSelect(user._id)}
                  key={index}
                >
                  {user.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <DropdownButton title="Choose Reviews">
              <Dropdown.Item onClick={() => this.getTypeOfReviews("Accepted")}>
                Accepted
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.getTypeOfReviews("Rejected")}>
                Rejected
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.getTypeOfReviews("All")}>
                All
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            {this.state.showProduct && (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>{this.state.product.name}</Card.Title>
                  <Card.Text>
                    <p className="status">{this.state.product.company}</p>
                    <p className="price">{this.state.product.price}</p>
                  </Card.Text>
                  <Button onClick={this.getProductReviews}>
                    {" "}
                    All Reviews{" "}
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col>
            {this.state.showUser && (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>{this.state.customer.name}</Card.Title>
                  <Card.Text>
                    <p className="email">{this.state.customer.email}</p>
                  </Card.Text>
                  <Button onClick={this.getUserReviews}>All Reviews</Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Write a Review!</h1>
            <Form>
              <Form.Group>
                <Form.Label>Review Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title here"
                  onChange={this.handleTitleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Enter review description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={this.handleDescriptionChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit Review
              </Button>
            </Form>
            <Modal
              show={this.state.showSuccess}
              onHide={this.handleClose}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Review Success!</Modal.Title>
              </Modal.Header>
              <Modal.Body>You have successfully added review!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Review reviews={this.state.reviews} />
        </Row>
      </Container>
    );
  }
}

export default App;
