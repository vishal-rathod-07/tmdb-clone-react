const FormatDate = (props) => {
  let date = new Date(props.date);
  let formattedyear = date.getFullYear();
  let formattedmonth = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (formattedmonth < 10) {
    formattedmonth = '0' + formattedmonth;
  }
  return <>{formattedmonth + '/' + dt + '/' + formattedyear}</>;
};

export default FormatDate;
