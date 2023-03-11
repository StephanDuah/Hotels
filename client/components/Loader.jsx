import React from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
function Loader() {
  return (
    <div style={{height:'80vh'}} className="w-100 d-flex justify-content-center align-items-center">
        <div className='sweet-loading text-center'>
            <CircleLoader loading={true} color="#000" size={150} />
        </div>
    </div>
  )
}

export default Loader