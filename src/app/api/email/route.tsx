import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Test } from '../../emails/test';
import { render } from '@react-email/render';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
    },
});

export async function GET() {
    const emailHtml = render(<Test />);

    const options = {
        from: 'test@gmail.com',
        to: 'test@gmail.com',
        subject: 'Testing react email',
        html: emailHtml,
    };

    const response = await transporter.sendMail(options);

    const data = {
        name: 'John Doe',
        emailHtml
    };
    return NextResponse.json({ data, response });
}
