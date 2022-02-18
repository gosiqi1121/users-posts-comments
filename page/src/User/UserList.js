import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const UserList = () => {
    const [user, setUser] = useState([]);
    const findUser = () =>
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(user => setUser(user))
    useEffect(findUser, []);
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-8"
                    >
                        <h1>User List</h1>
                        <ul>
                            {
                                user.map(
                                    u => <li title={`${u.email} \n ${u.username}`}>
                                        <Link to={`/details/${u.id}`}>
                                            {u.name}
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserList;