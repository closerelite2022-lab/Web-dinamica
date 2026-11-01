import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ScrollSequence } from "@/components/ScrollSequence";
import { FloorPlan } from "@/components/FloorPlan";
import { Gallery } from "@/components/Gallery";
import { detailScenes, firstFloorScenes, property, secondFloorScenes, whatsappHref } from "@/data/property";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a href="#inicio" className="site-brand" aria-label="Volver al inicio">ÁTICO CASTELLANA</a>
        <div className="header-right">
          <span className="header-location">{property.location}</span>
          <a className="header-cta" href={whatsappHref()} target="_blank" rel="noopener noreferrer">SOLICITAR VISITA</a>
        </div>
      </header>

      <main>
        <ScrollSequence id="inicio" scenes={firstFloorScenes} desktopHeight={500} mobileHeight={390} />

        <section className="facts-band" aria-label="Características de la vivienda">
          <div className="facts-grid">
            {property.facts.map((fact) => <div key={fact.label} className="fact-item"><span className="fact-value">{fact.value}</span><span className="fact-label">{fact.label}</span></div>)}
          </div>
          <h2>Subimos a la 2ª planta</h2>
          <p>Espacios abiertos, terraza panorámica y piscina privada</p>
          <ArrowDown className="facts-arrow" size={27} strokeWidth={1.3} aria-hidden="true" />
        </section>

        <ScrollSequence id="planta-alta" scenes={secondFloorScenes} desktopHeight={590} mobileHeight={470} />

        <section id="planos" className="plans-section">
          <div className="section-heading">
            <p className="eyebrow">LA DISTRIBUCIÓN</p>
            <h2>Planos de la vivienda</h2>
            <p className="plans-subtitle">Una propuesta espacial para imaginar cada ambiente.</p>
          </div>
          <div className="plans-grid">
            {property.floorPlans.map((plan, i) => (
              <article className="plan-card" key={plan.title}>
                <div className="plan-illustration"><FloorPlan floor={(i + 1) as 1 | 2} /></div>
                <div className="plan-copy">
                  <h3>{plan.title}</h3>
                  <ul>{plan.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  <p className="plan-note">Esquema ilustrativo · No apto para uso técnico</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ScrollSequence id="detalles" scenes={detailScenes} desktopHeight={300} mobileHeight={270} />

        <Gallery />

        <section className="contact-section" id="contacto">
          <div className="contact-topline">UNA VIVIENDA. MUCHAS FORMAS DE VIVIRLA.</div>
          <h2>{property.title}</h2>
          <p>{property.location}</p>
          <a className="primary-cta" href={whatsappHref(true)} target="_blank" rel="noopener noreferrer">
            SOLICITAR VISITA PRIVADA <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <div className="contact-brand">
            <div className="brand-name">{property.brand}</div>
            <div className="brand-role">EXPERIENCIAS INMOBILIARIAS</div>
            <div className="brand-contact">Una experiencia de presentación adaptable a tu propiedad</div>
          </div>
          <small>{property.disclaimer}</small>
          <small className="copyright">© {new Date().getFullYear()} {property.brand}. Demo visual.</small>
        </section>
      </main>
    </>
  );
}
