import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JournalListing = () => {
    const [journaldata, journaldatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (accountNumber) => {
        navigate("/journal/detail/" + accountNumber);
    }
    const LoadEdit = (accountNumber) => {
        navigate("/journal/edit/" + accountNumber);
    }
    const Removefunction = (accountNumber) => {
        if (window.confirm('Do you want to remove?')) {
            fetch('/api/accounts'+ accountNumber, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }




    useEffect(() => {
        fetch('/api/accounts').then((res) => {
            return res.json();
        }).then((resp) => {
            journaldatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Journal Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="journal/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Account Number</td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Debit</td>
                                <td>Credit</td>
                            </tr>
                        </thead>
                        <tbody>

                            {journaldata &&
                                journaldata.map(item => (
                                    <tr key={item.accountNumber}>
                                        <td>{item.accountNumber}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.debit}</td>
                                        <td>{item.credit}</td>
                                        <td><a onClick={() => { LoadEdit(item.accountNumber) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.accountNumber) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.accountNumber) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default JournalListing;
