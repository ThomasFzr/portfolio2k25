import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, website, submitTime } = body;

    // Protection anti-spam : Honeypot field
    // Si le champ "website" est rempli, c'est probablement un bot
    if (website && website.trim() !== "") {
      console.warn("[SPAM DETECTED] Honeypot field filled:", website);
      // Retourner un succès factice pour ne pas révéler la protection
      return NextResponse.json(
        { message: "Message envoyé avec succès" },
        { status: 200 }
      );
    }

    // Protection anti-spam : Validation du temps de soumission
    // Les humains prennent au moins 3 secondes pour remplir un formulaire
    if (submitTime) {
      const timeSpent = Date.now() - submitTime;
      if (timeSpent < 3000) {
        console.warn("[SPAM DETECTED] Form submitted too quickly:", timeSpent, "ms");
        return NextResponse.json(
          { error: "Veuillez prendre le temps de remplir le formulaire correctement." },
          { status: 400 }
        );
      }
    }

    // Protection anti-spam : Rate limiting
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    const rateLimit = checkRateLimit(ip);
    
    if (!rateLimit.allowed) {
      console.warn("[RATE LIMIT] Too many requests from IP:", ip);
      return NextResponse.json(
        { error: "Trop de tentatives. Veuillez réessayer dans quelques minutes." },
        { status: 429 }
      );
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation de la longueur
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: "Le nom doit contenir entre 2 et 100 caractères" },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Le message doit contenir au moins 10 caractères" },
        { status: 400 }
      );
    }

    if (message.trim().length > 5000) {
      return NextResponse.json(
        { error: "Le message ne peut pas dépasser 5000 caractères" },
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

    // Template HTML de l'email
    const emailHtml = `
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
    `;

    // Envoyer l'email via la fonction sendEmail
    try {
      const result = await sendEmail({
        to: recipientEmail,
        subject: `Nouveau message Portfolio de ${name}`,
        html: emailHtml,
      });

      const error = (result as any)?.error;

      if (error) {
        console.error("Erreur Resend:", error);
        
        // Message d'erreur plus détaillé selon le type d'erreur
        let errorMessage = "Erreur lors de l'envoi de l'email";
        
        if (error.statusCode === 403) {
          if (error.message?.includes("domain is not verified")) {
            errorMessage = "Le domaine email n'est pas encore vérifié. Veuillez configurer votre domaine sur Resend ou utiliser un email de test.";
          } else {
            errorMessage = "Accès refusé. Vérifiez votre clé API Resend.";
          }
        } else if (error.statusCode === 422) {
          errorMessage = "Données invalides. Vérifiez le format de l'email.";
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        return NextResponse.json(
          { error: errorMessage },
          { status: error.statusCode || 500 }
        );
      }

      return NextResponse.json(
        { message: "Message envoyé avec succès", data: result.data },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      return NextResponse.json(
        { error: emailError.message || "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}

