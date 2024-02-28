import React from 'react'
import PageComponent from '../components/PageComponent'
import TButton from '../components/core/TButton'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  return (

    <PageComponent> Admin Dashboard
      <div>
        <TButton color='blue' to='/shuttle/storage'>
        <ArchiveBoxArrowDownIcon className="h-6 w-6 mr-2" />
          Shuttle Vehicle Dashboard
        </TButton>
      </div>
    </PageComponent>
  )
}
