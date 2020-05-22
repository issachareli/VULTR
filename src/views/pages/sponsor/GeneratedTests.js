import React, { Component } from 'react'
import {
  Card,
  CardBody,
  Table,
  Button, CardHeader, Input, Col
} from 'reactstrap'
import axios from 'axios'
import QRCode from 'qrcode'
import config from '../../../config/env'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import '../../../assets/style/style.css'
import '../../../assets/style/Dashboard.css'
import { Modal } from 'react-bootstrap'

class GeneratedTest extends Component {
  constructor (props) {
    super(props)

    this.state = {
      generatedTests: [],
      addModalIsOpen: false,
      minusModalIsOpen: false,
      deleteModalIsOpen: false,
      qrCodeModalIsOpen: false,
      selectedLink: null,
      selectedCredits: null,
      credits: null,
      qrCodeLink: '',
      weChatAlert: false
    }

    this.qrCodeRef = React.createRef()

    this.openAddModal = this.openAddModal.bind(this)
    this.openMinusModal = this.openMinusModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.openQRCodeModal = this.openQRCodeModal.bind(this)
    this.closeQRCodeModal = this.closeQRCodeModal.bind(this)
    this.closeAddModal = this.closeAddModal.bind(this)
    this.closeMinusModal = this.closeMinusModal.bind(this)
    this.addCreditRequest = this.addCreditRequest.bind(this)
    this.minusCreditRequest = this.minusCreditRequest.bind(this)
    this.deleteLinkRequest = this.deleteLinkRequest.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.generateQRCode = this.generateQRCode.bind(this)
  }

  openAddModal () {
    this.setState({ addModalIsOpen: true, deleteModalIsOpen: false })
  }

  openMinusModal () {
    this.setState({ minusModalIsOpen: true, minusModalIsOpen: false })
  }

  openDeleteModal () {
    this.setState({ deleteModalIsOpen: true, addModalIsOpen: false })
  }

  openQRCodeModal () {
    this.setState({ qrCodeModalIsOpen: true })
  }

  closeQRCodeModal () {
    this.setState({ qrCodeModalIsOpen: false, qrCodeLink: '' })
  }

  closeAddModal () {
    this.setState({ credit: null })
    this.setState({ addModalIsOpen: false })
    this.componentDidMount()
  }

  closeMinusModal () {
    this.setState({ credit: null })
    this.setState({ minusModalIsOpen: false })
    this.componentDidMount()
  }

  closeDeleteModal () {
    this.setState({ deleteModalIsOpen: false })
    this.componentDidMount()
  }

  sendWhatsappMessage = (url) => {
    window.open(`https://web.whatsapp.com/send?phone=&text=${url}`)
  }

  sendWechatMessage = () => {
    window.open('https://web.wechat.com/')
    this.closeWeChatAlert()
  };

  openWeChatAlert = () => {
    this.setState({ weChatAlert: true })
  }

  closeWeChatAlert = () => {
    this.setState({ weChatAlert: false })
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return this.state.credits === nextState.credits
  }

