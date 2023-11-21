import "./list.css";
import Sidebar from "../../components/sidebar/Sidebar";

import Datatable from "../../components/datatable/Datatable";

const List = ({ columns }) => {
  return (
    <div className="listData">
      <Sidebar />
      <div className="listDataContainer">
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default List;
