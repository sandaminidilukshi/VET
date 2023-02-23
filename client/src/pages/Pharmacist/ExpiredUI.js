import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { Modal, Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import toast from "react-hot-toast";
import SalesPopUp from "./SalesPopUp";

function ExpiredUI() {
  
  const [open, setOpen] = useState(false);
  const [drug, setDrug] = useState([]);
  const [exd, setExd] = useState("");
  const [productname, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isEdit, setIsEdit] = useState(false)
  const [drugID, setDrugID] = useState([]);

  const viewModal = (Exd,ProductName,Quantity,Editable,DrugID) => {
    setOpen(true)
    setExd(Exd);
    setProductName(ProductName);
    setQuantity(Quantity);
    setIsEdit(Editable);
    setDrugID(DrugID)
    console.log("id",drugID)
  };
 
 
 

  
  const dispatch = useDispatch();
  
 
 
 const columns = [
        
        {
          title: "Date Expired",
          dataIndex: "exd",
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
                  
                  record.exd,
                  record.productname,
                  record.quantity,
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
     
      // const getEditedDrug = async () => {
      //   try {
         
      //     const resposne = await axios.post("/api/drugs/edit-drug", 

      //     { drugId:drugId,
      //       productname:productname,
      //       itemno:itemno,
      //       manufacturer:manufacturer,
      //       category:category,
      //       price:price,
      //       quantity:quantity,
      //       expiry:expiry,
            
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       },
      //     });
         
    
      //     if (resposne.data.success) {
      //       toast.success("Drug Updated Successfully");
      //     }
         
      //   } catch (error) {
      
      //   }
      // };

      // const submitHandler = async (e) => {
      //   try {
      //     const response = await axios.post(
      //       "/api/drugs/save-drug",

      //       { 
      //          productname: productname,
      //         itemno: itemno,
      //         manufacturer:manufacturer,
      //         category: category,
      //         price: price,
      //         quantity: quantity,
      //         expiry: expiry
      //       },
    
      //       {
      //         headers: {
      //           Authorization: `Bearer ${localStorage.getItem("token")}`,
      //         },
      //       }
      //     );
    
      //     if (response.data.success) {
      //       toast.success("Drug Added Successfully");
      //     }
      //   } catch (err) {
      //     toast.error(err);
      //   }
        
 
    
      // };
      // const getInventoryData = async () => {
      //   try {
          
      //     const response = await axios.get("/api/drugs/get-all-drugs", {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       },
      //     });
      
    
      //     if (response.data.success) {
      //       setDrug(response.data.data);
      //     }
      //     console.log("records", response.data.data);
      //   } catch (error) {
          
      //   }
      // };
     
      useEffect(() => {
        // getInventoryData();
      }, []);

return (
<div>
    <h1 className="page-header">Expired List</h1>
    <Row gutter={20}>
        <Col gutter={20} span={12} xs={24} sm={24} lg={5}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="space-between  ">
          
         
    <input mt-0
      placeholder="   Drug Name"
   
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
    viewModal("","","",true,"")
    }
    >+ Add Expired Drug</Button>
     
     
      </div>
</Col>
</Row>
    <hr />
    <Table columns={columns}  dataSource={drug} />
    <Modal    destroyOnClose={true}
        title={isEdit ?  "Add expiry details" :"Edit Expiry Details"}
        centered
        visible={open}  
        
        onOk={() =>{ setOpen(false);
        //  getEditedDrug()}:() =>{ setOpen(false);
        //   submitHandler()

        }
      }
        onCancel={() => setOpen(false)}
        width={1000}
      >

<div className="w-full" >
                                                  <div className="p-2 m-2" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', layout:"vertical" }} >
                                                    <div className="flex" >
                                                      <h6 className="text-12 my-0">Expiry date :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setExd(e.target.value)}
          value={exd }
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
                                               
                                            
                                        </div>
                                        </div>

        </Modal>
          <div>
     
        
          </div>
  
        </div>
                                       
);
}

export default ExpiredUI;


