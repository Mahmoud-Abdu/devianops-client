import React, { useContext, useEffect, useState } from "react";
import { getQuests } from "../services/questService";

const QuestContext = React.createContext();

export function useQuests() {
  return useContext(QuestContext);
}

function QuestsProvider({ children }) {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuests = async () => {
    setLoading(true);
    const fetchedQuests = await getQuests();
    setQuests(fetchedQuests);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuests();
  }, []);
  return (
    <QuestContext.Provider value={{loading, quests}}>
      {children}
    </QuestContext.Provider>
  );
}

export default QuestsProvider;
