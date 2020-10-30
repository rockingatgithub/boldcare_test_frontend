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
  Navbar,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      totalList: 0,
      loadPrevious: false,
    };
  }

  // =========================================initial product and user fetch==============================================

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

    this.fetchReviews();
  };

  fetchReviews = () => {
    fetch("http://localhost:9000/review/getReviews")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          reviews: res.data,
        });
      });
  };

  // ==================================choosing product and users functions======================================

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

  // =======================================handle review submit=================================================

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, pid, cid } = this.state;

    if (title.length === 0) {
      toast("Enter title for review", {
        position: "top-right",
        type: "info",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (description.length === 0) {
      toast("Enter description for review", {
        position: "top-right",
        type: "info",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (pid.length === 0) {
      toast("Choose a product for review", {
        position: "top-right",
        type: "info",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (cid.length === 0) {
      toast("Choose a user from dropdown", {
        position: "top-right",
        type: "info",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
        this.setState(
          {
            showSuccess: true,
          },
          () => {
            this.fetchReviews();
          }
        );
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

  // ====================================load more reviews function======================================

  loadMoreHandler = () => {
    this.setState(
      (state, props) => ({
        totalList: state.totalList + 7,
      }),
      this.fetchNextReviews
    );
  };

  loadPreviousHandler = () => {
    if (this.state.totalList >= 7) {
      this.setState(
        (state, props) => ({
          totalList: state.totalList - 7,
        }),
        this.fetchNextReviews
      );
    }
  };

  fetchNextReviews = () => {
    console.log("I did");
    fetch(`http://localhost:9000/review/getMoreReviews/${this.state.totalList}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          reviews: res.data,
          loadPrevious: true,
        });
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand>Review Management System</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>
          </Col>
        </Row>
        <Row id="row-second">
          <Col>
            <DropdownButton
              id="dropdown-basic-button"
              title="Select Product For Review"
              variant="light"
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
            {this.state.showProduct && (
              <Card style={{ width: "18rem", marginTop: "20px" }}>
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
            <DropdownButton
              id="dropdown-basic-button"
              title="Select User"
              variant="light"
            >
              {this.state.users.map((user, index) => (
                <Dropdown.Item
                  onClick={() => this.userSelect(user._id)}
                  key={index}
                >
                  {user.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            {this.state.showUser && (
              <Card style={{ width: "18rem", marginTop: "20px" }}>
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
          <Col>
            <DropdownButton title="Choose Reviews" variant="light">
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
        </Row>
        <Row id="row-third">
          <Col>
            <h3>Review this product!</h3>
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

              <Button variant="light" type="submit" onClick={this.handleSubmit}>
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
          <Col>
            <Review reviews={this.state.reviews} />
            {this.state.loadPrevious && (
              <Button
                variant="light"
                onClick={this.loadPreviousHandler}
                id="load-previous"
              >
                {" "}
                ...Previous
              </Button>
            )}
            <Button
              variant="light"
              onClick={this.loadMoreHandler}
              id="load-more"
            >
              {" "}
              Load More
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
