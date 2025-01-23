import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2, Edit, Send } from 'lucide-react';
import { useSelector } from 'react-redux';

const Comment = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${videoId}`);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching comments');
        setLoading(false);
      }
    };
    fetchComments();
  }, [videoId]);

  // Add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`/api/comments`, {
        content: newComment,
        videoId: videoId,
      });
      setComments([...comments, response.data]);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Error adding comment');
    }
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success('Comment deleted successfully');
    } catch (error) {
      toast.error('Error deleting comment');
    }
  };

  // Edit comment
  const handleEdit = async (commentId) => {
    if (editingId === commentId) {
      try {
        await axios.put(`/api/comments/${commentId}`, {
          content: editText,
        });
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, content: editText }
              : comment
          )
        );
        setEditingId(null);
        setEditText('');
        toast.success('Comment updated successfully');
      } catch (error) {
        toast.error('Error updating comment');
      }
    } else {
      const comment = comments.find((c) => c._id === commentId);
      setEditText(comment.content);
      setEditingId(commentId);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-slate-300">Loading comments...</div>
    );
  }

  console.log(comments);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Comments</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-slate-700 text-slate-100 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Send size={18} />
          Post
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-slate-800 p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.user?.userName}`}
                  alt="user avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium text-slate-100">
                    {comment.user?.userName}
                  </p>
                  <p className="text-sm text-slate-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {comment.user._id === userInfo._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(comment._id)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>

            {editingId === comment._id ? (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 bg-slate-700 text-slate-100 rounded-lg px-4 py-2"
                />
                <button
                  onClick={() => handleEdit(comment._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="mt-2 text-slate-300">{comment.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
