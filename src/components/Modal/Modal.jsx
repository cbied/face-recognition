import React from "react";
import { Modal, Button } from "rsuite";

const ProfileModal = ({
  modalOpen,
  handleClose,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  user,
}) => {
  // Your component logic goes here
  console.log(user);
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
        <div className="mt3">
          <label className="db fw6 lh-copy f6">Name</label>
          <input
            onChange={onNameChange}
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            type="text"
            name="name"
            id="new-name"
            placeholder={user.name}
          />
        </div>
        <div className="mt3">
          <label className="db fw6 lh-copy f6">Email</label>
          <input
            onChange={onEmailChange}
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            type="email"
            name="email-address"
            id="new-email-address"
          />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6">Password</label>
          <input
            onChange={onPasswordChange}
            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            type="password"
            name="password"
            id="new-password"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
        <Button onClick={handleClose} appearance="primary">
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
