import { Route, Routes } from "react-router-dom";
import { MonstersProvider } from "../contexts/MonstersProvider";
import { useEffect, useState } from "react";
import Protector from "./Protector";
import Quests from "./Quests";
import Monsters from "./Monsters";
import QuestForm from "./QuestForm";
import NavBar from "./Navbar";
import MonsterForm from "./MonsterForm";
import Home from "./Home";
import QuestsProvider from "../contexts/QuestsProvider";
import Register from "./Register";
import Login from "./Login";

import { getCurrentUser } from "../services/authService";
import jwtDecode from "jwt-decode";

function App() {
  const [user, setUser] = useState("");

  const updateUser = (token) => {
    if (token) {
      const user = jwtDecode(token);
      setUser(user);
      console.log("lemo", user);
    } else if (token === "") {
      setUser("");
    } else return;
  };

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  return (
    <>
      <MonstersProvider>
        <QuestsProvider>
          <NavBar user={user} onUpdate={updateUser} />
          <Routes>
            <Route
              path="/quests/form/:id"
              element={
                <Protector>
                  <QuestForm user={user} />
                </Protector>
              }
            />
            <Route path="/quests/form" element={<QuestForm user={user} />} />
            <Route
              path={"/monsters/form/:id"}
              element={
                <Protector>
                  <MonsterForm user={user} />
                </Protector>
              }
            />
            <Route
              path={"/monsters/form"}
              element={
                <Protector>
                  <MonsterForm />
                </Protector>
              }
            />
            <Route
              path="/monsters"
              element={
                <Protector>
                  <Monsters />
                </Protector>
              }
            />
            <Route
              path="/quests"
              element={
                <Protector>
                  <Quests user={user} />
                </Protector>
              }
            />
            <Route
              path="/login"
              element={<Login user={user} onUpdate={updateUser} />}
            />
            <Route path="/register" element={<Register user={user} onUpdate={updateUser} />} />
            <Route path="/" element={<Home user={user} />} />
          </Routes>
        </QuestsProvider>
      </MonstersProvider>
    </>
  );
}

export default App;
