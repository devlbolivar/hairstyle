import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const ProductCarousel = () => {
  const { data, isLoading, error } = useGetTopProductsQuery({});
  useEffect(() => {
    if (error) {
      toast.error(error as string);
    }
  }, [error]);

  return isLoading ? (
    <Skeleton height={300} />
  ) : (
    <Carousel pause="hover" className="bg-dark custom-carousel">
      {data?.map((product: any) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption-custom">
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
