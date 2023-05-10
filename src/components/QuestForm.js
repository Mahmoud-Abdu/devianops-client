import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { addNewQuest, getQuest, editQuest } from "../services/questService";
import { getMonsters } from "../services/monsterService";

function QuestForm(props) {
  const { id: quest_Id } = useParams();
  console.log(quest_Id);
  const [monsters, setMonsters] = useState([]);

  const [quest, setQuest] = useState({
    name: "",
    latitude: "",
    longitude: "",
    numberOfEnemies: "",
    enemyNames: [],
  });

  const fetchQuest = async () => {
    const fetchedQuest = await getQuest(quest_Id);
    console.log("ftc", fetchedQuest);
    setQuest(fetchedQuest);
  };

  const fetchMonsters = async () => {
    const fetchedMonsters = await getMonsters();
    console.log("ftc mnstsr", fetchedMonsters);
    setMonsters(fetchedMonsters);
  };

  useEffect(() => {
    if (quest_Id) fetchQuest();
  }, [quest_Id]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(quest);
    if (!quest_Id) {
      addNewQuest(quest)
        .then((res) => console.log("quest added", res))
        .catch(({ response }) => {
          const { data: error } = response;
          console.log("e", error.message);
        });
      setQuest({
        name: "",
        latitude: "",
        longitude: "",
        numberOfEnemies: "",
        enemyNames: [],
      });
    }
    if (quest_Id)
      editQuest(quest_Id, quest).then((res) =>
        console.log("quest edited", res)
      );

    // e.target.reset();
  }
  function handleChange(e) {
    setQuest({ ...quest, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    fetchMonsters();
  }, []);

  function handleSelectMonster(e) {
    const updatedQuest = { ...quest };

    if (e.target.checked)
      updatedQuest.enemyNames = [...updatedQuest.enemyNames, e.target.value];
    if (!e.target.checked)
      updatedQuest.enemyNames.splice(
        updatedQuest.enemyNames.indexOf(e.target.value),
        1
      );
    console.log(updatedQuest);
    setQuest(updatedQuest);
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group className="mt-4">
          <Form.Label>Quest Details</Form.Label>
          <Form.Control
            name="name"
            value={quest.name}
            placeholder="Quest Name"
            type="text"
            onChange={handleChange}
            required
          ></Form.Control>
          <Form.Control
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={quest.latitude}
            onChange={handleChange}
            required
            className="mt-2"
          ></Form.Control>
          <Form.Control
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={quest.longitude}
            onChange={handleChange}
            required
            className="mt-2"
          ></Form.Control>
          <Form.Control
            type="text"
            name="numberOfEnemies"
            placeholder="Number Of Enemies"
            value={quest.numberOfEnemies}
            onChange={handleChange}
            required
            className="mt-2"
          ></Form.Control>
        </Form.Group>
        {monsters.map((monster, index) => (
          <Form.Group key={index}>
            <Form.Check
              type="checkbox"
              onChange={(e) => handleSelectMonster(e)}
              label={monster.name}
              value={monster._id}
              checked={quest.enemyNames.includes(monster._id)}
            />
          </Form.Group>
        ))}

        <Button type="submit" className="m-2">
          Submit
        </Button>

        {/* <Button onClick={handleGetQuests} variant="secondary">
          Create A New Id
        </Button> */}
      </Form>
    </Container>
  );
}

export default QuestForm;
