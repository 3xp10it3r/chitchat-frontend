import { useEffect, useState } from "react";
import AuthRoute from "./routes/AuthRoute";
import { useUserAuth } from "./context/UserAuthContext";
import { auth } from "./firebase/Config";
import MainRoute from "./routes/MainRoute";
import Container from "./components/Common/Container";

function App() {
  const { user, setUser } = useUserAuth();
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line
  }, []);

  if (initializing) return null;

  return <Container>{user ? <MainRoute /> : <AuthRoute />}</Container>;
}

export default App;
