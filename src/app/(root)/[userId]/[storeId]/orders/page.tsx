import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { currencyformatter } from "@/lib/utils";
import { OrderColumn, columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export const revalidate = 0;

const OrdersPage = async ({
  params,
}: {
  params: { userId: string; storeId: string };
}) => {

  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: currencyformatter.format(order.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, 'MMMM do, yyyy'),
  }));


  return (
    <article className="py-10">
      {/* TODO: make dynamic data */}
      <DataTable columns={columns} data={formattedOrders} />
    </article>
  );
};

export default OrdersPage;
