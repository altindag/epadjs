import http from "./httpService";
const apiUrl = sessionStorage.getItem("apiUrl");
const mode = sessionStorage.getItem("mode");

export function getAnnotations(series, opts = {}) {
  if (mode === "lite") {
    const { projectId, subjectId, studyId, seriesId } = series;
    const fullUrl =
      apiUrl +
      "/projects/lite/subjects/" +
      subjectId +
      "/studies/" +
      studyId +
      "/series/" +
      seriesId;
    if (Object.entries(opts).length === 0 && opts.constructor === Object)
      return http.get(fullUrl + "/aims?count=0&format=summary");
    else if (opts["json"]) return http.get(fullUrl + "/aims?format=json");
    return http.get(+"/aims?count=0&format=summary");
  } else {
    const { projectId, subjectId, studyId, seriesId } = series;
    const fullUrl =
      apiUrl +
      "/projects/" +
      projectId +
      "/subjects/" +
      subjectId +
      "/studies/" +
      studyId +
      "/series/" +
      seriesId;
    if (Object.entries(opts).length === 0 && opts.constructor === Object)
      return http.get(fullUrl + "/aims?count=0&format=summary");
    else if (opts["json"]) return http.get(fullUrl + "/aims?format=json");
    return http.get(+"/aims?count=0&format=summary");
  }
}

export function getAnnotationsJSON(projectId, subjectId, studyId, seriesId) {
  if (mode === "lite")
    return http.get(
      apiUrl +
        "/projects/lite/subjects/" +
        subjectId +
        "/studies/" +
        studyId +
        "/series/" +
        seriesId +
        "/aims?format=json"
    );
  else
    return http.get(
      apiUrl +
        "/projects/" +
        projectId +
        "/subjects/" +
        subjectId +
        "/studies/" +
        studyId +
        "/series/" +
        seriesId +
        "/aims?format=json"
    );
}

export function getAnnotations2() {
  return http.get(apiUrl + "/projects/lite/aims");
}

export function downloadAnnotations(optionObj, aimIDlist, selection) {
  if (mode === "lite") {
    return http.post(
      apiUrl +
        "/projects/lite/aims/download?summary=" +
        optionObj.summary +
        "&aim=" +
        optionObj.aim,
      aimIDlist,
      { responseType: "blob" }
    );
  }
}

export function getSummaryAnnotations(projectID) {
  return mode === "lite"
    ? http.get(apiUrl + "/projects/lite/aims?format=summary")
    : http.get(apiUrl + "/projects/" + projectID + "/aims?format=summary");
}

export function deleteAnnotation(aimObj, aimID, projectID) {
  console.log("Aim id", aimID);
  if (aimObj) {
    aimID = aimObj.aimID;
    projectID = aimObj.projectID ? projectID : "lite";
  }
  return http.delete(
    apiUrl + "/projects/" + projectID + "/aims/" + aimID + "?deleteDSO=true"
  );
}

export function deleteAim(aimID, projectID) {
  return http.delete(
    apiUrl + "/projects/" + projectID + "/aims/" + aimID + "?deleteDSO=true"
  );
}

export function uploadAim(aim) {
  let url;
  if (mode === "lite") {
    url = apiUrl + "/projects/lite/aims";
    return http.post(url, aim);
  }
}

export function updateAim(aim, aimId) {
  let url;
  if (mode === "lite") {
    url = apiUrl + "/projects/lite/aims/" + aimId;
    return http.put(url, aim);
  }
}

export function uploadSegmentation(segmentation, projectId = "lite") {
  const url = apiUrl + "/projects/" + projectId + "/files";
  const segData = new FormData();
  segData.append("file", segmentation, "blob.dcm");
  console.log("Segmentation Data", segmentation);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  return http.post(url, segData, config);
}
