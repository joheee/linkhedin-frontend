import { useState } from "react"
import { BoxInnerTemplates } from "../../../utils/BoxInnerTemplates"
import { ManageMyNetworkButtonTemplates } from "../../templates/manageMyNetwork/ManageMyNetworkButtonTemplates"
import './ManageMyNetwork.scss'

export const ManageMyNetwork =()=>{
    const dummyData = null
    const [isPopUp, setIsPopUp] = useState(false)

    return  <BoxInnerTemplates>
                    <div className="manage-my-network-container">
                        <div className="manage-my-network-header-component">
                            manage my network
                        </div>

                        <ManageMyNetworkButtonTemplates dummyData={dummyData} icon='fa-solid fa-user-group' text="connections" navigate="/connections"/>
                        {isPopUp === true ? 
                            <div className="">
                                <ManageMyNetworkButtonTemplates dummyData={dummyData} icon='fa-solid fa-circle-user' text="people | follow" navigate="/people"/>
                                <ManageMyNetworkButtonTemplates dummyData={123} icon='fa-solid fa-address-book' text="contacts" navigate="/contacts"/>
                                <ManageMyNetworkButtonTemplates dummyData={dummyData} icon='fa-solid fa-people-group' text="groups" navigate="/groups"/>
                                <ManageMyNetworkButtonTemplates dummyData={12} icon='fa-solid fa-calendar-days' text="events" navigate="/events"/>
                                <ManageMyNetworkButtonTemplates dummyData={dummyData} icon='fa-solid fa-file-lines' text="page" navigate="/page"/>
                                <ManageMyNetworkButtonTemplates dummyData={3} icon='fa-solid fa-newspaper' text="newsletters" navigate="/newsletters"/>
                                <ManageMyNetworkButtonTemplates dummyData={dummyData} icon='fa-solid fa-hashtag' text="hashtags" navigate="/hashtags"/>
                            </div> : null
                        } 
                        
                        <div className="show-button-network-component feed-hover" onClick={()=>setIsPopUp(!isPopUp)}>{isPopUp === false ? "show more":"show less"}</div>
                    </div>
                </BoxInnerTemplates>

}