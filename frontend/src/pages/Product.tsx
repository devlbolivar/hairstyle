import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(id!);
  const [createReview, { isSuccess, isLoading: isCreatingReview }] =
    useCreateReviewMutation();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { userInfo } = useSelector((state: any) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate(`/cart`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createReview({
        _id: product!._id,
        rating,
        comment,
      }).unwrap();

      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
      refetch();
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Error:</div>
      ) : (
        <>
          <Helmet>
            <title>{product!.name}</title>
            <meta name="description" content={product!.description} />
          </Helmet>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image src={product!.image} alt={product!.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product!.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product!.rating}
                    text={`${product!.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product!.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product!.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product!.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product!.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(+e.target.value)}
                          >
                            {[...Array(product!.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product!.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product!.reviews.length === 0 && (
                <div className="alert alert-info">No Reviews</div>
              )}
              <ListGroup variant="flush">
                {product!.reviews.map((review: any) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {isSuccess && (
                    <div className="alert alert-success">
                      Review submitted successfully
                    </div>
                  )}
                  {isCreatingReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(+e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary" className="my-2">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <div className="alert alert-info">
                      Please <Link to="/login">sign in</Link> to write a review
                    </div>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
