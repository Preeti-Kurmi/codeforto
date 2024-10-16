// import React, { useState } from 'react';
// import Login from './componenst/Login';
// import Categories from './componenst/Categories';

// function App() {
//   const [token, setToken] = useState(null);

//   if (!token) {
//     return <Login setToken={setToken} />;
//   }

//   return (
//     <div className="App">
//       <Categories token={token} />
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './componenst/Login';
import Categories from './componenst/Categories';
import ServiceList from './componenst/ServiceList';
import './index.css';

const token=localStorage.getItem("token")
console.log("token",token)

function App() {

 

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for login page */}
          <Route
            path="/login"
            element={
           <Login  />}
            
          />

 
          <Route
            path="/categories"
            element={
              
                <div>
                  <Categories />
                
                </div>
              
               
              
            }
            
          />
          <Route path='/service'
          element={
            <ServiceList  />
            
          }/>

          {/* Redirect any unknown path to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;