import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditJouranl = () => {
    const { journal } = useParams();

    //const [journal, journalchange] = useState({});

    useEffect(() => {
        fetch('/api/accounts' + journal).then((res) => {
            return res.json();
        }).then((resp) => {
            accountNumberchange(resp.accountNumber);
            namechange(resp.name);
            descriptionchange(resp.description);
            debitchange(resp.debit);
            creditchange(resp.credit);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[accountNumber,accountNumberchange]=useState("");
    const[name,namechange]=useState("");
    const[description,descriptionchange]=useState("");
    const[debit, debitchange]=useState("");
    const[credit, creditchange]=useState("");
   


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const journal={accountNumber,name,description,debit,credit};
      

      fetch('/api/accounts'+journal,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(journal)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Journal Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Account Number</label>
                                        <input value={accountNumber} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input value={description} onChange={e=>descriptionchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Debit</label>
                                        <input value={debit} onChange={e=>debitchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="form-group">
                                        <label>Credit</label>
                                        <input value={credit} onChange={e=>creditchange(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Save</button>
                                       <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
     );
}
 
export default EditJournal;
