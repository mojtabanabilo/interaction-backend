import { useState, useEffect } from "react";
import { setStateResize } from "../../utils/functions/functions";
import styles from "./style/tables.module.scss";

const data = [
  {
    firstName: "user1",
    lastName: "user1",
    email: "mojjtaba00@gmail.com",
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
    email: "mojjtaba00@gmail.com",
    accessLevel: "admin",
  },
  {
    firstName: "user4",
    lastName: "user1",
    email: "mojjtaba00@gmail.com",
    accessLevel: "admin",
  },
];

// component
import TBodyTable from "./TBodyTable";

export default function Table() {
  // states
  const [userWidth, setUserWidth] = useState<number>(0);

  // lifecycle
  useEffect(() => {
    setStateResize(setUserWidth);
  }, [userWidth]);

  return (
    <>
      <h2>Users</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr_thead_product}>
            <th className={styles.th_thead_product}>Row</th>
            <th className={styles.th_thead_product}>First Name</th>
            <th className={styles.th_thead_product}>Last Name</th>
            <th className={styles.th_thead_product}>Email</th>
            <th className={styles.th_thead_product}>Access-Level</th>
            <th className={styles.th_thead_product}>Edit</th>
          </tr>
        </thead>
        <tbody>
          <TBodyTable />
        </tbody>
      </table>
    </>
  );
}
