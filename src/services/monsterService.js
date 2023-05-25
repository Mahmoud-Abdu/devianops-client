import axios from "axios";

// const monstersUrl = "http://localhost:5000/api/monsters";

const monstersUrl = "https://devianops.onrender.com/api/monsters";

export const getMonsters = async () => {
  const { data: monsters } = await axios.get(monstersUrl);
  return monsters;
};

export const getMonster = async (monster_Id) => {
  const { data: monster } = await axios.get(monstersUrl + `/${monster_Id}`);
  return monster;
};

export const addNewMonster = async (monster) => {
  return axios.post(monstersUrl, monster);
};

export const editMonster = async (monster_Id, monster) => {
  return axios.put(monstersUrl + `/${monster_Id}`, monster);
};

export const deleteMonster = async (monster_id) => {
  return axios.delete(monstersUrl + `/${monster_id}`)
}
