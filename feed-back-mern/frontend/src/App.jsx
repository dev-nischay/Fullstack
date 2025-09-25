
import './App.css'
import Navbar from './components/navbar';
import Container from './components/container';
import { BrowserRouter,Routes,Route,Outlet, Link} from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Feedback from './pages/feedback';
function App() {




  return (
    <BrowserRouter>
 
      <Routes>
      <Route path="/" element={<Parent/>}>
      <Route index element ={<Signup/>}/>
      <Route path='signin' element ={<Signin/>}/>
      <Route path = 'feedback' element = {<Feedback/>}/>

      </Route>

      </Routes>



   </BrowserRouter>
  )
}









let Parent = () => {
return <>

    <div className='layout' >
    <Navbar/>
    <Container>
      <Outlet/>
    </Container>
    </div>

</>
}

export default App
