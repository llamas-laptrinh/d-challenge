import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("file");
  const JWT = formData.get("JWT");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: `${new Date().getTime()}`,
  });
  formData.append("pinataMetadata", pinataMetadata);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${JWT}`,
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
      status: "fail",
      statusCode: 500,
      data: error,
    });
  }
}
