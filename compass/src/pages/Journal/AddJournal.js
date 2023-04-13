import { useState, useEffect } from "react";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Paper,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  Tooltip,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const AddJournal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [count, setCount] = useState(0)
  const [handleClose, setHandleClose] = useState(false);
  const [addJournal, setAddJournal] = useState(false);
  const [journal, setJournal] = useState({
    date: "",
    account_name: "",
    ref: "",
    debit: "",
    credit: "",
    journal_status: "Pending",
    comment: "Journal Entry is Pending"
  });
  const [fileAttached, setFileAttached] = useState('')
  
  
  function handleJournalDateChange(e) {
    journal.date = e.target.value;
  }
  function handleJournalAccountNameChange(e) {
    journal.account_name = e.target.value;
  }
  function handleJournalRefChange(e) {
    journal.ref = e.target.value;
  }
  function handleJournalDebitChange(e) {
    journal.debit = Number(e.target.value);
  }
  function handleJournalCreditChange(e) {
    journal.credit = Number(e.target.value);
  }

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      const records =
        (result,
        {
          columns: ["id", "value"],
          delimiter: ";",
          trim: true,
          skip_empty_lines: true,
        });
    };
    reader.readAsBinaryString(file);
  };

  function handleAdd(e) {
    e.preventDefault();
    console.log(journal);
    console.log("trying to add...");
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

  

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  //NEED return method that promised information
  return (
    <>
      <DialogTitle> Create a Journal Entry </DialogTitle>

      <TextField
        required
        id="outlined-required"
        label="Date"
        defaultValue=""
        onChange={handleJournalDateChange}
      />
      <TextField
        required
        id="outlined-required"
        label="Account Name"
        defaultValue=""
        onChange={handleJournalAccountNameChange}
      />
      <TextField
        required
        id="outlined-required"
        label="Ref"
        defaultValue=""
        onChange={handleJournalRefChange}
      />
      <TextField
        required
        id="outlined-required"
        label="Debit"
        defaultValue=""
        onChange={handleJournalDebitChange}
      />
      <TextField
        required
        id="outlined-required"
        label="Credit"
        defaultValue=""
        onChange={handleJournalCreditChange}
      />

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
      </div>

      <DialogActions>
        <Button onClick={handleAdd}>Create</Button>
        <Button onClick={() => setCount(c => c + 1)}>Notify Manager</Button>
      </DialogActions>
    </>
  );
};

export default AddJournal;
