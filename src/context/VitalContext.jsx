import * as React from 'react';

const VitalContext = React.createContext();

const VitalProvider = ({ children }) => {
  const [vitalState, setVitalState] = React.useState({
    show: true,
  });

  const toggleVitalView = () => {
    setVitalState({ ...vitalState, show: !vitalState.show });
    localStorage.setItem('vitalShow', !vitalState.show);
  };

  React.useEffect(() => {
    const show = localStorage.getItem('vitalShow');
    if (show) {
      setVitalState({ ...vitalState, show: show === 'true' });
    }
  }, []);

  return (
    <VitalContext.Provider
      value={{
        vitalState,
        setVitalState,
        toggleVitalView,
      }}>
      {children}
    </VitalContext.Provider>
  );
};

export const useVital = () => React.useContext(VitalContext);

export default VitalProvider;
