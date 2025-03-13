import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function CategoryCard({ title, text }) {


  return (
    <Card >
      <Card.Img variant="top" src='/images/category.png' />
      <Card.Body /* style={{ height: "200px"}} */>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Link to={"/product-list"}>
          <Button variant="primary">Explore</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CategoryCard