document.addEventListener("alpine:init", () => {
  Alpine.data("main", () => ({
    message: "test",
  }));
});
