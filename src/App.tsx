import { useState } from 'react'
import { FormProvider } from './context/FormContext'
import FirstStepForm from './views/FirstStepForm/FirstStepForm'
import SecondStepForm from './views/SecondStepForm/SecondStepForm'
import {
  Routes,
  Route,
} from "react-router-dom";
import {Thanks} from './views/Thanks/Thanks';
import LoginForm from './views/LoginForm/LoginForm';
import { Header } from './components/Header/Header';

function App() {
  const [isFirstStepForm, setIsFirstStepForm] = useState(true)


  return (
    <FormProvider>
      <Header />
      <Routes>
        <Route path='/' element={
          <main className="App min-h-screen flex justify-center flex-col items-center bg-[#F5F5F5]">
            <LoginForm />
          </main>
        } />
        <Route path='/checkout/:id' element={
          <main className="App min-h-screen flex justify-center flex-col items-center bg-[#F5F5F5]">
          {isFirstStepForm ? <FirstStepForm nextStepForm={() => setIsFirstStepForm(false)}/> : <SecondStepForm/>}
          </main>
        } />

        <Route path="/obrigado" element={<Thanks />}/>
  
      </Routes>
    </FormProvider>
  )
}

export default App
