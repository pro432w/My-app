'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Trash2, PlusCircle, LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchPosts()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/admin/login')
    } else {
      setUser(user)
    }
  }

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (data) setPosts(data)
  }

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this post?')) {
      await supabase.from('posts').delete().eq('id', id)
      fetchPosts()
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button onClick={handleLogout} className="text-red-600 text-sm flex items-center gap-1 font-medium px-3 py-2 hover:bg-red-50 rounded">
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <Link href="/admin/create" className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
            <PlusCircle className="w-4 h-4" /> New Post
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50">
            <div>
              <h3 className="font-semibold text-gray-800">{post.title}</h3>
              <p className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
            <button 
              onClick={() => handleDelete(post.id)} 
              className="text-red-500 hover:bg-red-100 p-2 rounded transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="p-8 text-center text-gray-500">No posts yet. Create one!</div>
        )}
      </div>
    </div>
  )
}
