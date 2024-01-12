import { FC } from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { PaginateProps } from "../types";

const Paginate: FC<PaginateProps> = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
}) => {
  return (
    <>
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((numberPage, index) => (
            <LinkContainer
              key={index + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${numberPage + 1}`
                    : `/page/${numberPage + 1}`
                  : `/admin/productList/${numberPage + 1}`
              }
            >
              <Pagination.Item active={numberPage + 1 === page}>
                {numberPage + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default Paginate;
