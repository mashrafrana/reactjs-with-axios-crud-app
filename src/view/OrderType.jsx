import React, {useState , useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Form, Button , Spinner } from 'react-bootstrap';
import axios from 'axios';
import CreateModal from '../component/CreateModal';
import TableList from '../component/TableList';

const OrderType = () => {

    let title = "Order Type";
    const initialRecord = {id:'',name: ''}
    const [record, setRecord] = useState(initialRecord);
    const [recordList, setRecordList] = useState([]);
    const [showCreate, setshowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [load, setLoad] = useState(false);
    const thArray = ["Id", "Order Type","Edit","Delete"];
    
    const handleInputChange = event => {
      const { name, value } = event.target
      setRecord({...record, [name]: value }) 
    }

    // Add Modal
    const handleCreateShow = () =>{
     setRecord(initialRecord);
     setshowCreate(true);
    }
     const handleCreateClose = () => setshowCreate(false);

    // Edit Modal
    const handleEditShow = (record) => {
      setRecord({...record ,record});
      setShowEdit(true);

    }
    const handleEditClose = () => setShowEdit(false);

    // Delete Modal
    const handleDeleteShow = (record) => { 
      setRecord({...record ,record});
      setShowDelete(true);
      
    }
    const handleDeleteClose = () => setShowDelete(false);
        
    useEffect(() => {
      setLoad(true);
      axios.get('http://192.168.15.106:8000/api/v1/orders')
      .then(res => {
            setRecordList(res.data);
            setLoad(false);
          })
          .catch(err => {
            console.log(err.message);
            setLoad(true);
          })
    },[]);

    const addRecord = () => {
    
      axios.post('http://192.168.15.106:8000/api/v1/orders',
      record
      )
      .then(res => {   
         
        toast.success('Record Added Successfully' , { autoClose: 3000 });
        setRecordList([...recordList, record])
        setRecord(initialRecord);
            
          })
      .catch(err => {
            console.log(err.message);
          })
          setshowCreate(false);
    }

    const updateRecord = () => {
     
      axios.put('http://192.168.15.106:8000/api/v1/orders/'+record.id,
      record
      )
      .then(res => {
        
            toast.success('Record Update Successfully' , { autoClose: 3000 });
            console.log(res.data);
            setRecordList(recordList.map(r => (r.id === record.id ? record : r)))
            setRecord(initialRecord);
          })
          .catch(err => {
            console.log(record.name);
            toast.error('Something went wrong', { autoClose: 3000 });
            console.log(err.message);
          })
     
          setShowEdit(false);
      
    }

    const deleteRecord = () => {

      axios.delete('http://192.168.15.106:8000/api/v1/orders/'+record.id)
      .then(res => {
      
          toast.success('Record Deleted Successfully' , { autoClose: 3000 });
           console.log(res.data);
           setRecordList(recordList.filter(r => r.id !== record.id));
           setRecord(initialRecord);
           
          })
          .catch(err => {
            console.log(err.message);
      })
      
      setShowDelete(false);
      
    }

  return (
    <div>
      <div className="main-nav nav-top-margin">
        <div className="container mt-5 ">         
          <Button className="float-right mb-md-3" onClick={handleCreateShow}>
            Add {title}
          </Button>
          <h2 className="float-left ml-md-3">{title}</h2>        
        <TableList
          thName ={thArray}
          tdData =        
            {recordList
              ? recordList.map((record, index) => (
                  <tr key={index}>
                    <td>{record.id}</td>
                    <td>{record.name}</td>
                    <td><Button onClick={() => handleEditShow(record)}>Edit</Button></td>
                    <td><Button onClick={() => handleDeleteShow(record)}>Delete</Button></td>
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
                title="Add Order Type"
                closeModal={handleCreateClose}
                btnText = {"Create " + title}
                action = {addRecord}
                content={
                <Form >  
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Order Type</Form.Label>
                      <Form.Control type="text" name="name" value={record.name} onChange={handleInputChange} placeholder="Enter Vehicle Status" />
                  </Form.Group>
                </Form>
          }/>

          {/* Edit Modal */}
          <CreateModal
              showModal={showEdit}
              title="Update Order Type"
              closeModal={handleEditClose}
              btnText = {"Update " + title}
              action = {updateRecord}
              content={
                <Form >  
                 <Form.Group controlId="formBasicEmail">
                      <Form.Label>Order Type</Form.Label>
                      <Form.Control type="text" name="name" value={record.name} onChange={handleInputChange} placeholder="Enter Vehicle Status" />
                  </Form.Group>
                </Form>
            }/>
             
          {/* Delete Modal */}
        <CreateModal
        showModal={showDelete}
        title="Delete order Type "
        closeModal={handleDeleteClose}
        btnText = {"Delete " + title}
        action = {deleteRecord}
        content={
        <>
          <p>Are you sure to delete this OrderType</p>
          <p>{record.name}</p>
        </>
          }/>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default OrderType;


