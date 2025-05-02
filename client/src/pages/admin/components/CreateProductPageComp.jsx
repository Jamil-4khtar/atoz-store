import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { changeCategory, handleAttribute, tableWrapper } from "./adminCompUtils/utils";

const CreateProductPageComp = ({ createProductApi, uploadImagesApi, uploadImagesCloudinaryApi, categories, newCategory, dispatch, deleteCategory, saveAttr }) => {
  const [validated, setValidated] = useState(false);
  const [attributes, setAttributes] = useState([])
  const [table, setTable] = useState([])
  const [newAttrKey, setNewAttrKey] = useState("")
  const [newAttrVal, setNewAttrVal] = useState("")
  const [images, setImages] = useState(null)
  const [isCreating, setIsCreating] = useState("")
  const [productStatus, setProductStatus] = useState({
    message: "", error: ""
  });
  const [categoryChoosen, setCategoryChoosen] = useState("")

  const attrKey = useRef(null);
  const attrVal = useRef(null);

  const navigate = useNavigate();


  const uploadHandler = (images) => {
    setImages(images)
  }

  const newCatHandler = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      console.log(e.target.value)
      dispatch(newCategory(e.target.value))
      setCategoryChoosen(e.target.value)
      e.target.value = ""
    }
  }

  const deleteCategoryHandler = () => {
    if (categoryChoosen) {
      dispatch(deleteCategory(categoryChoosen))
    }
  }

  // select attributes for table
  const attriValueSelect = (e) => {
    if (e.target.value !== "Choose attribute value") {
      tableWrapper(attrKey.current.value, e.target.value, setTable);

    }
  }

  const deleteAttr = (key) => {
    setTable((prev) => (
      prev.filter(item => item.key !== key)
    ))
  }

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
    }
  }

  // save new attribute
  const newAttrInput = (e) => {
    e.preventDefault();
    if (e.keyCode && e.keyCode === 13) {
      if (newAttrKey && newAttrVal) {
        // console.log("add new attr")
        console.log(`${newAttrKey} ---> ${newAttrVal}`)
        dispatch(saveAttr({ key: newAttrKey, value: newAttrVal, categoryChoosen: categoryChoosen }))
        tableWrapper(newAttrKey, newAttrVal, setTable)
        setNewAttrKey("")
        setNewAttrVal("")

      }
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const { name, description, price, count, category } = form.elements

    const formInputs = {
      name: name.value,
      description: description.value,
      price: price.value,
      count: count.value,
      category: category.value,
      attrs: table,
    }

    if (form.checkValidity() === true) {
      if (images.length > 3) {
        setIsCreating("Too many files...")
        return
      }

      // console.log(formInputs)
      createProductApi(formInputs)
        .then(res => {
          console.log(res.product)

          if (images) {
            if (process.env.NODE_ENV !== "production") { // todo: change
              setIsCreating("processing image(s), just a sec...")
              uploadImagesApi(images, res.product._id)
                .then(res => { /* console.log("testing ran") */ })
                .catch(err => {
                  console.log(err.response?.data?.message)
                  setIsCreating(err.response?.data?.message)
                })
            } else {
              uploadImagesCloudinaryApi(images, res.product._id)
            }
          }
          if (res.product) navigate("/admin/products")
        })
        .catch(err => setProductStatus({ error: err.response?.data?.message }))
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Create a new product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required type="text" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control name="count" required type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" required type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>
                Category
                <CloseButton onClick={deleteCategoryHandler} />
                <small>{categoryChoosen ? "(Click to remove the selected category)" : "Select a category"}</small>

              </Form.Label>
              <Form.Select
                required
                name="category"
                aria-label="Default select example"
                value={categoryChoosen}
                onChange={e => changeCategory(e, categories, setAttributes, setCategoryChoosen)}
              >
                <option value="">Choose category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat.name}>{cat.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new category (e.g. Computers/Laptops/Intel){" "}
              </Form.Label>
              <Form.Control onKeyUp={newCatHandler} name="newCategory" type="text" />
            </Form.Group>

            {attributes.length > 0 &&
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrKey}
                      onChange={e => handleAttribute(e, attributes, attrVal)}
                    >
                      <option>Choose attribute</option>
                      {
                        attributes.map((a, i) => (
                          <option key={i} value={a.key}>{a.key}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                      onChange={attriValueSelect}
                    >
                      <option>Choose attribute value</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            }

            <Row>
              {table && table.length > 0 && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          <CloseButton
                            onClick={() => deleteAttr(item.key)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    disabled={!categoryChoosen}
                    placeholder="first choose or create category"
                    required={newAttrVal}
                    name="newAttrKey"
                    type="text"
                    value={newAttrKey}
                    onChange={e => setNewAttrKey(e.target.value)}
                    onKeyUp={newAttrInput}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    disabled={!categoryChoosen}
                    placeholder="first choose or create category"
                    required={newAttrKey}
                    name="newAttrValue"
                    type="text"
                    value={newAttrVal}
                    onChange={e => setNewAttrVal(e.target.value)}
                    onKeyUp={newAttrInput}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert show={newAttrKey && newAttrVal} variant="primary">
              After typing attribute key and value press enterr on one of the
              field
            </Alert>

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Form.Control required type="file" multiple onChange={e => uploadHandler(e.target.files)} />
              {isCreating}
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
            {productStatus.error ?? ""}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


export default CreateProductPageComp