import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { getPosts } from '../actions/post';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import Postitem from './postItem';
import Postform from './postForm';
const Posts = ({ getPosts, post: { posts, loaqding } }) => {
    const [load, setLoad] = useState(true);
    useEffect(() => {
        getPosts().then(() => {
            setLoad(false)
        })
    }, [getPosts])


    return (
        <Fragment>
            {load ? <Spinner /> : (
                <Fragment>
                    <h1 className="large text-primary">Posts</h1>
                    <p className="lead">
                        <i className="fas fas-user"></i> Welcome To Developer Community
            </p>
                    <Postform />
                    <div className="posts">
                        {posts.map(post => (
                            <Postitem key={post._id} post={post} />
                        ))

                        }
                    </div>
                </Fragment>
            )

            }
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,

}

const mapStateToProps = state => {
    return {
        post: state.post,
    }
}

export default connect(mapStateToProps, { getPosts })(Posts);
