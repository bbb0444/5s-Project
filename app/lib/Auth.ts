"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { sql } from "@vercel/postgres";

const secretKey = "bbportfolioweb";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1week")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function verify(code: string | undefined) {
  if (!code) {
    const session = await getSession();
    if (session) {
      return true;
    }
  } else {
    const verified = await validate(code).then(async (valid) => {
      console.log(valid);
      if (!valid) {
        return false;
      }
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      const session = await encrypt({ code });
      cookies().set("session", session, { expires, httpOnly: true });
      return true;
    });
    return verified;
  }
  return false;
}

export async function getCode() {
  const session = await getSession();
  if (session) {
    return session.code;
  } else {
    throw new Error("Unauthorized");
    return null;
  }
}

async function getSession() {
  const session = cookies().get("session")?.value;
  if (session) {
    const payload = await decrypt(session);
    return payload;
  }
}
async function validate(code: string) {
  // const codesFilePath = path.resolve("./", "codes.json");
  // const codesFileContent = fs.readFileSync(codesFilePath, "utf-8");

  // const codes = JSON.parse(codesFileContent);
  const validate = await fetchCodes().then((codes) => {
    console.log(code, codes);
    if (codes.includes(code)) {
      return true;
    } else {
      return false;
    }
  });
  return validate;
}

async function fetchCodes() {
  const result = await sql`
          SELECT code FROM codes`;

  const codes = result.rows.map((row) => row.code);
  const jsonString = JSON.stringify(codes, null, 2); // The second parameter is for formatting the output

  return codes;
}
