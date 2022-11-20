import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Card from '../../components/card/Card';
import styles from './Contact.module.scss';
import { FaEnvelope, FaGithub, FaPhoneAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
    const form = useRef();

    const Mailto = ({ email, subject, body, ...props }) => (
        <a href={`mailto:${email}?subject=${subject || ''}&body=${body || ''}`}>{props.children}</a>
    );

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                'template_l8v1z6c',
                form.current,
                'Y2PpKP9cCjs-Siigb',
            )
            .then(
                (result) => {
                    toast.success('Message sent successfully!!!');
                },
                (error) => {
                    toast.error(error.text);
                },
            );
        e.target.reset();
    };

    return (
        <section>
            <div className={`container ${styles.contact}`}>
                <h2>Contact Us</h2>
                <div className={styles.section}>
                    <form ref={form} onSubmit={sendEmail}>
                        <Card cardClass={styles.card}>
                            <label>Name</label>
                            <input type="text" name="user_name" placeholder="Full Name" required />
                            <label>Email</label>
                            <input
                                type="email"
                                name="user_email"
                                placeholder="Your active email"
                                required
                            />
                            <label>Subject</label>
                            <input type="text" name="subject" placeholder="Subject" required />
                            <label>Message</label>
                            <textarea name="message" cols="30" rows="10"></textarea>
                            <button className="--btn --btn-primary">Send Message</button>
                        </Card>
                    </form>
                    <div className={styles.details}>
                        <Card cardClass={styles.card2}>
                            <h3>Our Contact Information</h3>
                            <p>Fill the form or contact us via other channels listed below</p>
                            <div className={styles.icons}>
                                <span>
                                    <FaPhoneAlt />
                                    <a href="tel:0909123456">+84 901 663 500</a>
                                </span>
                                <span>
                                    <FaEnvelope />
                                    <Mailto
                                        email="19521766@gm.uit.edu.vn"
                                        subject="Hello"
                                        body="Hello world!"
                                    >
                                        Mail me
                                    </Mailto>
                                </span>
                                <span>
                                    <FaGithub />
                                    <a href="https://github.com/LocCuTo">LocCuTo</a>
                                </span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
