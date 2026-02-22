import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		console.log("contenttttt", body);

		const {
			firstName,
			lastName,
			email,
			phone,
			address,
			city,
			serviceType,
			propertyType,
			projectScope,
			rooms,
			squareFootage,
			timeline,
			budget,
			hearAboutUs,
			message,
			referenceNumber,
		} = body;

		// ── Configure transporter ──────────────────────────────────────
		// Use environment variables for credentials
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST, // e.g. smtp.gmail.com
			port: Number(process.env.SMTP_PORT) || 587,
			secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
			auth: {
				user: process.env.SMTP_USER, // e.g. info@vinfraengineers.com
				pass: process.env.SMTP_PASS, // app password / SMTP password
			},
		});

		// ── Helper maps for readable labels ────────────────────────────
		const serviceLabels: Record<string, string> = {
			diaphragm: "Diaphragm Wall",
			topdown: "Top-Down Construction",
			shoring: "Shoring & Piling",
			anchoring: "Soil Anchoring",
		};

		const propertyLabels: Record<string, string> = {
			commercial: "Commercial",
			metro: "Metro/DMRC",
			hospital: "Hospital",
			underpass: "Underpass",
			residential: "Residential Tower",
			other: "Other",
		};

		const timelineLabels: Record<string, string> = {
			asap: "As soon as possible",
			"2weeks": "Within 2 weeks",
			"1month": "Within 1 month",
			"3months": "Within 3 months",
			flexible: "Flexible",
		};

		const budgetLabels: Record<string, string> = {
			under50l: "Under ₹50 Lakhs",
			"50l-1cr": "₹50 Lakhs - ₹1 Crore",
			"1cr-5cr": "₹1 Crore - ₹5 Crore",
			"5cr-10cr": "₹5 Crore - ₹10 Crore",
			over10cr: "Over ₹10 Crore",
			unsure: "Not sure yet",
		};

		const clientName = `${firstName}${lastName ? " " + lastName : ""}`;

		// ── 1. Email to V Infra (admin notification) ───────────────────
		const adminHtml = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e2dc;border-radius:12px;overflow:hidden;">
        
        <div style="background:#1A2E4C;padding:28px 32px;">
          <h1 style="margin:0;color:#C9A227;font-size:22px;">V Infra Engineers</h1>
          <p style="margin:4px 0 0;color:#ffffffcc;font-size:13px;">New Project Enquiry Received</p>
        </div>

        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#4A4A4A;">
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:10px 0;font-weight:600;width:180px;color:#1A2E4C;">Reference</td>
              <td style="padding:10px 0;">${referenceNumber}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Name</td>
              <td style="padding:10px 0;">${clientName}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Email</td>
              <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#1A2E4C;">${email}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Phone</td>
              <td style="padding:10px 0;"><a href="tel:${phone}" style="color:#1A2E4C;">${phone}</a></td>
            </tr>
            ${address ? `<tr style="border-bottom:1px solid #f0ede8;"><td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Address</td><td style="padding:10px 0;">${address}${city ? ", " + city : ""}</td></tr>` : ""}
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Service Required</td>
              <td style="padding:10px 0;">${serviceLabels[serviceType] || serviceType}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Property Type</td>
              <td style="padding:10px 0;">${propertyLabels[propertyType] || propertyType}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Project Scope</td>
              <td style="padding:10px 0;">${projectScope?.join(", ") || "—"}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Basement Levels</td>
              <td style="padding:10px 0;">${rooms || "—"}</td>
            </tr>
            ${squareFootage ? `<tr style="border-bottom:1px solid #f0ede8;"><td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Area</td><td style="padding:10px 0;">${squareFootage}</td></tr>` : ""}
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Timeline</td>
              <td style="padding:10px 0;">${timelineLabels[timeline] || timeline || "—"}</td>
            </tr>
            ${budget ? `<tr style="border-bottom:1px solid #f0ede8;"><td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Budget</td><td style="padding:10px 0;">${budgetLabels[budget] || budget}</td></tr>` : ""}
            ${hearAboutUs ? `<tr style="border-bottom:1px solid #f0ede8;"><td style="padding:10px 0;font-weight:600;color:#1A2E4C;">Referral</td><td style="padding:10px 0;">${hearAboutUs}</td></tr>` : ""}
          </table>

          ${
					message
						? `<div style="margin-top:20px;padding:16px;background:#FAF8F5;border-radius:8px;border:1px solid #e5e2dc;">
                  <p style="margin:0 0 6px;font-weight:600;color:#1A2E4C;font-size:14px;">Additional Message</p>
                  <p style="margin:0;color:#4A4A4A;font-size:14px;line-height:1.6;">${message}</p>
                </div>`
						: ""
				}
        </div>

        <div style="padding:20px 32px;background:#FAF8F5;border-top:1px solid #e5e2dc;text-align:center;">
          <p style="margin:0;color:#717171;font-size:12px;">This enquiry was submitted via the V Infra Engineers website.</p>
        </div>
      </div>
    `;

		await transporter.sendMail({
			from: `"V Infra Website" <${process.env.SMTP_USER}>`,
			to: "info@vinfraengineers.com",
			subject: `New Enquiry: ${serviceLabels[serviceType] || serviceType} — ${clientName} [${referenceNumber}]`,
			html: adminHtml,
		});

		// ── 2. Confirmation email to the user ──────────────────────────
		const userHtml = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e2dc;border-radius:12px;overflow:hidden;">
        
        <div style="background:#1A2E4C;padding:28px 32px;text-align:center;">
          <h1 style="margin:0;color:#C9A227;font-size:24px;">V Infra Engineers</h1>
          <p style="margin:6px 0 0;color:#ffffffcc;font-size:13px;letter-spacing:1px;">THE UNDERGROUND FORCE</p>
        </div>

        <div style="padding:32px;">
          <h2 style="margin:0 0 8px;color:#1A2E4C;font-size:20px;">Thank you, ${firstName}!</h2>
          <p style="color:#4A4A4A;font-size:15px;line-height:1.7;margin:0 0 20px;">
            We have received your project enquiry and our engineering team will review it shortly.
            <strong>We will contact you as soon as possible</strong> — typically within 24 hours.
          </p>

          <div style="background:#FAF8F5;border:1px solid #e5e2dc;border-radius:8px;padding:20px;margin-bottom:24px;">
            <p style="margin:0 0 4px;color:#717171;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Your Reference Number</p>
            <p style="margin:0;color:#1A2E4C;font-size:22px;font-weight:700;">${referenceNumber}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#4A4A4A;margin-bottom:24px;">
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:8px 0;font-weight:600;color:#1A2E4C;width:140px;">Service</td>
              <td style="padding:8px 0;">${serviceLabels[serviceType] || serviceType}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:8px 0;font-weight:600;color:#1A2E4C;">Property</td>
              <td style="padding:8px 0;">${propertyLabels[propertyType] || propertyType}</td>
            </tr>
            <tr style="border-bottom:1px solid #f0ede8;">
              <td style="padding:8px 0;font-weight:600;color:#1A2E4C;">Scope</td>
              <td style="padding:8px 0;">${projectScope?.join(", ") || "—"}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:600;color:#1A2E4C;">Timeline</td>
              <td style="padding:8px 0;">${timelineLabels[timeline] || timeline || "—"}</td>
            </tr>
          </table>

          <div style="border-top:1px solid #e5e2dc;padding-top:20px;">
            <p style="margin:0 0 12px;color:#1A2E4C;font-weight:600;font-size:15px;">Get in Touch Directly</p>
            <p style="margin:0 0 6px;color:#4A4A4A;font-size:14px;">📞 <a href="tel:+918080850001" style="color:#1A2E4C;">+91 8080850001</a> &nbsp;|&nbsp; 0120-4201391</p>
            <p style="margin:0 0 6px;color:#4A4A4A;font-size:14px;">✉️ <a href="mailto:info@vinfraengineers.com" style="color:#1A2E4C;">info@vinfraengineers.com</a></p>
            <p style="margin:0;color:#4A4A4A;font-size:14px;">📍 G28, Sector 3, Noida 201301</p>
          </div>
        </div>

        <div style="padding:20px 32px;background:#1A2E4C;text-align:center;">
          <p style="margin:0 0 4px;color:#C9A227;font-size:13px;font-weight:600;">V Infra Engineers Private Limited</p>
          <p style="margin:0;color:#ffffff80;font-size:11px;">Market Leader for Underground & Deep Foundations</p>
          <p style="margin:8px 0 0;color:#ffffff50;font-size:11px;">
            <a href="https://www.vinfraengineers.com" style="color:#ffffff80;">www.vinfraengineers.com</a>
          </p>
        </div>
      </div>
    `;

		await transporter.sendMail({
			from: `"V Infra Engineers" <${process.env.SMTP_USER}>`,
			to: email,
			subject: `We've received your enquiry — ${referenceNumber} | V Infra Engineers`,
			html: userHtml,
		});

		return NextResponse.json(
			{ success: true, message: "Emails sent successfully" },
			{ status: 200 },
		);
	} catch (error: unknown) {
		console.error("SendMail Error:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Failed to send emails";
		return NextResponse.json(
			{ success: false, message: errorMessage },
			{ status: 500 },
		);
	}
}
