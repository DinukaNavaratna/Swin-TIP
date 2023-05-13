import emailjs from 'emailjs-com';
import React from 'react';
import swal from 'sweetalert';

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const USER_ID = process.env.REACT_APP_USER_ID;

export default function Contact() {
  function sendEmail(e) {
    e.preventDefault();
    if (
      e.target.elements.name.value == '' ||
      e.target.elements.email.value == '' ||
      e.target.elements.subject.value == '' ||
      e.target.elements.message.value == ''
    ) {
      swal('Sorry', 'Empty Fields', 'error');
    } else {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
        (result) => {
          swal('Thank You', 'Email Sent successfully', 'success');
        },
        (error) => {
          swal('Unsuccessful', 'Email Sending Failed', 'error');
        }
      );
      e.target.reset();
    }
  }

  return (
    <div>
      <div className="container my-5">
        <h2 className="text-dark" style={{ textAlign: 'center' }}>
          Contact Us
        </h2>
        <form onSubmit={sendEmail}>
          <div className="row pt-5 mx-auto">
            <div className="col-8 form-group mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
              />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                name="subject"
              />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <textarea
                className="form-control"
                id=""
                cols="30"
                rows="8"
                placeholder="Your message"
                name="message"
              />
            </div>
            <div className="col-8 pt-3 mx-auto">
              <input
                type="submit"
                className="btn btn-info"
                value="Send Message"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
