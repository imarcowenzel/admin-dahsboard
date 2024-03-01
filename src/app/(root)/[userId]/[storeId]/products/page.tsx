import { format } from "date-fns";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { ProductColumn, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import FilterSort from "@/components/filter-sort";

const ProductsPage = async ({
  params,
}: {
  params: { userId: string; storeId: string };
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    discount: formatter.format(item.discount.toNumber()),
    category: item.category,
    sizes: item.sizes.split(",").join(" - "),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));


  return (
    <div className="py-5">
      <div className="flex items-center justify-end py-4">
        {/* <FilterSort /> */}
        <Link href={`/${params.userId}/${params.storeId}/products/new`}>
          <Button className="text-black dark:text-white bg-secondary dark:bg-dark-secondary">Add product</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={formattedProducts} />
    </div>
  );
};

export default ProductsPage;
