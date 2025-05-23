import OrderVerification from "@/components/modules/order/orderVerification";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
const VerifyOrder = () => {
  return (
    <div>
      <Suspense fallback={<div>Login...</div>}>
        <OrderVerification />
      </Suspense>
    </div>
  );
};

export default VerifyOrder;
