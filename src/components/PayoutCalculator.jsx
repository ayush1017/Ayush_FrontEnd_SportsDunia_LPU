import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Header from "./Header";
import Header2 from "./Header2";

const PayoutCalculator = () => {
  const [rate, setRate] = useState(0);
  const [count, setCount] = useState("");
  const [entries, setEntries] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("payoutData")) || { rate: 0, entries: [] };
    setRate(storedData.rate);
    setEntries(storedData.entries);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("payoutData", JSON.stringify({ rate, entries }));
  }, [rate, entries]);

  const handleSetRate = () => {
    if (rate <= 0) {
      alert("Please enter a valid rate.");
      return;
    }
    alert(`Payout rate set to $${rate.toFixed(2)} per article/blog.`);
  };

  const handleAddPayout = () => {
    const numCount = parseInt(count);
    if (isNaN(numCount) || numCount <= 0) {
      alert("Please enter a valid number of articles/blogs.");
      return;
    }

    const newEntry = {
      count: numCount,
      rate,
      total: numCount * rate,
    };

    setEntries([...entries, newEntry]);
    setCount("");
  };

  const totalPayout = entries.reduce((sum, entry) => sum + entry.total, 0);

  // CSV Export
  const downloadCSV = () => {
    if (!entries || entries.length === 0) {
      alert("No data available to download.");
      return;
    }
  
    const headers = ["#", "Articles/Blogs", "Rate ($)", "Total Payout ($)"];
    const rows = entries.map((entry, index) => [
      index + 1,
      entry.count || 0, // Ensure that count is a number
      entry.rate && !isNaN(entry.rate) ? entry.rate.toFixed(2) : '0.00', // Ensure valid rate
      entry.total && !isNaN(entry.total) ? entry.total.toFixed(2) : '0.00' // Ensure valid total
    ]);
  
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n"; // Add header row
  
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n"; // Add data rows
    });
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payout_report.csv"); // Define the filename
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link after downloading
  };
  const downloadGoogleSheet = () => {
    // Ensure there is data to export
    if (!entries || entries.length === 0) {
      alert("No data available to download.");
      return;
    }
  
    // Create CSV content
    const headers = ["#", "Articles/Blogs", "Rate ($)", "Total Payout ($)"];
    const rows = entries.map((entry, index) => [
      index + 1,
      entry.count || 0, // Ensure that count is a number
      entry.rate && !isNaN(entry.rate) ? entry.rate.toFixed(2) : '0.00', // Ensure valid rate
      entry.total && !isNaN(entry.total) ? entry.total.toFixed(2) : '0.00' // Ensure valid total
    ]);
  
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n"; // Add header row
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n"; // Add data rows
    });
  
    // Encode the URI
    const encodedUri = encodeURI(csvContent);
  
    // Google Sheets URL (for importing CSV directly)
    const googleSheetsURL = `https://docs.google.com/spreadsheets/u/0/?tgif=d&url=${encodedUri}`;
  
    // Create and click link to download or open Google Sheets
    const link = document.createElement("a");
    link.setAttribute("href", googleSheetsURL);
    link.setAttribute("target", "_blank"); // Open in a new tab
    link.click();
  };
  
  

  // PDF Export
  const downloadPDF = () => {
    if (!entries || entries.length === 0) {
      alert("No data available to download.");
      return;
    }
    const doc = new jsPDF();
  
    // Document Title
    doc.setFontSize(16);
    doc.text("Payout Report", 10, 10);
  
    // Summary Information
    doc.setFontSize(12);
    doc.text(`Rate per Article/Blog: ${rate.toFixed(2)}`, 10, 20);
    doc.text(`Total Payout: ${totalPayout.toFixed(2)}`, 10, 30);
  
    // Table Data
    const tableColumns = ["#", "Articles/Blogs", "Rate ($)", "Total Payout ($)"];
    const tableRows = entries.map((entry, index) => [
      index + 1,
      entry.count,
      entry.rate.toFixed(2),
      entry.total.toFixed(2),
    ]);
  
    // Render the table using autoTable
    autoTable(doc, {
      startY: 40, // Starting Y position
      head: [tableColumns],
      body: tableRows,
      styles: { halign: "center" },
      headStyles: { fillColor: [22, 160, 133] }, // Header color
      bodyStyles: { textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
  
    // Save the PDF
    doc.save("payout_report.pdf");
  };
  

  return (
    <div className="bg-slate-900 w-screen h-screen text-white overflow-auto">
      <Header2></Header2>
      <h1 className="text-2xl font-bold mb-4">Payout Calculator</h1>

      {/* Set Rate Section */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Set Payout per Article/Blog:</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          placeholder="Enter payout rate"
          className=" border rounded px-3 py-2 mb-2 text-black"
        /><br></br>
        <button
          onClick={handleSetRate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Set Rate
        </button>
      </div>

      {/* Add Articles/Blogs Section */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Number of Articles/Blogs:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Enter number of items"
          className=" border rounded px-3 py-2 mb-2 text-black"
        /><br></br>
        <button
          onClick={handleAddPayout}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Payout
        </button>
      </div>

      {/* Payout Summary Section */}
      <h2 className="text-xl font-bold mb-4">Payout Summary</h2>
      <table className="w-full border-collapse border border-b-slate-950">
        <thead>
          <tr className=" border-b-slate-950">
            <th className="border border-gray-300 px-4 py-2 text-left">Sr/No</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Articles/Blogs</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Rate </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Total Payout </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index} className=" border-b-slate-950">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.count}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.rate.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{entry.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-lg font-bold">
        Total Payout: <span>{totalPayout.toFixed(2)}</span>
      </div>

      {/* Download Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={downloadPDF}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PayoutCalculator;
