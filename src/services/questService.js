import axios from "axios";

// const questsUrl = "http://localhost:5000/api/quests";
const questsUrl = "https://devianops.netlify.app/api/quests";

export const getQuests = async () => {
  const { data: quests } = await axios.get(questsUrl);
  return quests;
};

export const getQuest = async (quest_id) => {
  const { data: quest } = await axios.get(questsUrl + `/${quest_id}`);
  return quest;
};

export const addNewQuest = (quest) => {
  return axios.post(questsUrl, quest);
};

export const editQuest = (quest_id, quest) => {
  return axios.put(questsUrl + `/${quest_id}`, quest);
};

export const deleteQuest = (quest_id) => {
  return axios.delete(questsUrl + `/${quest_id}`);
};
