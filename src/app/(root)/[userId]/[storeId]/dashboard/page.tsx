import { CreditCardIcon, DollarSignIcon, PackageIcon } from "lucide-react";

import { getStockCount } from "@/actions/get-stock-count";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {

  const stockCount = await getStockCount(params.storeId);

  const cardsData = [
    {
      title: "Total Revenue",
      icon: DollarSignIcon,
      content: 50.0,
    },
    {
      title: "Sales",
      icon: CreditCardIcon,
      content: 20,
    },
    {
      title: "Products in stock",
      icon: PackageIcon,
      content: stockCount,
    },
  ];

  return (
    <div className="flex-[2] flex items-center justify-between mt-5 gap-x-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full">
        {cardsData.map((card) => (
          <Card className="w-full">
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
    </div>
  );
};

export default DashboardPage;
