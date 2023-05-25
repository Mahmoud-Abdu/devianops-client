import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {
  addNewMonster,
  getMonster,
  editMonster,
} from "../services/monsterService";
import { useParams } from "react-router-dom";

function MonsterForm(props) {
  const [monster, setMonster] = useState({ name: "", level: "" });
  const levels = Array.from(new Array(99).keys()).map((key) => key + 1);

  const { id: monster_Id } = useParams();

 

  useEffect(() => {
    if (monster_Id) {
      const fetchMonster = async () => {
        const fetchedMonster = await getMonster(monster_Id);
        setMonster(fetchedMonster);
      };
      fetchMonster();
    }
  }, [monster_Id]);

  const handleChange = (e) => {
    setMonster({ ...monster, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (monster_Id)
      editMonster(monster_Id, monster).then((res) =>
        console.log("srv res on edit", res)
      );
    if (!monster_Id) {
      addNewMonster(monster).then((res) => console.log("srv res", res));
      setMonster({ name: "", level: "" });
    }
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group style={{ justifyContent: "center", display: "flex" }}>
          <Form.Control
            placeholder="Monster Name"
            name="name"
            value={monster.name}
            type="text"
            className="m-2 w-50"
            onChange={handleChange}
            required
          ></Form.Control>

          <Form.Select
            aria-label="Default select example"
            className="m-2 w-50"
            value={monster.level}
            onChange={handleChange}
            name="level"
          >
            <option>Select Monster Level</option>
            {levels.map((level) => (
              <option value={level} key={level}>
                {level}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="m-2">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default MonsterForm;
