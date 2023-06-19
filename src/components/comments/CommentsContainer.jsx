import React, {useState} from 'react'
import CommentsForm from './CommentForm'
import Comment from './Comment';
import { useMutation } from '@tanstack/react-query';
import { createNewComment } from '../../services/index/comments';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const CommentsContainer = ({className, logginedUserId, comments, postSlug}) => {
    const userState = useSelector((state) => state.user);
    const [affectedComment, setAffectedComment] = useState(null);
    const {mutate: mutateNewComment, isLoading: isLoadingNewComment} = useMutation({
      mutationFn: ({token, desc, slug, parent, replyOnUser}) => {
        return createNewComment({token, desc, slug, parent, replyOnUser});
      },
      onSuccess: () => {
        toast.success("Commento inviato correttamente. Attendere l'approvazione!");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
              mutateNewComment({desc: value, parent, replyOnUser, token: userState.userInfo.token, slug:postSlug});
              setAffectedComment(null);
        };
        const updateCommentHandler = (value, commentId) => {
          setAffectedComment(null);
        };
        const deleteCommentHandler = (commentId) =>{
        };
  return (
    <div className={`${className}`}>
      <CommentsForm btnLabel='Invia' formSubmitHandler={(value) => addCommentHandler(value)} loading={isLoadingNewComment}/>
      <div className='space-y-4 mt-8'>
        {comments.map((comment)=>(
          <Comment key={comment._id} comment={comment} logginedUserId={logginedUserId} affectedComment={affectedComment} setAffectedComment={setAffectedComment} addComment={addCommentHandler} updateComment={updateCommentHandler} deleteComment={deleteCommentHandler} replies={comment.replies} />
        ))}
      </div>
    </div>
  )
}

export default CommentsContainer
