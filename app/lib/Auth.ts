"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

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
    if (await validate(code)) {
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
      const session = await encrypt({ code });
      cookies().set("session", session, { expires, httpOnly: true });
      return true;
    }
  }
  return false;
}

async function getSession() {
  const session = cookies().get("session")?.value;
  if (session) {
    const payload = await decrypt(session);
    return payload;
  }
}
async function validate(code: string) {
  if (code === "1234") {
    console.log(true);
    return true;
  }
  return false;
}
