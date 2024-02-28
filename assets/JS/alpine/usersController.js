document.addEventListener("alpine:init", () => {
  Alpine.data("userData", () => ({
    users: [],
    usersInPage: [],
    pending: false,
    currentPage: 1,
    usersPerPage: 4,
    totalPage: 0,
    userGet() {
      this.pending = true;
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.users = result;
          this.pagination();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        })
        .finally(() => {
          this.pending = false;
        });
    },
    pagination() {
      this.totalPage = Math.ceil(this.users.length / this.usersPerPage);
      let start = this.currentPage * this.usersPerPage - this.usersPerPage; //1*4-4=0  2*4-4=4 3*4-4=8
      let end = this.currentPage * this.usersPerPage; // 1*4=4  2*4=8  3*4=12
      this.usersInPage = this.users.slice(start, end); // 0-4   4-8   8-12
    },
    userRefresh() {
      if (this.usersPerPage > this.users.length)
        this.usersPerPage = this.users.length;
      if (this.usersPerPage < 1) this.usersPerPage = 1;

      this.pagination();
    },
  }));
});
