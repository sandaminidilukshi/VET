import React from 'react'
import {Row,Col} from 'antd'
import Layout from '../../components/Layout'
import { Card } from 'antd';
const { Meta } = Card;

function About({ doctor }) {
  return (<Layout>
    <div className='Cards'>
        <div className='container-fluid'>
        <Row gutter={[16, 16]}>
  <Col span={8} >
  <Card
    hoverable
    
    cover={<img alt="example"  style={{height:300,width:300}} src="https://5.imimg.com/data5/BX/KU/ML/SELLER-6134433/veterinary-doctor-500x500.jpg" />}
  >
    <Meta title="Dr.Sarath Kumara" description="Experienced Veterinary Surgeon" />
  </Card>
</Col>
  <Col span={8}><Card
       hoverable
       
       cover={<img alt="example" style={{height:300,width:300}} src="https://site.unibo.it/toolkit/en/university-of-peradeniya-team/@@eod.tiles.richtext/2799c6d3b1324f129b0aceb2dbe497b5/@@images/c7c7eb38-b358-44ea-92be-c54d59854a82.jpeg" />}
     >
       <Meta title="Education" description="University of Peradeniya" />
    </Card></Col>
  <Col span={8} >
  <Card
       hoverable
       
       cover={<img alt="example" style={{height:300,width:300}} src="https://media.zenfs.com/en-US/smartasset_475/22ad07e952153efaef607fd08d2850e1" />}
     >
       <Meta title="Timing and Fees" description="10.00 am to 4.00 pm / Rs.1000.00" />
       
    </Card>
    </Col> 
        </Row>
        </div>
      
    </div>
    </Layout>
  )
}

export default About
