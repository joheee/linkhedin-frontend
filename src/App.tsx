import { ApolloProvider } from '@apollo/client'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthPage } from './components/auth/page/AuthPage'
import { ForgotPage } from './components/auth/page/ForgotPage'
import { ResetPassPage } from './components/auth/page/ResetPassPage'
import { VerificationPage } from './components/auth/page/VerificationPage'
import { HomePage } from './components/home/page/HomePage'
import { JobPage } from './components/jobs/page/JobPage'
import { MessagesPage } from './components/messages/page/MessagesPage'
import { MyNetworkPage } from './components/myNetwork/page/MyNetworkPage'
import { NotificationPage } from './components/notification/page/NotificationPage'
import { ProfilePage } from './components/profile/page/ProfilePage'
import { SearchPage } from './components/search/page/SearchPage'
import { handleDark, handleLight } from './components/server/base/LightDarkComponent'
import { GetClient } from './components/server/graphql/Client'
import { AuthContextProvider } from './components/utils/AuthContextProvider'
import { HandleBackground } from './components/utils/BackgroundManager'
import { Toaster } from 'react-hot-toast';
import { OthersPage } from './components/others/page/OthersPage'
import { PostDetailPage } from './components/postDetail/page/PostDetailPage'
import { RefreshProfile } from './components/refresh/RefreshProfile'

function App() {
  useEffect(()=>{
    const LightDarkSign = JSON.parse(localStorage.getItem("LightDarkSign") as string)
    if(LightDarkSign !== null) {
      if(LightDarkSign.isLight === true) {
          handleLight()
          document.body.style.background = HandleBackground('--secondaryColor')
      } else {
          handleDark()
          document.body.style.background = HandleBackground('--secondaryColor')
      }
    }
  },[])

  return  <ApolloProvider client={GetClient()}>
            <div><Toaster position="top-left" reverseOrder={false}/></div>
            <BrowserRouter>
              <AuthContextProvider>
                <Routes>
                  <Route path="/" element={<AuthPage/>}/>
                  <Route path="/auth/reset-password" element={<ForgotPage/>}/>
                  <Route path="/auth/reset-password/new-password/:user_id" element={<ResetPassPage/>}/>
                  <Route path="/auth/verification/:email/:isVerif" element={<VerificationPage/>}/>
                  <Route path="/auth/verification/:email/" element={<VerificationPage/>}/>

                  <Route path="/home" element={<HomePage/>}/>
                  <Route path="/search/:keyword" element={<SearchPage/>}/>
                  <Route path="/mynetwork" element={<MyNetworkPage/>}/>
                  <Route path="/jobs" element={<JobPage/>}/>
                  <Route path="/notifications" element={<NotificationPage/>}/>

                  <Route path="/messages/:messageIndex/:username" element={<MessagesPage/>}/>
                  <Route path="/messages/" element={<MessagesPage/>}/>
                  <Route path="/myprofile/" element={<ProfilePage/>}/>
                  <Route path="/others/:username" element={<OthersPage/>}/>
                  <Route path="/post-detail/:post_id" element={<PostDetailPage/>}/>

                  <Route path="/refresh/profile" element={<RefreshProfile/>}/>
                </Routes>
              </AuthContextProvider>
            </BrowserRouter>
        </ApolloProvider>
}

export default App