import React,{useState,useEffect} from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";

const Contacts = () => {


    var [contactObjects,setContactObjects] = useState([])
    var [currentId,setCurrentId] = useState('')

    useEffect(()=>{
        firebaseDb.child("contacts").on('value',snapshot =>{
            if(snapshot.val()!=null){
                setContactObjects({
                    ...snapshot.val()
                })
            }else{
                setContactObjects({})
            }
        })
    },[]) 

    const addOrEdit = obj=>{

        if(currentId==''){
            firebaseDb.child("contacts").push(
                obj,
                err => {
                    if(err)
                    console.log(err)
                }
            )
        }else{
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if(err)
                    console.log(err)
                    else
                    setCurrentId('')
                }
            )
        }
    }

    const onDelete = key=>{
        if(window.confirm('Are you sure to delete the record?')){
            firebaseDb.child(`contacts/${key}`).remove(

            )
        }
    }
    return ( 
        <>
        <div className="jumbotron">
            <h1 className="display-4 text-center">Contact Register</h1>
        </div>

        <div className="row">
            <div className="col-md-4">
                <ContactForm addOrEdit={addOrEdit} currentId={currentId} contactObjects={contactObjects}  />
            </div>

            <div className="col-md-8">
               <table className="table table-borderless table-stripped">
                    <thead className="thead light" style={{
                        backgroundColor: 'lightGrey'
                    }}>
                        <tr>
                            <th>FullName</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(contactObjects).map(id=>{
                                return <tr key={id}>
                                    <td>{contactObjects[id].fullName}</td>
                                    <td>{contactObjects[id].mobile}</td>
                                    <td>{contactObjects[id].email}</td>
                                    <td>{contactObjects[id].address}</td>
                                    <td>
                                        <a className="btn text-primary" onClick={()=>{setCurrentId(id)}}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>

                                        <a className="btn text-danger" onClick={ () => {onDelete(id)} }>
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
               </table>
            </div>
        </div>
        </>
     );
}
 
export default Contacts;