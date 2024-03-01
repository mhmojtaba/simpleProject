document.addEventListener("alpine:init", () => {
  Alpine.data("userData", () => ({
    users: [],
    allUsers: [],
    usersInPage: [],
    pending: false,
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
      this.pending = true;
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.users = result;
          this.allUsers = result;
          this.pagination();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          this.usersPerPage = 0;
        })
        .finally(() => {
          this.pending = false;
        });
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
          this.newUserInfo = {
            name: "",
            username: "",
            email: "",
          };
        });
    },
  }));
});

/*
Updating a resource
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
*/

/* 
Deleting a resource
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE',
});
Important: resource will not be really updated on the server but it will be faked as if.

Filtering resources
Basic filtering is supported through query parameters.

// This will return all the posts that belong to the first user
fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
  .then((response) => response.json())
  .then((json) => console.log(json));
*/
