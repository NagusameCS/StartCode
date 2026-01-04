// Discussion Component - Forum/comments for lessons
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiMessageSquare,
    FiSend,
    FiThumbsUp,
    FiChevronDown,
    FiChevronUp,
    FiUser,
    FiClock,
    FiAlertCircle,
    FiTrash2,
    FiFlag
} from 'react-icons/fi';
import { collection, addDoc, query, where, orderBy, onSnapshot, updateDoc, doc, deleteDoc, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import styles from './Discussion.module.css';

const Discussion = ({ lessonId, courseId }) => {
    const { user, userProfile } = useAuthStore();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, popular

    // Listen to comments for this lesson
    useEffect(() => {
        if (!lessonId) return;

        try {
            const commentsRef = collection(db, 'discussions');
            const q = query(
                commentsRef,
                where('lessonId', '==', lessonId),
                where('parentId', '==', null),
                orderBy('createdAt', sortBy === 'oldest' ? 'asc' : 'desc')
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedComments = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate()
                }));
                
                // Sort by popularity if needed
                if (sortBy === 'popular') {
                    fetchedComments.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                }
                
                setComments(fetchedComments);
            }, (error) => {
                console.warn('Could not load discussions:', error.message);
            });

            return () => unsubscribe();
        } catch (error) {
            console.warn('Discussions not available:', error.message);
        }
    }, [lessonId, sortBy]);

    // Post a new comment
    const handlePostComment = async () => {
        if (!user) {
            toast.error('Please sign in to comment');
            return;
        }

        if (!newComment.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, 'discussions'), {
                lessonId,
                courseId,
                parentId: null,
                userId: user.uid,
                userName: userProfile?.displayName || 'Anonymous',
                userPhoto: userProfile?.photoURL || null,
                content: newComment.trim(),
                likes: 0,
                likedBy: [],
                replies: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            setNewComment('');
            toast.success('Comment posted!');
        } catch (error) {
            console.error('Failed to post comment:', error);
            toast.error('Failed to post comment');
        } finally {
            setLoading(false);
        }
    };

    // Post a reply
    const handlePostReply = async (parentId) => {
        if (!user) {
            toast.error('Please sign in to reply');
            return;
        }

        if (!replyText.trim()) {
            toast.error('Please enter a reply');
            return;
        }

        setLoading(true);
        try {
            // Add the reply
            await addDoc(collection(db, 'discussions'), {
                lessonId,
                courseId,
                parentId,
                userId: user.uid,
                userName: userProfile?.displayName || 'Anonymous',
                userPhoto: userProfile?.photoURL || null,
                content: replyText.trim(),
                likes: 0,
                likedBy: [],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            // Increment reply count on parent
            const parentRef = doc(db, 'discussions', parentId);
            await updateDoc(parentRef, {
                replies: increment(1)
            });

            setReplyText('');
            setReplyTo(null);
            toast.success('Reply posted!');
        } catch (error) {
            console.error('Failed to post reply:', error);
            toast.error('Failed to post reply');
        } finally {
            setLoading(false);
        }
    };

    // Like a comment
    const handleLike = async (commentId, currentLikedBy = []) => {
        if (!user) {
            toast.error('Please sign in to like');
            return;
        }

        const hasLiked = currentLikedBy.includes(user.uid);
        const commentRef = doc(db, 'discussions', commentId);

        try {
            if (hasLiked) {
                // Unlike
                await updateDoc(commentRef, {
                    likes: increment(-1),
                    likedBy: currentLikedBy.filter(id => id !== user.uid)
                });
            } else {
                // Like
                await updateDoc(commentRef, {
                    likes: increment(1),
                    likedBy: [...currentLikedBy, user.uid]
                });
            }
        } catch (error) {
            console.error('Failed to like:', error);
        }
    };

    // Delete own comment
    const handleDelete = async (commentId, userId) => {
        if (!user || user.uid !== userId) return;

        if (!confirm('Delete this comment?')) return;

        try {
            await deleteDoc(doc(db, 'discussions', commentId));
            toast.success('Comment deleted');
        } catch (error) {
            console.error('Failed to delete:', error);
            toast.error('Failed to delete');
        }
    };

    // Format relative time
    const formatTime = (date) => {
        if (!date) return 'Just now';
        
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
        
        return date.toLocaleDateString();
    };

    // Comment Component
    const CommentItem = ({ comment, isReply = false }) => {
        const [showReplies, setShowReplies] = useState(false);
        const [replies, setReplies] = useState([]);

        // Load replies when expanded
        useEffect(() => {
            if (!showReplies || isReply) return;

            const repliesRef = collection(db, 'discussions');
            const q = query(
                repliesRef,
                where('parentId', '==', comment.id),
                orderBy('createdAt', 'asc')
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                setReplies(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate()
                })));
            });

            return () => unsubscribe();
        }, [showReplies, comment.id, isReply]);

        const isOwner = user?.uid === comment.userId;
        const hasLiked = comment.likedBy?.includes(user?.uid);

        return (
            <div className={`${styles.comment} ${isReply ? styles.reply : ''}`}>
                <div className={styles.commentHeader}>
                    <div className={styles.commentUser}>
                        {comment.userPhoto ? (
                            <img src={comment.userPhoto} alt="" className={styles.avatar} />
                        ) : (
                            <div className={styles.avatarPlaceholder}>
                                <FiUser />
                            </div>
                        )}
                        <span className={styles.userName}>{comment.userName}</span>
                        <span className={styles.commentTime}>
                            <FiClock /> {formatTime(comment.createdAt)}
                        </span>
                    </div>
                    {isOwner && (
                        <button
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(comment.id, comment.userId)}
                            title="Delete"
                        >
                            <FiTrash2 />
                        </button>
                    )}
                </div>

                <p className={styles.commentContent}>{comment.content}</p>

                <div className={styles.commentActions}>
                    <button
                        className={`${styles.actionBtn} ${hasLiked ? styles.liked : ''}`}
                        onClick={() => handleLike(comment.id, comment.likedBy || [])}
                    >
                        <FiThumbsUp /> {comment.likes || 0}
                    </button>

                    {!isReply && (
                        <button
                            className={styles.actionBtn}
                            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                        >
                            <FiMessageSquare /> Reply
                        </button>
                    )}

                    {!isReply && comment.replies > 0 && (
                        <button
                            className={styles.actionBtn}
                            onClick={() => setShowReplies(!showReplies)}
                        >
                            {showReplies ? <FiChevronUp /> : <FiChevronDown />}
                            {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                        </button>
                    )}
                </div>

                {/* Reply input */}
                <AnimatePresence>
                    {replyTo === comment.id && (
                        <motion.div
                            className={styles.replyInput}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Reply to ${comment.userName}...`}
                                rows={2}
                            />
                            <div className={styles.replyActions}>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={() => { setReplyTo(null); setReplyText(''); }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={styles.postBtn}
                                    onClick={() => handlePostReply(comment.id)}
                                    disabled={loading || !replyText.trim()}
                                >
                                    <FiSend /> Reply
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Show replies */}
                <AnimatePresence>
                    {showReplies && replies.length > 0 && (
                        <motion.div
                            className={styles.repliesList}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {replies.map(reply => (
                                <CommentItem key={reply.id} comment={reply} isReply />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className={styles.discussion}>
            <button
                className={styles.toggleBtn}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <FiMessageSquare />
                <span>Discussion ({comments.length})</span>
                {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className={styles.discussionContent}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {/* New Comment Input */}
                        <div className={styles.newComment}>
                            {user ? (
                                <>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Ask a question or share your thoughts..."
                                        rows={3}
                                    />
                                    <div className={styles.newCommentActions}>
                                        <div className={styles.sortOptions}>
                                            <span>Sort by:</span>
                                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                                <option value="newest">Newest</option>
                                                <option value="oldest">Oldest</option>
                                                <option value="popular">Most Liked</option>
                                            </select>
                                        </div>
                                        <button
                                            className={styles.postBtn}
                                            onClick={handlePostComment}
                                            disabled={loading || !newComment.trim()}
                                        >
                                            <FiSend /> Post
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className={styles.signInPrompt}>
                                    <FiAlertCircle />
                                    <span>Sign in to join the discussion</span>
                                </div>
                            )}
                        </div>

                        {/* Comments List */}
                        <div className={styles.commentsList}>
                            {comments.length === 0 ? (
                                <div className={styles.noComments}>
                                    <FiMessageSquare />
                                    <p>No comments yet. Be the first to start a discussion!</p>
                                </div>
                            ) : (
                                comments.map(comment => (
                                    <CommentItem key={comment.id} comment={comment} />
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Discussion;
