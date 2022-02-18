import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const PhotoScreen = () => {
    const params = useParams(); //get the albumID and filter all the photos belonging to this album
    const [photo, setPhoto] = useState([]);
    const findAllPhotos = () =>
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(photo => setPhoto(photo))
    useEffect(findAllPhotos, []);
    //use a filter to find all the photos with this album id
    const photoFromOneAlbum = Object.values(photo).filter(p => p.albumId === parseInt(params.id));
    return (
        <>
            <div  className="row mt-2">
                {
                    photoFromOneAlbum.map(photo => {
                            return (
                                <>
                                    <div className="col-md-3 mb-4">
                                        <div className="card h-100 text-center p-4" key={photo.id}>
                                            <img className="card-img-top" src={photo.url} alt={photo.title} height="250px"/>
                                            <div className="card-body">
                                                <h5 className="card-title mb-0">{photo.title.substring(0,12)}...</h5>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    )
                }
            </div>
        </>
    )

}
export default  PhotoScreen;