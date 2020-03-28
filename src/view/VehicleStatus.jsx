import React, {useState , useEffect } from 'react';
import {Form, Button , Spinner } from 'react-bootstrap';
import CreateModal from '../component/CreateModal';
import TableList from '../component/TableList';
import axios from 'axios';

const VehicleStatus = () => {

    const initialState = {status: ''}
    const [vehicleStatus, setVehicleStatus] = useState(initialState);
    const [vehicleStatusList, setvehicleStatusList] = useState([]);
    const [showCreate, setshowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [load, setLoad] = useState(false);
    const thArray = ["Id", "Vehicle Status","Edit","Delete"];
    
    const handleInputChange = event => {
      const { name, value } = event.target
      setVehicleStatus({ ...vehicleStatus, [name]: value }) 
    }

    // Add Modal
    const handleCreateShow = () => setshowCreate(true);
    const handleCreateClose = () => setshowCreate(false);

    // Edit Modal
    const handleEditShow = (vehicleStatus) => {
      setVehicleStatus({...vehicleStatus ,vehicleStatus});
      setShowEdit(true);

    }
    const handleEditClose = () => setShowEdit(false);

    // Delete Modal
    const handleDeleteShow = (vehicleStatus) => { 
      console.log(setVehicleStatus);
      setVehicleStatus({...vehicleStatus ,vehicleStatus});
      setShowDelete(true);
      
    }
    const handleDeleteClose = () => setShowDelete(false);
        
    useEffect(() => {
      setLoad(true);
      axios.get('https://jsonplaceholder.typicode.com/todos/')
          .then(res => {
            setvehicleStatusList(res.data);
            setLoad(false);

          })
          .catch(err => {
            console.log(err.message);
            console.log('error');
            setLoad(true);
          })
    },[]);

    const addBrand = () => {
      setvehicleStatusList([...vehicleStatus, vehicleStatus] )
      setshowCreate(false);
    }

    const updateBrand = () => {
      setvehicleStatusList(vehicleStatusList.map(b => (b.id === setVehicleStatus.id ? setVehicleStatus : b)))
      setShowEdit(false);
    }

    const deleteBrand = () => {
      setvehicleStatusList(vehicleStatusList.filter(b => b.id !== setVehicleStatus.id));
      setShowDelete(false);
    }

  return (
    <div>
      <div className="main-nav nav-top-margin">
        <div className="container mt-5 ">         
          <Button className="float-right mb-md-3" onClick={handleCreateShow}>
            Add Teams 
          </Button>
          <h2 className="float-left ml-md-3">Teams</h2>        
        <TableList
          thName ={thArray}
          tdData =        
            {vehicleStatusList
              ? vehicleStatusList.map((vehicleStatus, index) => (
                  <tr key={index}>
                    <td>{vehicleStatus.id}</td>
                    <td>{vehicleStatus.title}</td>
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
                title="Add Teams Ashraf Bhai"
                closeModal={handleCreateClose}
                btnText = "Create Team"
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
        <p>Are you sure to delete this Team</p>
          }/>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatus;


