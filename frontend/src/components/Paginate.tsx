import { FC } from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { PaginateProps } from "../types";
import { ROUTES } from "../constants";

const Paginate: FC<PaginateProps> = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
}) => {
  const getPageUrl = (pageNumber: number): string => {
    if (isAdmin) {
      return `${ROUTES.ADMIN_PRODUCTS}/${pageNumber}`;
    }
    return keyword
      ? `/search/${keyword}/page/${pageNumber}`
      : `/page/${pageNumber}`;
  };

  return (
    <>
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer key={x + 1} to={getPageUrl(x + 1)}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default Paginate;
