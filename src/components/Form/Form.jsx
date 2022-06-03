import { useState } from "react";
import PropTypes from "prop-types";
import s from "./Form.module.css";

function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handlerChande = (eve) => {
    const { name, value } = eve.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handlerSubmit = (eve) => {
    eve.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  return (
    <form className={s.form} onSubmit={handlerSubmit}>
      <label className={s.form__label}>
        Name
        <input
          className={s.form__input}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handlerChande}
        />
      </label>
      <label className={s.form__label}>
        Number
        <input
          className={s.form__input}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handlerChande}
        />
      </label>
      <button className={s.form__button} type="submit">
        Add contact
      </button>
    </form>
  );
}
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
