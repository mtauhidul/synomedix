import * as React from "react";

const SidebarContext = React.createContext();

const SidebarProvider = ({ children }) => {
  const [state, setState] = React.useState({
    left: false,
  });

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setState({ left: false });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <SidebarContext.Provider
      value={{
        state,
        setState,
        toggleDrawer,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => React.useContext(SidebarContext);

export default SidebarProvider;
