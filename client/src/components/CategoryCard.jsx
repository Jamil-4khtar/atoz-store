import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function CategoryCard({ title, text, image }) {


  return (
    <Card >
      <Card.Img variant="top" src={image} />
      <Card.Body style={{ height: "200px" }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Link to={"/product-details"}>
          <Button variant="primary">Shop Now</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CategoryCard