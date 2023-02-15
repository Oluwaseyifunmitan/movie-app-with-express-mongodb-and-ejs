let logindetails = {};
let registerDetails = {};
let dashboardData = {};
let updateData = {};
document
  ?.querySelector("#login-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    //send data to database
    let path = window.location.pathname;
    try {
      let response = await fetch(path, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindetails),
      });

      const { message, code } = await response.json();
      if (code == 201) {
        alert(message);
        window.location.replace("/user/dashboard");
      } else {
        alert("sorry either email or password is incorect ");
      }
    } catch (err) {
      console.log(err);
    }
  });

async function saveInput(e) {
  logindetails[`${e.name}`] = e.value;
}
async function saveDetails(e) {
  registerDetails[`${e.name}`] = e.value;
}

document
  ?.querySelector("#register-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      let path = window.location.pathname;

      let response = await fetch(path, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDetails),
      });

      const { code, message } = await response.json();
      if (code == 201) {
        alert(message);
        return window.location.replace("/user/login");
      } else {
        alert("error occured ");
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  });

document
  ?.querySelector("#dashboard-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("/movie/createmovie", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dashboardData),
      });

      let data = await response.json();
      const { code, message } = data;
      if (code == 201) {
        alert(message);
        return window.location.reload();
      } else {
        alert(" could not create ");
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  });

async function saveData(e) {
  dashboardData[`${e.name}`] = e.value;
  console.log(dashboardData);
}

async function handleDelete(id) {
  try {
    let response = await fetch(`/movie/deletemovie/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const { code, message } = await response.json();
    if (code == 200) {
      alert(message);
      window.location.reload();
    } else {
      alert("error occured");
    }
  } catch (err) {
    console.log(err);
  }
}

document
  ?.querySelector("#update-table")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("/movie/updatemovie/:id", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      let data = await response.json();
      const { code, message } = data;
      if (code == 200) {
        alert(message);
        return window.location.replace("/movies/getmovies");
      } else {
        alert(" could not update ");
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  });

async function updateInput(e) {
  updateData[`${e.name}`] = e.value;
}

async function handleUpdate(id) {
  try {
    let response = await fetch(`/movie/updatemovie/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    let data = await response.json();
    const { code, message } = data;
    if (code == 200) {
      alert(message);
      return window.location.reload();
    } else {
      alert(" could not update ");
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}
