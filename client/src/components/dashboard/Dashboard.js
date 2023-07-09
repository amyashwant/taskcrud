import React, { useState, useEffect, useRef } from "react";
import { select } from "d3";
import * as d3 from "d3";
import axios from "axios";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const chartRef = useRef();

  useEffect(() => {


    const gettings = async () => {
      const res = await axios.get("http://localhost:5000/api/user/get-order");
      setTasks(res.data);
      setFilteredTasks(res.data);
    };
    gettings();
  }, []);

  useEffect(() => {
    // Apply filtering, sorting, and searching to tasks data
    let filteredData = tasks;

    // Filter by status
    if (filterStatus) {
      filteredData = filteredData.filter(
        (task) => task.status === filterStatus
      );
    }

    // Sort by field and order
    filteredData.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    // Search by title
    if (searchTerm) {
      filteredData = filteredData.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filteredData);
  }, [tasks, filterStatus, sortField, sortOrder, searchTerm]);

  useEffect(() => {
    // Generate D3 visualization using the filtered tasks
    const chartContainer = select(chartRef.current);

    // Clear previous chart
    chartContainer.selectAll("*").remove();

    // Create chart using filtered tasks
    const chart = chartContainer
      .append("svg")
      .attr("width", "100%")
      .attr("height", 300);

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(filteredTasks.map((task) => task.title))
      .range([0, chartContainer.node().getBoundingClientRect().width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(filteredTasks, (task) => task.dueDate)])
      .range([chartContainer.node().getBoundingClientRect().height, 0]);

 
    chart
      .selectAll("rect")
      .data(filteredTasks)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.title))
      .attr("y", (d) => {
        const yValue = yScale(d.dueDate);
        return isNaN(yValue) ? 0 : yValue;
      })
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => {
        const heightValue =
          chartContainer.node().getBoundingClientRect().height -
          yScale(d.dueDate);
        return isNaN(heightValue) ? 0 : heightValue;
      })
      .attr("fill", "steelblue");

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    chart
      .append("g")
      .attr(
        "transform",
        `translate(0, ${chartContainer.node().getBoundingClientRect().height})`
      )
      .call(xAxis);

    chart.append("g").call(yAxis);

    return () => {
      // Clean up D3 chart when component unmounts
      chartContainer.selectAll("*").remove();
    };
  }, [filteredTasks]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="dashboard" id="adminDashboard">
      <h1 className="dashboard__title">Admin Dashboard</h1>

      {/* Filtering controls */}
      <form className="dashboard__filters">
        <label htmlFor="filterStatus">Filter by Status:</label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="pending">Pending</option>
        </select>

        {/* Sorting controls */}
        <label htmlFor="sortField">Sort by:</label>
        <select
          id="sortField"
          value={sortField}
          onChange={handleSortFieldChange}
        >
          <option value="title">Title</option>
          <option value="dueDate">Due Date</option>
          <option value="assignedUser">Assigned User</option>
        </select>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        {/* Search control */}
        <input
          type="text"
          id="searchInput"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      <div className="chart-container" ref={chartRef} id="chartContainer">
        {/* D3 chart will be rendered here */}
      </div>
    </div>
  );
};

export default Dashboard;
