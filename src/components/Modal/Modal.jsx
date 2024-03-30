import { useState } from "react";
import { Form, Modal, Button } from "rsuite";

const ProfileModal = ({
  modalOpen,
  handleClose,
  user,
  handleCloseWithUpdate,
}) => {
  const [formValue, setFormValue] = useState({});
  const herokuLink = "https://limitless-beach-11215-0d644074e9f3.herokuapp.com";
  const localhost = "http://localhost:3001";
  // Your component logic goes here
  const handleChangeProfile = async () => {
    // Update user profile
    if (user.name !== formValue.name) {
      await fetch(`${localhost}/profile/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue),
      })
        .then((res) => res.json())
        .then(() => {
          handleCloseWithUpdate(user.id);
        });
    }
  };

  return (
    <Modal size={"md"} open={modalOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Name: {user.name}</h2>
        <h4>Images Submitted: {user.entries}</h4>
        <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>
        <hr />

        <Form className="mt3" onChange={(formValue) => setFormValue(formValue)}>
          <Form.Group controlId="name" className="mt3">
            <Form.ControlLabel>Update Name</Form.ControlLabel>
            <Form.Control
              name="name"
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              placeholder={user.name}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
        <Button onClick={handleChangeProfile} appearance="primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
