import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { Modal, Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import toast from "react-hot-toast";
import SalesPopUp from "./SalesPopUp";

function SalesUI() {
  
  const [open, setOpen] = useState(false);
  const [sales, setSales] = useState([]);
  const [productname, setProductName] = useState("");
  const [customer, setCustomer] = useState("");
  const [date1, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isEdit, setIsEdit] = useState(false)
  const [salesId, setSalesId] = useState("")

  const viewModal = (ProductName,Customer,date,Quantity,SalesId,Editable) => {
    setOpen(true)
    setProductName(ProductName);
    setCustomer(Customer)
    setDate(date)
    setQuantity(Quantity)
    setIsEdit(Editable);
    setSalesId(SalesId);
    
  };
 
 
 

  
  const dispatch = useDispatch();
  
 
 
 const columns = [
        { 
          title: "Date",
          dataIndex: "date1",
        },
        {
          title: "Customer",
          dataIndex: "customername",
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
          title: "Actions",
          dataIndex: "actions",
    
          render: (_, record) => (
            <Button style={{ background: "#a0d911", borderColor: "yellow" ,  height: 40}}
              type="primary"
              onClick={() =>
                viewModal(
                  
                  record.productname,
                  record.customer,
                  record.date1,
                  record.quantity,
                  
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
     
      const getEditedSale = async () => {
        try {
         
          const resposne = await axios.post("/api/sales/edit-sale", 

          { salesId:salesId,
            productname:productname,
            customer:customer,
            date1:date1,
            quantity:quantity,
            
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
         
    
          if (resposne.data.success) {
            toast.success("Sales Updated Successfully");
          }
         
        } catch (error) {
      
        }
      };

      const submitHandler = async (e) => {
        try {
          const response = await axios.post(
            "/api/sales/save-sales",

            { 
               productname: productname,
               customername: customer,
               date1:date1,
              quantity: quantity,
             
            },
    
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
    
          if (response.data.success) {
            toast.success("Sales Added Successfully");
          }
        } catch (err) {
          toast.error(err);
        }
        
 
    
      };
      const getSalesData = async () => {
        try {
          
          const response = await axios.get("/api/sales/get-all-sales", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
      
    
          if (response.data.success) {
            setSales(response.data.data);
          }
          console.log("records", response.data.data);
        } catch (error) {
          
        }
      };
     
      useEffect(() => {
        getSalesData();
      }, []);

return (
<div>
    <h1 className="page-header">Sales List</h1>
    <Row gutter={20}>
        <Col gutter={20} span={12} xs={24} sm={24} lg={5}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="space-between  ">
          
         
    <input mt-0
      placeholder="   Search Sales No"
   
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
    >+ New Sales</Button>
     
     
      </div>
</Col>
</Row>
    <hr />
    <Table columns={columns}  dataSource={sales} />
    <Modal    destroyOnClose={true}
        title={isEdit ?  "Add a new sales" :"Edit Sales"}
        centered
        visible={open}  
        
        onOk={isEdit?() =>{ setOpen(false);
          getEditedSale()}:() =>{ setOpen(false);
            submitHandler()} }
        onCancel={() => setOpen(false)}
        width={1000}
      >

<div className="w-full" >
                                                  <div className="p-2 m-2" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', layout:"vertical" }} >
                                                    <div className="flex" >
                                                      <h6 className="text-12 my-0">Product Name :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setProductName(e.target.value)}
          value={productname }
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Customer :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setCustomer (e.target.value)}
          value={customer }
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Date :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setDate (e.target.value)}
          value={date1}
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Quantity :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
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

export default SalesUI;


