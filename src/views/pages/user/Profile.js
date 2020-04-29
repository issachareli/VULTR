import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import axios from 'axios';
import config from '../../../config/env';

class Profile extends React.Component {
  state = {
    name: '',
    picture: null,
    age: '',
    handphoneNumber: '',
    income: '',
    currentPassword: '',
    confirmPassword: '',
    password: '',
    currentPasswordMessage: '',
    isNewPasswordConfirmed: false,
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  };

  changeDetails = (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem('Token');
    axios.post(`${config.url}/api/v1/user/details`, 
      {
        name: this.state.name,
        age: this.state.age,
        handphone_number: this.state.handphoneNumber,
        income: this.state.income
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    ).then(res => {
      if (res.data.success) {
        alert('Details updated');
        this.getDetails();
      }
    }).catch(err => {
      console.log(err);
    });
  };

  confirmPassword = () => {
    if (this.state.password !== "" && this.state.password === this.state.confirmPassword) {
      this.setState({ isNewPasswordConfirmed: true });
      document.querySelector('#changePassword').removeAttribute("disabled");
    } else {
      this.setState({ isNewPasswordConfirmed: false });
      document.querySelector('#changePassword').setAttribute("disabled", true);
    }
  };

  changePassword = (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem('Token');
    axios.post(`${config.url}/api/v1/user/change-password`, 
      {
        currentPassword: this.state.currentPassword,
        password: this.state.password
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    ).then(res => {
      if (!res.data.currentPasswordSuccess) {
        this.setState({ password: '', confirmPassword: '', currentPasswordMessage: 'Wrong Password!'});
        setTimeout(() => {
          this.setState({currentPasswordMessage: ''});
        }, 2000);
        return;
      }
      if (res.data.success) {
        this.setState({ password: '', currentPassword: '', confirmPassword: ''});
        alert('Password Changed Successfully');
      } else { 
        console.log('Password did not changed!');
      }
    }).catch(err => {
      console.log(err);
    });
  };

  getDetails = () => {
    let accessToken = localStorage.getItem('Token');
    axios.get(`${config.url}/api/v1/user/details`, { headers: { Authorization: `Bearer ${accessToken}` }}
    ).then(res => {
      if (res.data.success) {
        const user = res.data.payload;
        this.setState({
          name: user.name,
          age: user.age,
          handphoneNumber: user.handphoneNumber,
          income: user.income,
        });
      }
    }).catch(err => {
      console.log(err);
    });
  };

  componentDidMount() {
    document.querySelector('#changePassword').setAttribute("disabled", true);
    this.getDetails();
  }

  render() {
    return(
      <div className="container">
      <Row>
        <Col xs={12} md={4} lg={4} xl={4} className="mt-4">
          <Row>
            <Col xs={12} className="d-flex justify-content-center">
              <img style={{borderRadius: '50%', width: '200px', height: '200px'}} src={this.state.picture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEXp6ekyicju7Orv7eosh8cjhMcbgsbz7+vm6OnS3eVqo9GlwNpZm86FsdWtx923zd/D1OE6jcnd4+ePttdhn8/K2eO0y95Hk8va4eaWuth7q9PG1uKCr9VHkst2qdJTmM2pw9zjWxOzAAAHyElEQVR4nO2d25aqMAyGIU05iXLwBKLi+z/lLqgz6lbk0KbtLL6bvfZcjP6T0KYhTRxnZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZsYyAIABaxH/iP/p/kIyAeYHYborl+foynG9SKpCKP4LMoWxtrtjnLmcc/yh+U+2j8o0t1wl+HlyOGErzX2lFerGZSVsqfuLjgSC3cblb7Q9yRTGXG9t1Aj+9vhN3l0l5/UqsEwjsHTTT95dJC5zpvtb9wcg2Xv95d0NucxtsSNU8VB9LZyvrfBVyM+j9LUas5X5mwesXD5SnwC9TWi2RCg2ow1404gL3SK6gJ07TV+DFxm84qwnGvBmxiw1c+OAYDPhCXySyBcmWhHCkwwDXvGW5klkqYRH8Bce6Rb0CiQDYrR+EgPdmp6ARKoFW4mxSRKZfIFmOSpsFQgUEs+mLDdQSFxFnySasqIGsRqBQqIZ+yKcJW30/4OYGiCRLZQJbAK4XLc+scpI3ghfJOpfUIO9SoEGPIqwVOijDYh6j8RQKRYoJG50CnScWq2PNvCVRiPCxVMuUKynGgPUPFNvQmHEtTYjQqn8KWxALHQpzJVuhb9oi0+JTKjRiIGSM9M7ND2JoDIgfQZdLcspKI7XHuEXDUaElGAvvIO1hhwxO9CZ0HW9rQYjkj2FDRrWGkhIFWLmkys8UzqpDjf1aQW6vCRWCBXhStqANbGbEm73NzxagQ7bEHupyxNaN/WJjhUPCokfxJDaSV2MSMMa4t2wVeiSLjVkR8MHOGn6m3q/bxVWlA8iU/a6qUPhjlKhT5Jke1FIm9+nFyiOF5SLaa5BIR4obRjqUBhRKtxqUUjppVoUkuZqZoVKFO7/vML4zyskXUuLP69Qx47Pl5ReSn/Epz7k+4RvZX4UklYssEiDQtIaN6a6UOidwpBQoAMrDQpJj4eQ0meiiJPeAb3CI+1LUl9R4fNnqIu/2JJaoUe60DS31IjdFF3qN/kB9ds18qsJPkHd5SO02dIG6rw+p68ZKkjdlPbodIWRBt86CoVp33MjuT6HNqzBo47iRMqyLy1FX46zJVtrcKOnSBjIjsEecR3Gj0Kq+kuMdRXrA1FRDXUpzYNC9XeCGjDWpM+hKligTUG9EBLkTfVeeCaIv9HVdmOmJVB+iNJ9xRJSxX6q+/qhcj/FzICuSko3Ra3XK29AobA+yoyuCgofRdyY0d9E2VkYT6b0xGJrJRLRNWCVuaGkNYYZTTHuQCRdInKzeppJl4j6jkwfkOyoyCujLNjgy3zxja6e1FM3/oXL2hf5qTBQYNOUTk50gzwytVMrFLEET0Wkvog3iPXkCI7vSe9VDAbSetLTiGh8v2QIyvGtFpDXZm3z72HheZyrIs8Wpi4xzwA07cpH6Fub7qC/gJNEQ1qyX/UVFjjoL+BUB7evIRG9emGP/e4AFIvY+y4SkbuH1I7n7z/ACcuYd7irUOdl51VgfiP2z4CTr44199oBJU/akHPPjcrKanlXhIKguqyj2vV+4Fl8Lneh83cG6kCDiFvDK8HtB1ZgydccC0CwUv0RgcYZNCJ2OXterHQjYyse7zQ5CsCubgYFoJsoi0UgOHgiHNASrt71tQHXUtEXgGrPr5/gltQaIX0cJaPm0ApO+RMRibD1QumrUJyfozEVZoSqfkyJiNCVLAUOzuX/UTL8JHc9YPnxNaRFfqCJziGM3oXT6G3kuSoEi+xNTotnFHlwWH1KUoi/sZx3ReJ0uX9/JlG3qP1+ePCf8zz+jXEZTt6fhb7482fwWm0yHMLuhChyPGwnxZssWHXoaz4iU1m0D9+T2uJUtEmCkSEAQFievp2ZUeFdUlj1HPZ3Wo8wpIhxk6hX4oMfVKhz2tf1ffMuHOtFOGT+JjAnPZ76Jq8UzaCBQS/rG5Fl6vRRCcwvducMByQgeaxgSR1ejdDM34wWaeB/POs2A3RZmKzrnsMuH373XvrrN39UuUUzZRT3h0USBn47CPgOE4ZjebVbR8J2Q+W1v/kkufPXOIE3le1sXLeOjsvFjXJ53pyuPx/7jkNy4bC/mFyzfpsCfOPt+Nxh8Fqin7IV8WXDXnB5PYdIuz4PgB8l3e6GQkMTjF54ksqHVU+SmYAn5VDM5Bd0SUNKlTvT0OWyP1hPFqi8Un0i04uIc3MfwitT73grnKkmCcwmPYpMQ5OWoUy75a2yDF8aUy7VmO+jDZiN7glC3t1jJOMvtxm/jt4Zu54qumOgADyNytsAxe1JSYybYEJ3F306o4YkaugrP4FR/XmIO+xMZHjDdjAycfGZEYkpW3aKO0MbS9hmwhFGtM2EQ41onwmHGhHIewZKYIgRIbHPhMPa9OiYzyGB/q2WgK49klT6j4dgGobISKH3rJ3cpoj0kb41DPQj1WSBWT+FzMat4kq/DUNDE2Rp9BtjAqQTVCXj9Vpr7Ele/E+f3KktKcT34P77a2EdHfMl0qM1fWC1wB5bot1O2sdNrY3Y7nx3UxveNnXxbTWF1HKB4pTY7abDSixNBN3udxjMrjzwO7507inG90Mwhe5BkHa9rHhP9wA6e14Zfqa7TsrSFNQznS1rc9t3w4auwA2qPyCw8xisY4qTfPD02Ybs+Cds6H4OTRlRB3LFdPRbNLgaeAj88lGhFWVs3+kYBaljuqgCXhbTfwt5jqa5kvl2AAAAAElFTkSuQmCC'} alt={'user'} />
            </Col>
          </Row>
          {/* <Row>
            <Col xs={12} className="d-flex justify-content-center mt-3">
              <Button size="sm" color="success">Change Profile Picture&nbsp;&nbsp;<i className="fa fa-edit"></i></Button>
            </Col>
          </Row> */}
        </Col>

        <Col xs={12} md={8} lg={8} xl={8} className="mt-4 d-flex justify-content-center">
          <Row>
            <Col xs={12}>
              <form className="form col-md-12 col-lg-9 col-xl-12">
                <Card>
                  <CardHeader>
                    <h4>Profile Information</h4>
                  </CardHeader>
                  <CardBody>
                    <div className="form-group">
                      <label htmlFor="name" className="pl-0">Full Name: </label>
                      <input id="name" className="form-control" value={this.state.name} name="name" onChange={e => this.handleOnChange(e)} required/>  
                    </div>
                    <div className="form-group">
                      <label htmlFor="age" className="pl-0">Age: </label>
                      <select id="age" className="form-control" name="age" value={this.state.age} onChange={e => this.handleOnChange(e)}>
                        <option value="<15">&lt;15</option>
                        <option value="16-18">16-18</option>
                        <option value="19-24">19-24</option>
                        <option value="25-29">25-29</option>
                        <option value="30-39">30-39</option>
                        <option value="40-49">40-49</option>
                        <option value="50-59">50-59</option>
                        <option value="60-69">60-69</option>
                        <option value=">70">&gt;70</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label id="income" htmlFor="income" className="pl-0">Monthly Income: </label>
                      <select className="form-control" name="income" value={this.state.income} onChange={e => this.handleOnChange(e)}>
                        <option value="<1,999">&lt;1,999</option>
                        <option value="2,000-3,000">2,000-3,000</option>
                        <option value="4,000-5,000">4,000-5,000</option>
                        <option value="5,000-10,000">5,000-10,000</option>
                        <option value="10,000-20,000">10,000-20,000</option>
                      </select>       
                    </div>
                    <div className="form-group">
                      <label htmlFor="handphoneNumber" className="pl-0">Phone No: </label>
                      <input id="handphoneNumber" className="form-control" value={this.state.handphoneNumber} name="handphoneNumber" onChange={e => this.handleOnChange(e)} required/>       
                    </div>
                    <div className="form-group mt-4">
                      <Button type="submit" size="md" color="success" className="col-12 col-md-4" onClick={e => this.changeDetails(e)}>Update</Button>
                    </div>
                  </CardBody>
                </Card>
              </form>
            </Col>
            <Col xs={12}>
              <form className="form col-md-12 col-lg-9 col-xl-12">
                <Card>
                  <CardHeader>
                    <h4>Change Password</h4>
                  </CardHeader>
                  <CardBody className="mt-3">
                    <div className="form-group">
                      <label htmlFor="currentPassword" className="pl-0">Current Password: </label>
                      <input id="currentPassword" type="password" className="form-control" value={this.state.currentPassword} name="currentPassword" onChange={e => this.handleOnChange(e)} required/>  
                      <div className="text-danger small">{this.state.currentPasswordMessage}</div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="pl-0">New Password: </label>
                      <input id="password" type="password" minLength="6" className="form-control" value={this.state.password} name="password" onChange={ async e => { await this.handleOnChange(e); this.confirmPassword(); }} required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="pl-0">Confirm Password: </label>
                      <input id="confirmPassword" type="password" className="form-control" minLength="6" value={this.state.confirmPassword} name="confirmPassword" onChange={ async e => { await this.handleOnChange(e); this.confirmPassword(); }} required/>       
                      <div className="text-danger small">{ !this.state.isNewPasswordConfirmed && this.state.confirmPassword ? "Password do not match!!" : ""}</div>
                    </div>
                    <div className="form-group mt-4">
                      <Button id="changePassword" type="submit" color="success" size="md" className="col-12 col-md-5" onClick={e => this.changePassword(e)}>Change Password</Button>
                    </div>
                  </CardBody>
                </Card>
              </form>
            </Col>
          </Row>
        </Col>
      </Row>
      </div>
    );
  }
}

export default Profile;