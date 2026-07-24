import { type FormEvent } from 'react';
import { Building2, Mail, MapPin, Send } from 'lucide-react';

export default function ContactMapFormSection() {
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5084284161385!2d79.86912531057546!3d6.949193493022071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae258f854d3df25%3A0xe4f0cde8e9167140!2s445%20Sirimavo%20Bandaranaike%20Mawatha%2C%20Colombo%2001400!5e0!3m2!1sen!2slk!4v1784870027569!5m2!1sen!2slk"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="contact-form-card">
          <div className="contact-form-top">
            <div className="contact-form-icon">
              <Building2 size={26} />
            </div>

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
                name="message"
                rows={6}
                placeholder="Write your message here..."
                required
              />
            </label>

            <div className="contact-form-footer">
              <a
                href="mailto:info@sumathiuniversal.com"
                className="contact-form-email-link"
              >
                <Mail size={17} />
                info@sumathiuniversal.com
              </a>

              <button type="submit" className="contact-form-submit">
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