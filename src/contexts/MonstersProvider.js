import React, { useContext, useEffect, useState } from "react";
import { getMonsters } from "../services/monsterService";

const MonsterContext = React.createContext();

export function useMonsters() {
  return useContext(MonsterContext);
}

export function MonstersProvider({ children }) {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllMonsters = async () => {
    setLoading(true);
    const allMonsters = await getMonsters();
    setMonsters(allMonsters);
    setLoading(false);
  };

  useEffect(() => {
    getAllMonsters();
  }, []);

  return (
    <MonsterContext.Provider value={{ loading, monsters }}>
      {children}
    </MonsterContext.Provider>
  );
}
