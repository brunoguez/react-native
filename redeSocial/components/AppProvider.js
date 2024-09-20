import * as React from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = React.useState({});

    return (
        <AppContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
            {children}
        </AppContext.Provider>
    );
};
