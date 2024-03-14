import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        storeId: params.storeId,
        id: params.productId,
      },
      include: { photo: true },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
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
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        storeId: storeByUserId.id,
        photo: {
          create: { url: photo.url, key: photo.key },
        },
        name,
        sku,
        description,
        price: formattedPrice,
        discount: formattedDiscount,
        totalPrice,
        quantity: formattedQuantity,
        category,
        sizes,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
