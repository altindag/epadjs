import http from './httpService';
import { apiUrl } from '../config.json';

export function getProjects() {
  return http.get(apiUrl + '/projects/');
}

export function deleteProject(projectId) {
  return http.delete(apiUrl + '/projects/' + projectId);
}

export function saveProject(
  projectName,
  projectDescription,
  defaultTemplate,
  id,
  user,
  type
) {
  return http.post(
    apiUrl +
      '/projects/' +
      id +
      '?/username=' +
      user +
      '&projectName=' +
      projectName +
      '&projectDescription=' +
      projectDescription +
      '&type=' +
      type,
    { projectDescription, defaultTemplate }
  );
}

export function updateProject(id, projectName, projectDescription, type) {
  return http.put(
    apiUrl +
      '/projects/' +
      id +
      '?projectName=' +
      projectName +
      '&description=' +
      projectDescription +
      '&type=' +
      type
  );
}

export function getProjectUsers(id) {
  return http.get(apiUrl + '/projects/' + id + '/users/');
}
