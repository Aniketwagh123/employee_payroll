const apiUrl = 'http://localhost:3000/employees'; // URL for JSON Server
let currentSort = { field: "", order: "" };

function loadEmployeeData() {
  const $tableBody = $("#employee-table-body");
  const searchInput = $("#search-input").val().toLowerCase();

  $.get(apiUrl)
    .done(function (employeeData) {
      $tableBody.empty(); // Clear existing rows

      // Filter data
      let filteredData = employeeData.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchInput) ||
          employee.departments.some((dept) =>
            dept.toLowerCase().includes(searchInput)
          )
      );

      // Sort data based on currentSort
      filteredData.sort((a, b) => {
        if (currentSort.field === "name") {
          return currentSort.order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (currentSort.field === "salary") {
          return currentSort.order === "asc"
            ? a.salary - b.salary
            : b.salary - a.salary;
        } else if (currentSort.field === "startDate") {
          return currentSort.order === "asc"
            ? new Date(a.startDate) - new Date(b.startDate)
            : new Date(b.startDate) - new Date(a.startDate);
        }
        return 0;
      });

      // Populate table
      filteredData.forEach((employee) => {
        const row = `
          <tr>
            <td>
              <img
                src="https://lh3.googleusercontent.com/a/AEdFTp4MagdqiXv0SXwiy2kXeuNXd3TS653FSdhoMVY-sQ=s96-c"
                alt="Profile Image"
                class="person-img"
              />
            </td>
            <td>${employee.name}</td>
            <td>${employee.gender}</td>
            <td>${employee.departments
              .map((dept) => `<span class="departments">${dept}</span>`)
              .join(" ")}</td>
            <td>₹ ${employee.salary}</td>
            <td>${employee.startDate}</td>
            <td>
              <span class="material-symbols-outlined del-space" onclick="deleteEmployee(${employee.id})">delete</span>
              <span class="material-symbols-outlined" onclick="editEmployee(${employee.id})">edit</span>
            </td>
          </tr>
        `;
        $tableBody.append(row);
      });
    })
    .fail(function () {
      alert("Failed to load employee data.");
    });
}

function toggleSort(field) {
  if (currentSort.field === field) {
    // Toggle sort order if the same field is clicked
    currentSort.order = currentSort.order === "asc" ? "desc" : "asc";
  } else {
    // Set default sort order to ascending for new field
    currentSort.field = field;
    currentSort.order = "asc";
  }
  loadEmployeeData(); // Reload the table data with sorting applied
}

function deleteEmployee(id) {
  $.ajax({
    url: `${apiUrl}/${id}`,
    type: 'DELETE',
  })
    .done(function () {
      loadEmployeeData(); // Reload the table data
    })
    .fail(function () {
      alert("Failed to delete employee.");
    });
}

function editEmployee(id) {
  window.location.href = `file:///Users/aniketwagh/Documents/python-CFP/repositories/project/employee_payroll/pages/add_employee.html?id=${id}`;
}

// Event listener for the search input
$("#search-input").on("input", loadEmployeeData);

// Load employee data on page load
$(window).on("load", loadEmployeeData);

// Event listener for the add user button
$("#add-user-btn").on("click", function () {
  window.location.href = "file:///Users/aniketwagh/Documents/python-CFP/repositories/project/employee_payroll/pages/add_employee.html";
});
