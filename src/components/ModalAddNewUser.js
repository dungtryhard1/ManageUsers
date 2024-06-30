import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../sevices/userSevices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalAddNewUser = (props) => {
  const { handleClose, show , handleUpdateUser} = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const [isLoadding, setIsLoadding] = useState(false);

  const handleSaveUser = async () => {
    setIsLoadding(true);
    let res = await postCreateUser(name, job);
    if (res && res.id) {
      //success
      handleClose();
      setName("");
      setJob("");
      toast.success(`Hi ${name}`);
      handleUpdateUser({first_name: name, id: res.id})
    } else {
      //error
      toast.error("Error!!!");
      setIsLoadding(false);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-modal-add-new">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <div class="invalid-feedback">Please provide a valid zip.</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Job</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  value={job}
                  onChange={(event) => setJob(event.target.value)}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes {isLoadding && <i className="fa fa-spinner fa-pulse"></i>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNewUser;
