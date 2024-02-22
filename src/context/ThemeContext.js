import React from 'react';

export const ThemeContext = React.createContext({
  toggleTheme: () => {},
  isDarkTheme: false,
});

export const ThemeProvider = ({children, value}) => {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
