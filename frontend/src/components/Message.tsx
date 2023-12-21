import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
  children?: React.ReactNode | string;
  variant?: string;
}
const Message: React.FC<Props> = ({ children, variant }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
