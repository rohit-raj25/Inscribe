import { Hono } from 'hono'
import {sign,verify} from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput,updateBlogInput } from "@rohit_raj-25/inscribecommon";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:any;
        
        
    }
}>();

blogRouter.use("/*",async(c,next)=>{


    const authHeader=await c.req.header("authorization") || "";

    try {
        const user=await verify(authHeader,c.env.JWT_SECRET);
    if(user){
       
        c.set("userId",user.id);
         await next();
    }else{
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }   
        
    } catch (error) {
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
    


})

blogRouter.post('/', async (c) => {
    const body=await c.req.json();
    const authorId=c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    
    const blog=await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
           
            authorId: authorId
            
        }
    })

    return c.json({
        id:blog.id,
    })
  })
  
  
  blogRouter.put('/', async (c) => {
    //@ts-ignore
	const userId = c.get('userId');
    const body=await c.req.json();
    
    const prisma=new PrismaClient({ 
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog =await prisma.blog.update({
        where:{
            id:body.id,
            authorId:userId
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        title: blog.title,
		content: blog.content
    })
  })


   

  //Todo : Add pagination
  blogRouter.get('/bulk',async (c) => {
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs=await prisma.blog.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                },
            }
        })
          

        return c.json({blogs});
    } catch (error) {
        c.status(411);
        return c.json({
            message:"Error while fetching blog"
        })
    }
  }) 
  
  
  blogRouter.get('/:id',async (c) => {
    const id=await c.req.param("id");
    const prisma=new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog=await prisma.blog.findFirst({
            where: {
                id: id
            }
            
        })

        return c.json({blog});
    } catch (error) {
        c.status(411);
        return c.json({
            message:"Error while fetching blog"
        })
    }
  })
  
 

//   blogRouter.get('/:id', async (c) => {
// 	const id =await c.req.param('id');
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL,
// 	}).$extends(withAccelerate());

// 	const blog = await prisma.blog.findUnique({
// 		where: {
// 			id
// 		}
// 	});

// 	return c.json(blog);
// })
  
  

  