const React = require("react");
const Persist = require("./persistent/Persist").default;

exports.wrapPageElement = ({element, props}) => {
  return (<Persist {...props}>{element}</Persist>);
}
