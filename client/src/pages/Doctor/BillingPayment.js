import React from "react";
import Layout from "../../components/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
function BillingPayment(){
    const today = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('h:mm:ss a');
    console.log("date",today)
    const  {user}  = useSelector((state) => state.user);

return(
    <Layout>
          
            
          <div className="w-full font-bold text-20 text-center"><h3>Bill Calculation</h3></div>
                                <div className="w-full font-bold text-16 text-center"><h4>Vet Care Animal Hospital</h4> </div>
                                {/* Boxes */}
                                <div className="mx-5 my-2 flex w-full" >
                                    <div className="w-full" >
                                        <div className="p-2 m-2 w-full" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', borderRadius: '5px' }} >
                                            <div className="flex" >
                                                
                                                <p className="text-12 my-0">Date :{today}</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                            </div>
                                            <div className="flex" >
                                                <p className="text-12 my-0">Time :{currentTime}</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                            </div>

                                            <div className="flex" >
                                                <p className="text-12 my-0">User :{user.name}</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                      
                                        </div>
                                        </div>
                                        <div className="p-2 m-2 w-full" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', borderRadius: '5px' }} >
                                            <div className="flex" >
                                                <p className="text-12 my-0">Medication Payment :</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                            </div>
                                            <div className="flex" >
                                                <p className="text-12 my-0">Pharmacy Bill:</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                            </div>

                                            <div className="flex" >
                                                <p className="text-12 my-0">Total :</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                      
                                        </div>
                                        <div className="flex" >
                                                <p className="text-12 my-0">Sub Total :</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                      
                                        </div>
                                       
                                        </div>
                                        </div>                 
                       
       
                 
    
   
   
        
         


                                        


</div>

    </Layout>
)

}

export default BillingPayment;