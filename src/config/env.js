const sysConfig = {
  url: `${window.location.protocol}//${window.location.hostname}${window.location.port === "" ? "" : `:${window.location.port}`}`,
  apiPath:"",
};
export default sysConfig;