import { useBlogs } from '../hooks';
import { Appbar } from '../components/Appbar.tsx';
import { BlogCard } from '../components/BlogCard';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { useEffect, useState } from 'react';

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(blogs);

  useEffect(() => {
    if (search === '') {
      setFilter(blogs);
    } else {
      const searchValue = search.toLowerCase();
      const newFilterBlogs = blogs.filter((blog) => 
        blog.title.toLowerCase().includes(searchValue)
      );
      setFilter(newFilterBlogs);
    }
  }, [blogs, search]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  if (loading) {
    return (
      <div>
        <Appbar value={search} onSearchChange={handleSearch} />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar value={search} onSearchChange={handleSearch} />
      <div className="flex justify-center">
        <div>
          {
            filter.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author?.name || 'Anonymous'}
                title={blog.title}
                authorBio={blog.authorBio || 'Author Bio not available'}
                content={blog.content}
                createdAt={blog.createdAt}
              />
            )
          ) }
        </div>
      </div>
    </div>
  );
};
