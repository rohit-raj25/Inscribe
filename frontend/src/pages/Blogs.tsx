import { useBlogs } from '../hooks'
import {Appbar} from '../components/Appbar'
import {BlogCard} from '../components/BlogCard'

export const Blogs = () => {

  const { loading, blogs } = useBlogs();
  console.log(blogs)
  if (loading) {
    return <div>
      <Appbar/>
      <div className='flex justify-center'>
        <div>
          Loading...
        </div>
      </div>
    </div>
  }
  return 
    <div>
``````<Appbar/>
    ``<div className='flex justify-center'>
      <div>
        {blogs.map(blog => 
        <BlogCard
          //  key={blog.id}
           id={blog.id}
           authorName= {blog.author.name || "Anonymous"} 
           title={blog.title}
           content={blog.content}
           publishedDate={"2nd Feb 2024"} 
          />)}
      </div>
    ``</div>
    </div>
    
  
}

