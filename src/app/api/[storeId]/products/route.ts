import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    
    const { searchParams } = new URL(req.url);
    const createdAt = searchParams.get("createdAt") || undefined;
    const price = searchParams.get("price") || undefined;
    const isArchivedQueryParam = searchParams.get("isArchived");
    const maxPrice = searchParams.get("maxPrice") || undefined;
    const minPrice = searchParams.get("minPrice") || undefined;
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";
    const query = searchParams.get("query") || undefined;

    const isArchived =
      isArchivedQueryParam === "true"
        ? true
        : isArchivedQueryParam === "false"
        ? false
        : undefined;

    const minPriceValue =
      typeof minPrice !== "undefined" ? parseFloat(minPrice) : undefined;
    const maxPriceValue =
      typeof maxPrice !== "undefined" ? parseFloat(maxPrice) : undefined;

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        createdAt,
        totalPrice: { gte: minPriceValue, lte: maxPriceValue } || price,
        isArchived: isArchived || undefined,
        name: {
          contains: query,
        },
      },
      include: {
        photo: true,
      },
      orderBy: [
        {
          [sortBy]: order as "asc" | "desc",
        },
      ],
    });

    return NextResponse.json(products);

  } catch (error: any) {

    console.error(error);

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
      quantity,
      category,
      sizes,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!photo) {
      return new NextResponse("Photo is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    const formattedPrice = Number(body.price.replace("$", ""));

    if (!discount) {
      return new NextResponse("Discount is required", { status: 400 });
    }

    const formattedDiscount = parseFloat(discount);

    const totalPrice =
      formattedPrice - formattedPrice * (formattedDiscount / 100);

    if (!quantity) {
      return new NextResponse("Quantity is required", { status: 400 });
    }

    const formattedQuantity = parseFloat(quantity);

    if (!category) {
      return new NextResponse("Category is required", { status: 400 });
    }

    if (!sizes) {
      return new NextResponse("Sizes is required", { status: 400 });
    }

    if (isArchived === undefined) {
      return new NextResponse("isArchived is required", { status: 400 });
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
        store: {
          connect: { id: storeByUserId.id },
        },
        photo: {
          create: { url: photo.url, key: photo.key },
        },
        name,
        sku,
        description,
        price: formattedPrice,
        discount: formattedDiscount,
        totalPrice: Math.round(totalPrice),
        quantity: formattedQuantity,
        category,
        sizes,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
