import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { Modal, Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import toast from "react-hot-toast";

function Inventory() {
  
  const [open, setOpen] = useState(false);
  const [drug, setDrug] = useState([]);
  const [productname, setProductName] = useState("");
  const [itemno, setItemNo] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPricePerPiece] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");


  const viewModal = (ProductName,ItemNo, Manufacturer, Category, PricePerPiece,Quantity,Expiry) => {
    setProductName(ProductName);
    setItemNo(ItemNo);
    setManufacturer(Manufacturer);
    setCategory(Category);
    setOpen(true);
    setPricePerPiece(PricePerPiece);
    setQuantity(Quantity);
    setExpiry(Expiry);
  
  };
 
  const [datasource, setDatasource] = useState(
[
  {
    id:1,
    productname:'Amoxicillin',
    itemno:'am-01',
    manufacturer:'Hayleys',
    category:'Drugs',
    price:'20',
    quantity:'500',
    expiry:'2024-2-16',
  }
]

  )
  const dispatch = useDispatch();
 
 
 const columns = [
        { key:1,
          title: "Product Name",
          dataIndex: "productname",
        },
        { key:2,
          title: "Item No",
          dataIndex: "itemno",
        },
        { key:3,
          title: "Manufacturer",
          dataIndex: "manufacturer",
        },
        { key:4,
          title: "Category",
          dataIndex: "category",
        },
        { key:5,
          title: "Price per piece",
          dataIndex: "price",
        },
        { key:6,
          title: "Quantity",
          dataIndex: "quantity",
        },
        { key:7,
          title: "Expiry Date",
          dataIndex: "expiry",
        }, 
      ]
     
      

      const submitHandler = async (e) => {
        try {
          const response = await axios.post(
            "/api/drugs/save-drug",
            {  productname: productname,
              itemno: itemno,
              manufacturer:manufacturer,
              category: category,
              price: price,
              quantity: quantity,
              expiry: expiry
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
      const getInventoryData = async () => {
        try {
          
          const response = await axios.get("/api/drugs/get-all-drugs", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
      
    
          if (response.data.success) {
            setDrug(response.data.data);
          }
          console.log("records", response.data.data);
        } catch (error) {
          
        }
      };
     
      useEffect(() => {
        getInventoryData();
      }, []);

return (
<div>
    <h1 className="page-header">Inventory</h1>
    <Row gutter={20}>
        <Col gutter={20} span={12} xs={24} sm={24} lg={5}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="space-between  ">
          
         
    <input mt-0
      placeholder="   Search drug name"
   
    ></input>
    
      <img src="https://static.vecteezy.com/system/resources/thumbnails/001/591/586/small/free-search-icon-free-vector.jpg" style={{ width: 40 , height: 40 }} className=" h-6 mt-1px" alt="search"></img>
      </div>
</Col>

<Col gutter={20} span={12} xs={24} sm={24} lg={5}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="space-between  ">
          
         
    <input size="large" mt-0
      placeholder="   Search Item No"
   
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
          
         
    <input mt-0
      placeholder="   Search Manufacturer"
   
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
      viewModal()
    }
    >Add Drug</Button>
     
     
      </div>
</Col>
</Row>
    <hr />
    <Table columns={columns}  dataSource={drug} />
    <Modal    destroyOnClose={true}
        title="Add a new drug"
        centered
        visible={open}
        onOk={() =>{ setOpen(false);
           submitHandler();                     
        }
        }
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
                                                      <h6 className="text-12 my-0">Item No :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setItemNo (e.target.value)}
          value={itemno }
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Manufacturer :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setManufacturer (e.target.value)}
          value={manufacturer}
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Category :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          rules={[{ required: true }]}
        />
                                            </div>
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Price Per Piece :</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setPricePerPiece(e.target.value)}
          value={price}
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
                                            <div className="flex" >
                                                      <h6 className="text-12 my-0">Expiry:</h6>
                                                      <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setExpiry(e.target.value)}
          value={expiry}
          rules={[{ required: true }]}
        />
                                            </div>
                                            
                                        </div>
                                        </div>
                                        </Modal>
    </div>
);
}

export default Inventory;


