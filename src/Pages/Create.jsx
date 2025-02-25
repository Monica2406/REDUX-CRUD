import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import { addTransaction } from '../Redux/Actions/ExpenseAction';
import {useNavigate} from 'react-router-dom'


function Create(props) {
  const [transaction, setTransaction] = useState({
    title : "",
    amount : 0
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const readInput = async (e) => {
    const {name, value} = e.target;
    setTransaction({...transaction, [name]:value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(`data =`, transaction);
      await dispatch(addTransaction(transaction))
        .unwrap()
        .then(res => {
          toast.success(res.msg);
          navigate(`/`);
        })
        .catch(err => toast.error(err.response.data.msg)); // Fixed here
    } catch (err) {
      toast.error(err.message);
    }
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center">
              <h3 className="text-secondary card-title">
                Create Transactions
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={submitHandler} method='post' autoComplete='off'>
                <div className="form-group mt-2">
                  <label htmlFor="title">Transaction Title</label>
                  <input type="text" name='title' id='title' className="form-control" placeholder='title' value={transaction.title} onChange={readInput} required/>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="amount">Transaction Amount</label>
                  <input type="number" name="amount" id="amount" className='form-control' placeholder='Amount in rupees' value={transaction.amount} onChange={readInput} required/>
                </div>
                <div className="for-group mt-2">
                  <input type="submit" value="Add Transactions" className='btn btn-outline-secondary'/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
