import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stores = await prismadb.store.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(stores);
  } catch (error: any) {
    console.error(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    const body = await req.json();
    const { name } = body;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Store name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    console.error(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
