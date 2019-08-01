import React from 'react'
import { Suspense } from 'react'
// import Card from './Card'
const Card = React.lazy(() => import('./Card'))

function CardList({ robots }) {
  const cardComponent = robots.map(user => {
    return (
      <Suspense fallback={<div>Loading...</div>} key={user.id}>
        <Card
          id={user.id}
          name={user.name}
          email={user.email}
          // key={user.id}
        />
      </Suspense>
    )
  })
  return <div>{cardComponent}</div>
}

export default CardList
