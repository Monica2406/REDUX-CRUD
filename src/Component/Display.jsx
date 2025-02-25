import React from 'react'

function Display(props) {
    const {balance, income, expense} = props
  return (
    <div className="container">
    <div className="row mt-3">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
           <div className="row">
            <div className="col-md-12 text-start">
              <h4>Your balance</h4>
              <h2>&#8377; {balance} </h2>
            </div>
           </div>

           <div className="row mt-3">
            <div className="col-md-6 text-start">
                <h4>Your income</h4>
                <h2>&#8377; {income}</h2>
            </div>
            <div className="col-md-6 text-end">
            <h4>Your expense</h4>
            <h2>&#8377; {expense}</h2>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}

export default Display
