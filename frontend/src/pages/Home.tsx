import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Product, Paginate, ProductCarousel, Meta } from "../components";
import GoBack from "../components/GoBack";

interface ApiError {
  message: string;
}

const handleError = (error: unknown): string => {
  const apiError = error as ApiError;
  return apiError.message ?? "An unknown error occurred";
};

const Home = () => {
  const { pageNumber = "1", keyword = "" } = useParams<{
    pageNumber?: string;
    keyword?: string;
  }>();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const errorMessage = error ? handleError(error) : null;
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      {isLoading ? (
        <Skeleton height={30} />
      ) : (
        <RenderProducts data={data} keyword={keyword} />
      )}
    </>
  );
};

const RenderProducts = ({ data, keyword }: { data: any; keyword: string }) => (
  <Container className="py-3 px-0">
    <Meta />
    {keyword && <GoBack to="/" />}
    <h1>Latest Products</h1>
    <Row>
      {data?.products.map((product: any) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
    <Paginate
      pages={data.pages}
      page={data.page}
      isAdmin={data.isAdmin}
      keyword={keyword}
    />
  </Container>
);

export default Home;
