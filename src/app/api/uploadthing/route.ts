import { createRouteHandler } from "uploadthing/next";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(req: Request) {

  try {

    const body = await req.json();

    const utapi = new UTApi();

    const res = await utapi.deleteFiles(body.key);

    return NextResponse.json(res);

  } catch (error: any) {

    console.error(error.message);

    return new NextResponse("Internal error", { status: 500 });
    
  }
}
