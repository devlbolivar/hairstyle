import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

interface ApiError {
  message: string;
}
const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({});

  let errorMessage;
  if (error && "data" in error) {
    // This error is a FetchBaseQueryError and has a 'data' property
    errorMessage = (error.data as any)?.message || "An error occurred";
  } else {
    // This error is a SerializedError or other type without a 'data' property
    errorMessage = "An unknown error occurred";
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product: any) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
