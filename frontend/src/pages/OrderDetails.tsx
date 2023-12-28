import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} from "../slices/orderSlice";
import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
} from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { id: orderId } = useParams<{ id: string }>();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderByIdQuery(orderId);

  const [payOrder, { isLoading: isPaying }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: isPaypalLoading,
    error: paypalError,
  } = useGetPaypalClientIdQuery({});
  // const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!paypalError && !isPaypalLoading) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal?.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, paypalError, isPaypalLoading]);

  const onApproveTest = async () => {
    try {
      await payOrder({
        orderId,
        paymentResult: {
          id: "PAYID-L7Y5VXJU6W71469XU724824U",
          status: "COMPLETED",
          update_time: "2021-08-19T06:53:13Z",
          email_address: "test@paypal.com",
        },
      }).unwrap();
      toast.success("Order paid");
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId: any) => {
        return orderId;
      });
  };

  const onApprove = async (data: any, actions: any) => {
    return actions.order.capture().then(async (details: any) => {
      try {
        await payOrder({ orderId, paymentResult: details }).unwrap();
        refetch();
        toast.success("Order paid");
      } catch (error: any) {
        toast.error(error?.data?.message || error?.message || "Error");
      }
    });
  };

  const onError = (err: any) => {
    console.log("error here");
    toast.error(err);
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{"Error"}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  {"Delivered on " + order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">{"Not Delivered"}</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">{"Paid on " + order.paidAt}</Message>
              ) : (
                <Message variant="danger">{"Not Paid"}</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>{"Order is empty"}</Message>
              ) : (
                <ListGroup>
                  {order.orderItems.map((item: any, index: number) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="my-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{"Order Summary"}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{"Items"}</Col>
                  <Col>{"$" + order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{"Shipping"}</Col>
                  <Col>{"$" + order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{"Tax"}</Col>
                  <Col>{"$" + order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{"Total"}</Col>
                  <Col>{"$" + order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {isPaying && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetails;
