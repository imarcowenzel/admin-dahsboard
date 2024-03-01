import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const createdAt = searchParams.get("createdAt") || undefined;
    const price = searchParams.get("price") || undefined;

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        createdAt,
        price,
        isArchived: false,
      },
      orderBy: [
        {
          createdAt: "asc", // Ordenar pelo createdAt em ordem ascendente
        },
        {
          price: "desc", // Em seguida, ordenar pelo price em ordem descendente
        },
      ],
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { userId: string; storeId: string } }
) {
  try {

    const { userId } = auth();

    const body = await req.json();

    const {
      photo,
      name,
      sku,
      description,
      price,
      discount,
      category,
      sizes,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product.create({
      data: {
        storeId: storeByUserId.id,
        photo,
        name,
        sku: sku || "N/A",
        description,
        price,
        discount,
        category,
        sizes,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
