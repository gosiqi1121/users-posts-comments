import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


// comment function
const Comment = (props) => {
    const { userInfo } = props
    // list all comments we already have
    const [comments, setComments] = useState([])
    const findAllCommentsOfThisPost = (currPost) =>
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${currPost?.id}`)
            .then(res => res.json())
            .then(c => setComments(c))
    useEffect(() => findAllCommentsOfThisPost(props?.post), [])

    // post new comments
    const [newComment, setNewComment] = useState('')
    const commentClickHandler = () => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${props?.post?.id}`, {
            method: 'POST',
            body: JSON.stringify({
                postId: props?.post.id,
                name: userInfo.name,
                email: userInfo.email,
                body: newComment,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => setComments([json, ...comments]))
    }

    return (
        <div className="text-primary">
            <div className="input-group rounded mt-3 text-primary">
                <textarea type="text" className="form-control rounded "
                          placeholder="type your comment here..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}>
                </textarea>
                <button className="btn btn-outline-primary"
                        onClick={commentClickHandler}>comment
                </button>
            </div>

            <ul className="list-group">
                {
                    comments.map(comment =>
                        <li className="list-group-item" key={comment.id}>
                            <p className="fw-bold">{comment.name} - {comment.email}</p>
                            {comment.body}
                        </li>)
                }
            </ul>

        </div>
    )
}

// UpdatePost function
const UpdatePost = (props) => {
    const [updatedPost, setUpdatedPost] = useState(props?.post?.body)
    const updateClickListener = (post) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                body: updatedPost,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                props.onUpdate(json.body)
            })
    }

    return (
        <div className="input-group rounded mt-3 text-primary">
            <textarea
                type="text" className="form-control rounded "
                placeholder="type your comment here..."
                value={updatedPost}
                onChange={(e) => setUpdatedPost(e.target.value)}
            >
            </textarea>
            <button className="btn btn-outline-primary"
                    onClick={() => {updateClickListener(props?.post)}}>
                Update
            </button>
        </div>
    )
}

//List all posts of current user, publish new post, and delete posts
const UserPost = () => {
    const params = useParams()
    //get all posts from this user
    const [posts, setPosts] = useState([]) //save all the posts belonging to this user, and display it
    const findAllPosts = () =>
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => res.json())
            .then(p => {setPosts(p.filter(item => item.userId === parseInt(params.id)))})
    useEffect(findAllPosts, [])

    // get current user
    const [userDetails, setUserDetails] = useState({ 'id': 1 })
    const findUserById = () =>
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
            .then(res => res.json())
            .then(userDetails => setUserDetails(userDetails))
    useEffect(findUserById, [])

    //publish new post
    const [newPost, setNewPost] = useState('')
          //newPost to save the content we just typed
    const postClickHandler = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: newPost,
                userId: parseInt(params.id),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => setPosts([json, ...posts]))
        //add the new post to the posts list we displaying in this page
    }

    //delete posts we clicked
    const deletePostClickHandler = (item) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {setPosts(posts.filter(i => i.id !== item.id))})
             //remove this post from the posts list we displaying in this page
    }

    //search bar
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <>
            <details className="w-100">
                <summary>User Posts</summary>
                <div>
                    <h1>Search Bar</h1>
                    {/*expand to show search bar, create comment button and post new comments*/}
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded" placeholder="Search for posts..."
                               aria-label="Search" aria-describedby="search-addon"
                               onChange={(e) => setSearchTerm(e.target.value)}/>
                        <span className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search"></i>
                                  </span>
                    </div>

                    {
                        //display the list of posts containing the searchTerm
                        //onChange handler to get the searchTerm
                        //filter the posts and only display posts with searchTerm
                        posts.filter((val) => {
                            if (searchTerm === '') {
                                return val
                            } else if (val.body.includes(searchTerm)) {
                                return val
                            }
                        }).map(p =>
                            <li>
                                {p.body}
                            </li>)
                    }
                    <br/>

                    <h1>Posts and Comments</h1>
                    <div className="input-group rounded mt-3">
                                <textarea type="text" className="form-control rounded "
                                          placeholder="New Post..."
                                          value={newPost}
                                          onChange={(e) => setNewPost(e.target.value)}>

                                </textarea>

                        <button className="btn btn-outline-dark"
                                onClick={postClickHandler}>Post
                        </button>

                    </div>
                    <hr/>

                    <div className="rounded mt-3">
                        <ul className="list-group">
                            {
                                posts.map(post =>
                                    <table style={{ marginBottom: '16px' }} key={post.id}>
                                        <tbody>
                                        <tr>
                                            <td style={{ width: '100%' }}>
                                                <div>
                                                    <span className="fw-bold"> <i className="fa fa-bookmark me-2"></i> {post.title}</span>
                                                    <i onClick={() => deletePostClickHandler(post)}
                                                       className="fas fa-times fa-pull-right"></i>
                                                </div>
                                                <div>
                                                    {post.body}
                                                </div>

                                                <UpdatePost post={post} onUpdate={(body) => {
                                                    setPosts(posts.map(item => {
                                                        if (item.id === post.id) item.body = body
                                                        return item
                                                    }))
                                                }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Comment post={post} userInfo={userDetails}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </details>

        </>
    )
}

export default UserPost