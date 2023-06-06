import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setUser(null);
    setLoading(true);
  };

  useEffect(() => {
    // get user from localstorage
    const user = localStorage.getItem('user');
    if(user) {}
    setUser({
      userId: 1,
      userName: 'Abc',
      email: 'abc@gmail.com',
    })
    setLoading(false);
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setLoading(false);
    setUser(user);
  }

  const logout = () => {
    clear();
  };
  const value = { user, loading, logout, login };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;