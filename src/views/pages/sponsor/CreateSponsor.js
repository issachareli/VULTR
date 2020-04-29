import React, { useState, useContext, useRef, useEffect } from "react";
import { Row, Col, Card, CardHeader, CardBody, Form, FormGroup, FormFeedback, Label, Input, Button, Table } from 'reactstrap';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { IsMobileContext } from '../../../layouts/DashboardLayout';
import '../../../assets/style/CreateSponsor.css';
import config from '../../../config/env';


const ImageUpload = function({handleFormChange, imagePreviewUrl, setImagePreviewUrl}) {
    const handleImageChange = function(e) {
        e.preventDefault();
        handleFormChange(e);
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Row>
            <Col xs={12}>
                <div className="d-flex justify-content-center">
                    <img width="180px" height="180px" className="mb-3" src={imagePreviewUrl || 'data:image/jpeg;base64,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'} />
                </div>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
                <Input className="input-file" type="file" name="file" id="input-file-label-id" onChange={handleImageChange} />
                <label className="input-file-label" htmlFor="input-file-label-id">Choose a file</label>
            </Col>
        </Row>
    );
}

const AddCredits = function(props) {
    const [credits, setCredits] = useState("");

    const handleAddCredits = function(e) {
        e.preventDefault();
        if (Number(credits) <= 0) return;
        console.log(props.email);
        let accessToken = localStorage.getItem('Token');
        axios.post(`${config.url}/api/v1/sponsor/transfer-credits`,
          { credits: Number(credits), email: props.email },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then(res => {
        console.log("Credits transferred");
        }).catch(error => {
            console.log(error);
        });
    };

    const handleCancel = function(e) {
        e.preventDefault();
        props.handleCancel();
    }

    return (
        <Form>
            <FormGroup row style={{ alignItems: "center"}}>
                <Label xs={12}>
                    <span className="responsive">Credits</span>
                </Label>
                <Col xs={12}>
                    <Input  bsSize="sm" type="text" value={credits} onChange={e => setCredits(e.target.value)} />
                </Col>
            </FormGroup>
            <Row>
                <Col xs={6}>
                    <Button  size="md" xs={12} color="success" style={{width: '100%'}} onClick={handleCancel}>Cancel</Button>
                </Col>
                <Col xs={6}>
                    <Button  size="md" xs={12} color="success" style={{width: '100%'}} onClick={handleAddCredits}>Add Credits</Button>
                </Col>
            </Row>
        </Form>
    );
}

const DeleteSponsor = function(props) {
    const handleDeleteSponsor = function(e) {
        e.preventDefault();
        const token=localStorage.getItem("Token");

        console.log(props.email);
        axios.post(`${config.url}/api/v1/sponsor/delete`,
          { email: props.email},
          { headers: { Authorization: `Bearer ${token}` } }
        ).then(res => {
            console.log('sponsor deleted')
        }).catch(error => {
            console.log(error);
        });
        console.log("Deleted!");
    };

    const handleCancel = function(e) {
        e.preventDefault();
        props.handleCancel();
    }

    return (
        <Row>
            <Col xs={6}>
                <Button  size="md" xs={12} color="danger" style={{width: '100%'}} onClick={handleDeleteSponsor}>Delete</Button>
            </Col>
            <Col xs={6}>
                <Button  size="md" xs={12} color="secondary" style={{width: '100%'}} onClick={handleCancel}>Cancel</Button>
            </Col>
        </Row>
    );
};

const SponsorList = function(props) {
    if (!props.isMobileView) {
        return (
            <Table>
                <thead>
                    <tr>
                        <th><span className="responsive">Name</span></th>
                        <th><span className="responsive">Email</span></th>
                        <th><span className="responsive">Phone Number</span></th>
                        <th><span className="responsive">Credits</span></th>
                        <th><span className="responsive">Sponsor Type</span></th>
                        <th><span className="responsive">Actions</span></th>
                    </tr>
                </thead>
                <tbody>
                    {props.sponsorList.map(sponsor => {
                        return (
                            <tr key={sponsor.email}>
                                <td><span className="responsive">{sponsor.name}</span></td>
                                <td><span className="responsive">{sponsor.email}</span></td>
                                <td><span className="responsive">{sponsor.handphone_number}</span></td>
                                <td><span className="responsive">{sponsor.available_credit}</span></td>
                                <td><span className="responsive">{sponsor.role}</span></td>
                                <td><span className="responsive">{sponsor.created_by_id}</span></td>
                                <td>
                                    <Row>
                                        <Col xs={6}>
                                            <Button  
                                                size="md" 
                                                color="primary" 
                                                style={{width: '100%'}} 
                                                onClick={() => props.handleAddCredits(sponsor.email)}
                                            >Add Credits</Button>
                                        </Col>
                                        <Col xs={6}>
                                            <Button  
                                                size="md" 
                                                color="danger" 
                                                style={{width: '100%'}}
                                                onClick={() => props.handleDeleteSponsor(sponsor.email)}
                                            >Delete</Button>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        )
    } else {
        return (
            <React.Fragment>
                {props.sponsorList.map(sponsor => {
                    return (
                        <Table key={sponsor.email}>
                            <tbody>
                                <tr>
                                    <td><span className="responsive">Name</span></td>
                                    <td><span className="responsive">{sponsor.name}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="responsive">Email</span></td>
                                    <td><span className="responsive">{sponsor.email}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="responsive">Phone Number</span></td>
                                    <td><span className="responsive">{sponsor.phoneNo}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="responsive">Credits</span></td>
                                    <td><span className="responsive">{sponsor.avalable_credit}</span></td>
                                </tr>
                                <tr>
                                    <td><span className="responsive">Sponsor Type</span></td>
                                    <td><span className="responsive">{sponsor.sponsorType}</span></td>
                                </tr>
                                <tr>
                                <td><span className="responsive">Actions</span></td>
                                    <td>
                                        <Row>
                                            <Col xs={12} sm={6}>
                                                <Button 
                                                    className="mb-md-0 mb-2"
                                                    size="sm" 
                                                    color="primary" 
                                                    style={{width: '100%'}}
                                                    onClick={() => props.handleAddCredits(sponsor.email)}
                                                ><span className="responsive">Add Credits</span></Button>
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                <Button  
                                                    size="sm" 
                                                    color="danger" 
                                                    style={{width: '100%'}}
                                                    onClick={() => props.handleDeleteSponsor(sponsor.email)}    
                                                ><span className="responsive">Delete</span></Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    );
                })}
            </React.Fragment>
        );   
    }


};

const CreateSponsor = function() {
    const [name, setName] = useState("");
    const [group, setGroup] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [sponsorType, setSponsorType] = useState("3");
    const [credits, setCredits] = useState("");
    const [file, setFile] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [errors, setErrors] = useState({
        name: "",
        group: "",
        email: "",
        phoneNo: "",
        credits: "",
        file: "",
    });
    const [sponsorDeleteModalOpen, setSponsorDeleteModalOpen] = useState(false);
    const [creditsModalOpen, setCreditsModalOpen] = useState(false);
    const [targetSponsorEmail, setTargetSponsorEmail] = useState("");
    const isMobileView = useContext(IsMobileContext);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [selfSponsorType, setSelfSponsorType] = useState("NORMAL");
    const formRef = useRef();
    const [sponsorList, setSponsorList] = useState([]);

    const validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleFormValidation = function(name, value) {
        setIsFormInvalid(false);
        let newErrors = {...errors}; 
        switch (name) {
            case "name":
                if (value === "") {
                    newErrors.name = "Name can not be empty!";
                } else {
                    newErrors.name = "";
                }
                break;
            case "group":
                if (value === "") {
                    newErrors.group = "Group can not be empty!";
                } else {
                    newErrors.group = "";
                }
                break;
            case "email":
                if (value === "") {
                    newErrors.email = "Email can not be empty!";
                } else if (!validateEmail(value)) {
                    newErrors.email = "Email is not valid!";
                } else {
                    newErrors.email = "";
                }
                break;
            case "phoneNo":
                const re = /^\+?[1-9][0-9]{5,}/;
                if (value === "") {
                    newErrors.phoneNo = "";
                } else if (!re.test(value)) {
                    newErrors.phoneNo = "Enter valid number";
                } else {
                    newErrors.phoneNo = "";
                }
                break;
            case "sponsorType":
                break;
            case "credits":
                if (value === "") {
                    newErrors.credits = "Credits can not be empty!";
                } else if (Number(value) < 0) {
                    newErrors.credits = "Credits should not be less than zero!";
                } else {
                    newErrors.credits = "";
                }
                break;
            case "file":
                if (value === "") {
                    newErrors.file = "Please upload  profile image";
                } else {
                    newErrors.file = "";
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleFormChange = function(e) {
        
        switch (e.target.name) {
            case "name":
                setName(e.target.value);
                break;
            case "group":
                setGroup(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "phoneNo":
                setPhoneNo(e.target.value);
                break;
            case "sponsorType":
                setSponsorType(e.target.value);
                break;
            case "credits":
                if (e.target.value !== "" && isNaN(e.target.value)) return;
                setCredits(e.target.value);
                break;
            case "file":
                setFile(e.target.files[0])
                handleFormValidation(e.target.name, e.target.files[0])
                return;
            default:
                break;
        }
        handleFormValidation(e.target.name, e.target.value);
    };

    const isFormValid = function() {
        for (var key in errors) {
            if (errors[key].length !== 0)
                return false;
        }
        if (name === "" || email === "" || sponsorType === "" || credits === "") {
            return false;
        }
        return true;
    }

    const emptyForm = function() {
        setName("");
        setGroup("");
        setEmail("");
        setCredits("");
        setPhoneNo("");
        setSponsorType("3");
        setFile("");
        setImagePreviewUrl("");
        setIsFormInvalid(false);
        setErrors({
            name: "",
            name: "",
            email: "",
            phoneNo: "",
            credits: "",
            file: "",
        });
    };

    const handleFormSubmit = function(e) {
        e.preventDefault();
        console.log(errors);
        if (!isFormValid()) {
            setIsFormInvalid(true);
            return;
        } 
        
        // make axios request to create 
        let formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('group', group);
        if (phoneNo !== "")
            formData.append('handphone_number', phoneNo);
        formData.append('role', sponsorType);
        formData.append('available_credit', credits);
        formData.append('created_by_id', createdby);
        if (file !== "")
            formData.append('picture', file, file.name);

        axios.post(`${config.url}/api/v1/sponsor/create`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Token')}`,
                "content-type": "multipart/form-data"
            }
        })
        .then(res => {
            console.log("sponsor created");
            if (res.data.success) {
                fetch_child_sponsors();
                emptyForm();
            } else {
                if (res.data.errors) {
                    let newErrors = { ...errors };
                    if ("email" in res.data.errors) newErrors.email = res.data.errors.email[0];
                    if ("available_credit" in res.data.errors) newErrors.credits = res.data.errors.available_credit[0];
                    if ("created_by_id" in res.data.errors) newErrors.createdby = res.data.errors.created_by_id[0];
                    if ("name" in res.data.errors) newErrors.name = res.data.errors.name[0];
                    if ("group" in res.data.errors) newErrors.group = res.data.errors.group[0];
                    if ("handphone_number" in res.data.errors) newErrors.phoneNo = res.data.errors.handphone_number[0];
                    if ("picture" in res.data.errors) newErrors.file = res.data.errors.picture[0];
                    setErrors(newErrors);
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleAddCredits = function(email) {
        setTargetSponsorEmail(email);
        setCreditsModalOpen(true);
    };
    

    const handleDeleteSponsor = function(email) {
        setTargetSponsorEmail(email);
        setSponsorDeleteModalOpen(true);
    }

    const fetch_child_sponsors = function () {
        const token = localStorage.getItem('Token');
        axios.get(`${config.url}/api/v1/sponsor/child_sponsors`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Access-Control-Allow-Origin': '*',
            },
        }).then(res => {
            setSponsorList(res.data.sponsors);
        }).catch(error => {
            console.log(error);
        });
        axios.get(`${config.url}/api/v1/sponsor/validate-token`, { headers: { Authorization: `Bearer ${token}` } })
          .then(res => {
              setSelfSponsorType(res.data.sponsor.role)
          }).catch(error => {
            console.log(error);
        });
    };

    useEffect(fetch_child_sponsors,[]);

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col xs={12} sm={6} md={6}>
                                    <p className="responsive" style={{
                                        fontSize: '150%',
                                    }}>
                                        Sponsors{/* Credits Available: 10000 */}
                                    </p>
                                </Col>
                                <Col xs={12} sm={{size: 5, offset: 1}} md={{size: 4, offset: 2}} lg={{size: 3, offset: 3}} xl={{size: 2, offset: 4}}>
                                    <Button color="primary" style={{width: '100%'}} onClick={() => {
                                        formRef.current.classList.toggle('hide-form');
                                        if (isFormOpen) {
                                            emptyForm();
                                        }
                                        setIsFormOpen(!isFormOpen);
                                    }}>
                                        {isFormOpen ? "Cancel" : "+ Create Sponsor"}
                                    </Button>
                                </Col>
                            </Row>
                            
                            
                        </CardHeader>
                        <CardBody>
                            <div className="form-wrapper hide-form" ref={formRef}>
                                <Form className="container mb-4">
                                    <Row className="px-2 px-lg-3">
                                        <Col xs={12} lg={4} className="mb-3 mb-lg-0">
                                            <ImageUpload setFile={setFile} handleFormChange={handleFormChange} imagePreviewUrl={imagePreviewUrl} setImagePreviewUrl={(url) => setImagePreviewUrl(url)} />
                                            <p style={{fontSize: '80%', color: "red", textAlign: 'center'}} className="responsive">{errors.file || " "}</p>
                                        </Col>
                                        <Col xs={12} lg={8}>
                                            <FormGroup row style={{ alignItems: "center"}}>
                                                <Label xs={12}>
                                                    <span className="responsive">Name *</span>
                                                </Label>
                                                <Col xs={12}>
                                                    <Input  bsSize="sm" value={name} invalid={errors.name.length !== 0} name="name" onChange={handleFormChange} />
                                                    <span style={{fontSize: '80%', color: "red"}} className="responsive">{errors.name || " "}</span>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row style={{ alignItems: "center"}}>
                                                <Label xs={12}>
                                                    <span className="responsive">Email *</span>
                                                </Label>
                                                <Col xs={12}>
                                                    <Input  bsSize="sm" value={email} invalid={errors.email.length !== 0} name="email" onChange={handleFormChange} />
                                                    <span style={{fontSize: '80%', color: "red"}} className="responsive">{errors.email || " "}</span>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row style={{ alignItems: "center"}}>
                                                <Label xs={12}>
                                                    <span className="responsive">Phone Number</span>
                                                </Label>
                                                <Col xs={12}>
                                                    <Input  bsSize="sm" value={phoneNo} invalid={errors.phoneNo.length !== 0} name="phoneNo" onChange={handleFormChange} />
                                                    <span style={{fontSize: '80%', color: "red"}} className="responsive">{errors.phoneNo || " "}</span>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row style={{ alignItems: "center"}}>
                                                <Label xs={12}>
                                                    <span className="responsive">Sponsor Type</span>
                                                </Label>
                                                <Col xs={12}>
                                                    <Input id="Zdd_1" bsSize="sm" type="select" value={sponsorType} name="sponsorType" onChange={handleFormChange}>
                                                        {(selfSponsorType === 'ADMINISTRATIVE' || selfSponsorType === 'MANAGEMENT' || selfSponsorType === 'SYSTEM') && <option value={3}>Normal Sponsor</option>}
                                                   {/*     {(selfSponsorType === 'ADMINISTRATIVE' || selfSponsorType === 'MANAGEMENT' || selfSponsorType === 'SYSTEM') && <option value={4}>Demo Sponsor</option>} */}
                                                        {(selfSponsorType === 'MANAGEMENT' || selfSponsorType === 'SYSTEM') && <option value={2}>Administrative Sponsor</option> }
                                                   {/*  {(selfSponsorType === 'MANAGEMENT' || selfSponsorType === 'SYSTEM') && <option value={1}>Management Sponsor</option>}   */}
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row style={{ alignItems: "center"}}>
                                                <Label xs={12}>
                                                    <span className="responsive">Credits *</span>
                                                </Label>
                                                <Col xs={12}>
                                                    <Input  bsSize="sm" type="text" value={credits} invalid={errors.credits.length !== 0} name="credits" onChange={handleFormChange} />
                                                    <span style={{fontSize: '80%', color: "red"}} className="responsive">{errors.credits || " "}</span>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row style={{ alignItems: "center"}}>
                                                <Label xs={12}>
                                                    <span className="responsive">Group</span>
                                                </Label>
                                                <Col xs={12}>
                                                    <Input  bsSize="sm" value={group} name="group" onChange={handleFormChange} />
                                                    <span style={{fontSize: '80%', color: "red"}} className="responsive">{errors.group || " "}</span>
                                                </Col>
                                            </FormGroup>
                                            <Row>
                                                <Col xs={12} />
                                                <Col xs={12}>
                                                    <Button  size="md" xs={12} color="success" style={{width: '100%'}} onClick={handleFormSubmit}>Create</Button>
                                                    <span style={{fontSize: '80%', color: "red"}} className="responsive">{isFormInvalid ? "Fill all the details" : " "}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <SponsorList sponsorList={sponsorList} isMobileView={isMobileView} handleDeleteSponsor={handleDeleteSponsor} handleAddCredits={handleAddCredits} />
                            <Modal show={sponsorDeleteModalOpen} onHide={() => setSponsorDeleteModalOpen(false)}>
                                <Modal.Header closeButton>
                                <Modal.Title>Change Password</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    This operation can not be undone
                                </Modal.Body>
                                <Modal.Footer>
                                    <DeleteSponsor email={targetSponsorEmail} handleCancel={() => setSponsorDeleteModalOpen(false)} />
                                </Modal.Footer>
                            </Modal>
                            <Modal show={creditsModalOpen} onHide={() => setCreditsModalOpen(false)}>
                                <Modal.Header closeButton>
                                <Modal.Title>Add Credits</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <AddCredits email={targetSponsorEmail} handleCancel={() => setCreditsModalOpen(false)} />
                                </Modal.Body>
                            </Modal>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </div>
    );
};

export default CreateSponsor;
