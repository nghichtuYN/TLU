import React, { useState } from "react";
import { MDBBadge, MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useMutationHook } from "../../Hook/useMutationHook";
import { deleteCategory } from "../../services/CategoryService";
import { error, success } from "../MessageComponent/MessageComponent";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import NotFoundMessageComponent from "../NotFoundMessageComponent/NotFoundMessageComponent";
export const ManageCategoryComponent = (props) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(false);
  const { category, filterCategory, refetch, searchValue,getCategoriesFilter } = props;
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("");
  const [category_id, setCatID] = useState(0);
  const handleOpen = (id) => {
    setBasicModal(true);
    const selectedCategory = filterCategory
      ? filterCategory?.find((cat) => cat?.id === id)
      : category?.find((cat) => cat?.id === id);
    if (selectedCategory) {
      setCatID(selectedCategory?.id);
      setStatus(selectedCategory?.status);
      setCategoryName(selectedCategory?.categoryName);
    }
  };
  const onSuccessFn = (data, mes) => {
    refetch();
    success(mes);
  };
  const onErrorfn = (data, mes) => {
    error(mes);
  };
  const deleteRow = (id) => {
    if (category) {
      return deleteCategory(id);
    }
  };
  const mutationDelete = useMutationHook(
    deleteRow,
    (data) => onSuccessFn(data, "Xóa thành công"),
    (data) => onErrorfn(data, "Xóa thất bại")
  );
  const handleDelete = (id) => {
    if (category) {
      mutationDelete.mutate(id);
    }
  };
  return (
    <>
      <MDBTableBody>
        {searchValue !== "" ? (
          filterCategory && filterCategory.length > 0 ? (
            filterCategory.map((cat) => {
              const formattedDateCreated = format(
                new Date(cat?.created_at),
                "dd/MM/yyyy"
              );
              const formattedDateUpdated = cat?.updated_at
                ? format(new Date(cat?.updated_at), "dd/MM/yyyy")
                : formattedDateCreated;
              return (
                <tr key={cat?.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{cat?.categoryName}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center ">
                      {cat?.status ? (
                        <MDBBadge color="success" pill>
                          Active
                        </MDBBadge>
                      ) : (
                        <MDBBadge color="danger" pill>
                          Inactive
                        </MDBBadge>
                      )}
                    </div>
                  </td>
                  <td>{formattedDateCreated}</td>
                  <td>{formattedDateUpdated}</td>
                  <td>
                    <Button
                      onClick={() => handleOpen(cat?.id)}
                      variant="primary"
                      rounded="true"
                    >
                      <FaRegEdit style={{ fontSize: "20px" }} />
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="danger"
                      rounded="true"
                      onClick={() => handleDelete(cat?.id)}
                    >
                      <MdDeleteForever style={{ fontSize: "20px" }} />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>
                <div className="d-flex justify-content-center align-items-center">
                  <NotFoundMessageComponent />
                </div>
              </td>
            </tr>
          )
        ) : (
          category &&
          category.map((cat) => {
            const formattedDateCreated = format(
              new Date(cat?.created_at),
              "dd/MM/yyyy"
            );
            const formattedDateUpdated = cat?.updated_at
              ? format(new Date(cat?.updated_at), "dd/MM/yyyy")
              : formattedDateCreated;
            return (
              <tr key={cat?.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{cat?.categoryName}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ">
                    {cat?.status ? (
                      <MDBBadge color="success" pill>
                        Active
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="danger" pill>
                        Inactive
                      </MDBBadge>
                    )}
                  </div>
                </td>
                <td>{formattedDateCreated}</td>
                <td>{formattedDateUpdated}</td>
                <td>
                  <Button
                    onClick={() => handleOpen(cat?.id)}
                    variant="primary"
                    rounded="true"
                  >
                    <FaRegEdit style={{ fontSize: "20px" }} />
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="danger"
                    rounded="true"
                    onClick={() => handleDelete(cat?.id)}
                  >
                    <MdDeleteForever style={{ fontSize: "20px" }} />
                  </Button>
                </td>
              </tr>
            );
          })
        )}
      </MDBTableBody>
      {/* Modal */}
      <ModalComponent
        refetch={refetch}
        category_id={category_id}
        setCatID={setCatID}
        categoryName={categoryName}
        status={status}
        setCategoryName={setCategoryName}
        setStatus={setStatus}
        basicModal={basicModal}
        category={category}
        toggleOpen={toggleOpen}
        searchValue={searchValue}
        getCategoriesFilter={getCategoriesFilter}
      />
    </>
  );
};
