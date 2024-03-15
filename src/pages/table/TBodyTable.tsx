import { useState, useEffect } from "react";
import styles from "./style/tbodytable.module.scss";
import { setStateResize } from "../../utils/functions/functions";
import { getData } from "../../features/get-slice/getSlice";
import { deleteData } from "../../features/delete-slice/deleteSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/functions/functions";

// components
import ModalDelete from "../../components/modal-delete/ModalDelete";

export default function TBodyTable(): JSX.Element {
  // states
  const [userData, setUserData] = useState<any>(null);
  const [userWidth, setUserWidth] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // redux-hooks
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);
  const { data } = selector.getData;

  // lifecycle
  useEffect(() => {
    dispatch(getData("http://localhost:4000/user"));
  }, []);
  useEffect(() => {
    selector && setUserData(data);
  }, [selector]);
  useEffect(() => {
    setStateResize(setUserWidth);
  }, [userWidth]);
  useEffect(() => {
    userId !== null && console.log(userId);
  }, [userId]);

  return (
    <>
      {userWidth > 650 &&
        userData &&
        userData[0]?.data?.map((item: any, index: number) => (
          <tr className={styles.tr_product_body} key={item.id}>
            <td>{index + 1}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td className={styles.td_icon}>
              <select defaultValue={item.role} className={styles.custom_select}>
                <option value={item.role}>{item.role}</option>
                <option value={item.role === "User" ? "Admin" : "User"}>
                  {item.role === "User" ? "Admin" : "User"}
                </option>
              </select>
              <div
                className={styles.icon_container_remove}
                onClick={() => {
                  // dispatch(deleteData(item.id));
                  setUserId(item.id);
                  setShowModal(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </td>
          </tr>
        ))}
      {userWidth < 650 &&
        userData &&
        userData[0]?.data?.map((item: any, index: number) => (
          <tr className={styles.tr_product_body} key={item.id}>
            <td data-cell="Row">{index + 1}</td>
            <td data-cell="First Name">{item.firstName}</td>
            <td data-cell="Last Name">{item.lastName}</td>
            <td data-cell="Email">{item.email}</td>
            <td data-cell="Role">{item.role}</td>
            <td className={styles.td_icon}>
              <select defaultValue={item.role} className={styles.custom_select}>
                <option>{item.role}</option>
                <option value={item.role === "User" ? "Admin" : "User"}>
                  {item.role === "User" ? "Admin" : "User"}
                </option>
              </select>
              <div
                className={styles.icon_container_remove}
                onClick={() => dispatch(deleteData(item.id))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </td>
          </tr>
        ))}
      {showModal && <ModalDelete state={{ showModal, setShowModal, userId }} />}
    </>
  );
}
