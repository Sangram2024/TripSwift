// "use client";

// import React, {
//   useContext,
//   useState,
//   createContext,
//   useEffect,
//   ReactNode,
// } from "react";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";

// interface AuthContextProps {
//   user: string | null;
//   userId: string | null;
//   login: (token: string, fetchedUserId: string | null) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextProps | null>(null);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);

//   const token = Cookies.get("authToken") || "Fallback Token Value";

//   useEffect(() => {
//     if (token) {
//       try {
//         const decodedToken: { userId?: string } = jwtDecode(token);
//         if (decodedToken && decodedToken.userId) {
//           const fetchedUserId = decodedToken.userId;
//           setUserId(fetchedUserId);
//         }
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//   }, [token]);

//   const login = (token: string, fetchedUserId: string | null) => {
//     setUser(token);
//     setUserId(fetchedUserId);
//     Cookies.set("authToken", token, {
//       expires: 7,
//     });
//   };

//   const logout = () => {
//     setUser(null);
//     setUserId(null);
//     Cookies.remove("authToken");
//   };

//   const contextValue: AuthContextProps = { user, userId, login, logout };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextProps => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
