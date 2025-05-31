import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function CategoryCard({ title, text, image }) {


  return (
    <Card>
      <Card.Img crossOrigin='anonymous' className='object-fit-cover' style={{ height: "240px"}} variant="top" src={image} />
      <Card.Body style={{ height: "200px"}}>
        <Card.Title className='text-body'>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Link to={`/product-list/category/${title}`}>
          <Button variant="primary">Explore</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CategoryCard