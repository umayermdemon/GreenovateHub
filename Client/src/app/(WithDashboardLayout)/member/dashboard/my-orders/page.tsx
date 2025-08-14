import OrderPageDetails from "@/components/modules/Dashboard/Member/my-order/OrderPage";
import { getUser } from "@/services/auth";
import { getMyOrder } from "@/services/order";

const OrderPage = async () => {
  const orders = await getMyOrder();
  const user = await getUser();
  return (
    <div>
      <OrderPageDetails orders={orders?.data} user={user} />
    </div>
  );
};

export default OrderPage;
