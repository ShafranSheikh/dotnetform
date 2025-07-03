import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CustomForm from './pages/CustomForm';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<CustomForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
