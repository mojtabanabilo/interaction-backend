import { useState, JSX } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";
import { deleteData } from "../../features/delete-slice/deleteSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/functions/functions";

export default function ModalDelete(props: {
  state: {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    userId: number | null;
  };
}): JSX.Element {
  // redux-hooks
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);

  return (
    <Modal
      show={props.state.showModal}
      size="md"
      onClose={() => props.state.setShowModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this user?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={async () => {
                await dispatch(deleteData(props.state.userId));
                await props.state.setShowModal(false);
                await setTimeout(() => {
                  window.location.reload();
                }, 2500);
              }}
            >
              Yes, I'm sure
            </Button>
            <Button
              color="gray"
              onClick={() => props.state.setShowModal(false)}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
