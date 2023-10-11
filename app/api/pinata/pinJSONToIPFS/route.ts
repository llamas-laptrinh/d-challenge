import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        pinataContent: {
          name: body.name,
          symbol: body.symbol,
          description: body.description,
          seller_fee_basis_points: 500,
          image: body.image,
          attributes: body.attributes,
          properties: body.properties,
        },
        pinataMetadata: {
          name: body.name,
        },
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${body.JWT}`,
        },
      }
    );
    return NextResponse.json({
      status: "success",
      statusCode: 200,
      data: res.data,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
