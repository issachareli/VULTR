import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  Button, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import config from '../../../config/env';
import axios from 'axios';
//import NavLink from 'react-router-dom/NavLink';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NumAbbr from 'number-abbreviate';
import '../../../assets/style/Dashboard.css';

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      modal: false,
      url: '',
      testCount: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  handleSubmit(id) {
    window.location.replace(`${config.url}/api/v1/report/${id}/`);
  }
  handleSubmit2(uuid) {
    window.location.replace(`${config.url}/test/${uuid}`)
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('Token');
    /***** api request has to be changed (for user) *****/
    // axios.get(`${config.url}/api/v1/sponsor/credits`, {
    //   headers: {
    //     'Authorization': 'Bearer ' + accessToken,
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // }).then(res => {
    //   this.setState({ remainingCredits: res.data.credits });
    // }).catch(error => {
    //   console.log(error);
    // });

    axios.get(`${config.url}/api/v1/user/tests?limit=5`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        this.setState({
          reports: res.data.payload
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios.get(`${config.url}/api/v1/user/tests/count`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        this.setState({
          testCount: res.data.count,
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios.get(`${config.url}/api/v1/user/tests/pending/count`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        this.setState({
          pendingTestsCount: res.data.count
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let numAbbr = new NumAbbr();
    const Tests = () => {
      if (!this.state.reports){
        return;
      }
      return (
        this.state.reports.map((item) => {
          return(
                <tr>
                  <td>{item.sponsor.name}</td>
                  <td>{item.type}</td>
                  <td>{moment(item.updated_at).format('YYYY-MM-DD HH:mm')}</td>
                  <td><Button onClick={() => {
                    this.handleSubmit(item.id);
                  }}><span className="responsive">Download Report</span></Button></td>
                </tr>
            )
          },
        ));
    };

    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Test Link</ModalHeader>
          <ModalBody>
            {this.state.url}<br/>
            <CopyToClipboard text={this.state.url}>
              <Button
                variant="contained"
                color="primary">
                <span className="responsive">Copy Link</span>
              </Button>
            </CopyToClipboard>
          </ModalBody>
        </Modal>
        <div className="m-b">
          <h2 className="responsive-header">Good morning</h2>
        </div>
        <Row>
          <Col md={12} xs={12}>
            <Row>
              <Col xs={12} md={6}>
                <Card>
                  <CardHeader>
                    <span className="responsive">Take Test {' '}</span>
                  </CardHeader>
                  <CardBody>
                    <br />
                    <Button size="sm" className="pull-left" color="success" tag={Link} to="/sponsor_dashboard/reports">
                      <span className="responsive">Buy Now</span>
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <span className="responsive">Total Tests Taken{' '}</span>
                  <Button size="sm" className="pull-right" tag={Link} to="/user/reports">
                    <span className="responsive">View</span>
                  </Button>
                </CardHeader>
                <CardBody>
                  <h2 className="m-b-20 inline-block">
                    <span className="responsive-header">{numAbbr.abbreviate(this.state.testCount, 2)}</span>
                  </h2>{' '}
                </CardBody>
              </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs={6}><span className="responsive">Recent Tests</span></Col>
                  <Col xs={6}>
                    <Link to='/user/reports'><Button size="sm" className="pull-right" color="primary"><span className="responsive">See All</span></Button></Link>
                  </Col>
                </Row>
              </CardHeader>
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
          </Col>
        </Row>
      </div>
    );
  }
}
