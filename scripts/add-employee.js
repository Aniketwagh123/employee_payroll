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

// Retrieve existing employees from local storage
function getEmployees() {
  return JSON.parse(localStorage.getItem("employees")) || [];
}

// Save employees to local storage
function saveEmployees(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// Reset form on page load
window.onload = function () {
  populateDateFields();
  document.getElementById("employee-form").reset();
};

// Reset button functionality
document.getElementById("reset-btn").addEventListener("click", function () {
  const form = document.getElementById("employee-form");
  form.reset();
});

// Submit button functionality
document
  .getElementById("submit-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById("name").value;
    const profileImage = document.querySelector(
      'input[name="profile-image"]:checked'
    )?.value;
    const gender = document.querySelector(
      'input[name="gender"]:checked'
    )?.value;
    const departments = Array.from(
      document.querySelectorAll('input[name="department"]:checked')
    ).map((el) => el.value);
    const salary = document.getElementById("salary").value;
    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    const notes = document.getElementById("notes").value;

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
    document.getElementById("employee-form").reset();

    // Show success popup
    alert("Employee successfully added!");

    // Log the updated employee list to console
    console.log("Employee added:", employeeData);
    console.log("Updated employee list:", employees);
  });

// Cancel button functionality
document.getElementById("cancle-btn").addEventListener("click", function () {
  window.location.href =
    "/Users/aniketwagh/Documents/python-CFP/repositories/project/employee_payroll/pages/dasboard.html";
});
