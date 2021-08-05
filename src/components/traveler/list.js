import React from 'react';
import { message,Table,Modal,Button,Popconfirm } from 'antd';
import FormTraveler from './form';
import axios from 'axios';


export default class ListTraveler extends React.Component {
   state={
       data:[],
       isModalVisible:false
   }
    componentDidMount(){
        this.getData()
    }
    getData = async () => {
        try {
            const {data} = await axios.get('http://localhost:3001/traveler');
            this.setState({data});
        } catch (error) {
            console.error(error)
            message.error(error.message)
        }
    }

    tooggleModal = (visible) => {
            this.setState({isModalVisible:visible})
    }

    delete = async (id) => {
        try {

            const {data} = await axios.post('http://localhost:3001/traveler/delete' , {id: id})
          message.success(`${data.name} excluido com sucesso`)  
          this.getData()
        } catch (error) {
            console.error(error)
            message.error(error.message)
        }

    }

    cancel =  () => {
    console.log("Cancelou")
    }

    render() {
        const link="#"
         const columns = [
             {
               title: 'Full Name',
               width: 100,
               dataIndex: 'name',
               key: 'name',
               fixed: 'left',
             },
             {
               title: 'Age',
               width: 100,
               dataIndex: 'age',
               key: 'age',
               fixed: 'left',
             },
             {
               title: 'Action',
               dataIndex:'_id', 
               key: '_id',
               fixed: 'right',
               width: 100,
               render: (id) =>  (

                <Popconfirm
                title="Tem certeza que deseja Excluir?"
                onConfirm={()=>this.delete(id)}
                onCancel={this.cancel}
                okText="Sim"
                cancelText="Não"
              >
               <a href={link}>Excluir</a>
              </Popconfirm>
               )
               
               
             },
           ];
          const {data, isModalVisible} = this.state
          return (
              <>
              <Button type="primary" onClick={()=>{this.tooggleModal(true)}}>
        Cadastrar
      </Button>
                 <Modal title="Cadasto do Viajante" visible={isModalVisible} footer={false} closable={false}>
       <FormTraveler getData={this.getData} handleClose={this.tooggleModal}/>
      </Modal>
                <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
              </>
          )
      }
      
}


