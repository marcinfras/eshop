// function GET() {

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// import { NextResponse } from "next/server";

// }

// import { cookies } from "next/headers";

// export async function GET(request: Request) {
//   const r = NextResponse.redirect("http://localhost:3000/");
//   await r.cookies.set("this_is_cookie", "dasdasasddasdas");
//   return r;

// const cookieStore = await cookies();
// const token = cookieStore.get("token");
// console.log(
//   "aduishhuiawfhuiawfhuiawfhuawfghioawghioawsghiogawhiogawhiogaiowhgioawhihjogwa"
// );

// cookies().set("chuj", "dasdsadas");

// return new Response("Hello, Next.js!", {
//   status: 200,
//   headers: { "Set-Cookie": `lastViewed=${"tralalallalalallal"}` },
// });
// }

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function GET(request: Request) {
//   console.log(
//     "uyahugwfauigfawuifwaugiwfaugifwaughiawfguiawguiawuighawugawhuiughiawhuiawguhawgihuiawghugiawuhgiawhuigowahuiawguihoagwuihawguhigawuhigawuhiawguhiawghuiawguhigaw"
//   );

//   cookies().set("dadsa", "dasfawhuioawrfhuiofawe");

//   return NextResponse.json("sADASDAS");
// }

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// // import { getProductBySlug } from "../../../../lib/graphql";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ productSlug: string }> }
// ) {
//   const slug = (await params).productSlug;
//   const res = await request.text();

//   //   const test = getProductBySlug(slug);
//   console.log(request.headers.get("product"));
//   console.log("slug " + res);

//   cookies().set("test", "dasdsada");

//   return new NextResponse("test", {
//     status: 200,
//     headers: { "Set-Cookie": `test=${"tetewfsdfdsdfsfsd"}` },
//   });
// }
