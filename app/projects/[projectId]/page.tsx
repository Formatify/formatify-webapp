import React from 'react'
import Sidebar from '@projects/[projectId]/components/sidebar'

export default function page({ params }: any) {
  return (
    <div>page - {params.projectId}
    <div className="flex bg-white h-screen">
     
      
     <Sidebar/>
    </div>
    </div>
  )
}