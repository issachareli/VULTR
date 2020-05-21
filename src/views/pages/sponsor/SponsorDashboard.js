import React, { Component } from 'react'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button, Table, Input
} from 'reactstrap'
import { Modal, Form } from 'react-bootstrap'
import { Doughnut, Line } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import config from '../../../config/env'
import axios from 'axios'
// import NavLink from 'react-router-dom/NavLink';
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import 'font-awesome/css/font-awesome.min.css'
import * as clipboard from 'clipboard-polyfill/build/clipboard-polyfill.promise'
import '../../../assets/style/Dashboard.css'

import NumAbbr from 'number-abbreviate'

const SMALL_SIZE = 900
export default class SponsorDashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fullName: '',
      remainingCredits: null,
      reports: [],
      url: '',
      total: null,
      isCopied: '',
      credits: null,
      testUrl: '',
      testUrlCopied: '',
      hideColumn: window.innerWidth <= SMALL_SIZE,
      isSmall: window.innerWidth <= SMALL_SIZE,
      doughnut_reports: [],
      canvas: null,
      weChatAlert: false,
      linkLanguage: 'en',
      campaign: '',
      fields: {},
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.notify = this.notify.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage = () => {
    window.open(`https://web.whatsapp.com/send?phone=&text=${this.state.url}`)
  };

  sendWechatMessage = () => {
    window.open('https://web.wechat.com/')
    this.closeWeChatAlert()
  };

  openWeChatAlert = () => {
    this.setState({ weChatAlert: true })
  };

  closeWeChatAlert = () => {
    this.setState({ weChatAlert: false })
  };

  notify = () => {
    this.setState({
      isCopied: 'Link Copied!'
    })
    setTimeout(function () {
      this.setState({ isCopied: '' })
    }.bind(this), 3000)
  };

  handleSubmit (id) {
    window.open(`${config.url}/api/v1/report/${id}/`)
  }

  generateTestLink = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('Token')
    axios.post(`${config.url}/api/v1/sponsor/tests/generate-link`,
      {
        credits: this.state.credits,
        language: this.state.linkLanguage,
        campaign: this.state.campaign
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    ).then(res => {
      clipboard.writeText(`${config.url}/credit/${res.data.uuid}/test`)
        .then(() => { this.copyTestUrl() })
      this.setState({ testUrl: `${config.url}/credit/${res.data.uuid}/test`, credits: null })
    }).catch(error => {
      console.log(error)
    })
  };

  copyTestUrl = () => {
    this.setState({ testUrlCopied: 'Link Copied!' })
    setTimeout(function () {
      this.setState({ testUrlCopied: '' })
    }.bind(this), 3000)
  };

  handleResize = () => {
    if (window.innerWidth <= SMALL_SIZE && !this.state.isSmall) {
      this.setState({ hideColumn: true, isSmall: true })
    }
    if (window.innerWidth > SMALL_SIZE) {
      this.setState({ hideColumn: false, isSmall: false })
    }
  };

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    const accessToken = localStorage.getItem('Token')

    axios.get(`${config.url}/api/v1/sponsor/credits`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      this.setState({ remainingCredits: res.data.credits })
    }).catch(error => {
      console.log(error)
    })

    axios.get(`${config.url}/api/v1/sponsor/details`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      const sponsor = res.data.payload
      this.setState({
        fullName: sponsor.fullName
      })
    }).catch(error => {
      console.log(error)
    })

    axios.get(`${config.url}/api/v1/sponsor/reports?limit=5`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        this.setState({
          reports: res.data.payload

        })
      })
      .catch(err => {
        console.log(err)
      })

    axios.get(`${config.url}/api/v1/sponsor/reports/breakdown`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        this.setState({
          doughnut_reports: res.data

        })
      })
      .catch(err => {
        console.log(err)
      })

    axios.get(`${config.url}/api/v1/sponsor/reports/total`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        this.setState({
          total: res.data.count
        })
      })
      .catch(err => {
        console.log(err)
      })

    axios.get(`${config.url}/api/v1/sponsor/validate-token`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => {
        this.setState({
          url: `${config.url}/${res.data.sponsor.id}/test`
        })
      }).catch(error => {
        console.log(error)
      })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  render () {
    const numAbbr = new NumAbbr()
    const chartColors = {
      red: 'rgb(233, 30, 99)',
      danger: 'rgb(233, 30, 99)',
      dangerTransparent: 'rgba(233, 30, 99, .8)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 180, 0)',
      green: 'rgb(34, 182, 110)',
      blue: 'rgb(68, 159, 238)',
      primary: 'rgb(68, 159, 238)',
      primaryTransparent: 'rgba(68, 159, 238, .8)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',

      primaryShade1: 'rgb(68, 159, 238)',
      primaryShade2: 'rgb(23, 139, 234)',
      primaryShade3: 'rgb(14, 117, 202)',
      primaryShade4: 'rgb(9, 85, 148)',
      primaryShade5: 'rgb(12, 70, 117)'
    }
    var data = [0, 0, 0, 0, 0]
    if (this.state.doughnut_reports) {
      data[0] = this.state.doughnut_reports.Adventurer
      data[1] = this.state.doughnut_reports.Nester
      data[2] = this.state.doughnut_reports.Manager
      data[3] = this.state.doughnut_reports.Influencer
      data[4] = this.state.doughnut_reports.Hunter
    }
    const donutData = {
      labels: ['Adventurer', 'Nester', 'Manager', 'Influencer', 'Hunter'],
      datasets: [
        {
          data: data,
          backgroundColor: [
            chartColors.primaryShade1,
            chartColors.primaryShade2,
            chartColors.primaryShade3,
            chartColors.primaryShade4,
            chartColors.primaryShade5
          ],
          hoverBackgroundColor: [
            chartColors.primaryShade4,
            chartColors.primaryShade4,
            chartColors.primaryShade4,
            chartColors.primaryShade4,
            chartColors.primaryShade4
          ]
        }
      ]
    }
    const Tests = () => {
      if (this.state.reports) {
        return (
          this.state.reports.map((item) => {
            return item.tests.map((row, idx) =>
              <tr key={idx}>
                {idx > 0 || <td rowSpan={item.tests.length}>{item.user.name}</td>}
                {idx > 0 || <td rowSpan={item.tests.length}>{item.user.email}</td>}
                {idx > 0 || <td rowSpan={item.tests.length}>{item.user.handphoneNumber}</td>}
                {this.state.hideColumn ? '' : idx > 0 || <td rowSpan={item.tests.length}>{item.user.age}</td>}
                {this.state.hideColumn ? '' : idx > 0 || <td rowSpan={item.tests.length}>{item.user.income}</td>}
                <td>{row.type}</td>
                <td>{moment(row.created_at).format('YYYY-MM-DD HH:mm')}</td>
                <td><Button size="xs" onClick={() => {
                  this.handleSubmit(row.id)
                }}><span className="responsive">Download Report</span></Button></td>
              </tr>
            )
          }
          ))
      } else return (<div></div>)
    }

    const TestURL = () => {
      if (this.state.testUrl !== '') {
        return (
          <div>
            <Row>
              <Col xs={12}>
                <CopyToClipboard text={this.state.testUrl}>
                  <p
                    title="Click to Copy the Link"
                    onClick={this.copyTestUrl}
                    style={{ marginTop: '10px', cursor: 'pointer' }}
                  >
                    Test url: <span className="text-primary">{this.state.testUrl}</span>
                    <span className="text-success pt-2 ml-4">{this.state.testUrlCopied}</span>
                  </p>
                </CopyToClipboard>
              </Col>
            </Row>
          </div>
        )
      } else {
        return <div></div>
      }
    }

    return (
      <div>
        <div className="m-b">
          <Row className="justify-content-left">
            <Col xs={{ size: 12 }}>
              <h2 className="responsive-header">Hello there {this.state.fullName} !</h2>
            </Col>
          </Row>
        </div>
        <Row className="justify-content-left">
          <Col xs={{ size: 12 }} lg={{ size: 7 }}>
            <Row>
              <Col xs={12} md={6} xl={12}>
                <Card>
                  <CardHeader>
                    <span className="responsive">Credits Remaining{' '}</span>

                  </CardHeader>
                  <CardBody>
                    <h2 className="m-b-20 inline-block">
                      <span className="responsive-header">
                        {numAbbr.abbreviate(this.state.remainingCredits, 2)}
                      </span>
                    </h2>{' '}
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={6} xl={12}>
                <Card>
                  <CardHeader>
                    <span className="responsive">Total Tests Taken{' '}</span>
                    <Button size="sm" className="pull-right" tag={Link} to="/sponsor/reports">
                      <span className="responsive">View</span>
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <h2 className="m-b-20 inline-block">
                      <span className="responsive-header">{numAbbr.abbreviate(this.state.total, 2)}</span>
                    </h2>{' '}
                    {/* <i className="fa fa-caret-up text-danger" aria-hidden="true" /> */}
                    {/* <Progress value={77} color="success" /> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} xl={12}>
                <Card>
                  <CardHeader>
                    <span className="responsive">Generate Test{' '}</span>
                    <Button size="sm" className="pull-right" tag={Link} to="/sponsor/generated-tests">
                      <span className="responsive">View All</span>
                    </Button>
                  </CardHeader>
                   <form onSubmit= {this.generateTestLink} >
                  <CardBody>
                    <Row>
                      <Col xl={9} xs={12} pb={3}>
                        <div className="form-group">
                          <label className="pl-0">Campaign Name:</label>
                          <input className="form-control" placeholder="E.g. Referral by John Doe, Webinar on xxxxxx (date)" maxlength="30" value={this.state.fields["campaign"]} name="Campaign" onChange={(e) => this.setState({ campaign: e.target.value })} />
                        </div>

                      </Col>
                      <Col xl={9} xs={12} pb={3}>
                        <Input
                          type="number"
                          value={this.state.credits}
                          onChange={e => this.setState({ credits: parseInt(e.target.value) })}
                          placeholder="Number of Credits"
                        />
                      </Col>

                      <Col xl={3} xs={12}>
                        <Form.Control as="select" value={this.state.linkLanguage}
                          onChange={e => this.setState({ linkLanguage: e.target.value })} >
                          <option value="en">English</option>

                        </Form.Control>
                      </Col>
                      <Col md='auto' xs={12}>
                        <Button type="submit" className="mt-2" size="md" color="primary">
                          <span className="responsive">Generate</span>
                        </Button>
                      </Col>
                    </Row>
                    <TestURL />
                  </CardBody>
                  </form>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={12} lg={5}>
            <Card>
              <CardHeader><span className="responsive">Profile Breakdown</span></CardHeader>
              <CardBody>
                <Doughnut
                  data={donutData}
                  width={908}
                  height={768}
                  legend={{ display: false }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs={6}>Recent Tests</Col>
                  <Col xs={6}>
                    <Link to='/sponsor/reports'><Button size="sm" className="pull-right" color="primary"><span className="responsive">See All</span></Button></Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={{ overflowX: 'auto' }}>
                <Table className="responsive-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      {this.state.hideColumn || <th>Age Range</th>}
                      {this.state.hideColumn || <th>Income</th>}
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
    )
  }
}
