import React, {useState , useEffect } from 'react';
import {Form, Button , Spinner } from 'react-bootstrap';
import CreateModal from '../component/CreateModal';
import TableList from '../component/TableList';
import axios from 'axios';

const Brand = () => {

    const initialState = {userId: '',id: '',title: '',completed: ''}
    const [brand, setBrand] = useState(initialState);
    const [brands, setBrands] = useState([]);
    const [showCreate, setshowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [load, setLoad] = useState(false);

    const thArray = ["User Id", "ID", "Title", "Completed","Edit","Delete"];
    
    const handleInputChange = event => {
      const { name, value } = event.target
      setBrand({ ...brand, [name]: value }) 
    }

    // Add Modal
    const handleCreateShow = () => setshowCreate(true);
    const handleCreateClose = () => setshowCreate(false);

    // Edit Modal
    const handleEditShow = (brand) => {
      setBrand({...brand ,brand});
      setShowEdit(true);

    }
    const handleEditClose = () => setShowEdit(false);

    // Delete Modal
    const handleDeleteShow = (brand) => { 
      console.log(brand);
      setBrand({...brand ,brand});
      setShowDelete(true);
      
    }
    const handleDeleteClose = () => setShowDelete(false);
        
    useEffect(() => {
      setLoad(true);
      axios.get('https://jsonplaceholder.typicode.com/todos/')
          .then(res => {
            setBrands(res.data);
            // console.log(res.data);
            setLoad(false);

          })
          .catch(err => {
            console.log(err.message);
            console.log('error');
            setLoad(true);
          })
    },[]);

    const addBrand = () => {
      setBrands([...brands, brand] )
      setshowCreate(false);
    }

    const updateBrand = () => {
      setBrands(brands.map(b => (b.id === brand.id ? brand : b)))
      setShowEdit(false);
    }

    const deleteBrand = () => {
      setBrands(brands.filter(b => b.id !== brand.id));
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
            {brands
              ? brands.map((brand, index) => (
                  <tr key={index}>
                    <td>{brand.userId}</td>
                    <td>{brand.id}</td>
                    <td>{brand.title}</td>
                    <td>{brand.completed}g</td>
                    <td><Button onClick={() => handleEditShow(brand)}>Edit</Button></td>
                    <td><Button onClick={() => handleDeleteShow(brand)}>Delete</Button></td>
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
                      <Form.Label>User Id</Form.Label>
                      <Form.Control type="text" name="userId" value={brand.userId} onChange={handleInputChange} placeholder="Enter User Id" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>ID</Form.Label>
                      <Form.Control type="text" name="id" value={brand.id} onChange={handleInputChange} placeholder="ID" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" name="title" value={brand.title} onChange={handleInputChange} placeholder="Title" />
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
                      <Form.Label>User Id</Form.Label>
                      <Form.Control type="text" name="userId" value={brand.userId} onChange={handleInputChange} placeholder="Enter User Id" />
                      <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                      </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>ID</Form.Label>
                      <Form.Control type="text" name="id" value={brand.id} onChange={handleInputChange} placeholder="ID" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" name="title" value={brand.title} onChange={handleInputChange} placeholder="Title" />
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

export default Brand;


