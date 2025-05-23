import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TIdea } from "@/types/idea.types";
import GFormInput from "@/components/shared/Form/GFormInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { TAuthor } from "@/types/blog.types";
import { makePayment } from "@/services/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function PaymentModal({
  idea,
  user,
}: {
  idea: Partial<TIdea>;
  user: TAuthor;
}) {
  const form = useForm({
    defaultValues: {
      customer_name: user?.name || "",
      customer_address: user?.address || "",
      customer_phone: "",
      customer_city: "",
    },
  });
  const router = useRouter();

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const paymentData = {
      amount: idea?.price,
      order_id: idea?.id,
      currency: "BDT",
      customer_name: user?.name || data?.customer_name,
      customer_address: user?.address || data?.customer_address || "",
      customer_email: user?.email,
      customer_phone: data?.customer_phone,
      customer_city: data?.customer_city,
    };

    try {
      const res = await makePayment(paymentData);
      if (res?.success) {
        router.push(res?.data);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-600 hover:bg-green-700 text-sm cursor-pointer text-white font-medium px-2 py-2 rounded-lg transition">
          Pay ৳{idea.price}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Fill out your payment information to proceed.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <GFormInput
                control={form.control}
                name="customer_name"
                label="Name"
              />
              <GFormInput
                control={form.control}
                name="customer_address"
                label="Address"
              />
              <GFormInput
                control={form.control}
                name="customer_phone"
                label="Phone"
                required
              />
              <GFormInput
                control={form.control}
                name="customer_city"
                label="City"
                required
              />
              <p className="text-sm mt-2">
                Pay{" "}
                <span className="text-blue-800 font-bold">৳{idea?.price}</span>{" "}
                for full access.
              </p>
            </div>
            <DialogFooter>
              <button
                type="submit"
                color="yellow"
                className="bg-green-600 hover:bg-green-700 text-sm cursor-pointer text-white font-medium px-2 py-2 rounded-lg transition">
                Confirm Payment
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
