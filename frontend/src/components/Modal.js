import React, { Component } from "react";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: props.ActiveItem || { title: "", description: "", completed: false },
        };
    }




    // check checkbox is checked or not
    handleChange = e => {
        const { name, value, type, checked } = e.target;

         const newValue = type === 'checkbox' ? checked : value;
            
            
      
            const activeItem = { ...this.state.activeItem, [name]: newValue };
            this.setState({ activeItem });
  
    };
    

    render() {
        const { toggle, onSave} = this.props;
        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Task Item</ModalHeader>
                <ModalBody>
              
                    <Form>
                        {/* 1 title label*/}
                        <FormGroup>
                            <Label for='title'>Title</Label>
                            <Input
                                type="text"
                      
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter Task Title"
                            />
                        </FormGroup>
                        {/* 2 description label*/}
                        <FormGroup>
                            <Label for='description'>Description</Label>
                            <Input
                                type="text"
                                
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter Task Description"
                            />

                        {/* 3 completed label*/}
                        </FormGroup>
                        <FormGroup check>
                            <Label>
                                <Input
                                    type="checkbox"
                                    id="completed"
                                    name="completed"
                                    checked={this.state.activeItem.completed}
                                    onChange={this.handleChange}
                                />
                                completed
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>

                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                    
                </ModalFooter>
            </Modal>
        );
    };
}

export default CustomModal;
