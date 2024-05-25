import { useState } from "react";
import PropTypes from 'prop-types';
import LearningToolViewWindow from "./Learning-Tool-View-Window/Learning-Tool-View-Window";
import "./Learning-Tool-Menu.css";

//For future implimentation 
import ViewSelectionMenu from "./View-Selection-Menu/View-Selection-Menu";

const LearningToolMenu = ({ HomeWidth, HomeHeight, CanvasObjects }) => {
    const [selectedView, setSelectedView] = useState("Code View");

    return (
        <div style={{
            borderColor: "red",
            width: HomeWidth,
            height: HomeHeight
        }}>
            <ViewSelectionMenu setSelectedView={setSelectedView}/>
            <LearningToolViewWindow selectedView={selectedView} CanvasObjects={CanvasObjects} />
        </div>
    );
};
LearningToolMenu.propTypes = {
    CanvasObjects: PropTypes.any,
    HomeWidth: PropTypes.number,
    HomeHeight: PropTypes.number
};

// To Impliment
{/* <Card
style={{

    borderRadius: "0px",
    backgroundColor: "#0b0c10",
}}
>
<div className="card-header">
<ViewSelectionMenu setSelectedView={setSelectedView} />
</div>
<div className="card-body">

</div>
</Card> */}


export default LearningToolMenu;
