import React from 'react'
import Slide from './Slide'
import Navbar from './Navbar'

function HomePage() {
  return (
    <div style={{ overflow: 'hidden' }}> {/* Hide any content that overflows */}
      <Navbar />
      <div className='contain mx-3 my-5' style={{ overflow: 'hidden' }}> {/* Hide any content that overflows */}
        <Slide style={{ width: "50%" }} />
      </div>
    </div>
  )
}

export default HomePage
