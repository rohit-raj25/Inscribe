import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import {signupInput,signinInput} from '@rohit_raj-25/inscribecommon'
import z from "zod";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

// const signupInput=z.object({
//   email:z.string().email(),
//   password:z.string().min(6),
//   name:z.string().optional()
// })


userRouter.post('/signup', async (c) => {
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    // if (!body) {
    //   c.status(411);
    //   return c.json({ message: 'Request body is required' });
    // }
    //  console.log(success);
    if (!success) { 
      c.status(411);
      console.log(body);
       return c.json({ message: 'Invalid input' }) 
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name ,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.text(token);
  } catch (error) {
    c.status(411);
    return c.text('Invalid input');
  }
});


userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({ message: 'Invalid input' });
    }
  const prisma = new PrismaClient({
    
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
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
} catch (error) {
  c.status(411);
  return c.text('Invalid input');
}
})