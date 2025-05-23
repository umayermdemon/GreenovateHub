import AllOrderPage from "@/components/modules/Dashboard/Admin/Order/AllOrderPage";

import { getAllOrder } from "@/services/order";

const AllIOrders = async () => {
  const orders = await getAllOrder();
  return (
    <div className="mx-6">
      <h1 className="my-5 text-3xl font-bold text-green-500">All Orders</h1>
      <AllOrderPage orders={orders?.data} />
    </div>
  );
};

export default AllIOrders;
