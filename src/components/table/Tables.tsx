import { useState, useEffect } from "react";
import { setStateResize } from "../../utils/functions/functions";
import styles from "./style/tables.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// component
import TBodyTable from "./TBodyTable";

export default function Table(): JSX.Element {
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
            <th className={styles.th_thead_product}>Role</th>
            <th className={styles.th_thead_product}>Remove</th>
          </tr>
        </thead>
        <tbody>
          <TBodyTable />
        </tbody>
      </table>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
