import React, { useEffect, useState } from "react";
import AlertModal from "./AlertModal";
import Table from "react-bootstrap/Table";
import { getQuests, deleteQuest } from "./../services/questService";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function Quests(props) {
  const [quests, setQuests] = useState([]);
  const [show, setShow] = useState(false);
  const [quest_Id, setQuest_Id] = useState("");

  const fetchQuests = async () => {
    const fetchedQuests = await getQuests();
    setQuests(fetchedQuests);
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setQuest_Id(id);
    setShow(true);
  };

  const handleDelete = async () => {
    const { data: deletedQuest } = await deleteQuest(quest_Id);
    const questsAfterDelete = quests.filter(
      (quest) => quest._id !== deletedQuest._id
    );
    setQuests(questsAfterDelete);
    console.log("deleted", deletedQuest);
  };

  useEffect(() => {
    fetchQuests();
  }, [quests.length]);
  console.log("quests in quests page", quests);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Quest Name</th>
            <th>Enemies</th>
            <th>Number Of Enemies</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {quests.map((quest, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{quest.name}</td>
                <td>
                  {quest.enemyNames.map((enemy) => enemy.name).join(", ")}
                </td>
                <td>{quest.numberOfEnemies}</td>
                <td>
                  <Link
                    className="m-2 btn btn-success"
                    to={`/quests/form/${quest._id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => handleShow(quest._id)}
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
          item="Quest"
        />
      </Modal>

      <Link to="/quests/form" className="m-2 btn btn-primary">
        Add New Quest
      </Link>
    </>
  );
}

export default Quests;
