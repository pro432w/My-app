'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase' // Fixed import
import { ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'

export default function PostPage({ params }) {
  const [post, setPost] = useState(null)

  useEffect(() => {
    async function getPost() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()
      setPost(data)
    }
    getPost()
  }, [params.id])

  if (!post) return <div className="text-center py-20">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
      </Link>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
      
      <div className="flex items-center text-gray-500 text-sm mb-6">
        <Clock className="w-4 h-4 mr-1" />
        {new Date(post.created_at).toLocaleDateString()}
      </div>

      <div className="rounded-xl overflow-hidden mb-8 shadow-sm">
        <img 
          src={post.image_url || 'https://via.placeholder.com/800x400'} 
          className="w-full object-cover" 
          alt={post.title} 
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  )
    }
    
