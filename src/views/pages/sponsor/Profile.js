import React, { useState, useEffect, Component } from 'react';
import {
  Row, Col, Card, CardHeader, CardBody, Button, Input, TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import axios from 'axios';
import config from '../../../config/env';
import classnames from 'classnames';


const PImageUpload = function ({ picture, handlePictureChange }) {
  const [p, setP] = useState(picture);
  const [image, setImage] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(picture);

  const handleImageChange = function (e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setImagePreviewUrl(picture);
    setP(picture);
  }, [picture]);

  const handleUpload = function () {
    const formData = new FormData();
    formData.append('picture', image, image.name);
    setImage('');
    axios.post(`${config.url}/api/v1/sponsor/details`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } })
      .then((res) => {
        if (res.data.success) {
          handlePictureChange(imagePreviewUrl);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = function () {
    setImagePreviewUrl(p);
    setImage('');
  };

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex justify-content-center">
          <img width="800px" height="800px" className="mb-3" src={imagePreviewUrl || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHERAQEhMPEhMQFQ8SFRASEA8PFRUVFREWFhYVExMYHSggGBwmGxYfITEiJSk3Li4uFx8zODMsOCgtMCsBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcBBAUCA//EAD0QAAIBAQMIBQkHBQEAAAAAAAABAgMEBREGITFBUWFxgRIicpGhBxMUIzJCUrHBFTNigpLC0UNTg6KyRP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZSxPnOtGnplFcZJfMD2D5xrwnmUoPhKLPqBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIflJld5nGlZ2nJZpVszS3Q2vfo4gSC9b6o3UvWTXSeinHrTf5dS3vMRC8ct6tbFUYxpr4pYTl/CIvUqOq3KTcm87k22297PIG3arzr2v7yrVluc3h+lZjTwWxGQBjBbEbNmt9Wyfd1KkOzOSXdoNcASW78tK9nwVRRqrelCX6lm70S66MoaF64RjLoz/tz6svy6pcirAnhyAukEEycyvdFqlaW5R0KtplHt7Vv08SdRkppNNNNYprOmtTTAyAAAAAAAAAAAAAAAAAAAAAAHJynvb7JoOS+8n1ILfrlyWfuA4WWmULh0rLSefRVmn/AKJ/Pu2kJEm5Nt4tvO287b2sAAAAAAAAAAAAJRkflC7FJUKr9VJ9WT/pyf7X4EXMAXUCN5E3v6fS81N41KKSxemUNEXy0dxJAAAAAAAAAAAAAAAAAAAAFa5a3h6baZRT6tH1a7XvvvzflLFtVZWaE6j0QjKXcsSnJzdRuTzuTbb3t4sDAAAAAAAAAAAAAAAAOjk/eH2baKdTHq49GfYlmfdp5FsFLFsZO2r0yzUJvO3BJ8Y9V+KA6IAAAAAAAAAAAAAAAAAA5WVVTzdjtD2x6P6pJfUqstHLBY2Ovwg/94lXAAAAAAAAAAAAAAAAACxsganTsmHw1Ki78H9SuSwvJ9HCzTe2rL/mIEnAAAAAAAAAAAAAAAAAAGjflH0mzV4a3TnhxSxXiioy6sMSor4sf2fXq0vgk8Oy88fBoDTAAAAAAAAAAAAAAAALNyLo+ZsdL8bnPvk8PBIrWjSdeUYRzym1FLe3gi4bLQVlhCmtEIxiuSwA+oAAAAAAAAAAAAAAAAAAEN8oF2dJQtMV7OEKnDHqy73hzRMjxXoxtEZQksYzTi1tTApkHRv26pXRVdN4uLzwn8Uf52nOAAAAAAAAAAAAAbN3WGd41I0oLGUnyS1ye5ASDIK7PSKrryXVo5o75tfRZ+aLANW7LDG7aUKUNEVp1yeuT3tm0AAAAAAAAAAAAAAAAAAAAAAaV8XXC96bpz4xmtMZbV/GsrC9rrqXVNwqLsyXsyW2L+motw17dYqd4QdOpFSi9ulPanqYFPAk985HVbK3KjjVh8P9Rcve5Z9xGZwcG0001pTTTXFMDAAAAAAAjv3PknXvDCU06NP4pLrNfhh/IHHsNjnb5qnTi5SlqWpbW9S3lmZPXHC5oYZpVJYdOpt/DHYkbN1XVSuqHQpxwx9qTzyk9smboAAAAAAAAAAAAAAAAAAAAA3gAPFetGzpynKMYr3pNRXeyL37ljCzY07PhUmszqPPBcPifhxITbrdVt8ulVnKb3vMuEdC5AXBCSmk0000mmnimnrTMlXXFlFVujqrr09dOT0b4P3X4E/ui/KF7L1csJa6UurNcta3oDpGpbrso3gvW04T3tdZcJLObYAi9qyHoVPYnVp7urUXjg/E588gpaq8edJr5SJwAINHIKeuvDlSk/3G9ZshaMPbq1Z7oqNNfVkrAGhYLms93/d04p/E+tL9Tzm+AABp3lelG7I9KrNR2R0ylwjpZA7+yqq3ljCGNKk9SfWkvxS2bl4gWNSqKqsYtSW2LTXej0U/YLwq3dLpUpyg92h9qLzPmTe4ssYWtqnXSpzeZTXsSe/H2X4ASkAAAAAAAAAAAAAAAHmpUVJOUmkopttvBJLS2yvMp8p5Xk3SpNxo6G9Dqcdkd3ee8scoPTpOhSfqoPrSXvyX7V46dhGAAAACL6LTWKazprM1wAA7925XWmxYKTVaK1VMelyms/fiSOx5b2et95GpSfDzke+OfwK9AFs0L8s1o9mvR4OcYPulgbsa8Z6JQfCUWUyYwQFzurGOmUVxkkate+LPZ/ar0Vu85FvuTxKi6K3GQLGteWdmoex5yq/wxcV3ywI7eOWde1Yqmo0YvXHrT/U9HJEbAHqrUdZuUm5SemUm5N8WzyAAAAEmyYyold7VKs3KloUtLp8Nsd2rUWFCaqJNNNNJpp4pp6GmUuSnI3KD0OSs9V+rk+pJ+5JvQ38L8GBYAAAAAAAAAAAEZy2vr0Gn5iDwqVVna92Gh83o7yQ2q0RssJ1JPCME5N7kipLytsrwqzqz0zeOGxaorgswGqZAAAAAAAAAAAAAAAAAAAAAAAAAAsTIu+vT6fmZvGpSSwb0yhoT4rQ+RJSoLst0rtqwqx0weOHxLXF8UW3Zq8bVCNSLxjNKSe5rED6AAAAAAAAh/lBvHzcYWeLzz68+ynhFc3i/ykGN+/7d9o2irU1OTUezHMvljzNAAAAAAAAAAAAAAAAAAAAAAAAAAAABO/J/ePnITs7een14dlvrLk/+iCHQyft32daKVTUpdGXZlml88eQFsgAAAABzsorX6FZq01mfRcVxl1V8zokV8odfoUKcPjqYvhGL+rQFfmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAGDIAtjJ61+m2ajN6eiovjHqv5HRIt5Pa/ToVIf26mPKUV9UyUgAAAIZ5R9Fm41flAACEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmvk4/9P8Ah/eTQAAAAP/Z'} />
        </div>
      </Col>
    </Row>
  );
};



const PImageUploadOne = function({galleryOne, handlegalleryOneChange}) {
  const [p, setP] = useState(galleryOne);
  const [image, setImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(galleryOne);

  const handleImageChangeOne = function(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      setImage(e.target.files[0]);
      reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
  };

  useEffect(() => {
    setImagePreviewUrl(galleryOne);
    setP(galleryOne);
  }, [galleryOne]);

  const handleUpload = function() {
    let formData = new FormData();
    formData.append('galleryOne', image, image.name);
    setImage("");
    axios.post(`${config.url}/api/v1/sponsor/details`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } })
    .then(res => {
      if (res.data.success) {
        handlegalleryOneChange(imagePreviewUrl);
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  const handleCancel = function() {
    setImagePreviewUrl(p);
    setImage("");
  };

  return (
      <Row>
          <Col xs={12}>
              <div className="d-flex justify-content-center">
                  <img width="932px" height="517px" className="mb-3" src={imagePreviewUrl || 'data:image/jpeg;base64,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'} />
              </div>
          </Col>
      </Row>
  );
};



const PImageUploadTwo = function({galleryTwo, handlegalleryTwoChange}) {
  const [p, setP] = useState(galleryTwo);
  const [image, setImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(galleryTwo);

  const handleImageChangeTwo = function(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      setImage(e.target.files[0]);
      reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
  };

  useEffect(() => {
    setImagePreviewUrl(galleryTwo);
    setP(galleryTwo);
  }, [galleryTwo]);

  const handleUpload = function() {
    let formData = new FormData();
    formData.append('galleryTwo', image, image.name);
    setImage("");
    axios.post(`${config.url}/api/v1/sponsor/details`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } })
    .then(res => {
      if (res.data.success) {
        handlegalleryTwoChange(imagePreviewUrl);
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  const handleCancel = function() {
    setImagePreviewUrl(p);
    setImage("");
  };

  return (
      <Row>
          <Col xs={12}>
              <div className="d-flex justify-content-center">
                  <img width="932px" height="517px" className="mb-3" src={imagePreviewUrl || 'data:image/jpeg;base64,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'} />
              </div>
          </Col>
      </Row>
  );
};






const ImageUpload = function ({ picture, handlePictureChange }) {
  const [p, setP] = useState(picture);
  const [image, setImage] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(picture);

  const handleImageChange = function (e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setImagePreviewUrl(picture);
    setP(picture);
  }, [picture]);

  const handleUpload = function () {
    const formData = new FormData();
    formData.append('picture', image, image.name);
    setImage('');
    axios.post(`${config.url}/api/v1/sponsor/details`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } })
      .then((res) => {
        if (res.data.success) {
          handlePictureChange(imagePreviewUrl);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = function () {
    setImagePreviewUrl(p);
    setImage('');
  };

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex justify-content-center">
          <img width="200px" height="200px" className="mb-3" style={{ borderRadius: '50%' }} src={imagePreviewUrl || 'data:image/jpeg;base64,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'} />
        </div>
      </Col>
      <Col xs={12} className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
        {image === '' ? (
          <>
            <Input className="input-file" type="file" name="file" id="input-file-label-idOne" onChange={handleImageChange} />
            <label className="input-file-label" htmlFor="input-file-label-idOne">Change Picture</label>
          </>
        ) : (
          <>
            <Button size="sm" color="success" className="mb-3" style={{ width: '200px' }} color="success" onClick={handleUpload}>Upload</Button>
            <Button size="sm" color="secondary" style={{ width: '200px' }} onClick={handleCancel}>Cancel</Button>
          </>
        )}
      </Col>
    </Row>
  );
};




const ImageUploadOne = function({galleryOne, handlegalleryOneChange}) {
  const [p, setP] = useState(galleryOne);
  const [image, setImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(galleryOne);

  const handleImageChangeOne = function(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      setImage(e.target.files[0]);
      reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
  };

  useEffect(() => {
    setImagePreviewUrl(galleryOne);
    setP(galleryOne);
  }, [galleryOne]);

  const handleUpload = function() {
    let formData = new FormData();
    formData.append('galleryOne', image, image.name);
    setImage("");
    axios.post(`${config.url}/api/v1/sponsor/details`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } })
    .then(res => {
      if (res.data.success) {
        handlegalleryOneChange(imagePreviewUrl);
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  const handleCancel = function() {
    setImagePreviewUrl(p);
    setImage("");
  };

  return (
    
      <div class="col-xs-6">
          <Col xs={12}>
              <div className="d-flex justify-content-center">
                  <img width="200px" height="108px" className="mb-3" src={imagePreviewUrl || 'data:image/jpeg;base64,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'} />
              </div>
          </Col>
          <Col xs={12} className="d-flex justify-content-center align-items-center" style={{flexDirection: 'column'}}>
              {image === "" ? (
                <React.Fragment>
                  <Input className="input-file" type="file" name="fileOne" id="input-file-label-id" onChange={handleImageChangeOne} />
                  <label className="input-file-label" htmlFor="input-file-label-id">Upload Photo #1</label>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button size="sm" color="success" className="mb-3" style={{width: "200px"}} color="success" onClick={handleUpload}>Upload</Button> 
                  <Button size="sm" color="secondary" style={{width: "200px"}} onClick={handleCancel}>Cancel</Button> 
                </React.Fragment>
              )}
          </Col>
      </div>
  );
}



const ImageUploadTwo = function({galleryTwo, handlegalleryTwoChange}) {
  const [p, setP] = useState(galleryTwo);
  const [image, setImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(galleryTwo);

  const handleImageChangeTwo = function(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      setImage(e.target.files[0]);
      reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
  };

  useEffect(() => {
    setImagePreviewUrl(galleryTwo);
    setP(galleryTwo);
  }, [galleryTwo]);

  const handleUpload = function() {
    let formData = new FormData();
    formData.append('galleryTwo', image, image.name);
    setImage("");
    axios.post(`${config.url}/api/v1/sponsor/details`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } })
    .then(res => {
      if (res.data.success) {
        handlegalleryTwoChange(imagePreviewUrl);
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  const handleCancel = function() {
    setImagePreviewUrl(p);
    setImage("");
  };

  return (
       <div class="col-xs-6">
          <Col xs={12}>
              <div className="d-flex justify-content-center">
                  <img width="200px" height="108px" className="mb-3" src={imagePreviewUrl || 'data:image/jpeg;base64,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'} />
              </div>
          </Col>
          <Col xs={12} className="d-flex justify-content-center align-items-center" style={{flexDirection: 'column'}}>
              {image === "" ? (
                <React.Fragment>
                  <Input className="input-file" type="file" name="fileTwo" id="input-file-label-idTwo" onChange={handleImageChangeTwo} />
                  <label className="input-file-label" htmlFor="input-file-label-idTwo">Upload Photo #2</label>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button size="sm" color="success" className="mb-3" style={{width: "200px"}} color="success" onClick={handleUpload}>Upload</Button> 
                  <Button size="sm" color="secondary" style={{width: "200px"}} onClick={handleCancel}>Cancel</Button> 
                </React.Fragment>
              )}
          </Col>
      </div>
  );
}



class Profile extends React.Component {
  state = {
    fullName: '',
    picture: '',
    galleryOne: '',
    galleryTwo: '',
    qualification: '',
    title: '',
    company: '',
    downloadLink: '',
    handphoneNumber: '',
    profileLink: '',
    telegram: '',
    reviewOne: '',
    reviewTwo: '',
    currentPassword: '',
    confirmPassword: '',
    password: '',
    email: '',
    currentPasswordMessage: '',
    isNewPasswordConfirmed: false,
    activeTab: '1',
  };

toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeDetails = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('Token');
    axios.post(`${config.url}/api/v1/sponsor/details`,
      {
        name: this.state.fullName,
        qualification: this.state.qualification,
        title: this.state.title,
        company: this.state.company,
        handphone_number: this.state.handphoneNumber,
        profile_link: this.state.profileLink,
        reviewOne: this.state.reviewOne,
        reviewTwo: this.state.reviewTwo,
        downloadLink: this.state.downloadLink,
        telegram: this.state.telegram,
      
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => {
      if (res.data.success) {
        alert('Details updated');
        this.getDetails();
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  confirmPassword = () => {
    if (this.state.password !== '' && this.state.password === this.state.confirmPassword) {
      this.setState({ isNewPasswordConfirmed: true });
      document.querySelector('#changePassword').removeAttribute('disabled');
    } else {
      this.setState({ isNewPasswordConfirmed: false });
      document.querySelector('#changePassword').setAttribute('disabled', true);
    }
  };

  changePassword = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('Token');
    axios.post(`${config.url}/api/v1/sponsor/change-password`,
      {
        currentPassword: this.state.currentPassword,
        password: this.state.password,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => {
      if (!res.data.currentPasswordSuccess) {
        this.setState({ password: '', confirmPassword: '', currentPasswordMessage: 'Wrong Password!' });
        setTimeout(() => {
          this.setState({ currentPasswordMessage: '' });
        }, 2000);
        return;
      }
      if (res.data.success) {
        this.setState({ password: '', currentPassword: '', confirmPassword: '' });
        alert('Password Changed Successfully');
      } else {
        console.log('Password did not changed!');
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  getDetails = () => {
    const accessToken = localStorage.getItem('Token');
    axios.get(`${config.url}/api/v1/sponsor/details`, { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => {
      if (res.data.success) {
        const sponsor = res.data.payload;
        this.setState({
          fullName: sponsor.fullName,
          qualification: sponsor.qualification,
          title: sponsor.title,
          company: sponsor.company,
          handphoneNumber: sponsor.handphoneNumber,
          profileLink: sponsor.profileLink,
          downloadLink: sponsor.downloadLink,
          telegram: sponsor.telegram,
          picture: sponsor.picture,
          galleryOne: sponsor.galleryOne,
          galleryTwo: sponsor.galleryTwo,
          reviewOne: sponsor.reviewOne,
          reviewTwo: sponsor.reviewTwo,
          email: sponsor.email,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  componentDidMount() {
    document.querySelector('#changePassword').setAttribute('disabled', true);
    this.getDetails();
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              href="#"
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              Edit Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Preview
            </NavLink>
          </NavItem>
            <NavItem>
            <NavLink
              href="#"
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggle('3');
              }}
            >
              Change Password
            </NavLink>
          </NavItem>
        </Nav>



<TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                
      <div className="container">
        <Row>
          <Col xs={12} md={4} lg={4} xl={4} className="mt-4">
            <ImageUpload picture={this.state.picture} handlePictureChange={(img) => this.setState({ picture: img })} />
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
                        <label htmlFor="fullName" className="pl-0">Full Name: </label>
                        <input id="fullName" className="form-control" value={this.state.fullName} name="fullName" onChange={(e) => this.handleOnChange(e)} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="qualification" className="pl-0">Qualification: </label>
                        <input id="qualification" className="form-control" value={this.state.qualification} name="qualification" onChange={(e) => this.handleOnChange(e)} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="title" className="pl-0">Title: </label>
                        <input id="title" className="form-control" value={this.state.title} name="title" onChange={(e) => this.handleOnChange(e)} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="company" className="pl-0">Company: </label>
                        <input id="company" className="form-control" value={this.state.company} name="company" onChange={(e) => this.handleOnChange(e)} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="handphoneNumber" className="pl-0">Phone No: </label>
                        <input id="handphoneNumber" className="form-control" value={this.state.handphoneNumber} name="handphoneNumber" onChange={(e) => this.handleOnChange(e)} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="profileLink" className="pl-0">Profile Link: </label>
                        <input id="profileLink" className="form-control" value={this.state.profileLink} name="profileLink" onChange={(e) => this.handleOnChange(e)} required />
                      </div>
                       <div className="form-group">
                        <label htmlFor="telegram" className="pl-0">Telegram Link: </label>
                        <input id="telegram" className="form-control" value={this.state.telegram} name="telegram" onChange={(e) => this.handleOnChange(e)} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="reviewOne" className="pl-0">Other information: </label>
                        <textarea id="reviewOne" maxLength="250" className="form-control" placeholder="'Example: A testimonial, personal statement, etc..'&#10;(max 250 characters)" value={this.state.reviewOne} name="reviewOne" onChange={(e) => this.handleOnChange(e)} required />
                        <br />
                        <textarea id="reviewTwo" maxLength="250" className="form-control" placeholder="'Example: A testimonial, personal statement, etc..'&#10;(max 250 characters)" value={this.state.reviewTwo} name="reviewTwo" onChange={(e) => this.handleOnChange(e)} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="downloadLink" className="pl-0">Other Links: </label>
                        <input id="downloadLink" className="form-control" placeholder="e.g. http://downloadlink.com"value={this.state.downloadLink} name="downloadLink" onChange={(e) => this.handleOnChange(e)} required />
                      </div>
                      <div className="form-group mt-4">
                        
                        <Button type="submit" size="md" color="success" className="col-12 col-md-4" onClick={(e) => this.changeDetails(e)}>Update</Button>
                      </div>
                    </CardBody>
                  </Card>
                </form>
              </Col>
             <Col xs={12}>
                <form className="form col-md-12 col-lg-9 col-xl-12">
                  <Card>
                    <CardHeader>
                 <h4> My Gallery </h4>
                    </CardHeader>
                     <CardBody className="mt-3">
                    <div className="form-group">
                      
                    <Col className="row">
            <ImageUploadOne galleryOne={this.state.galleryOne} handlegalleryOneChange={(img) => this.setState({ galleryOne: img })} />
            <ImageUploadTwo galleryTwo={this.state.galleryTwo} handlegalleryTwoChange={(img) => this.setState({ galleryTwo: img })} />
          </Col>
                     </div>
                    </CardBody>
                  </Card>
                </form>
              </Col>
                    

            
            </Row>
          </Col>
        </Row>
      </div>
            </Col>
            </Row>
          </TabPane>
            <TabPane tabId="2">
            <Row>
              <Col sm="6">
                 <div>
    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
    <meta charSet="utf-8" />
    <div id="p2" style={{ overflow: 'hidden', position: 'relative', backgroundColor: 'white', width: '909px', height: '1286px', margin: '0px' }}>
      {/* Begin shared CSS values */}
      <style className="shared-css" type="text/css" dangerouslySetInnerHTML={{ __html: '\n.t {\n\t-webkit-transform-origin: bottom left;\n\t-ms-transform-origin: bottom left;\n\ttransform-origin: bottom left;\n\t-webkit-transform: scale(0.25);\n\t-ms-transform: scale(0.25);\n\ttransform: scale(0.25);\n\tz-index: 2;\n\tposition: absolute;\n\twhite-space: pre;\n\toverflow: visible;\n\tline-height: 1.5;\n}\n' }} />
      {/* End shared CSS values */}
      {/* Begin inline CSS */}
      <img src="https://moneylife-staging-docker.s3-ap-southeast-1.amazonaws.com/PAGES/11.jpg" width="917px" height="1286px" />
      {/* Begin inline CSS */}
<style type="text/css" dangerouslySetInnerHTML={{ __html: '\n#button{left:283px;bottom:738px;}\n#profilepic{left:130px;bottom:890px;}\n#download{left:402px;bottom:260px;}\n#galleryone{left:69px;bottom:247px;}\n#gallerytwo{left:601px;bottom:247px;}\n#t1_11{left:284px;bottom:21px;}\n#t2_11{left:327px;bottom:21px;}\n#t3_11{left:356px;bottom:28px;}\n#t4_11{left:367px;bottom:21px;}\n#t5_11{left:147px;bottom:620px;}\n#t6_11{left:88px;bottom:648px;}\n#t7_11{left:88px;bottom:625px;}\n#t8_11{left:147px;bottom:480px;}\n#t9_11{left:88px;bottom:505px;}\n#ta_11{left:88px;bottom:482px;}\n#tb_11{left:70px;bottom:160px;word-spacing:0.2px;}\n#tc_11{left:70px;bottom:145px;word-spacing:1.2px;}\n#td_11{left:70px;bottom:129px;word-spacing:-1.8px;}\n#te_11{left:70px;bottom:114px;word-spacing:-1.3px;}\n#tf_11{left:70px;bottom:99px;}\n#tg_11{left:641px;bottom:677px;letter-spacing:-0.1px;word-spacing:0.1px;}\n#th_11{left:641px;bottom:662px;}\n#ti_11{left:641px;bottom:646px;}\n#tj_11{left:641px;bottom:631px;letter-spacing:-0.1px;}\n#tk_11{left:641px;bottom:534px;}\n#tl_11{left:641px;bottom:518px;}\n#tm_11{left:641px;bottom:503px;}\n#tn_11{left:440px;bottom:1236px;}\n#to_11{left:414px;bottom:1217px;}\n#tp_11{left:511px;bottom:1217px;}\n#tq_11{left:574px;bottom:1233px;}\n#tr_11{left:597px;bottom:1217px;}\n#ts_11{left:550px;bottom:1112px;}\n#tt_11{left:550px;bottom:1080px;}\n#tu_11{left:550px;bottom:1095px;}\n#tv_11{left:562px;bottom:1086px;}\n#tw_11{left:611px;bottom:1095px;}\n#tx_11{left:550px;bottom:1054px;}\n#ty_11{left:550px;bottom:1029px;}\n#tz_11{left:360px;bottom:984px;}\n#t10_11{left:360px;bottom:961px;}\n#t11_11{left:360px;bottom:935px;}\n#t12_11{left:594px;bottom:935px;}\n#t13_11{left:360px;bottom:970px;letter-spacing:-0.2px;}\n#t14_11{left:447px;bottom:895px;letter-spacing:-0.2px;}\n#t15_11{left:360px;bottom:930px;}\n#t16_11{left:447px;bottom:872px;letter-spacing:-0.1px;}\n#t17_11{left:360px;bottom:890px;}\n#t18_11{left:447px;bottom:849px;letter-spacing:-1.4px;word-spacing:1.5px;}\n#t19_11{left:427px;bottom:218px;}\n#t1a_11{left:398px;bottom:237px;}\n#t1b_11{left:862px;bottom:20px;}\n\na:link {\n \t color: rgb(3,60,92);\n \t background-color: transparent;\n \t text-decoration: none;\n}\n\n.s1_11{\n\tFONT-SIZE: 55px;\n\tFONT-FAMILY: Arial;\n\tfont-weight: 500;\n\tcolor: rgb(0,0,0);\n}\n\n.s2_11{\n\tFONT-SIZE: 55px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(0,0,0);\n}\n\n.s3_11{\n\tFONT-SIZE: 32.1px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(0,0,0);\n}\n\n.s4_11{\n\tFONT-SIZE: 59.2px;\n\tFONT-FAMILY: Arial;\n\tfont-style: italic;\n\tcolor: rgb(0,0,0);\n\twidth: 2220px; \n  \twhite-space:normal;\n}\n\n.s5_11{\n\tFONT-SIZE: 67.2px;\n\tFONT-FAMILY: Arial-ItalicMT_2u;\n\tcolor: rgb(0,0,0);\n}\n\n.s6_11{\n\tFONT-SIZE: 42.8px;\n\tFONT-FAMILY: Arial-ItalicMT_2u;\n\tcolor: rgb(0,0,0);\n}\n\n.s7_11{\n\tFONT-SIZE: 42.8px;\n\tFONT-FAMILY: Arial;\n\tfont-style: italic;\n\tcolor: rgb(0,0,0);\n}\n\n.s8_11{\n\tFONT-SIZE: 42.8px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(3,60,92);\n}\n\n.s9_11{\n\tFONT-SIZE: 42.8px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(3,60,92);\n}\n\n.sa_11{\n\tFONT-SIZE: 122.2px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(255,255,255);\ntext-align:center;\n\tdisplay: flex;\n\t align-items: center;\n  justify-content: center;\n   width: 100px;\n  height: 100px;\n}\n\n.sa_12{\n\tFONT-SIZE: 122.2px;\n\tFONT-FAMILY: inherit;\n\tcolor: rgb(255,255,255);\ntext-align:center;\n\tdisplay: flex;\n\t align-items: center;\n  justify-content: center;\n   width: 100px;\n  height: 100px;\n}\n\n.sb_11{\n\tFONT-SIZE: 122.2px;\n\tFONT-FAMILY: Arial;\n\tfont-weight: 500;\n\tcolor: rgb(255,255,255);\n}\n\n.sc_11{\n\tFONT-SIZE: 71.3px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(255,255,255);\n}\n\n.sd_11{\n\tFONT-SIZE: 97.8px;\n\tFONT-FAMILY: Arial;\n\tfont-weight: 500;\n\tcolor: rgb(0,0,0);\n\ttext-align:center;\n\tdisplay: flex;\n\t align-items: center;\n  justify-content: center;\n   width: 100px;\n  height: 100px;\n\n}\n\n.se_11{\n\tFONT-SIZE: 73.3px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(0,0,0);\n\ttext-align:center;\n\tdisplay: flex;\n\t align-items: center;\n  justify-content: center;\n   width: 100px;\n  height: 100px;\n}\n\n.ba11{\n\tFONT-SIZE: 73.3px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(0,0,0);\n}\n\n.ba12{\n\tFONT-SIZE: 73.3px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(0,0,0);\n}\n\n.sf_11{\n\tFONT-SIZE: 42.8px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(0,0,0);\n}\n\n.sg_11{\n\tFONT-SIZE: 69.7px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(0,0,0);\n}\n\n.sh_11{\n\tFONT-SIZE: 69.7px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(3,60,92);\n}\n\n.si_11{\n\tFONT-SIZE: 69.7px;\n\tFONT-FAMILY: Arial;\n\tcolor: rgb(0,0,0);\n}\n\n.sj_11{\n\tFONT-SIZE: 79.4px;\n\tFONT-FAMILY: Arial;\n\tfont-weight: 500;\n\tcolor: rgb(3,60,92);\n}\n\n.sk_11{\n\tFONT-SIZE: 79.4px;\n\tFONT-FAMILY: Arial;\n\tfont-weight: 500;\n\tcolor: rgb(3,60,92);\n}\n\n.sl_11{\n\tFONT-SIZE: 55px;\n\tFONT-FAMILY: Roboto-Light_4l;\n\tcolor: rgb(0,0,0);\n}\n\n.t.v0_11{\n\t-webkit-transform: scale(0.24, 0.25);\n\t-ms-transform: scale(0.24, 0.25);\n\ttransform: scale(0.24, 0.25);\n}\n\n' }} />      {/* End inline CSS */}      {/* Begin page background */}
      <div id="pg11Overlay" style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1, backgroundColor: 'rgba(0,0,0,0)', WebkitUserSelect: 'none' }} />
      <div id="pg11" style={{ WebkitUserSelect: 'none' }}><object width={909} height={1286} data="https://moneylife-staging-docker.s3-ap-southeast-1.amazonaws.com/PAGES/11.jpg" id="pdf11" style={{ width: '909px', height: '1286px', MozTransform: 'scale(1)', zIndex: 0 }} /></div>
      {/* End page background */}
      {/* Begin text definitions (Positioned/styled in CSS) */}
      <div id="t1_11" className="t s1_11">Money</div>
      <div id="t2_11" className="t s2_11">LiFE</div>
      <div id="t3_11" className="t s3_11">™</div>
      <div id="t4_11" className="t s2_11">is a trademark of FinCARE Global Pte Ltd.</div>
      <div id="t5_11" className="t v0_11 s4_11">{this.state.reviewOne}</div>
      <div id="t8_11" className="t v0_11 s4_11">{this.state.reviewTwo}</div>
      <div id="tb_11" className="t s6_11">*Disclaimer: The sponsor is a licensee of the MoneyLiFE Proﬁle System. The information in this page is supplied by the licensee and third parties. We are distributors </div>
      <div id="tc_11" className="t s7_11">(Not Publishers) of the content supplied by visitors and other third parties. Accordingly, we have no more editorial control over this content than does a public library. </div>
      <div id="td_11" className="t s7_11">Any opinions, advice, statements, services, offers or other information or content made available by members, visitors and other third parties are those of the respective </div>
      <div id="te_11" className="t s7_11">author(s) and we are not responsible for any material posted by third parties. We cannot and do not endorse it in any way, we expressly disclaim any liability associated </div>
      <div id="tf_11" className="t s7_11">with material posted by third parties.</div>
      <div id="tn_11" className="t sa_12">PROFILE PREVIEW</div>
      <div id="ts_11" className="t sd_11">{this.state.fullName}</div>
      <div id="tt_11" className="t se_11">{this.state.qualification}</div>
      <div id="tx_11" className="t se_11">{this.state.title}</div>
      <div id="ty_11" className="t se_11">{this.state.company}</div>
      <div id="profilepic" className="t ba12"><PImageUpload picture={this.state.picture} handlePictureChange={(img) => this.setState({ picture: img })}/>
      </div>
      <div id="galleryone" className="t gallery"><PImageUploadOne style={{ width: '400px', height: '550px', MozTransform: 'scale(1)', zIndex: 0 }} galleryOne={this.state.galleryOne} handlegalleryOneChange={(img) => this.setState({ galleryOne: img })}/></div>
      <div id="gallerytwo" className="t gallery"><PImageUploadTwo style={{ width: '400px', height: '550px', MozTransform: 'scale(1)', zIndex: 0 }} galleryTwo={this.state.galleryTwo} handlegalleryTwoChange={(img) => this.setState({ galleryTwo: img })}/></div>
      <div id="t13_11" className="t v0_11 si_11">Website:  {this.state.profileLink}</div>
      <div id="t15_11" className="t v0_11 sg_11">Email:  {this.state.email}</div>
      <div id="t17_11" className="t v0_11 sg_11">Contact:  {this.state.handphoneNumber}</div>
      <div id="t19_11" className="t v0_11 sj_11"><a href={this.state.downloadLink} rel="noopener noreferrer" target="_blank">AREA</a></div>
      <div id="t1a_11" className="t v0_11 sk_11"><a href={this.state.downloadLink} rel="noopener noreferrer" target="_blank">DOWNLOAD</a></div>
      <div id="download" className="t ba11">
        <img width={500} height={700} src="https://moneylife-staging-docker.s3-ap-southeast-1.amazonaws.com/PAGES/download.png" id="pdf110" style={{ width: '400px', height: '550px', MozTransform: 'scale(1)', zIndex: 0 }} />
      </div>
      <div id="button" className="t gallery"><a href={this.state.telegram} target="_blank"><img width={1400} src="https://moneylife-staging-docker.s3-ap-southeast-1.amazonaws.com/media/reports/button.png" alt="button" style={{ width: '1400px', MozTransform: 'scale(1)', zIndex: 0 }} /></a></div>
    </div></div>
      
         </Col>
            </Row>
          </TabPane>

          <TabPane tabId="3">
            <Row>
              <Col sm="12">
               
                
                
                 <Col xs={12}>
                <form className="form col-md-12 col-lg-9 col-xl-6">
                  <Card>
                    <CardHeader>
                      <h4>Change Password</h4>
                    </CardHeader>
                    <CardBody className="mt-3">
                      <div className="form-group">
                        <label htmlFor="currentPassword" className="pl-0">Current Password: </label>
                        <input id="currentPassword" type="password" className="form-control" value={this.state.currentPassword} name="currentPassword" onChange={(e) => this.handleOnChange(e)} required />
                        <div className="text-danger small">{this.state.currentPasswordMessage}</div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password" className="pl-0">New Password: </label>
                        <input id="password" type="password" minLength="6" className="form-control" value={this.state.password} name="password" onChange={async (e) => { await this.handleOnChange(e); this.confirmPassword(); }} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword" className="pl-0">Confirm Password: </label>
                        <input id="confirmPassword" type="password" className="form-control" minLength="6" value={this.state.confirmPassword} name="confirmPassword" onChange={async (e) => { await this.handleOnChange(e); this.confirmPassword(); }} required />
                        <div className="text-danger small">{ !this.state.isNewPasswordConfirmed && this.state.confirmPassword ? 'Password do not match!!' : ''}</div>
                      </div>
                      <div className="form-group mt-4">
                        <Button id="changePassword" type="submit" color="success" size="md" className="col-12 col-md-5" onClick={(e) => this.changePassword(e)}>Change Password</Button>
                      </div>
                    </CardBody>
                  </Card>
                </form>
              </Col>
                
                
                 </Col>
            </Row>
          </TabPane>
                


        </TabContent>
      </div>

    );
  }
  
}

export default Profile;
