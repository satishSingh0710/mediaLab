import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const receivedSignature = request.headers.get("x-cloudinary-signature");

    // Your Cloudinary API Secret (Store this in .env)
    const cloudinarySecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudinarySecret) {
      console.error("Cloudinary API Secret is missing.");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    // Recompute expected signature
    const payloadString = Object.keys(body)
      .sort()
      .map((key) => `${key}=${body[key]}`)
      .join("&");

    const expectedSignature = crypto
      .createHmac("sha1", cloudinarySecret)
      .update(payloadString)
      .digest("hex");

    if (receivedSignature !== expectedSignature) {
      console.error("Signature verification failed!");
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    console.log("📢 Cloudinary Webhook Received:", body);

    if (body.notification_type === "upload") {
      console.log("✅ Image uploaded:", body.public_id);
    }

    if (body.notification_type === "derived") {
      console.log("✅ Transformation complete:", body.public_id);
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
