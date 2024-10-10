import * as React from 'react';

const FishboneContext = React.createContext();

const FishboneProvider = ({ children }) => {
  const [state, setState] = React.useState({
    show: true,
  });

  const toggleView = () => {
    setState({ ...state, show: !state.show });
    localStorage.setItem('show', !state.show);
  };

  React.useEffect(() => {
    const show = localStorage.getItem('show');
    if (show) {
      setState({ ...state, show: show === 'true' });
    }
  }, []);

  return (
    <FishboneContext.Provider
      value={{
        state,
        setState,
        toggleView,
      }}>
      {children}
    </FishboneContext.Provider>
  );
};

export const useFishbone = () => React.useContext(FishboneContext);

export default FishboneProvider;
