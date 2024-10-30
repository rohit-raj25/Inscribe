import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import {signupInput} from '@rohit_raj-25/inscribecommon'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

userRouter.post('/signup', async (c) => {
  try {
    const body = await c.req.json();
    if (!body) {
      c.status(411);
      return c.json({ message: 'Request body is required' });
    }
    const { success } = signupInput.safeParse({
      email:"sumoit@gmail.com",
      password: "Hello@122",
      name: "huhu",
    });
     console.log(success);
    if (!success) { c.status(411);
      console.log(body);
       return c.json({ message: 'Invalid input' }) }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name || '',
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt: token });
  } catch (error) {
    c.status(500);
    return c.json({ message: 'Internal Server Error' });
  }
});


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
})