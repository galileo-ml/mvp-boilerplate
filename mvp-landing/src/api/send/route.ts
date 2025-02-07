import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
    name: string;
    email: string;
  }

// Resend as of Feb 2025 had a free tier.
export async function POST(request: Request) {
  try {
    const body = await request.json() as EmailRequest;
    const { name, email } = body;

    const { data, error } = await resend.emails.send({
      from: '{email}',
      to: '{email}',
      subject: '{subject}',
      html: `
        <h2>Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}