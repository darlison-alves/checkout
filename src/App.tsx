import { useState } from 'react'
import { FormProvider } from './context/FormContext'
import FirstStepForm from './views/FirstStepForm/FirstStepForm'
import SecondStepForm from './views/SecondStepForm/SecondStepForm'
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Thanks } from './views/Thanks/Thanks';
import LoginForm from './views/LoginForm/LoginForm';
import { Header } from './components/Header/Header';
import { isAuthenticated } from './services/auth';
import { OrderSubscription } from './views/Subscription/Order';
import { PlanListPage } from './views/Subscription/ListPlans';
import { ListRecommendationView } from './views/Recommendation/ListRecommendationView';
import { ShareCodeRecommendationView } from './views/Recommendation/ShareCodeRecommendationView';
import { ToastProvider } from './context/ToastContext';
import { HeaderMenu } from './components/Header/HeaderMenu';
import { IsLoggedProvider } from './context/IsLoggedContext';
import { MySubscriptionView } from './views/Subscription/MySubscription';
import { HeaderMenuAuth } from './components/Header/HeaderMenuAuth';
import { ClientListView } from './views/ClientsList/ClientListView';
import { ClientEditView } from './views/ClientsList/ClientEditView';
import { CompanyListView } from './views/Company/CompanyListView';
import { CompanyFormView } from './views/Company/CompanyFormView';
import { RecoverPasswordForm } from './views/RecoverPassword/RecoverPasswordForm';
import { BankDataView } from './views/BanckData/BankDataView';

const ProtectedRoute = ({ children }: any) => {
  console.log('protected')
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  return children
}

function App() {
  const [isFirstStepForm, setIsFirstStepForm] = useState(true)

  return (
    <FormProvider>
      <IsLoggedProvider>
        <Header />

        <HeaderMenuAuth />

        <ToastProvider>
          <Routes>
            <Route path='/login' element={
              // <main className="App min-h-screen flex justify-center flex-col items-center bg-[#F5F5F5]">
              <LoginForm />
              // </main>
            } />
            <Route path='/client/plans/:id' element={
              <main className="App min-h-screen flex justify-center flex-col items-center bg-[#F5F5F5]">
                {isFirstStepForm ? <FirstStepForm nextStepForm={() => setIsFirstStepForm(false)} /> : <SecondStepForm />}
              </main>
            } />
            <Route path="/obrigado" element={<Thanks />} />

            <Route path='/my-subscription/orders'
              element={
                <ProtectedRoute>
                  {/* <main className="App min-h-screen bg-[#F5F5F5]"> */}
                  <OrderSubscription />
                  {/* <Pagination /> */}
                  {/* </main> */}
                </ProtectedRoute>
              }
            />

            <Route path='/recommendations'
              element={
                <ProtectedRoute>
                  <ListRecommendationView />
                </ProtectedRoute>
              }
            />

            <Route path='/subscription/me'
              element={
                <ProtectedRoute>
                  <main className=" App bg-[#F5F5F5]">
                    <MySubscriptionView />
                  </main>
                </ProtectedRoute>
              }
            />

            <Route path='/share-indication-code'
              element={
                <ProtectedRoute>
                  <div className="App mt-0 flex justify-center flex-col items-center bg-[#F5F5F5]">
                    <ShareCodeRecommendationView />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route path='/companies-admin'
              element={
                <ProtectedRoute>
                  <main className="App bg-[#F5F5F5]">
                    <CompanyListView />
                  </main>
                </ProtectedRoute>
              }
            />

            <Route path='/companies-admin/add'
              element={
                <ProtectedRoute>
                  <main className="App bg-[#F5F5F5]">
                    <CompanyFormView />
                  </main>
                </ProtectedRoute>
              }
            />

            <Route path='/clients'
              element={
                <ProtectedRoute>
                  <main className="App bg-[#F5F5F5]">
                    <ClientListView />
                  </main>
                </ProtectedRoute>
              }
            />

            <Route path='/clients/new'
              element={
                <ProtectedRoute>
                  <main className="App bg-[#F5F5F5]">
                    <ClientEditView />
                  </main>
                </ProtectedRoute>
              }
            />

            <Route path='/user/me'
              element={
                <ProtectedRoute>
                  <main className="App bg-[#F5F5F5]">
                    <BankDataView />
                  </main>
                </ProtectedRoute>
              }
            />


            <Route
              path='/plans'
              element={
                <main className="App min-h-screen flex flex-col items-center bg-[#F5F5F5]">
                  <PlanListPage />
                </main>
              }
            />

            <Route
              path='/recover-password'
              element={
                <RecoverPasswordForm />
              }
            />

          </Routes>
        </ToastProvider>
      </IsLoggedProvider>
    </FormProvider>
  )
}

export default App