  componentDidMount () {
    const token = localStorage.getItem('Token')
    axios.get(`${config.url}/api/v1/sponsor/generated-tests`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        this.setState({ generatedTests: res.data.payload })
      }).catch(err => {
        console.log(err)
      })
  }

  handleClick = (id) => {
    document.querySelector(`#copy-url-${id}`).style.display = 'revert'
    setTimeout(function () {
      document.querySelector(`#copy-url-${id}`).style.display = 'none'
    }, 2000)
  };

  addCreditRequest () {
    const token = localStorage.getItem('Token')
    axios.post(`${config.url}/api/v1/sponsor/links/add-credit`, { link_uuid: this.state.selectedLink, credits: this.state.credits }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        this.setState({ credits: null, selectedLink: null, selectedCredits: null })
        this.closeAddModal()
      }).catch(err => {
        console.log(err)
        this.closeAddModal()
      })
  }

  minusCreditRequest () {
    const token = localStorage.getItem('Token')
    axios.post(`${config.url}/api/v1/sponsor/links/minus-credit`, { link_uuid: this.state.selectedLink, credits: this.state.credits }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        this.setState({ credits: null, selectedLink: null, selectedCredits: null })
        this.closeMinusModal()
      }).catch(err => {
        console.log(err)
        this.closeMinusModal()
      })
  }

  deleteLinkRequest () {
    const token = localStorage.getItem('Token')
    axios.post(`${config.url}/api/v1/sponsor/links/delete`, { link_uuid: this.state.selectedLink }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        this.setState({ selectedLink: null })
        this.closeDeleteModal()
      }).catch(err => {
        console.log(err)
        this.closeDeleteModal()
      })
  }

  handleMinusClick (record) {
    this.setState({ selectedLink: record.uuid, selectedCredits: record.credits })
    this.openMinusModal()
  }

  handlePlusClick (record) {
    this.setState({ selectedLink: record.uuid, selectedCredits: record.credits })
    this.openAddModal()
  }

  handleDeleteClick (record) {
    this.setState({ selectedLink: record.uuid })
    this.openDeleteModal()
  }

  componentDidUpdate () {
    if (this.qrCodeRef.current !== null && this.state.qrCodeLink !== '') {
      QRCode.toCanvas(this.state.qrCodeLink, { errorCorrectionLevel: 'H', margin: 1, width: 200 }, (err, canvas) => {
        if (err) {
          console.log(err)
        } else {
          this.qrCodeRef.current.appendChild(canvas)
        }
      })
    }
  }

  generateQRCode (link) {
    this.openQRCodeModal()
    this.setState({ qrCodeLink: link })
  }

  render () {
    const langaugeMap = { en: 'English', cn: 'Mandarin' }
    const GeneratedTestsURL = () => {
      if (this.state.generatedTests) {
        return this.state.generatedTests.map((record, index) => {
          return (
            <tr key={index}>
              <td style={{ width: '20%' }}>
                <span className="responsive">{record.campaign}</span>
              </td>
              <td style={{ width: '30%' }}>
                <span className="responsive">{`${config.url}/credit/${record.uuid}/test`}</span>
                {/* <CopyToClipboard text={`${config.url}/credit/${record.uuid}/test`}>
                  <i className="fa fa-weixin pull-right" style={{ color: 'green' }} onClick={this.openWeChatAlert}/>
                </CopyToClipboard>
                <i onClick={() => this.sendWhatsappMessage(`${config.url}/credit/${record.uuid}/test`)} style={{ color: 'green' }} className="fa fa-whatsapp my-float mr-3 pull-right"/> */}
              </td>
              <td style={{ width: '10%' }}>{langaugeMap[record.language]}</td>
              <td style={{ width: '15%' }}><span className={'responsive mr-3'}>{record.credits}</span>
                <span><i style={{ fontSize: '1.5em', verticalAlign: 'bottom' }} className="fa mx-3 float-right fa-trash" onClick={this.handleDeleteClick.bind(this, record)}/>
                  <i onClick={this.handlePlusClick.bind(this, record)} style={{ fontSize: '1.5em', verticalAlign: 'bottom' }} className="fa ml-3 float-right fa-plus-circle"/>
                  <i onClick={this.handleMinusClick.bind(this, record)} style={{ fontSize: '1.5em', verticalAlign: 'bottom' }} className="fa ml-3 float-right fa-minus-circle"/></span>
              </td>
              <td style={{ width: '25%' }}>
                <CopyToClipboard text={`${config.url}/credit/${record.uuid}/test`}>
                  <Button size="md" color="primary" className="pull-left mr-2" onClick={() => this.handleClick(index)}>
                    <span className="responsive">Copy Test Link</span>
                  </Button>
                </CopyToClipboard>
                <Button size="md" color="primary" className="pull-left" onClick={() => this.generateQRCode(`${config.url}/credit/${record.uuid}/test`)}>
                  <span className="responsive">QR Code</span>
                </Button>
                <p id={`copy-url-${index}`} style={{ margin: '0px', marginTop: '5px', display: 'none' }}><span
                  className="responsive" style={{ marginLeft: '20px', color: 'green' }}>Link Copied!</span></p>
              </td>
            </tr>
          )
        })
      } else { return (<tr></tr>) }
    }

    return (
      <Card>
        <CardBody style={{ overflowX: 'auto' }}>
          <Table className="responsive-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Link</th>
                <th>Language</th>
                <th>Credits</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <GeneratedTestsURL/>
            </tbody>
          </Table>
          <Modal show={this.state.weChatAlert} onHide={this.closeWeChatAlert}>
            <Modal.Header closeButton>
              <Modal.Title>Share test link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Link has been copied to clipboard.</div>
            </Modal.Body>
            <Modal.Footer>
              <Button color="secondary" onClick={this.closeWeChatAlert} >
                Cancel
              </Button>
              <Button color="primary" onClick={this.sendWechatMessage}>
                Share
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.addModalIsOpen} onHide={this.closeAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Credits</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Current Credits: {this.state.selectedCredits}</div>
              <Input
                type="number"
                value={this.state.credits}
                onChange={e => this.setState({ credits: parseInt(e.target.value) })}
                placeholder="Number of Credits"
                style={{ marginBottom: '5px' }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button color="primary" onClick={this.addCreditRequest} disabled={isNaN(this.state.credits)}>
                Add Credits
              </Button>
            </Modal.Footer>
          </Modal>
    
 <Modal show={this.state.minusModalIsOpen} onHide={this.closeMinusModal}>
            <Modal.Header closeButton>
              <Modal.Title>Minus Credits</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Current Credits: {this.state.selectedCredits}</div>
              <Input
                type="number"
                value={this.state.credits}
                onChange={e => this.setState({ credits: parseInt(e.target.value) })}
                placeholder="Number of Credits"
                style={{ marginBottom: '5px' }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button color="primary" onClick={this.minusCreditRequest} disabled={isNaN(this.state.credits)}>
                Add Credits
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={this.state.deleteModalIsOpen} onHide={this.closeDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Are you sure you want to delete the link: {`${config.url}/credit/${this.state.selectedLink}/test`}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button color="primary" onClick={this.deleteLinkRequest}>
                Yes
              </Button>
              <Button color="secondary" onClick={this.closeDeleteModal} >
                No
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.qrCodeModalIsOpen} onHide={this.closeQRCodeModal}>
            <Modal.Header closeButton>
              <Modal.Title>QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div ref={this.qrCodeRef} className="text-center"/>
            </Modal.Body>
          </Modal>
        </CardBody>
      </Card>
    )
  }
}

export default GeneratedTest
