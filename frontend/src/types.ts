export interface RootState {
  auth: { userInfo: UserInfo };
  cart: {
    cartItems: CartItem[];
    shippingAddress: any;
    paymentMethod: string;
  };
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface CartItem {
  _id: string;
  user: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  rating: number;
  image: string;
  category: string;
  countInStock: number;
  numReviews: number;
  createdAt: string;
  quantity: number;
  reviews: Review[];
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Metadata {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface PaginateProps {
  page: number;
  pages: number;
  isAdmin: boolean;
  keyword?: string;
}

export interface GoBackProps {
  to: string;
  className?: string;
}
