import { Hono } from 'hono'
import { Resend } from 'resend'
import DefaultEmail from './default-email'


export type Env = {
  RESEND_API_KEY: string
}


const app = new Hono()


app.get('/', (c) => {
  return c.json({ message: "Hello World" })
})


app.post('/send-email', async (c) => {
  const resend = new Resend((c.env as Env).RESEND_API_KEY)

  const data = await resend.emails.send({
    from: 'Acm <sorawit.bunnee@gmail.com>',
    to: 'ballrapter@gmail.com',
    subject: 'Test Email',
    react: <DefaultEmail name="Ball Kab" />,
  })
  return c.json(data)
})

app.post('/send-emails', async (c) => {
  const resend = new Resend((c.env as Env).RESEND_API_KEY)

  // 1. Get the list of customers from the request body.
  // We expect a JSON object like: { "customers": [{ "email": "...", "name": "..." }] }
  const { customers } = await c.req.json<{ customers: { email: string, name: string }[] }>()

  if (!customers || !Array.isArray(customers)) {
    return c.json({ error: 'A list of customers is required.' }, 400)
  }

  // 2. Loop through each customer and create a "promise" to send them an email.
  const sendPromises = customers.map(customer => {
    return resend.emails.send({
      from: 'test@sorawiss.com',
      to: customer.email,
      subject: `🎉 Welcome to the Family, ${customer.name}!`,
      react: <DefaultEmail name={customer.name} />,
    })
  })

  // 3. Execute all the promises at the same time for better performance.
  // Promise.all waits for every email to be sent.
  try {
    const data = await Promise.all(sendPromises)
    console.log("data", data)
    return c.json(data)
  } catch (error) {
    console.error("error", error)
    return c.json({ error: 'Failed to send one or more emails.' }, 500)
  }
})

export default app
