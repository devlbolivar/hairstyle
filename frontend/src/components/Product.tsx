import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { CartItem } from "../types";
import { ROUTES } from "../constants";

const Product: FC<{ product: CartItem }> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`${ROUTES.PRODUCT}/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`${ROUTES.PRODUCT}/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
