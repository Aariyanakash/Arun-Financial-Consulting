import nodemailer from 'nodemailer';

// Configure nodemailer transporter using Gmail credentials from .env
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendContactEmail = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, service, message } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: firstName, lastName, email, message',
            });
        }

        // Email to consultant (you)
        const consultantEmail = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                ${service ? `<p><strong>Service Interested:</strong> ${service}</p>` : ''}
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // Confirmation email to user
        const userEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We received your message',
            html: `
                <h2>Thank you for reaching out!</h2>
                <p>Hi ${firstName},</p>
                <p>I've received your message and will get back to you within 24 hours on business days.</p>
                <h3>Your Message Summary:</h3>
                <p><strong>Service Interest:</strong> ${service || 'General inquiry'}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <p>In the meantime, feel free to reach out if you have any urgent questions.</p>
                <p>Best regards,</p>
            `,
        };

        // Send both emails
        await transporter.sendMail(consultantEmail);
        await transporter.sendMail(userEmail);

        res.json({
            success: true,
            message: 'Message sent successfully! Check your email for confirmation.',
        });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.',
        });
    }
};
