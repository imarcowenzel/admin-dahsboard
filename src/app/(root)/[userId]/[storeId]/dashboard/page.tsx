import {
  CreditCardIcon,
  DollarSignIcon,
  LucideIcon,
  PackageIcon,
} from "lucide-react";

import { getStockCount } from "@/actions/get-stock-count";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const stockCount = await getStockCount(params.storeId);
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);

  const cardsData: { title: string; icon: LucideIcon; content: number }[] = [
    {
      title: "Total Revenue",
      icon: DollarSignIcon,
      content: totalRevenue,
    },
    {
      title: "Sales",
      icon: CreditCardIcon,
      content: salesCount,
    },
    {
      title: "Products in stock",
      icon: PackageIcon,
      content: stockCount,
    },
  ];

  return (
    <article className="flex-[2] flex items-center justify-between mt-5 gap-x-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full">
        {cardsData.map((card) => (
          <Card key={card.title} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.content}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </article>
  );
};

export default DashboardPage;
