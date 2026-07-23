import { motion, useReducedMotion } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';

export default function CSRDescriptionSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="csr-content" className="csr-description-section">
      <div className="csr-description-inner">
        <motion.div
          className="csr-description-image-wrap"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -44 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={imageAssets.csr.descriptionEducation}
            alt="CSR educational support for Sri Lankan children"
            className="csr-description-image"
            draggable={false}
          />
        </motion.div>

        <motion.div
          className="csr-description-content"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 44 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>CSR</span>

          <p>
            Through Thilanga Sumathipala Foundation, a movement of people
            working with others to overcome poverty and suffering. Also to
            upgrade people&apos;s living standards with training on
            self-employment projects, disaster management, protecting
            women&apos;s and children&apos;s rights, and developing sports and
            recreations.
          </p>

          <p>
            Recognizing true excellence in the television medium by awarding
            distinction in the areas of creativity, innovation and craft.
            Through this endeavour, the Sumathi Awards seeks to raise the
            standards of entertainment in this country and applaud those who
            display passion and challenge the norm.
          </p>

          <p>
            Through the Milina Sumathipala Foundation, upholding the legacy of
            the late Dr. Milina Sumathipala and her devotion to Buddhism,
            education, philanthropy and artistic endeavour. Upgrading and
            assisting Buddhist institutions, appreciating and promoting the
            level of Buddhist teaching, awarding scholarships for university
            selected students, O/L and A/L best result holders, and annual
            donation of school books among children of the SUMI employees.
          </p>
        </motion.div>
      </div>
    </section>
  );
}