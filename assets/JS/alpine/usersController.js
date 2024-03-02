document.addEventListener("alpine:init", () => {
  Alpine.data("userData", () => ({
    users: [],
    allUsers: [],
    usersInPage: [],
    pending: false,
    addUserModal: false,
    currentPage: 1,
    usersPerPage: 4,
    totalPage: 0,
    searchValue: "",
    phoneValue: "",
    newUserInfo: {
      name: "",
      username: "",
      email: "",
    },
    userGet() {
      // axios
      //   .get("https://jsonplaceholder.typicode.com/users")
      //   .then(function (response) {
      //     // handle success
      //     if (response.status === 200) {
      //       console.log(response.data);
      //       this.users = response.data;
      //       this.allUsers = response.data;
      //       // console.log(this.users);
      //       // console.log(this.allUsers);
      //       this.pagination();
      //     }
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     console.log(error);
      //     alert(error);
      //     this.usersPerPage = 0;
      //   })
      //   .finally(function () {
      //     // always executed
      //     this.pending = false;
      //   });
      this.pending = true;
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((res) => {
          this.users = res;
          this.allUsers = res;
          this.pagination();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert(error);
          this.usersPerPage = 0;
        })
        .finally(function () {
          // always executed
          this.pending = false;
        });
    },

    modalUserHandler() {
      this.addUserModal = true;
    },
    pagination() {
      if (this.searchValue.length == 0) {
        this.usersPerPage = 4;
      }
      this.totalPage = Math.ceil(this.users.length / this.usersPerPage);
      let start = this.currentPage * this.usersPerPage - this.usersPerPage; //1*4-4=0  2*4-4=4 3*4-4=8
      let end = this.currentPage * this.usersPerPage; // 1*4=4  2*4=8  3*4=12
      this.usersInPage = this.allUsers.slice(start, end); // 0-4   4-8   8-12
    },

    userRefresh() {
      if (this.usersPerPage > this.users.length)
        this.usersPerPage = this.users.length;
      if (this.usersPerPage < 1) this.usersPerPage = 1;

      this.pagination();
    },

    usernameSearchHandler(value) {
      this.searchValue = value;
      if (this.searchValue.length == 0) {
        this.usersPerPage = 4;
        this.users = this.usersInPage;
        this.pagination();
      }
      this.users = this.allUsers.filter((user) =>
        user.username.includes(value)
      );
      this.pagination();
      this.usersPerPage = this.users.length;
    },
    phoneSearchHandler(value) {
      this.phoneValue = value;
      if (this.phoneValue.length == 0) {
        this.usersPerPage = 4;
        this.users = this.usersInPage;
        this.pagination();
      }
      this.users = this.allUsers.filter((user) => user.phone.includes(value));
      this.pagination();
      this.usersPerPage = this.users.length;
    },
    addUserHandler() {
      console.log(this.newUserInfo);
      this.pending = true;
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(this.newUserInfo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === 201) {
            this.allUsers.push(this.newUserInfo);
            this.pagination();
            M.toast({
              html: "User added successfully!",
              classes: "rounded green",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          M.toast({
            html: "something went wrong!",
            classes: "rounded red",
          });
        })
        .finally(() => {
          this.pending = false;
          (this.addUserModal = false),
            (this.newUserInfo = {
              name: "",
              username: "",
              email: "",
            });
        });
    },
    deleteUserHandler(id) {
      var toastHTML =
        '<span class="m-m-r-40 m-l-40">Delete User?</span><button class="btn-flat toast-action" x-on:click="confirmDeleteUser(' +
        id +
        ')">Yes</button>';
      M.toast({ html: toastHTML, classes: "rounded orange" });
      // console.log(id);
    },
    confirmDeleteUser(userId) {
      // console.log(userId);
      fetch(`https://jsonplaceholder.typicode.com/posts/${userid}`, {
        method: "DELETE",
      });
      this.pagination();
    },
    updateUserHandler(user) {
      // console.log(user);
      this.newUserInfo = {
        name: user.name,
        username: user.username,
        email: user.email,
      };
    },
  }));
});
