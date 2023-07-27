import { Routes, Route } from "react-router-dom"; 
import InvoiceDetail from '../src/Pages/InvoiceDetail/InvoiceDetail'; 
import  RetailPage from '../src/Pages/HomePage/RetailPage'
import PaymentPage from '../src/Pages/PaymentMobilePage/PaymentPage'

const subDirectory = import.meta.env.BASE_URL

const App =() => {
 
  return (  
    <Routes> 
      <Route path={`${subDirectory}`} element={<RetailPage/>}/>
      <Route path={`${subDirectory}invoice-detail`} element={<InvoiceDetail/>}/>  
      <Route path={`${subDirectory}payment-page`} element={<PaymentPage/>}/> 
    </Routes>
      
  )
}


export default App