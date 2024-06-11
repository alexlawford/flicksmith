import { json } from '@sveltejs/kit'
import { error, type RequestEvent } from "@sveltejs/kit";
import { RESEND_API_KEY } from '$env/static/private'
import { Resend } from 'resend'

export async function POST(r: RequestEvent) {    

    const resend = new Resend(RESEND_API_KEY)

    const req = await r.request.json()

    const message = JSON.stringify(req)

    await resend.emails.send({
        from: 'Flicksmith <donotreply@flicksmith.co.uk>',
        to: req.email,
        subject: 'Thanks for Your Flicksmith Inquiry',
        html: "Thanks for your inquiry. We'll be in touch with some amazing options for you soon!<br /><br />--The Flicksmith team"
    })

    await resend.emails.send({
        from: 'Flicksmith <donotreply@flicksmith.co.uk>',
        to: "alexlawford@icloud.com",
        subject: 'new flicksmith inquiry',
        html: message
    })

    return new Response(JSON.stringify({
        success : true
    }))
}