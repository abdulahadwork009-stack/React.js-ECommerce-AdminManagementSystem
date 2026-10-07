import { useState, useRef, useEffect } from "react";
import { useMessages } from "../context/MessagesContext";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { validateEmail } from "../utils/helpers";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { addMessage } = useMessages();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus(); // focus first input when form opens
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSuccess(false);
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required.";
    if (!form.email.trim()) err.email = "Email is required.";
    else if (!validateEmail(form.email)) err.email = "Enter a valid email.";
    if (!form.subject.trim()) err.subject = "Subject is required.";
    if (form.message.trim().length < 10) err.message = "Message must be at least 10 characters.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      addMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setSuccess(true);
      setForm(initialForm);
      nameRef.current?.focus();
    }
  };

  const inputClass = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700";

  return (
    <Container className="py-12">
      <Card className="mx-auto max-w-xl">
        <h1 className="mb-4 text-2xl font-bold">Contact Us</h1>
        {success && <p className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">Thank you! Your message has been sent.</p>}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <input ref={nameRef} name="name" value={form.name} onChange={handleChange} placeholder="Name" className={inputClass} />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className={inputClass} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className={inputClass} />
            {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
          </div>
          <div>
            <textarea name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Message" className={inputClass} />
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </Card>
    </Container>
  );
}