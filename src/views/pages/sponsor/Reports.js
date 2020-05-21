import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Table,
  Button, PaginationItem, PaginationLink,
} from 'reactstrap';
import Pagination from "react-js-pagination";
import axios from 'axios';
import config from '../../../config/env';
import moment from 'moment';
import '../../../assets/style/Dashboard.css';
import querystring from 'querystring';
require("bootstrap/dist/css/bootstrap.min.css");


const SMALL_SIZE = 900;
const Reports = function(){
  const [reports, setReports] = useState([]);
  const [hideColumn, setHideColumn] = useState(window.innerWidth <= SMALL_SIZE);
  const [isSmall, setIsSmall] = useState(window.innerWidth <= SMALL_SIZE);
  const [page, setPage] = useState(1);
  const [total,setTotal] = useState(1);

  const handleResize = () => {
    if (window.innerWidth <= SMALL_SIZE && !isSmall) {
      setIsSmall(true);
      setHideColumn(true);
    }
    if (window.innerWidth > SMALL_SIZE) {
      setIsSmall(false);
      setHideColumn(false);
    }
  };

  const handleSubmit = (id) => {
    window.open(`${config.url}/api/v1/report/${id}/`, "_blank") || window.location.replace(`${config.url}/api/v1/report/${id}/`);
  };

const Tests = () => {
  if (!reports) {
    return;
  }
  return (
    reports.map((item) => (
      <tr>
        <td>{item.user.name}</td>
        <td>{item.user.email}</td>
        <td>{item.campaign}</td>
        {hideColumn ? '' : <td>{item.user.age}</td>}
        {hideColumn ? '' : <td>{item.user.income}</td>}
        <td>{item.type}</td>
        <td>{moment(item.created_at).format('YYYY-MM-DD HH:mm')}</td>
        <td>
          <Button onClick={() => { handleSubmit(item.id); }}>
            <span className="responsive">Download Report</span>
          </Button>
        </td>
      </tr>
    ))
  );
};
                   
  useEffect(()=>{
    const token = localStorage.getItem('Token');
    axios.get(`${config.url}/api/v1/sponsor/reports?${querystring.stringify({ungrouped:true,page:page,per_page_count:20})}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setReports(res.data.payload);
        setTotal(res.data.total_items);
      })
      .catch(err => {
        console.log(err);
      });
  },[page]);

  const handlePageChange = (index)=>{
    console.log("changing page to " + index);
    setPage(index);
  };


  useEffect(()=>{
    window.removeEventListener('resize', handleResize);
  },[]);

  window.addEventListener('resize', handleResize);

  return (
    <Card>
      <CardBody style={{overflowX: 'auto'}}>
        <Table striped className="responsive-table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            {hideColumn || <th>Age Range</th>}
            {hideColumn || <th>Income</th>}
            <th>Type</th>
            <th>Time</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <Tests/>
          </tbody>
        </Table>
        <Pagination
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={total}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          linkClass={"page-link"}
          itemClass={"page-item"}
          innerClass={"pagination justify-content-center"}
        />
      </CardBody>
    </Card>
  );


};

export default Reports;
