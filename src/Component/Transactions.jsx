import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteTransaction } from '../Redux/Actions/ExpenseAction';

function Transactions({ trans }) {
    const dispatch = useDispatch();

    const deleteHandler = async (id) => {
        if (window.confirm(`Are you sure you want to delete this transaction?`)) {
            try {
                const res = await dispatch(deleteTransaction(id)).unwrap();
                toast.success(res.msg);
            } catch (err) {
                toast.error(err.message);
            }
        }
    };

    return (
        <div className="row mt-3">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header">
                        <h4 className="text-center text-secondary">Transactions</h4>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {trans?.map((item) => (
                                <li className="list-group-item d-flex justify-content-between" key={item._id}>
                                    <div className="d-flex flex-column">
                                        <strong>{item.title}</strong>
                                        <span className="text-secondary">&#8377; {item.amount}</span>
                                    </div>
                                    <div>
                                        <NavLink to={`/edit/${item._id}`} className="btn btn-sm btn-info me-3">
                                            <i className="bi bi-pencil"></i>
                                        </NavLink>

                                        <button
                                            onClick={() => deleteHandler(item._id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transactions;
