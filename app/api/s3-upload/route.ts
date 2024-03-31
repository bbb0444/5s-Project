import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid4 } from "uuid";
import { CategoryMap, Category } from "@/app/lib/types";

const region = process.env.AWS_S3_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

import { sql } from "@vercel/postgres";

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error("AWS configuration environment variables are not set");
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
async function uploadFileToS3(
  file: Blob,
  category: Category,
  description: string
) {
  const code = "earglue";

  const buffer = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${category}/${code}` + `${uuid4()}`,
    Body: buffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  let result;
  try {
    result = await s3Client.send(command);
  } catch (error) {
    console.error("Error uploading file:", error);
  }

  if (result) {
    // Construct the URL to the uploaded file
    const fileLink = `https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`;

    let result = false;
    let retries = 3;

    while (retries > 0 && !result) {
      result = await uploadToPG(fileLink, category, description);
      if (!result) {
        retries--;
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    }

    if (!result) {
      throw new Error("Upload to PG failed after 3 retries");
    }

    return { key: params.Key, result, fileLink };
  } else {
    throw new Error("File upload failed");
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as Blob;
    const category = formData.get("category") as Category;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const { key, result } = await uploadFileToS3(file, category, description);

    return NextResponse.json({
      success: true,
      fileName: key,
      uploadResult: result,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

async function uploadToPG(
  fileLink: string,
  category: Category,
  description: string
) {
  const category_key = CategoryMap[category];
  try {
    // console.log(fileLink, category_key, description);
    await sql`INSERT INTO uploads (s3_bucket_link, category_key, description) VALUES (${fileLink}, ${category_key} , ${description})`;
    return true;
  } catch (error) {
    console.error("Error inserting into PG:", error);
    return false;
  }
}
