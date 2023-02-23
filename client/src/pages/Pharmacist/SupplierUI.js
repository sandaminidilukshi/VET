import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { Modal, Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import toast from "react-hot-toast";
import SalesPopUp from "./SalesPopUp";

function SupplierUI() {
  
  const [open, setOpen] = useState(false);
  const [supllierarray, setSupplierArray] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [isEdit, setIsEdit] = useState(false)
  const [supplierId, setSupplierId] = useState([]);

  const viewModal = (Supplier,Contact,Address,Editable,SupplierId) => {
    setOpen(true)
    setSupplier(Supplier);
    setContact(Contact)
    setAddress(Address)
    
    setIsEdit(Editable);
    setSupplierId(SupplierId)
   
  };
 
 
 

  
  const dispatch = useDispatch();
  
 
 
 const columns = [
        
        {
          title: "Supplier",
          dataIndex: "supplier",
        },
        {
          title: "Contact",
          dataIndex: "contact",
        },
        {
            title: "Address",
            dataIndex: "address",
          },
        {
          title: "Actions",
          dataIndex: "actions",
    
          render: (_, record) => (
            <Button style={{ background: "#a0d911", borderColor: "yellow" ,  height: 40}}
              type="primary"
              onClick={() =>
                viewModal(
                  
                  record.supplier,
                  record.contact,
                  record.address,
                  true,
                  record.drugID
                )
              }
            >
              Edit
            </Button>
          ),
        },
      ]
     
      const getEditedSupplier = async () => {
        try {
         
          const resposne = await axios.post("/api/supplier/edit-supplier", 

          { supplierId:supplierId,
            supplier:supplier,
            contact:contact,
            address:address,
            
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
         
    
          if (resposne.data.success) {
            toast.success("Drug Updated Successfully");
          }
         
        } catch (error) {
      
        }
      };

      const submitHandler = async (e) => {
        try {
          const response = await axios.post(
            "/api/supplier/save-supplier",

            { 
               supplier: supplier,
              contact: contact,
              address:address
              
            },
    
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
    
          if (response.data.success) {
            toast.success("Drug Added Successfully");
          }
        } catch (err) {
          toast.error(err);
        }
        
 
    
      };
      const getSupplierData = async () => {
        try {
          
          const response = await axios.get("/api/supplier/get-all-suppliers", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
      
    
          if (response.data.success) {
            setSupplierArray(response.data.data);
          }
          console.log("records", response.data.data);
        } catch (error) {
          
        }
      };
     
      useEffect(() => {
        getSupplierData();
      }, []);

return (
<div>
    <h1 className="page-header">Supplier List</h1>
    <Row gutter={20}>
        <Col gutter={20} span={12} xs={24} sm={24} lg={5}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="space-between  ">
          
         
    <input mt-0
      placeholder="   Supplier Name"
   
    ></input>
    
      <img src="https://static.vecteezy.com/system/resources/thumbnails/001/591/586/small/free-search-icon-free-vector.jpg" style={{ width: 40 , height: 40 }} className=" h-6 mt-1px" alt="search"></img>
      </div>
</Col>


<Col  gutter={20} span={12} xs={24} sm={24} lg={5}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className=" space-between">
    <Button type="primary" className=" h-6 mt-1px"  style={{ background: "#a0d911", borderColor: "yellow" ,  height: 40}}
     onClick={() =>
    viewModal("","","","",true)
    }
    >+ New Supplier</Button>
     
     
      </div>
</Col>
</Row>
    <hr />
    <Table columns={columns}  dataSource={supllierarray} />
    <Modal    destroyOnClose={true}
        title={isEdit ?"Edit Supplier Details" : "Add a new supplier"}
        centered
        visible={open}  
        
        onOk={isEdit?() =>{ setOpen(false);
          getEditedSupplier()}:() =>{ setOpen(false);
            submitHandler()} }
        onCancel={() => setOpen(false)}
        width={1000}
      >

<div className="w-full" >
                                                  <div className="p-2 m-2" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', layout:"vertical" }} >
                                                    <div className="flex" >
                                                      <h6 className="text-12 my-0">Supplier Name :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setSupplier(e.target.value)}
          value={supplier }
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Contact No :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setContact (e.target.value)}
          value={contact }
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Address :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setAddress (e.target.value)}
          value={address}
          rules={[{ required: true }]}
        />
                                            </div>
                                          
                                            
                                        </div>
                                        </div>

        </Modal>
          <div>
     
        
          </div>
  
        </div>
                                       
);
}

export default SupplierUI;


