import React from "react";
import PropTypes from "prop-types";
import { FaCogs } from "react-icons/fa";
import ParametersForProjectWindow from "./parametersForProjectWindow";
import Popup from "../../common/Popup.jsx";
import Draggable from "react-draggable";

class PluginProjectWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    showparamswindow: false,
    pluginid: null,
    projectid: null,
  };

  handleShowParamatersWindow = (projectid, seldata) => {
    console.log(" project id :", projectid);
    console.log(" pluginid", seldata.original.id);
    this.setState({
      showparamswindow: true,
      pluginid: seldata.original.id,
      projectid: projectid,
    });
  };
  handleParameterCancel = () => {
    this.setState({ showparamswindow: false });
  };
  populateRows = () => {
    let rows = [];

    this.props.allProjects.forEach((project) => {
      console.log("projects : ", project.projectid);
      if (project.projectid == "all" || project.projectid == "nonassigned")
        return;
      rows.push(
        <tr key={project.id} className="edit-userRole__table--row">
          <td>
            <input
              style={{ cursor: "pointer" }}
              type="checkbox"
              value={project.id}
              name={project.name}
              defaultChecked={
                project.id === this.props.selectedProjectsAsMap.get(project.id)
              }
              onChange={() => {
                this.props.onChange(project.id, this.props.tableSelectedData);
              }}
            />
          </td>
          <td>{project.name}</td>
          <td>
            <div
              className="text_clickable"
              onClick={() => {
                this.handleShowParamatersWindow(
                  project.id,
                  this.props.tableSelectedData
                );
              }}
            >
              &nbsp; <FaCogs  />
            </div>
          </td>
        </tr>
      );
    });
    return rows;
  };

  render() {
    return (
      <div  class="tools menu-display" id="template">
      <div className="plugin_project_container">
      <Draggable
                    onClick={this.pluginWindowClickHandler}
                    onMouseDown={this.pluginWindowClickHandler}
                    onMouseMove={this.pluginWindowClickHandler}
                  >
        <div dialogClassName="plugin_project_modal">
          <div className="plugin_project_modal_header">
            <div className="plugin_project_modal_title">Projects</div>
          </div>
          <div className="plugin_project_modal_body">
            <table className="plugin_project_table">
              <thead>
                <tr>
                  <th className="user-table__header">add/remove</th>
                  <th className="user-table__header">project</th>
                  <th className="user-table__header">project params</th>
                </tr>
              </thead>
              <tbody>{this.populateRows()}</tbody>
            </table>
          </div>

          <div className="plugin_project_modal_footer">
            <div className="create-user__modal--buttons">
              <button
                variant="primary"
                className="btn btn-sm btn-outline-light"
                onClick={this.props.onSave}
              >
                Submit
              </button>
              <button
                variant="secondary"
                className="btn btn-sm btn-outline-light"
                onClick={this.props.onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        </Draggable>
        {this.state.showparamswindow && (
          <ParametersForProjectWindow
            onCancel={this.handleParameterCancel}
            onSave={this.handleDefaultParameterSave}
            plugindbid={this.state.pluginid}
            projectdbid={this.state.projectid}
          />
        )}
        
      </div>
    </div>
    );
  }
}

export default PluginProjectWindow;
PropTypes.projectTable = {
  //onSelect: PropTypes.func,

  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  allprojects: PropTypes.Array,
  tableSelectedData: PropTypes.Array,
  selectedProjectsAsMap: PropTypes.Array,
};
