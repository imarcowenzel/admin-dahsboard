"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";

const StoreSwitcher = ({ stores, className }: { stores: Store[], className?: string }) => {
  const { userId, storeId } = useParams();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formattedStores = stores.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  const currentStore = formattedStores.find((store) => store.value === storeId);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${userId}/${store.value}/dashboard`);
  };

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a store"
            className="w-full justify-between"
          >
            {currentStore?.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[230px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search store..." />
              <CommandEmpty>No stores found.</CommandEmpty>
              <CommandGroup>
                {formattedStores.map((store) => (
                  <CommandItem
                    key={store.value}
                    value={store.value}
                    onSelect={() => onStoreSelect(store)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentStore?.value === store.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {store.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  value="create"
                  onSelect={() => router.push("/")}
                  className="cursor-pointer"
                >
                  Create store
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StoreSwitcher;
