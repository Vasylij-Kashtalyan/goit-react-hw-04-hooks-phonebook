// import {ReactComponent as AddIcon} from "./icons/add.svg"
import React, { Component } from "react";
// import IconButton from "./components/IconButton/IconButton";
import { nanoid } from "nanoid";
import Container from "./components/Container";
import Notiflix from "notiflix";
import Section from "./components/Section";
import Contact from "./components/Contact";
import Filter from "./components/Filter";
import Form from "./components/Form";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    showModal: false,
  };
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const stateContact = this.state.contacts;
    const nextContact = this.state.contacts;
    const prevContact = prevState.contacts;
    
    if (stateContact !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(stateContact))
    }

    if (nextContact.length > prevContact.length) {
      this.handlerModal();
    }
  }

  handlerSubmitForm = ({ name, number }) => {
    const { contacts } = this.state;

    if (
      contacts
        .map((contact) => contact.name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      return Notiflix.Notify.warning(`${name} is already in contacts`);
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
    return Notiflix.Notify.success(`${name} is adde in contacts`);
  };

  handleFilter = (eve) => {
    const { name, value } = eve.currentTarget;
    this.setState({ [name]: value });
  };

  handelContactFilter = (eve) => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };
  handlerModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { filter } = this.state;


    return (
      <Container>
        {/* <IconButton onClick={this.handlerModal} aria-label="Добавить contact"> 
            <AddIcon width="35" height="35" fill="#fff"/>
        </IconButton> */}
        
        <Section title="Phonebok">
          <Form onSubmit={this.handlerSubmitForm} />
        </Section>

        <Filter value={filter} onChange={this.handleFilter} />

        <Section title="Contact">
          <Contact
            handelContactFilter={this.handelContactFilter()}
            deleteContact={this.deleteContact}
          />
        </Section>
      </Container>
    );
  };
};

export default App;
