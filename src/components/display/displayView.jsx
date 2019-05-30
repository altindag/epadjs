import React, { Component } from "react";
import Toolbar from "./toolbar";
//import Viewport from "./viewport.jsx";
import ViewportSeg from "./viewportSeg.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./flex.css";
//import viewport from "./viewport.jsx";
import { FiZoomIn } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import AnnotationList from "../annotationsList/annotationDock/annotationList";

const mapStateToProps = state => {
  return {
    series: state.searchViewReducer.series,
    cornerstone: state.searchViewReducer.cornerstone,
    cornerstoneTools: state.searchViewReducer.cornerstoneTools,
    activePort: state.annotationsListReducer.activePort
    //refs: state.searchViewReducer.viewports
  };
};

class DisplayView extends Component {
  constructor(props) {
    super(props);
    this.csTools = this.props.cornerstoneTools;
    this.child = React.createRef();
    this.state = {
      series: props.series,
      width: "100%",
      height: "calc(100% - 60px)",
      // height: "100%",
      refs: props.refs,
      hiding: false,
      showAnnDetails: true
    };
    //this.createRefs();
  }

  componentDidMount() {
    //document.body.classList.add("fixed-page");
    this.getViewports();
    const vpList = document.getElementsByClassName("cs");
    const ZoomTool = this.props.cornerstoneTools.ZoomTool;
    //check the logic here
    /*for (var i = 0; i < vpList.length; i++) {
      this.props.cornerstoneTools.zoom.activate(vpList[i], 5);
    }*/
    this.props.cornerstoneTools.setToolActive(ZoomTool.name, {
      mouseButtonMask: 5
    });

    //make the last element in series as selected viewport since the last open will be added to end
    this.props.dispatch(
      this.defaultSelectVP("viewport" + (this.state.series.length - 1))
    );
    //console.log(viewports);
    //viewports.map(vp => this.props.cornerstoneTools.wwwc.activate(vp, 1));
    //this.props.cornerstoneTools.wwwc.activate(this.state.refs[0], 1);
  }

  getViewports = () => {
    let numSeries = this.state.series.length;
    let numCols = numSeries % 3;
    if (numSeries > 3) {
      this.setState({ height: "calc((100% - 60px)/2)" });
      this.setState({ width: "33%" });
      return;
    }
    if (numCols === 1) {
      this.setState({ width: "100%" });
    } else if (numCols === 2) this.setState({ width: "50%" });
    else this.setState({ width: "33%" });
  };

  createRefs() {
    this.state.series.map(() =>
      this.props.dispatch(this.createViewport(React.createRef()))
    );
  }

  createViewport(viewportRef) {
    return {
      type: "CREATE_VIEWPORT",
      payload: viewportRef
    };
  }

  defaultSelectVP(id) {
    return {
      type: "SELECT_VIEWPORT",
      payload: id
    };
  }

  hideShow = current => {
    const elements = document.getElementsByClassName("viewportContainer");
    if (this.state.hiding === false) {
      for (var i = 0; i < elements.length; i++) {
        if (i != current) elements[i].style.display = "none";
      }
      this.setState({ height: "calc(100% - 60px)", width: "100%" });
    } else {
      this.getViewports();
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "inline-block";
      }
    }
    this.setState({ hiding: !this.state.hiding }, () =>
      window.dispatchEvent(new Event("resize"))
    );

    /*const elem = document.getElementById("viewport" + current);
    console.log(elem);
    this.props.cornerstone.fitToWindow(elem);*/
  };

  handleHideAnnotations = () => {
    this.setState({ showAnnDetails: false });
  };

  render() {
    return (
      // <div className="displayView-main">
      <React.Fragment>
        <Toolbar />
        {/* <div className="splitted-view"> */}
        {this.state.series.map((serie, i) => (
          <div
            className={"viewportContainer"}
            key={i}
            style={{
              width: this.state.width,
              height: this.state.height,
              padding: "2px",
              display: "inline-block"
            }}
            onDoubleClick={() => this.hideShow(i)}
          >
            <ViewportSeg
              key={serie.seriesId}
              id={"viewport" + i}
              cs={this.props.cornerstone}
              csT={this.props.cornerstoneTools}
              setClick={click => (this.updateViewport = click)}
              serie={serie}
            />
          </div>
        ))}
        {/* {this.props.activePort !== null && this.state.showAnnDetails ? (
            <div className="annList-mainview">
              <button
                className="annList-mainview__hide"
                onClick={this.handleHideAnnotations}
              >
                {this.state.showAnnDetails ? "hide" : "show"}
              </button>
              <AnnotationList />{" "}
            </div>
          ) : null} */}
        <div id="cont" />
        {/* </div> */}
      </React.Fragment>
      // </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(DisplayView));
