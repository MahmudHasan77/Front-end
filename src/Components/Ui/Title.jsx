import React from 'react'
import { Cn } from './Cn'

const Title = ({children,className}) => {
  return (
    <h2 className={Cn('text-2xl font-semibold ' , className)}>
      {children}
    </h2>
  )
}

export default Title
