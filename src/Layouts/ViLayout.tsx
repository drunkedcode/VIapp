   import { Outlet } from 'react-router-dom'
   import Navbar from './Navbar'
   import BottomNav from './BottomNav'
   import Sidebar from './Sidebar'

   export default function ViLayout() {
     return (
       <div className="flex flex-col min-h-[100dvh]">
         <Navbar />
         <main className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))]">
           <Outlet />
         </main>
         <BottomNav />
         <Sidebar />
       </div>
     )
   }