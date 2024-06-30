import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { postCreateUser } from "../sevices/userSevices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { putUpdateUser } from "../sevices/userSevices";

const ModalEditUser = (props) => {
  const { handleClose, show , dataEditUser, handleUpdateUserFromEdit } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    let res = await putUpdateUser(name, job)
    if (res && res.updatedAt) {
      handleUpdateUserFromEdit({
        frist_name: name,
        id: dataEditUser.id
      })
    }
    handleClose();
    toast.success(`${name} is updated` ); 
    setIsLoading(false);
  };

  useEffect(() => {
    if (show) {
      setName(dataEditUser.first_name);
    }
  }, [dataEditUser]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleConfirm()}> 
            Confirm {isLoading && <i className="fa fa-spinner fa-pulse"></i>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
