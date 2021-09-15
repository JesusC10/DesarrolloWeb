import axios from "axios";
import React, { useState, useEffect, useInputState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, Col, NavDropdown, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Formulario from "./routers/FormularioRouters";
import Loading from "./components/Loading";

import MyVerticallyCenteredModal from "./components/MyVerticallyCenteredModal";
import MyOffSet from "./components/MyOffSet";
import MyButton from "./components/MyButton";

function App() {
  const [nombres, setNombres] = useState([]);
  const [stateModel, setStateModel] = useState({
    name: "",
    lastName: "",
    age: 0,
  });

  function setData(event) {
    const { value, name } = event.target;
    setStateModel({ ...stateModel, [name]: value });
  }

  const [modalShow, setModalShow] = useState(false);
  const [btnActivo, setBtnActivo] = useState("Cargando");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleSelect = () => {
    setModalShow(true);
  };

  const handleSelectFromButton = (props) => {
    console.log(props.target.id);
    setBtnActivo(props.target.id);
    setModalShow(true);
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setNombres(res.data);
    });
  }, []);

  useEffect(() => {
    console.log(stateModel);
  }, [stateModel]);

  return (
    <Router>
      <Navbar
        style={{ paddingLeft: 20, paddingRight: 20 }}
        sticky="top"
        collapseOnSelect
        bg="dark"
        variant="dark"
        expand="md"
      >
        <LinkContainer to="/Usuarios">
          <Navbar.Brand href="/">
            {" "}
            <img
              alt=""
              src="https://react-bootstrap.github.io/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            SAI
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/usuarios">
              <Nav.Link>Usuarios</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/formulario">
              <Nav.Link>Formulario</Nav.Link>
            </LinkContainer>
            {<LinkContainer to="/Formulario">
              <Nav.Link>{btnActivo}</Nav.Link>
            </LinkContainer>}
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => handleShow()}>
                Canva
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleSelect()}>
                Modal
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <MyVerticallyCenteredModal 
            show={modalShow}
            onHide={() => setModalShow(false)}
            nombres={nombres}
            // deleteTodo={deleteTodo}
            // _handleClick={(a) => handleClick(a)}

          />

          <MyButton 
          nombres={nombres}
          _handleSelectFromButton = {(a) => handleSelectFromButton(a)}
          />
          
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path={"/usuarios"}>
          <Container style={{ padding: 30 }}/>
        </Route>
        <Route path={"/Formulario"}>
          <Container style={{ padding: 20 }}>
            <input
              placeholder={"Nombre"}
              id="id_name"
              name="name"
              onChange={(event) => setData(event)}
            />
          </Container>
          <Container style={{ padding: 20 }}>
            <input
              placeholder={"Apellido"}
              id="id_lastName"
              name="lastName"
              onChange={(event) => setData(event)}
            />
          </Container>
          <Container style={{ padding: 20 }}>
            <input
              placeholder={"Edad"}
              id="id_age"
              name="age"
              onChange={(event) => setData(event)}
            />
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;