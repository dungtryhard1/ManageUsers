import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../sevices/userSevices";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import _ from "lodash";
import { debounce } from "lodash";
import "./TableUsers.scss";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false);

  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});

  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const [sortBy, setSortBy] = useState("desc");
  const [sortField, setSortField] = useState("");

  // const [keywords, setKeywords] = useState("");

  const [dataExport, setDataExport] = useState([]);

  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setUsers(res.data);
      setTotalPage(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };

  const handleUpdateUser = (user) => {
    setUsers([user, ...users]);
  };

  const handleEditUser = (user) => {
    setIsShowModalEditUser(true);
    setDataEditUser(user);
  };

  const handleUpdateUserFromModal = (user) => {
    let cloneUsers = _.cloneDeep(users);
    let index = users.findIndex((item) => item.id === user.id);
    cloneUsers[index].first_name = user.frist_name;
    setUsers(cloneUsers);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDeleteUser(true);
    setDataDeleteUser(user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneUsers = _.cloneDeep(users);
    cloneUsers = cloneUsers.filter((item) => item.id !== user.id);
    setUsers(cloneUsers);
  };

  const handleClose = (user) => {
    setIsShowModalAddNewUser(false);
    setIsShowModalEditUser(false);
    setIsShowModalDeleteUser(false);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneUsers = _.cloneDeep(users);
    cloneUsers = _.orderBy(cloneUsers, sortField, sortBy);
    setUsers(cloneUsers);
  };

  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let cloneUsers = _.cloneDeep(users);
      cloneUsers = cloneUsers.filter((item) => item.email.includes(term));
      setUsers(cloneUsers);
    } else {
      getUser(1);
    }
  }, 500);

  const getUsersExport = (event, done) => {
    if (users && users.length > 0) {
      let result = [];
      result.push(["Id", "Email", "first name", "Last name"]);
      users.map((item) => {
        let arr = [item.id, item.email, item.first_name, item.last_name];
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Please select a SCV file ...");
        return;
      }
      Papa.parse(file, {
        skipEmptyLines: true,
        complete: function (results) {
          let rawSCV = results.data;
          if (rawSCV.length > 0) {
            if (rawSCV[0] && rawSCV[0].length === 3) {
              if (
                rawSCV[0][0] === "email" ||
                rawSCV[0][1] === "first_name" ||
                rawSCV[0][2] === "last_name"
              ) {
                let result = [];
                rawSCV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setUsers(result);
                console.log(result);
              } else {
                toast.error("Wrong format header file");
              }
            } else {
              toast.error("Wrong format file");
            }
          } else {
            toast.error("No found data in CSV file");
          }
        },
      });
    }
  };

  return (
    <>
      <div className="my-3 add-new d-sm-flex">
        <span>
          <b>List Users:</b>
        </span>
        <div className="group-btns mt-2 mt-sm-0">
          <label className="btn btn-primary btn-mw" htmlFor="btn-import">
            <i className="fa-solid fa-file-import"></i> Import
          </label>
          <input
            id="btn-import"
            type="file"
            hidden
            onChange={(event) => {
              handleImportCSV(event);
            }}
          />
          <CSVLink
            filename={"Users.csv"}
            data={dataExport}
            className="btn btn-primary btn-mw"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa fa-file-export"></i> Export
          </CSVLink>
          <Button
            onClick={() => {
              setIsShowModalAddNewUser(true);
            }}
            variant="success"
          >
            <i className="fa fa-circle-plus"></i> Add new
          </Button>
        </div>
      </div>
      <div className="col-sm-4 mb-3">
        <input
          className="form-control"
          placeholder="&#8981; Search user by email"
          onChange={(event) => {
            handleSearch(event);
          }}
        />
      </div>
      <div className="customize-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className="sort-header">
                  <span>ID</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort("desc", "id")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort("asc", "id")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Email</th>
              <th>
                <div className="sort-header">
                  <span>Frist Name</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort("desc", "first_name")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort("asc", "first_name")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, index) => (
                <tr key={`user-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td className="table-btn">
                    <button
                      className="btn btn-warning btn-mw"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-mw"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNewUser
        show={isShowModalAddNewUser}
        handleClose={handleClose}
        handleUpdateUser={handleUpdateUser}
      />
      <ModalEditUser
        show={isShowModalEditUser}
        handleClose={handleClose}
        dataEditUser={dataEditUser}
        handleUpdateUserFromEdit={handleUpdateUserFromModal}
      />
      <ModalDeleteUser
        show={isShowModalDeleteUser}
        handleClose={handleClose}
        dataDeleteUser={dataDeleteUser}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;
