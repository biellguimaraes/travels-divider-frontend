import React from 'react';
import { Form, Input, Button, message} from 'antd';
import axios from 'axios';

export default class FormTraveler extends React.Component{
     onFinish = async (values) => {
         try {
             console.log('Success:', values);
             const {data} = await axios.post('http://localhost:3001/traveler', values)
             this.props.getData()
             this.props.handleClose(false)
             message.success(`${data.name} adicionado com sucesso!`)
         } catch (error) {
             console.error(error)
             message.error(error.message)
         }
      };    
    
     onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      render() { 
        return (
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="Nome"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Nome é Obrigatório',
                  },
                ]}
              >
                <Input />
              </Form.Item>
        
              <Form.Item
                label="Idade"
                name="age"
                rules={[
                  {
                    required: true,
                    message: 'Idade é Obrigatório!',
                  },
                ]}
              >
                <Input/>
              </Form.Item>
        
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 8,
                }}
              >
                <Button type="danger" onClick={() =>{this.props.handleClose(false)}}>
                  Cancelar
                </Button>
              </Form.Item>
            </Form>
          );
    }
    
      }
      

