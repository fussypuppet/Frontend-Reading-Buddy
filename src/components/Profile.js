import React, { useEffect, useReducer, useRefresh, useState } from 'react'
import { useParams } from 'react-router-dom'
// import ProfileFriends from '../components/profile_components/ProfileFriends'
import axios from 'axios'

export default function Profile(props) {
    //const [friends, setFriends] = useState([])
    const [error, setError] = useState(null)
    const [refresh, setRefresh] = useState(false)
    let { id } = useParams()

    useEffect(() => {
        setRefresh(false)
        axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`)
            .then(response => {
                if (response.status === 200) {
                    props.setUserInfo({
                        _id: response.data.user._id,
                        first_name: response.data.user.first_name,
                        last_name: response.data.user.last_name,
                        user_name: response.data.user.user_name,
                        email: response.data.user.email
                    })
                    props.setUserReaderExperiences(response.data.user.readerExperiences)
                    props.setUserFriends(response.data.user.friends)
                    let theseUserBooks = response.data.user.readerExperiences.map(readerExperience => {
                        return readerExperience.book;
                    });
                    props.setUserBooks(theseUserBooks)
                } else {
                    setError(response.statusText)
                }
            })
            .catch (err => {
                setError(err.message)
            })
    }, [id]) 
    if (!props.userInfo){
        return null;
    }
    return (
        <div className="half-pane">
            <h2>{props.userInfo.user_name}'s Profile</h2>
            <p>Number of books read this week: {Math.floor(Math.random() * 3)} </p>
            <p>Number of books read this month: {Math.floor(Math.random() * 10)}  </p>
            <p>Currently reading: </p>
            <a href={`/profile/${id}/friends`}>Friends</a><br></br>
            <a href={`/profile/${id}/reviews`}>Reviews</a><br></br>
            <a href={`/profile/${id}/wishlist`}>Wishlist</a><br></br>
            <a href={`/profile/${id}/haveread`}>Books I've Read</a><br></br>
        </div>
    )
}