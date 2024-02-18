import { useState, useEffect } from "react";
import styles from "./style/tbodytable.module.scss";
import { setStateResize } from "../../utils/functions/functions";
import { getData } from "../../features/fetch-get/fetchGet";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/functions/functions";

const data = [
  {
    firstName: "user1",
    lastName: "user1",
    email: "mojjtaba0@gmail.com",
    accessLevel: "admin",
  },
  {
    firstName: "user2",
    lastName: "user1",
    email: "mojjtaba00@gmail.com",
    accessLevel: "admin",
  },
  {
    firstName: "user3",
    lastName: "user1",
    email: "mojjtaba000@gmail.com",
    accessLevel: "admin",
  },
  {
    firstName: "user4",
    lastName: "user1",
    email: "mojjtaba0000@gmail.com",
    accessLevel: "admin",
  },
];

export default function TBodyTable() {
  // redux-hooks
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);
  const { data } = selector.getData;

  // states
  const [userWidth, setUserWidth] = useState<number>(0);

  // lifecycle
  useEffect(() => {
    dispatch(getData("http://localhost:4000/user"));
  }, []);
  useEffect(() => {
    setStateResize(setUserWidth);
  }, [userWidth]);

  return (
    <>
      {data[data.length - 1]?.data.length > 0 &&
        userWidth > 650 &&
        data[data.length - 1].data.map((item: any, index: number) => (
          <tr className={styles.tr_product_body} key={item.id}>
            <td>{index + 1}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
            <td className={styles.td_icon}>
              <div className={styles.icon_container_edit}>
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
              <div className={styles.icon_container_remove}>
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
      {data.length > 0 &&
        userWidth < 650 &&
        data[data.length - 1]?.data.map((item: any, index: number) => (
          <tr className={styles.tr_product_body} key={item.id}>
            <td data-cell="Row">{index + 1}</td>
            <td data-cell="First Name">{item.firstName}</td>
            <td data-cell="Last Name">{item.lastName}</td>
            <td data-cell="Email">{item.email}</td>
            <td data-cell="Access-Level">{item.role}</td>
            <td className={styles.td_icon}>
              <div className={styles.icon_container_edit}>
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
              <div className={styles.icon_container_remove}>
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
    </>
  );
}
