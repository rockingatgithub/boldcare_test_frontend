import React, { Component } from "react";
import {
  Col,
  Container,
  Row,
  Dropdown,
  DropdownButton,
  Form,
  Button,
} from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      users: [],
      pid: "",
      cid: "",
      title: "",
      description: "",
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
  };

  productSelect = (id) => {
    this.setState(
      {
        pid: id,
      },
      () => {
        console.log(this.state.pid);
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
      }
    );
  };

  handleSubmit = () => {
    fetch("http://localhost:9000/product/getProducts", {
      
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("You have successfully reviewed this product");
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
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Write a Review!</h1>
            <Form>
              <Form.Group>
                <Form.Label>review Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title here"
                  onChange={this.handleTitleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Enter review Description</Form.Label>
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
