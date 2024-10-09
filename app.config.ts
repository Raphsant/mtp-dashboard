export default defineAppConfig({
  ui: {
    primary: "red",
    gray: "stone",
    tooltip: {
      background: "!bg-background",
    },
    variables: {
      dark: {
        background: "var(--color-gray-950)",
      },
      light: {
        background: "#ede5ce",
      },
      header: {
        height: "5rem",
      },
    },
    header: {
      wrapper: "lg:mb-0 lg:border-0",
      popover: {
        links: {
          active: "dark:bg-gray-950/50",
          inactive: "dark:hover:bg-gray-950/50",
        },
      },
    },
  },
});
