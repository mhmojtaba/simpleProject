document.addEventListener("alpine:init", () => {
  Alpine.data("userData", () => ({
    users: [],
    userGet() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.users = result;
        });
    },
  }));
});
