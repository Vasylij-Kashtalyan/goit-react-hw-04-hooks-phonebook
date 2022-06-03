import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Container from "./components/Container";
import Notiflix from "notiflix";
import Section from "./components/Section";
import Contact from "./components/Contact";
import Filter from "./components/Filter";
import Form from "./components/Form";

function App() {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handlerSubmitForm = ({ name, number }) => {
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

    setContacts((contacts) => [...contacts, contact]);
    return Notiflix.Notify.success(`${name} is adde in contacts`);
  };

  const handleFilter = (eve) => setFilter(eve.currentTarget.value);

  function handelContactFilter() {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const deleteContact = (id) => {
    setContacts((contacts) => contacts.filter((contact) => contact.id !== id));
  };

  return (
    <Container>
      <Section title="Phonebok">
        <Form onSubmit={handlerSubmitForm} />
      </Section>

      <Filter value={filter} onChange={handleFilter} />

      <Section title="Contact">
        <Contact
          handelContactFilter={handelContactFilter()}
          deleteContact={deleteContact}
        />
      </Section>
    </Container>
  );
}

export default App;

// function componentDidMount() {
// const contacts = localStorage.getItem("contacts");
// const parsedContacts = JSON.parse(contacts);

// if (parsedContacts) {
//   this.setState({ contacts: parsedContacts });
// }
// }

// function componentDidUpdate(prevProps, prevState) {
//   const stateContact = this.state.contacts;
//   const nextContact = this.state.contacts;
//   const prevContact = prevState.contacts;

//   if (stateContact !== prevState.contacts) {
//     localStorage.setItem("contacts", JSON.stringify(stateContact));
//   }

//   if (nextContact.length > prevContact.length) {
//     this.handlerModal();
//   }
// }
