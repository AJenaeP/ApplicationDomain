import compassLogo from "../../images/compassLogo.png";
import { Typography, Container, Box } from "@mui/material";
import { bubble as Menu } from "react-burger-menu";
import Sidebar from "../Sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
//Logo import:
import "../../css/DashboardAdmin.css";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Accounts from "../Accounts";
import Ratios from "../Ratios";

import NotificationsIcon from "@mui/icons-material/Notifications";

const DashboardManager = () => {
  const [assetsSum, setAssetsSum] = useState(0);
  const [liabilitiesSum, setLiabilitiesSum] = useState(0);
  const [equitySum, setEquitySum] = useState(0);
  const [cash, setCash] = useState(0);
  const [property, setProperty] = useState(0);
  const [accountPayable, setAccountPayable] = useState(0);
  const [loanDebt, setLoanDebt] = useState(0);
  const [stock, setStock] = useState(0);
  const [wages, setWages] = useState(0);
  const [numPending, setNumPending] = useState(0);

  const currentRatio = {
    //data for current ratio gauge
    label: "Current Ratio",
    lowPoint: 0,
    lowPointText: "Low",
    highPoint: 2, //high point needs to be 3
    highPointText: "High",
    value: assetsSum / liabilitiesSum,
    subtitle: "1.5% < good ratio > 2%",
  };

  const quickRatio = {
    //data for quick ratio
    label: "Quick Ratio",
    lowPoint: 1,
    lowPointText: "Low",
    highPoint: 11, //high point needs to be 1 or more
    highPointText: "High",
    value: (cash + stock) / accountPayable,
    subtitle: "good ratio > 1%",
  };

  const debtToAssets = {
    //data for debt to assets
    label: "Debt to Assets",
    lowPoint: -1,
    lowPointText: "High",
    highPoint: 1, //high point is 1 or less, 2 or more is red
    value: liabilitiesSum / assetsSum,
    highPointText: "Low",
    subtitle: "good ratio < 1%",
  };

  useEffect(() => {
    setNumPending(0);
    //counting pending journal entries
    fetch("/api/journals")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          if (element.journal_status === "Pending") {
            console.log(element);
            setNumPending(numPending + 1);
          }
        });
      });
  }, []);

  useEffect(() => {
    //using this useEffect to get the sums of different data points
    fetch("/api/accounts")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          switch (element.account_category) {
            case "assets":
              setAssetsSum(assetsSum + element.balance);
              break;
            case "liability":
              setLiabilitiesSum(liabilitiesSum + element.balance);
              break;
            case "equity":
              setEquitySum(equitySum + element.balance);
              break;
            default:
          }
          switch (element.account_name) {
            case "Cash":
              setCash(element.balance);
              break;
            case "Company Property and Equipment":
              setProperty(element.balance);
              break;
            case "Account Payables":
              setAccountPayable(element.balance);
              break;
            case "Loan Debt":
              setLoanDebt(element.balance);
              break;
            case "Common Stock":
              setStock(element.balance);
              break;
            case "Wages":
              setWages(element.balance);
              break;
            default:
          }
        });
      });
  }, []);

  return (
    <>
      <div className="DashboardManager" id="outer-container">
        <div>
          <Header />
        </div>
        <div>
          <span className="calender" style={{ justifyContent: "space-evenly" }}>
            {numPending > 0 && (
              <Box
                sx={{
                  backgroundColor: "white",
                  width: 200,
                  height: 100,
                  padding: 2,
                }}
              >
                <span
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 7,
                  }}
                >
                  <NotificationsIcon sx={{ color: "#58d0fe" }} /> Notifications
                </span>
                <div>
                  <span
                    style={{
                      backgroundColor: "#58d0fe",
                      color: "white",
                      borderRadius: 10,
                      width: 20,
                      fontSize: 15,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {numPending}
                  </span>
                  New Pending Journal Entries
                </div>
              </Box>
            )}
            <Calendar />
          </span>
        </div>
        <div
          className="Ratios"
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <span style={{ border: ".5px #8f8f84 solid" }}>
            <Ratios props={currentRatio} />
          </span>
          <span style={{ border: ".5px #8f8f84 solid" }}>
            <Ratios props={quickRatio} />
          </span>
          <span style={{ border: ".5px #8f8f84 solid" }}>
            <Ratios props={debtToAssets} />
          </span>
        </div>
      </div>
    </>
  );
};

export default DashboardManager;
