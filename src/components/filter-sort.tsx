"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const FilterSort = () => {
  return (
    <div className="flex items-center gap-x-4">
      <Input placeholder="Filter products..." className="max-w-sm" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end"></DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterSort;
