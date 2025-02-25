import React, { useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import ExpenseApi from '../API/ExpenseApi';
import {useNavigate, useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../Redux/Actions/ExpenseAction';


function Update(props) {
  const [transaction, setTransaction] = useState({
    title : "",
    amount : 0
  })

  const params = useParams()
  const dispatch =useDispatch()
  const navigate = useNavigate()

  const readData = async () => {
    await ExpenseApi.readSingle(params.transId).then(res => {
      setTransaction(res.data.transaction)
    }).catch(err => toast.error(err.response.data.msg))
  }
  useEffect(()=> {
    readData()
  },[])

  const readInput = async (e) => {
    const {name,value } = e.target;
      setTransaction({...transaction, [name]:value })
    }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        console.log(`data =`, transaction);
        await dispatch(updateTransaction({id: params.transId,transaction })).unwrap()
            .then(res => {
                toast.success(res.data.msg);
                navigate(`/`);
            })
            .catch(err => toast.error(err.response.data.msg))
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
                Update Transactions
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
                  <input type="submit" value="Update Transactions" className='btn btn-outline-secondary'/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update
