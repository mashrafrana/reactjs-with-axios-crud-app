import React, {useState , useEffect } from 'react';
import {Form, Button , Spinner } from 'react-bootstrap';
import CreateModal from '../component/CreateModal';
import TableList from '../component/TableList';
import axios from 'axios';

const VehicleStatus = () => {

    const initialState = {id:'',status: ''}
    const [vehicleStatus, setVehicleStatus] = useState(initialState);
    const [vehicleStatusList, setvehicleStatusList] = useState([]);
    const [showCreate, setshowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [load, setLoad] = useState(false);
    const thArray = ["Id", "Vehicle Status","Edit","Delete"];
    
    const handleInputChange = event => {
      const { name, value } = event.target
      setVehicleStatus({...vehicleStatus, [name]: value }) 
    }

    // Add Modal
    const handleCreateShow = () => setshowCreate(true);
    const handleCreateClose = () => setshowCreate(false);

    // Edit Modal
    const handleEditShow = (vehicleStatus) => {
      console.log(vehicleStatus.status);
      setVehicleStatus({...vehicleStatus ,vehicleStatus});
      setShowEdit(true);

    }
    const handleEditClose = () => setShowEdit(false);

    // Delete Modal
    const handleDeleteShow = (vehicleStatus) => { 
      setVehicleStatus({...vehicleStatus ,vehicleStatus});
      setShowDelete(true);
      
    }
    const handleDeleteClose = () => setShowDelete(false);
        
    useEffect(() => {
      setLoad(true);
      axios.get('http://192.168.15.106:8000/api/v1/statuses')
      .then(res => {
            setvehicleStatusList(res.data);
            console.log(res.data);
            setLoad(false);
          })
          .catch(err => {
            console.log(err.message);
            setLoad(true);
          })
    },[]);

    const addBrand = () => {
    
      axios.post('http://192.168.15.106:8000/api/v1/statuses',
      vehicleStatus
      )
      .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err.message);
          })

      setvehicleStatusList([...vehicleStatusList, vehicleStatus])
      setshowCreate(false);
      setVehicleStatus(initialState);
    }

    const updateBrand = () => {
     
      axios.put('http://192.168.15.106:8000/api/v1/statuses/'+vehicleStatus.id,
      vehicleStatus
      )
      .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err.message);
          })
     
      setvehicleStatusList(vehicleStatusList.map(b => (b.id === vehicleStatus.id ? vehicleStatus : b)))
      setShowEdit(false);
      setVehicleStatus(initialState);
      
    }

    const deleteBrand = () => {

      axios.delete('http://192.168.15.106:8000/api/v1/statuses/'+vehicleStatus.id)
      .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err.message);
      })
      setvehicleStatusList(vehicleStatusList.filter(b => b.id !== vehicleStatus.id));
      setShowDelete(false);
      setVehicleStatus(initialState);
      
    }

  return (
    <div>
      <div className="main-nav nav-top-margin">
        <div className="container mt-5 ">         
          <Button className="float-right mb-md-3" onClick={handleCreateShow}>
            Add Vehicle Status
          </Button>
          <h2 className="float-left ml-md-3">Vehicle Status</h2>        
        <TableList
          thName ={thArray}
          tdData =        
            {vehicleStatusList
              ? vehicleStatusList.map((vehicleStatus, index) => (
                  <tr key={index}>
                    <td>{vehicleStatus.id}</td>
                    <td>{vehicleStatus.status}</td>
                    <td><Button onClick={() => handleEditShow(vehicleStatus)}>Edit</Button></td>
                    <td><Button onClick={() => handleDeleteShow(vehicleStatus)}>Delete</Button></td>
                  </tr>
                )): <tr><td colSpan="6" align="center">Empty Record</td></tr>
            }
          />
          {/* When Api is loading data */}
          {load?
          <><Button disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          </>: null}
          
          {/* Create Modal */}
          <CreateModal
                showModal={showCreate}
                title="Add Vehicle Status"
                closeModal={handleCreateClose}
                btnText = "Create"
                action = {addBrand}
                content={
                <Form >  
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Vehicle Status</Form.Label>
                      <Form.Control type="text" name="status" value={vehicleStatus.status} onChange={handleInputChange} placeholder="Enter Vehicle Status" />
                  </Form.Group>
                </Form>
          }/>

          {/* Edit Modal */}
          <CreateModal
              showModal={showEdit}
              title="Update Teams"
              closeModal={handleEditClose}
              btnText = "Update Team"
              action = {updateBrand}
              content={
                <Form >  
                 <Form.Group controlId="formBasicEmail">
                      <Form.Label>Vehicle Status</Form.Label>
                      <Form.Control type="text" name="status" value={vehicleStatus.status} onChange={handleInputChange} placeholder="Enter Vehicle Status" />
                  </Form.Group>
                </Form>
            }/>
             
          {/* Delete Modal */}
        <CreateModal
        showModal={showDelete}
        title="Delete Teams "
        closeModal={handleDeleteClose}
        btnText = "Detele Team"
        action = {deleteBrand}
        content={
        <>
          <p>Are you sure to delete this Status</p>
          <p>{vehicleStatus.status}</p>
        </>
          }/>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatus;


