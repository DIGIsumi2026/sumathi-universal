import { motion } from 'framer-motion';
import { CheckCircle2, FileUp, Palette, Printer, Truck } from 'lucide-react';

const steps = [
  { icon: Palette, title: 'Choose Your Service', text: 'Pick apparel, packaging, labels, or any modern print format.' },
  { icon: FileUp, title: 'Share Your Design', text: 'Upload a ready file or explain the idea to our creative team.' },
  { icon: Printer, title: 'We Print With Care', text: 'Your order is checked, proofed, printed, and finished neatly.' },
  { icon: Truck, title: 'Fast Delivery', text: 'We pack securely and deliver with 24/7 project support.' }
];

export default function ProcessSteps() {
  return (
    <section className="process-section section-pad-sm">
      <div className="container process-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.article key={step.title} className="process-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
              <div className="step-number">0{index + 1}</div>
              <Icon />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <CheckCircle2 className="step-check" />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
