import React, { useEffect, useState, useRef } from 'react'
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
  Image
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { changeCategory, handleAttribute, tableWrapper } from './adminCompUtils/utils';


const onHover = {
  cursor: "pointer",
  position: "absolute",
  left: "5px",
  top: "-10px",
  transform: "scale(2.7)",
}


const AdminEditProductComp = ({ categories, fetchProduct, id, updateProduct, navigate, dispatch, saveAttr, imageDeleteApi, uploadHandler, uploadImagesCloudinaryApi }) => {
  const [product, setProduct] = useState({})
  const [validated, setValidated] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null)
  const [attributes, setAttributes] = useState([]);
  const [categoryChoosen, setCategoryChoosen] = useState("")
  const [table, setTable] = useState([])
  const [newAttrKey, setNewAttrKey] = useState("")
  const [newAttrVal, setNewAttrVal] = useState("")
  const [imageRemoved, setImageRemoved] = useState(false)
  const [isUploading, setIsUploading] = useState("")
  const [imageUploaded, setImageUploaded] = useState(false)
  const [initialCategory, setInitialCategory] = useState("")


  const attrKey = useRef(null);
  const attrVal = useRef(null);

  // fetch the product
  useEffect(() => {
    fetchProduct(id)
      .then(res => {
        // console.log(res)
        setProduct(res)
        setInitialCategory(res.category)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id, imageRemoved, imageUploaded])

  // set the attributes after the PRODUCT is fetched
  useEffect(() => {
    let existingCategory = categories.find(c => c.name === product.category);
    if (existingCategory) {
      const mainCategoryName = existingCategory.name.split("/")[0]
      // console.log("mainCat", mainCategory)
      const mainCategoryData = categories.find(c => c.name === mainCategoryName);
      // console.log(mainCategoryData)
      setAttributes(mainCategoryData.attrs)
    }
    setTable(product.attrs)
  }, [product])


  

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

  // image delete
  const imageDeleteHandler = (path, id) => {
    imageDeleteApi(path, id)
      .then((res) => {
        if (res.message === "Deleted Successfully") {
          setImageRemoved(!imageRemoved)
        }
      })
  }

  // image upload
  const handleImageUpload = (files, productId) => {
    setIsUploading("Image Uploading...")
    if (import.meta.env.DEV) {
      uploadHandler(files, productId)
        .then((res) => {
          setIsUploading("Image uploaded successfully")
          setImageUploaded(!imageUploaded)
        })
        .catch(err => setIsUploading(
          err.response?.data?.message
        ))
    } else {
      uploadImagesCloudinaryApi(files, productId);
      setIsUploading("Image uploaded. The result may required time to take effect, refresh also if necessary.")
      setTimeout(() => {
        setImageUploaded(!imageUploaded)
      }, 3000);
    }
  }

  // handle submit
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
      // 
      updateProduct(id, formInputs)
        .then(res => {
          if (res.message === "product updated") {
            setUpdateStatus({ success: "Product Updated Successfully" })
            navigate("/admin/products")
          }
        })
        .catch(err => {
          console.log(err.response?.data?.message)
          setUpdateStatus({ error: err.response?.data?.message })
        })
    }

    setValidated(true);
  };


  return (
    <Container>
      {console.log("AdminEditProductComp RENDERED")}
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/products" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required type="text" defaultValue={product.name} />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="description"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                defaultValue={product.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="count">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control name="count" required type="number" defaultValue={product.count} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" required type="text" defaultValue={product.price} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>
                Category
              </Form.Label>
              <Form.Select
                required
                name="category"
                aria-label="Default select example"
                value={categoryChoosen || initialCategory}
                onChange={(e) => changeCategory(e, categories, setAttributes, setCategoryChoosen)}
              >
                <option value="">Choose category</option>
                {categories.map((item, idx) => (
                  <option key={idx} value={item.name}>{item.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {
              attributes.length > 0 &&
              <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="attributes">
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
                    controlId="attributeValue"
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
                <Form.Group className="mb-3" controlId="newAttribute">
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
                  controlId="newAttributeValue"
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

            <Alert show={!!(newAttrKey && newAttrVal)} variant="primary">
              After typing attribute key and value press enterr on one of the
              field
            </Alert>

            <Form.Group controlId="images" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Row>
                {product.images?.length > 0 && product.images.map((img, idx) => (
                  <Col key={idx} style={{ position: "relative" }} xs={3}>
                    <Image crossOrigin='anonymous' src={img.path} fluid />
                    <i style={onHover} onClick={() => imageDeleteHandler(img.path, id)} className="bi bi-x text-danger"></i>
                  </Col>
                ))}
              </Row>
              <Form.Control onChange={(e) => handleImageUpload(e.target.files, id)} type="file" multiple />
                {isUploading}
            </Form.Group>
            <Button variant="primary" type="submit">
              UPDATE
            </Button>
            <Alert show={updateStatus} variant={updateStatus?.success ? "info" : "danger"} >
              {updateStatus?.success || updateStatus?.error}
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


export default AdminEditProductComp




// import React, { useEffect, useState } from 'react';
// import {
//   Container, Row, Col, Form, Button, Table, Alert, CloseButton, Image
// } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const AdminEditProductComp = ({ categories, fetchProduct, id, updateProduct, navigate }) => {
//   const [product, setProduct] = useState({});
//   const [category, setCategory] = useState('');
//   const [attributes, setAttributes] = useState([]);
//   const [attrValues, setAttrValues] = useState([]);
//   const [attrKey, setAttrKey] = useState('');
//   const [attrValue, setAttrValue] = useState('');
//   const [selectedAttributes, setSelectedAttributes] = useState([]);
//   const [validated, setValidated] = useState(false);
//   const [updateStatus, setUpdateStatus] = useState(null);

//   // 🔹 Fetch product on mount
//   useEffect(() => {
//     fetchProduct(id)
//       .then(res => {
//         setProduct(res);
//         setCategory(res.category);
//         setSelectedAttributes(res.attributes || []);
//       })
//       .catch(err => console.error(err));
//   }, [id]);

//   // 🔹 Set attributes when category changes
//   useEffect(() => {
//     if (!category) return;

//     setAttrKey('');
//     setAttrValue('');
//     setAttrValues([]);
//     setSelectedAttributes([]);

//     const exact = categories.find(c => c.name === category);
//     const fallback = categories.find(c => c.name === category.split("/")[0]);
//     setAttributes(exact?.attrs?.length ? exact.attrs : fallback?.attrs || []);
//   }, [category]);

//   // 🔹 Update attribute values when key changes
//   useEffect(() => {
//     const match = attributes.find(attr => attr.key === attrKey);
//     setAttrValues(match ? match.value : []);
//     setAttrValue('');
//   }, [attrKey]);

//   // 🔹 Add selected attribute
//   const handleAddAttribute = () => {
//     if (!attrKey || !attrValue) return;
//     if (selectedAttributes.some(attr => attr.key === attrKey)) return;

//     setSelectedAttributes(prev => [...prev, { key: attrKey, value: attrValue }]);
//   };

//   // 🔹 Remove attribute
//   const handleRemoveAttribute = (index) => {
//     setSelectedAttributes(prev => prev.filter((_, i) => i !== index));
//   };

//   // 🔹 Submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const form = e.currentTarget;
//     if (form.checkValidity() === false) {
//       setValidated(true);
//       return;
//     }

//     const { name, description, price, count } = form.elements;
//     const data = {
//       name: name.value,
//       description: description.value,
//       price: price.value,
//       count: count.value,
//       category,
//       attributes: selectedAttributes,
//     };

//     updateProduct(id, data)
//       .then(res => {
//         if (res.message === 'product updated') {
//           setUpdateStatus({ success: 'Product updated successfully' });
//           navigate('/admin/products');
//         }
//       })
//       .catch(err => {
//         setUpdateStatus({ error: err.response?.data?.message || 'Update failed' });
//       });

//     setValidated(true);
//   };

//   return (
//     <Container>
//       <Row className="justify-content-md-center mt-5">
//         <Col md={1}>
//           <Link to="/admin/products" className="btn btn-info my-3">Go Back</Link>
//         </Col>
//         <Col md={8}>
//           <h1>Edit Product</h1>
//           <Form noValidate validated={validated} onSubmit={handleSubmit}>
//             {/* Basic Info */}
//             <Form.Group controlId="name" className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control required type="text" defaultValue={product.name} />
//             </Form.Group>
//             <Form.Group controlId="description" className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control required as="textarea" rows={3} defaultValue={product.description} />
//             </Form.Group>
//             <Form.Group controlId="count" className="mb-3">
//               <Form.Label>Count in stock</Form.Label>
//               <Form.Control required type="number" defaultValue={product.count} />
//             </Form.Group>
//             <Form.Group controlId="price" className="mb-3">
//               <Form.Label>Price</Form.Label>
//               <Form.Control required type="text" defaultValue={product.price} />
//             </Form.Group>

//             {/* Category Selection */}
//             <Form.Group controlId="category" className="mb-3">
//               <Form.Label>Category</Form.Label>
//               <Form.Select value={category} required onChange={e => setCategory(e.target.value)}>
//                 <option value="">Choose category</option>
//                 {categories.map((cat, idx) => (
//                   <option key={idx} value={cat.name}>{cat.name}</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             {/* Attributes */}
//             {attributes.length > 0 && (
//               <>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Attribute Key</Form.Label>
//                       <Form.Select value={attrKey} onChange={e => setAttrKey(e.target.value)}>
//                         <option value="">Choose attribute</option>
//                         {attributes.map((a, i) => (
//                           <option key={i} value={a.key}>{a.key}</option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Attribute Value</Form.Label>
//                       <Form.Select value={attrValue} onChange={e => setAttrValue(e.target.value)}>
//                         <option value="">Choose attribute value</option>
//                         {attrValues.map((v, i) => (
//                           <option key={i} value={v}>{v}</option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Button variant="secondary" onClick={handleAddAttribute} className="mb-3">
//                   Add Attribute
//                 </Button>
//               </>
//             )}

//             {/* Selected Attributes Table */}
//             {selectedAttributes.length > 0 && (
//               <Table bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Key</th>
//                     <th>Value</th>
//                     <th>Remove</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedAttributes.map((attr, idx) => (
//                     <tr key={idx}>
//                       <td>{attr.key}</td>
//                       <td>{attr.value}</td>
//                       <td><CloseButton onClick={() => handleRemoveAttribute(idx)} /></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             )}

//             {/* Images (optional display) */}
//             {product.images?.length > 0 && (
//               <Row className="mb-3">
//                 <Form.Label>Images</Form.Label>
//                 {product.images.map((img, idx) => (
//                   <Col key={idx} xs={3} style={{ position: 'relative' }}>
//                     <Image src={img.path} fluid />
//                     <i className="bi bi-x text-danger" style={{ cursor: 'pointer', position: 'absolute', top: 0, left: 0 }}></i>
//                   </Col>
//                 ))}
//               </Row>
//             )}
//             <Form.Group className="mb-3">
//               <Form.Control type="file" multiple />
//             </Form.Group>

//             <Button variant="primary" type="submit">UPDATE</Button>

//             {/* Alert */}
//             {updateStatus && (
//               <Alert variant={updateStatus.success ? 'info' : 'danger'} className="mt-3">
//                 {updateStatus.success || updateStatus.error}
//               </Alert>
//             )}
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdminEditProductComp;
