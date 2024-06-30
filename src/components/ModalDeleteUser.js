import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../sevices/userSevices"
import { toast } from "react-toastify"
import { useState } from "react";

const ModalDeleteUser = (props) => {
  const { handleClose, show, dataDeleteUser, handleDeleteUserFromModal } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true)
    let res = await deleteUser(dataDeleteUser.id)
    if (res && +res.statusCode === 204) {
      toast.success("User deleted successfully")
      handleClose()
      handleDeleteUserFromModal(dataDeleteUser)
    } else {
      toast.error("error")
    }
    setIsLoading(false);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-modal-add-new">
            Are you sure you want to delete this user?
            <br/>
            <p><b>Email : {dataDeleteUser.email}</b></p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Delete {isLoading ? <i className="fas fa-spinner fa-pulse"></i> : ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
