
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import PostItem from '../posts/postItem';
import CommentForm from './commentForm';
import CommentItem from './commenItem';
import { getSinglePost } from '../actions/post';

const Post = ({ getSinglePost, post: { post, loading }, match }) => {
    const [load, setLoad] = useState(true);
    useEffect(() => {
        getSinglePost(match.params.id).then(() => {
            setLoad(false);
            console.log(post.comments);
        });
    }, [getSinglePost]);

    return load || post === null ? (
        <Spinner />
    ) : (
            <Fragment>
                <Link to="/posts" className="btn">
                    Back To Posts
      </Link>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <div className="comments">
                    {post.comments.map((comment) => (
                        <CommentItem key={comment._id} comment={comment} postId={post._id} />
                    ))}
                </div>
            </Fragment>
        );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getSinglePost })(Post);