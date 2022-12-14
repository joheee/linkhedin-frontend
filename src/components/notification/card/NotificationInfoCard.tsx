import { useMutation, useQuery, useSubscription } from '@apollo/client'
import toast from 'react-hot-toast'
import { CONNECT_ACCEPT,CONNECT_REJECT, CREATE_CHAT_ROOM, FOLLOW_MECHANISM } from '../../server/mutation/MutationList'
import { GET_LOGIN_USER,GET_REQUEST_CONNECT,GET_SPECIFIC_CONNECT } from '../../server/query/QueryList'
import './NotificationInfoCard.scss'

export const NotificationInfoConnectCard =(prop:any)=>{
    const getUserLocal = JSON.parse(localStorage.getItem('current_login')!)
    getUserLocal === null ? "":getUserLocal
    const getUser = useSubscription(GET_LOGIN_USER, {
        variables: {
            username:prop.senderConnect
        }
    })
    const getConnect = useSubscription(GET_SPECIFIC_CONNECT ,{
        variables:{
            receiverConnect:getUserLocal.username,
            senderConnect:prop.senderConnect
        }
    })
    const getRequest = useSubscription(GET_REQUEST_CONNECT, {
        variables:{
            username:getUserLocal.username!
        }
    })
    const [acceptConnect] = useMutation(CONNECT_ACCEPT)
    const [handleFollow] = useMutation(FOLLOW_MECHANISM)
    
    const handleAccept =()=>{
        acceptConnect({
            variables:{
                connect_id:prop.connect_id!
            }
        }).then(()=>{
            // follow cokk
            handleFollow({
                variables:{
                    sender:prop.receiverConnect,
                    target:prop.senderConnect
                }
            }).then(()=>{
                handleFollow({
                    variables:{
                        target:prop.receiverConnect,
                        sender:prop.senderConnect
                    }
                }).then(()=>{
                    
                    toast.success('accept ' + prop.senderConnect)
                })
            })
        })
    }

    const [rejectConnect] = useMutation(CONNECT_REJECT)
    const handleReject =()=>{
        rejectConnect({
            variables:{
                connect_id:prop.connect_id!
            }
        }).then(()=>{
            toast.success('reject ' + prop.senderConnect)
        })
    }

    if(getUser.loading || getConnect.loading) return <div className=""></div> 
    return  <div className="notification-info-card-container">
                <div className="notification-info-card-picture-info-container feed-hover">
                    <div className="notification-info-card-picture-container">
                        <img src={getUser.data.User[0].UserDetail.photoProfile} alt={prop.createBy} />
                    </div>
                    <div className="">
                        <div className=""><b>{getUser.data.User[0].username}</b> send you connect request</div>
                        <div className="">{new Date(getConnect.data.UserConnect[0].createdAt).toDateString()}</div>
                    </div>
                </div>
                <div className="notification-info-card-createdat-delete-container">
                    <div className="fa-solid fa-trash-can feed-hover" onClick={()=>handleReject()}></div>
                    <div className="fa-solid fa-check feed-hover" onClick={()=>handleAccept()}></div>
                </div>
            </div>
}