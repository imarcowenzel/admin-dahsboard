import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {

  try {

    const { searchParams } = new URL(req.url);
    const createdAt = searchParams.get("createdAt") || undefined;
    const price = searchParams.get("price") || undefined;
    const totalPrice = searchParams.get("totalPrice") || undefined;
    const isArchivedQueryParam = searchParams.get("isArchived");
    const sortField = searchParams.get("sortField") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const isArchived =
      isArchivedQueryParam === "true"
        ? true
        : isArchivedQueryParam === "false"
        ? false
        : undefined;

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        createdAt,
        price,
        totalPrice,
        isArchived: isArchived || undefined,
      },
      include: {
        photo: true,
      },
      orderBy: [
        {
          [sortField]: sortOrder as "asc" | "desc",
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

    const user = await currentUser()

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

    if (!user) {
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
        userId: user.id,
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
        totalPrice,
        category,
        sizes,
        isArchived,
      },
    });

    console.log(product);

    return NextResponse.json(product);
  } catch (error: any) {
    console.error(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
