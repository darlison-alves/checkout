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

const ProtectedRoute = ({ children }: any) => {
  console.log('isAuthenticated()', isAuthenticated())
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  return children
}

function App() {
  const [isFirstStepForm, setIsFirstStepForm] = useState(true)


  return (
    <FormProvider>
      <Header />
      <ToastProvider>
        <Routes>
          <Route path='/login' element={
            <main className="App min-h-screen flex justify-center flex-col items-center bg-[#F5F5F5]">
              <LoginForm />
            </main>
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

          <Route path='/share-indication-code'
            element={
              <ProtectedRoute>
                <div className="App mt-0 flex justify-center flex-col items-center bg-[#F5F5F5]">
                  <ShareCodeRecommendationView />
                </div>
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

        </Routes>
      </ToastProvider>
    </FormProvider>
  )
}

export default App
