import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	const clientsDir = path.join(process.cwd(), "public", "clients");

	try {
		const files = fs.readdirSync(clientsDir);
		const logos = files
			.filter((f) => /^image-client\d+\.(jpeg|jpg|png|webp|svg)$/i.test(f))
			.sort((a, b) => {
				const numA = parseInt(a.match(/\d+/)?.[0] || "0");
				const numB = parseInt(b.match(/\d+/)?.[0] || "0");
				return numA - numB;
			})
			.map((f) => `/clients/${f}`);

		return NextResponse.json({ logos });
	} catch {
		return NextResponse.json({ logos: [] });
	}
}
