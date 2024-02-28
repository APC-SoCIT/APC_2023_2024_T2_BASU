import React from 'react'
import PageComponent from '../components/PageComponent'
import TButton from '../components/core/TButton'
import { InboxArrowDownIcon } from '@heroicons/react/24/outline'

export default function ShuttleStorage() {
  return (
    <PageComponent buttons={
      <TButton color='green' to='/shuttle/form'>
        <InboxArrowDownIcon className="h-6 w-6 mr-2"/> Import a new Shuttle Vehicle
      </TButton>
    }>Shuttle Storage</PageComponent>
  )
}
