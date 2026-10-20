import { useLayoutEffect, useRef, useState, type FormEvent } from 'react';
import { Mail, Send } from 'lucide-react';

const MESSAGE_LIMIT = 500;

function resizeMessageField(textarea: HTMLTextAreaElement) {
  textarea.style.height = 'auto';
  const borderHeight = textarea.offsetHeight - textarea.clientHeight;
  const maxHeight = parseFloat(getComputedStyle(textarea).maxHeight);
  textarea.style.height = `${Math.min(textarea.scrollHeight + borderHeight, maxHeight)}px`;
}

export default function ContactMapFormSection() {
  const [message, setMessage] = useState('');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (messageRef.current) resizeMessageField(messageRef.current);
  }, [message]);

  useLayoutEffect(() => {
    const textarea = messageRef.current;
    if (!textarea) return;

    let previousWidth = textarea.clientWidth;
    const observer = new ResizeObserver(() => {
      if (textarea.clientWidth !== previousWidth) {
        previousWidth = textarea.clientWidth;
        resizeMessageField(textarea);
      }
    });
    observer.observe(textarea);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const inquiryType = String(formData.get('inquiryType') || '');
    const subject = String(formData.get('subject') || '');
    const message = String(formData.get('message') || '');

    const mailSubject = encodeURIComponent(`[${inquiryType}] ${subject}`);

    const mailBody = encodeURIComponent(
      `Name: ${name}
Email: ${email}
Inquiry Type: ${inquiryType}

Message:
${message}`
    );

    window.location.href = `mailto:info@sumathiuniversal.com?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section className="contact-map-form-section">
      <div className="contact-map-form-inner">
        <div className="contact-map-card">
          <div className="contact-map-frame">
            <iframe
              title="Sumathi Universal Corporate Headquarters Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.73988985588!2d79.87005581009308!3d6.921666518380401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2590b84e25971%3A0x35ebee7d9faae5c0!2sSumathi%20Universal%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1785826897861!5m2!1sen!2slk"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="contact-form-card">
          <div className="contact-form-top">

            <div>
              <h2>Send Your Inquiry</h2>
              <p>
                Share your message with us and the relevant team will get back
                to you.
              </p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </label>
            </div>

            <label>
              <span>Inquiry Type</span>
              <select
                name="inquiryType"
                defaultValue="General Corporate"
                required
              >
                <option value="General Corporate">General Corporate</option>
                <option value="Investment Opportunities">
                  Investment Opportunities
                </option>
                <option value="Subsidiary Inquiry">Subsidiary Inquiry</option>
                <option value="CSR and Partnerships">
                  CSR and Partnerships
                </option>
                <option value="Media and Awards">Media and Awards</option>
              </select>
            </label>

            <label>
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                required
              />
            </label>

            <label>
              <span>Message</span>
              <textarea
                ref={messageRef}
                name="message"
                rows={5}
                maxLength={MESSAGE_LIMIT}
                value={message}
                onChange={(event) => setMessage(event.target.value.slice(0, MESSAGE_LIMIT))}
                aria-describedby="contact-message-count"
                data-lenis-prevent
                placeholder="Write your message here..."
                required
              />
              <small id="contact-message-count" className="contact-message-count">
                {message.length}/{MESSAGE_LIMIT} characters
              </small>
            </label>

            <div className="contact-form-footer">
              <a
                href="mailto:info@sumathiuniversal.com"
                className="contact-form-email-link"
                data-cursor-type="button"
                data-cursor-text="Email"
                data-cursor-color="blue"
              >
                <Mail size={17} />
                info@sumathiuniversal.com
              </a>

              <button
                type="submit"
                className="contact-form-submit"
                data-cursor-type="button"
                data-cursor-text="Send"
                data-cursor-color="blue"
              >
                Send Message
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
