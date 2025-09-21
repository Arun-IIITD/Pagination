import React, { useEffect, useState } from "react";

const Pagin = () => {
  const [employees, setEmployees] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const emp_per_page = 10;

  useEffect(() => {
    const fetch_employee = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch data");
      }
    };

    fetch_employee();
  }, []);

  const index_last_pg = currPage * emp_per_page;
  const index_first_pg = index_last_pg - emp_per_page;
  const curr_employee = employees.slice(index_first_pg, index_last_pg);
  const total_page = Math.ceil(employees.length / emp_per_page);

  return (
    <>
      <h2>Employee Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {curr_employee.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <button
          onClick={() => setCurrPage((p) => Math.max(p - 1, 1))}
          disabled={currPage === 1}
        >
          Previous
        </button>

        {/* Keep a block element that Cypress can detect */}
        <div
          style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "1px solid #009879",
            backgroundColor: "white",
            color: "#009879",
            fontWeight: "bold",
            minWidth: "30px",
            textAlign: "center",
            fontSize: "16px",
            margin: "0 8px",
          }}
        >
          {currPage}
        </div>

        <button
          onClick={() => setCurrPage((p) => Math.min(p + 1, total_page))}
          disabled={currPage === total_page}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagin;
