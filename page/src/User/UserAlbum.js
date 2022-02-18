import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const UserAlbum = () => {
    const params = useParams() //to get user id and filter the albums belong to this user
    const [album, setAlbum] = useState('')
    const findAlbums = () =>
        fetch(`https://jsonplaceholder.typicode.com/albums/`)
            .then(res => res.json())
            .then(album => setAlbum(album))
    const albumByThisUser = Object.values(album).filter(a => a.userId === parseInt(params.id))
    useEffect(findAlbums, [])

    return (
        <>
            <details className="w-100">
                <summary>User Album</summary>
                <div>
                    <ul>
                        {
                            albumByThisUser.map(album =>
                                <li>
                                    <Link to={`/album/${album.id}`}>
                                        {album.title}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>

                </div>
            </details>

        </>
    )

}
export default UserAlbum;