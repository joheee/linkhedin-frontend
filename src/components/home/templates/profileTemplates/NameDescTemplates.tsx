import { RecommendCardInterface } from '../../../server/credential/Interface'
import './NameDescTemplates.scss'

export const NameDescTemplates =(prop:any)=>{
    return <div className="profile-username-description-container">
        <div className="profile-username-container">
                    {prop.username}
                </div>
                <div className="profile-description-container">
                    {prop.UserDetail.description}
                </div>
    </div>
}