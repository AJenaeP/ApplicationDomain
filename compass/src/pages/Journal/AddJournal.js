import { useState, useEffect } from "react";
import { Button, TextField, DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";

const AddJournal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [count, setCount] = useState(0);
  const [handleClose, setHandleClose] = useState(false);
  const [addJournal, setAddJournal] = useState(false);
  const [journal, setJournal] = useState({
    date: "",
    account_name: "",
    ref: "",
    debit: "",
    adjusted_debit: "",
    credit: "",
    adjusted_credit: "",
    explanation: "",
    journal_status: "Pending",
    comment: "Journal Entry is Pending",
  });
  const [fileAttached, setFileAttached] = useState("");
  const [errors, setErrors] = useState({});
  const [accountNames, setAccountNames] = useState([]);
  const [refNumbers, setRefNumbers] = useState([]);
  const [dateError, setDateError] = useState(false);
  const [accountNameError, setAccountNameError] = useState(false);
  const [refError, setRefError] = useState(false);
  const [balanceError, setBalanceError] = useState(false);
  const [isError, setIsError] = useState(false);

  //this retrieves journal errors, journals, and account information for database
  useEffect(() => {
    fetch("/api/journalErrors")
      .then((response) => response.json())
      .then((data) => {
        setErrors(data);
      });
    fetch("/api/accounts")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          accountNames.push(element.account_name);
        });
      });
    fetch("/api/journals")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          //console.log(element.ref)
          refNumbers.push(element.ref);
        });
      });
  }, []);

  //below are the functions that handle changes in the form:

  function handleJournalDateChange(e) {
    const x = e.target.value;
    if (
      x.charAt(4) !== "-" || //checks if 5th value -> YYYY(-) is "-"
      x.length !== 10 //checks if date is correct length
    ) {
      setDateError(true);
    } else {
      setDateError(false);
      journal.date = x;
    }
  }
  function handleJournalAccountNameChange(e) {
    if (!accountNames.includes(e.target.value)) {
      //checks if account name exist
      setAccountNameError(true);
    } else {
      setAccountNameError(false);
      journal.account_name = e.target.value;
    }
  }
  function handleJournalRefChange(e) {
    if (refNumbers.includes(e.target.value)) {
      //checks if ref is already in use
      setRefError(true);
    } else {
      setRefError(false);
      journal.ref = e.target.value;
    }
  }
  function handleJournalDebitChange(e) {
    journal.debit = Number(e.target.value);
    if (journal.debit !== journal.credit) {
      setBalanceError(true);
    } else {
      setBalanceError(false);
    }
  }
  function handleJournalCreditChange(e) {
    journal.credit = Number(e.target.value);
    if (journal.credit !== journal.debit) {
      setBalanceError(true);
    } else {
      setBalanceError(false);
    }
  }

  const handleFileUpload = (e) => {
    //gets the name of the file selected
    if (!e.target.files) {
      return;
    } else {
      setFileAttached(e.target.files[0].name);
    }
  };

  function handleAdd(e) {
    //adds journal to datbase
    e.preventDefault();
    fetch("/api/journals/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(journal),
    }).then((response) => {
      alert(response.statusText);
    });
  }

  return (
    <>
      <DialogTitle> Create a Journal Entry </DialogTitle>

      <TextField
        required
        id="outlined-required"
        label="Date"
        defaultValue=""
        placeholder="YYYY-MM-DD"
        sx={{ marginBottom: 1, marginRight: 1 }}
        onChange={handleJournalDateChange}
      />
      {dateError && (
        <div style={{ color: "red" }}>{errors[0].errorMessage}</div>
      )}
      <TextField
        required
        id="outlined-required"
        label="Account Name"
        defaultValue=""
        onBlur={handleJournalAccountNameChange}
      />
      {accountNameError && (
        <div style={{ color: "red" }}>{errors[1].errorMessage}</div>
      )}
      <TextField
        required
        id="outlined-required"
        label="Ref"
        defaultValue=""
        sx={{ marginBottom: 1, marginRight: 1 }}
        onBlur={handleJournalRefChange}
      />
      {refError && <div style={{ color: "red" }}>{errors[2].errorMessage}</div>}
      <TextField
        required
        id="outlined-required"
        label="Debit"
        defaultValue=""
        onBlur={handleJournalDebitChange}
      />
      <TextField
        required
        id="outlined-required"
        label="Credit"
        defaultValue=""
        onBlur={handleJournalCreditChange}
      />
      {balanceError && (
        <div style={{ color: "red" }}>{errors[3].errorMessage}</div>
      )}
      <div>
        <Button
          component="label"
          // variant="outlined"
          sx={{ marginRight: "1rem" }}
        >
          Attach File
          <input
            type="file"
            accept=".pdf, .docx, .csv, .png ,.jpg"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
        {fileAttached !== "" && (
          <span style={{ color: "blue", fontStyle: "italic" }}>
            "{fileAttached}"
          </span>
        )}
      </div>

      <DialogActions>
        <Button onClick={() => setCount((c) => c + 1)}>Notify Manager</Button>
        {dateError || accountNameError || refError || balanceError ? (
          <Button disabled>Create</Button>
        ) : (
          <Button onClick={handleAdd}>Create</Button>
        )}
      </DialogActions>
    </>
  );
};

export default AddJournal;
