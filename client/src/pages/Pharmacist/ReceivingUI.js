import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { Modal, Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import toast from "react-hot-toast";
import SalesPopUp from "./SalesPopUp";

function ReceivingUI() {
  
  const [open, setOpen] = useState(false);
  const [receive, setReceive] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [productname, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isEdit, setIsEdit] = useState(false)
  const [receiveId, setReceiveId] = useState([]);

  const viewModal = (Supplier,ProductName,Quantity,Price,ReceiveId,Editable) => {
    setOpen(true)
    setSupplier(Supplier);
    setProductName(ProductName)
    setQuantity(Quantity)
    setPrice(Price)
    setIsEdit(Editable);
    setReceiveId(ReceiveId)
 
  };
 
 
 

  
  const dispatch = useDispatch();
  
 
 
 const columns = [
        
        {
          title: "Supplier",
          dataIndex: "supplier",
        },
        {
          title: "Product",
          dataIndex: "productname",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "price",
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
                  record.productname,
                  record.quantity,
                  record.price,
                 
                  record._id,
                  true,
                )
              }
            >
              Edit
            </Button>
          ),
        },
      ]
     
      const getEditedReceiving = async () => {
        try {
         
          const resposne = await axios.post("/api/receive/edit-receive", 

          { receiveId:receiveId,
            productname:productname,
            supplier:supplier,
            price:price,
            quantity:quantity,
           
            
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
            "/api/receive/save-receiving",

            { supplier: supplier,
               productname: productname,
               quantity: quantity,
              price: price,
              
              
            },
    
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
    
          if (response.data.success) {
            toast.success("Receive Added Successfully");
          }
        } catch (err) {
          toast.error(err);
        }
       };
      const getReceivingData = async () => {
        try {
          
          const response = await axios.get("/api/receive/get-all-receives", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
      
    
          if (response.data.success) {
            setReceive(response.data.data);
          }
          console.log("records", response.data.data);
        } catch (error) {
          
        }
      };
     
      useEffect(() => {
        getReceivingData();
      }, []);

return (
<div>
    <h1 className="page-header">Receiving List</h1>
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
    viewModal("","","","","",false)
    }
    >+ New Receiving</Button>
     
     
      </div>
</Col>
</Row>
    <hr />
    <Table columns={columns}  dataSource={receive} />
    <Modal    destroyOnClose={true}
        title={isEdit ?  "Edit Receiving Details":"Add a new receiving" }
        centered
        visible={open}  
        
        onOk={isEdit?() =>{ setOpen(false);
          getEditedReceiving()}:() =>{ setOpen(false);
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
                                                      <h6 className="text-12 my-0">Product :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setProductName (e.target.value)}
          value={productname }
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Quantity :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setQuantity (e.target.value)}
          value={quantity}
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Price :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setPrice (e.target.value)}
          value={price}
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

export default ReceivingUI;


