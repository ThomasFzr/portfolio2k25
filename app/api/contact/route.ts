import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Email de réception (depuis variable d'environnement ou par défaut)
    const recipientEmail = process.env.CONTACT_EMAIL || "thomas@thomasfoltzer.com";

    // Envoyer l'email
    const { data, error } = await resend.emails.send({
      from: "Portfolio <contact@thomasfoltzer.com>",
      to: [recipientEmail],
      replyTo: email,
      subject: `Nouveau message de contact de ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1d1d1f; font-size: 24px; margin-bottom: 20px;">Nouveau message de contact</h2>
          
          <div style="background-color: #f5f5f7; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0; color: #1d1d1f;"><strong>Nom:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0; color: #1d1d1f;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e5e5e7;">
            <h3 style="color: #1d1d1f; font-size: 18px; margin-bottom: 10px;">Message:</h3>
            <p style="color: #1d1d1f; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
      text: `
Nouveau message de contact

Nom: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message envoyé avec succès", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}

