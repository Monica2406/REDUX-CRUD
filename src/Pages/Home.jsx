import React, { useState ,useEffect , useCallback} from 'react'
import Display from '../Component/Display'
import Transactions from '../Component/Transactions'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { allTransaction } from '../Redux/Actions/ExpenseAction'

function Home() {
  const [balance, setBalance] = useState(0)
  const [income,setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  const [transaction, setTransaction] = useState([])
  const dispatch = useDispatch()

  const readData = useCallback(() => {
    dispatch(allTransaction()).unwrap().then(res =>{
      setTransaction(res)
    }).catch(err => toast.error(err.response.data.msg))
  },[])

  //print data
  const printData = () => {
    let amounts = transaction?.map(val => Number(val.amount))
    //balance
    let bal = amounts.reduce((ac,cu) => ac+ cu,0).toFixed(2)
    setBalance(bal)
    //income
    let inc = amounts.filter(val => val>0).reduce((ac,cu) => ac+cu,0).toFixed(2)
    setIncome(inc)
    //expense
    let exp = amounts.filter(val => val <0).reduce((ac,cu) => ac + cu,0).toFixed(2)
    setExpense(exp) 
  }

  useEffect(()=>{
    readData()
    printData()
  },[transaction])

  return (
    <div className="container">
          <Display balance={balance} income={income} expense={expense}/>
          <Transactions trans={transaction} />
    </div>
  )
}

export default Home
