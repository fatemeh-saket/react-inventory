import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Dashbord from './Component/View/Dashbord'
import Stock from './Component/View/Stock'
import DetailItem from './Component/View/DetailItem'
import Requests from './Component/View/Requests'
import RejectList from './Component/View/RejectList'
import Deficits from './Component/View/Deficits'
import Stores from './Component/View/Stores'

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="dashbord" />} />
          <Route path='dashbord' element={<Dashbord />} />
          <Route path="stock" element={<Stock />}/>
          <Route path='stock/show' element={<DetailItem />} />
          <Route path='requests' element={<Requests />} />
          <Route path='reject' element={<RejectList />} />
          <Route path='deficits' element={<Deficits />} />
          <Route path='storeList' element={<Stores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default Routing




