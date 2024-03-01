import { Store } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateStoreForm from "./create-store-form";
import SelectStoreForm from "./select-store-form";

const MainTabs = ({ stores }: { stores: Store[] }) => {
  if (stores.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create store</CardTitle>
          <CardDescription>
            Create your new store dashboard in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateStoreForm />
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="stores" className="w-[400px]">
      {stores.length !== 0 && (
        <TabsList>
          <TabsTrigger value="stores">Stores</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
      )}
      <TabsContent value="stores">
        <Card>
          <CardHeader>
            <CardTitle>Select your store</CardTitle>
          </CardHeader>
          <CardContent>
            <SelectStoreForm stores={stores} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>Create store</CardTitle>
            <CardDescription>
              Create your new store dashboard in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateStoreForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default MainTabs;
