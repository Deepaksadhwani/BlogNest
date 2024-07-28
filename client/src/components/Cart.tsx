import  { FC } from "react";

interface CartProps {
  title: string;
  author: string;
  content: string;
}

const Cart: FC<CartProps> = ({ title, author, content }) => {
  return (
    <div>
      {title}
      {author}
      {content}
    </div>
  );
};

export default Cart;
