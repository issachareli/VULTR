import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Table,
  Button,
} from 'reactstrap';
import axios from 'axios';
import config from '../../../config/env';
import moment from 'moment';
import '../../../assets/style/Dashboard.css';

class TestResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reports: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem('Token');
    axios.get(`${config.url}/api/v1/user/tests`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        this.setState({
          reports: res.data.payload,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit(id) {
    window.location.replace(`${config.url}/api/v1/report/${id}/`);
  }

  render() {
    const Tests = () => {
      if (!this.state.reports){
        return;
      }
      return (
        this.state.reports.map((item) => {
          return(
                <tr>
                  <td><span className="responsive">{item.sponsor.name}</span></td>
                  <td><span className="responsive">{item.type}</span></td>
                  <td><span className="responsive">{moment(item.updated_at).format('YYYY-MM-DD HH:mm')}</span></td>
                  <td><Button onClick={() => {
                    this.handleSubmit(item.id);
                  }}><span className="responsive">Download Report</span></Button></td>
                </tr>
            )
          },
        ));
    };


    return (
      <Card>
        <CardBody style={{overflowX: 'auto'}}>
          <Table hover className="responsive-table">
            <thead>
            <tr>
              <th>Sponsor</th>
              <th>Type</th>
              <th>Time</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <Tests/>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  }
}

export default TestResults;