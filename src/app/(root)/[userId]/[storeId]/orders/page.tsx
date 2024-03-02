import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

const OrdersPage = () => {
  return (
    <section className="py-10">
      {/* TODO: make dynamic data */}
      <DataTable columns={columns} data={[]} />
    </section>
  );
};

export default OrdersPage;
