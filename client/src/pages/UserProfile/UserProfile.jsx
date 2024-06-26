import React, { useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector } from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBirthdayCake,faPen} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import { useParams } from 'react-router'
import './UserProfile.css'
import './UsersProfile.css'

const UserProfile = () => {
    const {id}=useParams()
    const users=useSelector((state)=>state.usersReducer)
    const currentProfile=users.filter((user)=>user._id===id)[0]
    const currentUser=useSelector((state)=>state.currentUserReducer)
    const [Switch,setSwitch]=useState(false)
    
    //console.log(currentProfile)
  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className="home-container-2">
            <section>
                <div className="user-details-container">
                    <div className='user-details'>
                        <Avatar backgroundColor="purple" color="white" fontSize='50px' px='40px' py='30px'>
                            {currentProfile?.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <div className="user-name">
                            <h2>{currentProfile?.name}</h2>
                            <p><FontAwesomeIcon icon={faBirthdayCake}/> Joined {moment(currentProfile?.joinedOn).fromNow()} </p>

                        </div>
                    </div>
                    {
                        currentUser?.result._id===id && (
                            <button type='button' onClick={()=>setSwitch(true)} className='edit-profile-btn'>
                                <FontAwesomeIcon icon={faPen}/> Edit Profile
                            </button>
                        )
                    }
                </div>
                <>
                    {
                        Switch ? (
                            <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                        ):(
                            <ProfileBio currentProfile={currentProfile}/>
                        )
                    }
                </>
            </section>
        </div>
    </div>
  )
}

export default UserProfile
