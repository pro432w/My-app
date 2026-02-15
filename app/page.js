'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Newspaper } from 'lucide-react'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setPosts(data)
    setLoading(false)
  }

  if (loading) return <div className="text-center py-10">Loading news...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold">Latest News</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id} className="group">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition border border-gray-100 h-full flex flex-col">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={post.image_url || 'https://via.placeholder.com/400x200'} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-lg font-bold mb-2 group-hover:text-blue-600 line-clamp-2">
                  {post.title}
                </h2>
                <div className="mt-auto text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {posts.length === 0 && (
        <p className="text-center text-gray-500">No news found.</p>
      )}
    </div>
  )
}
