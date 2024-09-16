// Uncomment this function if you want to use the vanilla JS version
/*
  function populateDateFields() {
    const daySelect = document.getElementById("day");
    const monthSelect = document.getElementById("month");
    const yearSelect = document.getElementById("year");

    // Populate days
    for (let i = 1; i <= 31; i++) {
      daySelect.innerHTML += `<option value="${i}">${i}</option>`;
    }

    // Populate months
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    months.forEach((month, index) => {
      monthSelect.innerHTML += `<option value="${index + 1}">${month}</option>`;
    });

    // Populate years
    for (let i = 2024; i >= 1974; i--) {
      yearSelect.innerHTML += `<option value="${i}">${i}</option>`;
    }
  }
  */

function populateDateFields() {
  const daySelect = $("#day");
  const monthSelect = $("#month");
  const yearSelect = $("#year");

  // Populate days
  for (let i = 1; i <= 31; i++) {
    daySelect.append(`<option value="${i}">${i}</option>`);
  }

  // Populate months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  months.forEach((month, index) => {
    monthSelect.append(`<option value="${index + 1}">${month}</option>`);
  });

  // Populate years
  for (let i = 2024; i >= 1974; i--) {
    yearSelect.append(`<option value="${i}">${i}</option>`);
  }
}

function getEmployees() {
  return JSON.parse(localStorage.getItem("employees")) || [];
}

function saveEmployees(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

$(document).ready(function () {
  populateDateFields();
  $("#employee-form")[0].reset();

  $("#reset-btn").click(function () {
    $("#employee-form")[0].reset();
  });

  $("#submit-btn").click(function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = $("#name").val();
    const profileImage = $('input[name="profile-image"]:checked').val();
    const gender = $('input[name="gender"]:checked').val();
    const departments = $('input[name="department"]:checked')
      .map(function () {
        return $(this).val();
      })
      .get();
    const salary = $("#salary").val();
    const day = $("#day").val();
    const month = $("#month").val();
    const year = $("#year").val();
    const notes = $("#notes").val();

    // Validate required fields
    if (
      !name ||
      !profileImage ||
      !gender ||
      departments.length === 0 ||
      !salary ||
      !day ||
      !month ||
      !year
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    // Create employee object
    const employeeData = {
      id: getEmployees().length + 1, // Auto-increment ID
      name,
      profileImage,
      gender,
      departments,
      salary: parseInt(salary, 10),
      startDate: `${day}-${month}-${year}`,
      notes,
    };

    // Retrieve existing employees
    const employees = getEmployees();

    // Add new employee to the array
    employees.push(employeeData);

    // Save updated employees to local storage
    saveEmployees(employees);

    // Clear the form
    $("#employee-form")[0].reset();

    // Show success popup
    alert("Employee successfully added!");

    // Log the updated employee list to console
    console.log("Employee added:", employeeData);
    console.log("Updated employee list:", employees);
  });

  $("#cancle-btn").click(function () {
    window.location.href =
      "/Users/aniketwagh/Documents/python-CFP/repositories/project/employee_payroll/pages/dasboard.html";
  });
});
