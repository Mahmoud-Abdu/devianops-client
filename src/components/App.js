import { Route, Routes } from "react-router-dom";
import { MonstersProvider } from "../contexts/MonstersProvider";
import Quests from "./Quests";
import Monsters from "./Monsters";
import QuestForm from "./QuestForm";
import NavBar from "./Navbar";
import MonsterForm from "./MonsterForm";
import Home from "./Home";
import QuestsProvider from "../contexts/QuestsProvider";

function App() {
  return (
    <>
      <MonstersProvider>
        <QuestsProvider>
          <NavBar />
          <Routes>
          <Route path="/quests/form/:id" element={<QuestForm />} />
            <Route path="/quests/form" element={<QuestForm />} />
            <Route path={"/monsters/form/:id"} element={<MonsterForm />} />
            <Route path={"/monsters/form"} element={<MonsterForm />} />
            <Route path="/monsters" element={<Monsters />} />
            <Route path="/quests" element={<Quests />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </QuestsProvider>
      </MonstersProvider>
    </>
  );
}

export default App;
