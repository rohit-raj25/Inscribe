import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
    const body=await c.req.json();
  
   try {
    const user=await prisma.user.create({
      data:{
        username:body.username,
        email:body.email,
        password:body.password
  
      },
    })
  
    const token=await sign({id:user.id},c.env.JWT_SECRET)
  
  
    return c.json({token})
   } catch (error) {
    c.status(411)
    return c.text('User Already exists with this email or username')  
   }
  })
  
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
    const body=await c.req.json();
  
   try {
    const user=await prisma.user.findFirst({
      where:{
        username:body.username,
        
        password:body.password
  
      },
    })
  
    if(!user){
      c.status(403); //Unauthorized remember to use 403 for unauthorized
      return c.text('Invalid creds')
    }
  
    const token=await sign({id:user.id},c.env.JWT_SECRET)
  
  
    return c.json({token})
   } catch (error) {
    c.status(411)
    return c.text('User Already exists with this email or username')  
   }
  
  })
  
  
  