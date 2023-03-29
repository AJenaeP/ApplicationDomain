import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const JournalDetail = () => {
    const { journal } = useParams();

    const [journaldata, journaldatachange] = useState({});

    //May need to make journal - account number to pull data from Accounts
    useEffect(() => {
        fetch('/api/accounts' + journal).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Jouranl Create</h2>
                </div>
                <div className="card-body"></div>

                {journaldata &&
                    <div>
                        <h2>The journal name is : <b>{journaldata.name}</b>  ({journaldata.accountNumber})</h2>
                        
                        <h5>Debit is : {journaldata.debit}</h5>
                        <h5>Creditis : {journaldata.credit}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default JournalDetail;
