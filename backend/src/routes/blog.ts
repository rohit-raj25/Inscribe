import { Hono } from 'hono'
import {sign,verify} from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput,updateBlogInput } from "@rohit_raj-25/inscribecommon";
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';




export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
        YOUR_API_KEY:string,
        ADMIN_USER:string
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
        console.log(user.id);
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
            authorBio:body.authorBio,
            authorId: authorId
            
        }
    })

    return c.json({
        id:blog.id,
    })
  })
  
  
  blogRouter.put('/:id', async (c) => {
    //@ts-ignore
    const id=await c.req.param("id");
	const userId = c.get('userId');
    const body=await c.req.json();
    
    const prisma=new PrismaClient({ 
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog =await prisma.blog.update({
        where:{
            id:id,
        authorId:userId || c.env.ADMIN_USER,
            
        },
        data:{
            
            title:body.title,
            content:body.content,
            authorBio:body.authorBio,

        }
    })

    return c.json({
        id:id,
        title: blog.title,
		content: blog.content,
        authorBio:body.authorBio,
        updatedAt:blog.updatedAt
    })
  })


   

  //Todo : Add pagination
  blogRouter.get('/bulk',async (c) => {
    // const body=await c.req.json();
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
                createdAt:true,
                
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
            },
            select:{
                id:true,
                title:true,
                content:true,
                authorBio:true,
                
                author:{
                    select:{
                        name:true
                    }
                },
                createdAt:true,
                updatedAt:true,
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




  blogRouter.post("/summarize", async (c) => {
    const { content } = await c.req.json();
    
    try {
      
        const genAI = new GoogleGenerativeAI(c.env.YOUR_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Give me summary of this blog ${content} `;

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        
  
    
      return  c.json({ summary:result.response.text() });
    } catch (error) {
      console.error("Error with Gemini API:", error);
      return c.json({ error: "Failed to summarize content" },500);
    }
  });


  blogRouter.delete('/:id',async (c) => {
    const id=await c.req.param("id");
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog=await prisma.blog.findUnique({
            where:{
                id:id,
                
            },
            select:{
                authorId:true
            }
        });

        if(!blog){
            return c.json({
                message:"Blog not found"
            })
        }

        if(blog.authorId!==userId && userId!==c.env.ADMIN_USER){
            return c.json({
                message:"You are not authorized to delete this blog"
            })
        }

        const deletedBlog=await prisma.blog.delete({
            where:{
                id:id 
            }
        })

        return c.json({
            message:"Blog deleted successfully",
            
        })


    }
    catch(error){
        return c.json({
            message:"Error while deleting blog"
        })
    }


  })
  
  
 


  

  