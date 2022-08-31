import { useNavigate, useParams } from "react-router-dom"
import { HeaderTemplates } from "../../../utils/HeaderTemplates"
import { AuthTemplates } from "../../templates/AuthTemplates"
import toast from 'react-hot-toast';
import { UPDATE_USER_BY_PK_VERIFICATION } from "../../../server/mutation/MutationList"
import { useMutation, useQuery } from "@apollo/client"
import { GET_USER } from "../../../server/query/QueryList"

export const Verification =()=>{
    const navigate = useNavigate()
    const {email} = useParams()
    const {isVerif} = useParams()
    const getUser = (atob(email!))
    const [update_user_by_pk, prop] = useMutation(UPDATE_USER_BY_PK_VERIFICATION)
    const { loading, error, data,refetch } = useQuery(GET_USER)
    refetch()

    if(isVerif !== undefined) {
        const getVerif = atob(isVerif!)
        if (getVerif === 'true' && !loading) {
            if(data.User.length !== null) {
                data.User.forEach((item:any) => {
                    if(item.email === getUser) {
                        update_user_by_pk({
                            variables: {
                            user_id:item.user_id
                        }
                    })
                    .then(()=>{
                        localStorage.setItem('current_login', JSON.stringify({user_id:item.user_id, username:item.username,email:item.email,password:item.password}))
                        refetch().then(()=>{
                            toast(
                                `welcome ${item.username}`,
                                {
                                    duration: 3000,
                                }
                                )
                                navigate('/home')
                            })
                        })
                    }
                })
            } 
        }
    }

    return  <AuthTemplates>
                <HeaderTemplates text='verified our account' style={{fontSize:"2rem"}}/>
                <HeaderTemplates text='check your email' style={{fontSize:"1.5rem"}}/>
            </AuthTemplates>
}