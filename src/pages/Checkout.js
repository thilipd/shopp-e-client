import { Button } from '@mui/material'
import React from 'react'

const Checkout = () => {
    return (
        <div className='row'>
            <div className="col-6">
                <div>
                    <h4>Deliver Address </h4>
                    <textarea placeholder='Enter your address here'>

                    </textarea>
                    <Button variant='contained'>Save</Button>
                    <hr />
                    <h4>Get Coupon</h4>
                </div>
            </div>
            <div className="col-6">
                <h4>Order summary</h4>
                <hr />
                <div>
                    <Button variant='contained'>Place order</Button>
                    <Button variant='contained'>Empty Cart</Button>
                </div>
            </div>

        </div>
    )
}

export default Checkout
