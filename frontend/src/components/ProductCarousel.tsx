import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Skeleton from "react-loading-skeleton";

const ProductCarousel = () => {
  const { data, isLoading, error } = useGetTopProductsQuery({});

  return isLoading ? (
    <Skeleton height={30} />
  ) : error ? (
    <Message variant="danger">{"error"}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark custom-carousel">
      {data?.map((product: any) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
