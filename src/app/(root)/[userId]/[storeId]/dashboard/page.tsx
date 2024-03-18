import {
  CreditCardIcon,
  DollarSignIcon,
  LucideIcon,
  PackageIcon,
} from "lucide-react";

import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currencyformatter } from "@/lib/utils";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  
  const stockCount = await getStockCount(params.storeId);
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  const cardsData: {
    title: string;
    icon: LucideIcon;
    content: number | string;
  }[] = [
    {
      title: "Total Revenue",
      icon: DollarSignIcon,
      content: currencyformatter.format(totalRevenue),
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
    <article className="flex-[2] flex flex-col items-center justify-between mt-5 gap-5">
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
      <Overview data={graphRevenue} />
    </article>
  );
};

export default DashboardPage;
