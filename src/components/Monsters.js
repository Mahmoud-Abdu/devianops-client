import React, { useEffect, useState } from "react";
import { getMonsters, deleteMonster } from "../services/monsterService";
import { Button, Modal } from "react-bootstrap";
import AlertModal from "./AlertModal";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function Monsters(props) {
  const [monsters, setMonsters] = useState([]);
  const [show, setShow] = useState(false);
  const [monster_Id, setMonster_Id] = useState("");

  const fetchMonsters = async () => {
    const fetchedMonsters = await getMonsters();
    setMonsters(fetchedMonsters);
    console.log(monsters);
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setMonster_Id(id);
    setShow(true);
  };

  const handleDelete = async () => {
    await deleteMonster(monster_Id).then((res) =>
      console.log("deleted ?", res)
    );
    fetchMonsters();
  };

  useEffect(() => {
    fetchMonsters();
  }, [monsters.length]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Monster Name</th>
            <th>Monster Level</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {monsters.map((monster, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{monster.name}</td>
                <td>{monster.level}</td>
                <td>
                  <Link
                    className="m-2 btn btn-success"
                    to={`/monsters/form/${monster._id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => handleShow(monster._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <AlertModal
          handleClose={handleClose}
          handleDelete={handleDelete}
          item="Monster"
        />
      </Modal>

      <Link to="/monsters/form" className="m-2 btn btn-primary">
        Add New Monster
      </Link>
    </>
  );
}

export default Monsters;
