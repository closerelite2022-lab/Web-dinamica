type Props = { floor: 1 | 2 };

const RoomLabel = ({ x, y, children }: { x: number; y: number; children: React.ReactNode }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="12" letterSpacing="1.5" fill="#64676a" fontFamily="Arial, sans-serif">{children}</text>
);

export function FloorPlan({ floor }: Props) {
  if (floor === 1) {
    return (
      <svg viewBox="0 0 680 440" role="img" aria-label="Plano ilustrativo de la planta inferior" className="floor-svg">
        <rect width="680" height="440" fill="#fff" />
        <g fill="none" stroke="#222" strokeWidth="8" strokeLinejoin="miter">
          <path d="M34 44H646V357H540V411H232V357H34Z" />
          <path d="M34 252H342M342 44V252M342 167H490M490 44V252M490 252H646M232 252V411M380 252V357M540 252V411" strokeWidth="5" />
        </g>
        <g stroke="#aeb5b5" strokeWidth="5"><path d="M58 44H300M365 44H460M490 44H635M34 75V218M646 105V230" /></g>
        <g fill="none" stroke="#9c9a94" strokeWidth="2">
          <rect x="79" y="91" width="205" height="104" rx="13" />
          <rect x="89" y="103" width="64" height="80" rx="12" />
          <rect x="159" y="103" width="110" height="80" rx="12" />
          <rect x="79" y="210" width="154" height="24" rx="4" />
          <circle cx="310" cy="294" r="37" />
          <circle cx="310" cy="294" r="8" />
          {Array.from({ length: 10 }, (_, i) => {
            const angle = i * Math.PI / 5;
            return <line key={i} x1={310} y1={294} x2={310 + 37 * Math.cos(angle)} y2={294 + 37 * Math.sin(angle)} />;
          })}
          <rect x="385" y="286" width="112" height="47" rx="3" />
          <rect x="506" y="82" width="120" height="115" rx="2" />
          <path d="M528 82V197M563 82V197M600 82V197" />
          <rect x="250" y="367" width="109" height="30" rx="2" />
          <rect x="410" y="363" width="90" height="31" rx="2" />
        </g>
        <RoomLabel x={184} y={78}>SALÓN</RoomLabel>
        <RoomLabel x={430} y={102}>COMEDOR</RoomLabel>
        <RoomLabel x={570} y={230}>COCINA</RoomLabel>
        <RoomLabel x={425} y={271}>RECIBIDOR</RoomLabel>
        <RoomLabel x={127} y={305}>DORMITORIO</RoomLabel>
        <RoomLabel x={420} y={383}>SUITE</RoomLabel>
        <text x="34" y="429" fontSize="10" fill="#999" letterSpacing="2">PLANTA 01 · ESQUEMA ILUSTRATIVO</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 680 440" role="img" aria-label="Plano ilustrativo de la planta superior y terraza" className="floor-svg">
      <rect width="680" height="440" fill="#fff" />
      <g fill="none" stroke="#242424" strokeWidth="8">
        <path d="M35 42H646V374H35Z" />
        <path d="M250 42V374M250 194H646M440 42V194M440 194V374" strokeWidth="5" />
      </g>
      <g fill="#f7f5ef" stroke="#b4ae9c" strokeWidth="2">
        <rect x="270" y="61" width="348" height="114" rx="3" />
      </g>
      <g fill="#c9e5e7" stroke="#86acaf" strokeWidth="3"><rect x="475" y="77" width="126" height="80" rx="2" /></g>
      <g stroke="#79b8bd" strokeWidth="1.5" opacity="0.65">
        {Array.from({length: 5}, (_,i)=><line key={i} x1="480" y1={85+i*14} x2="597" y2={85+i*14} />)}
      </g>
      <g fill="none" stroke="#a5a29b" strokeWidth="2">
        <rect x="65" y="72" width="146" height="71" rx="8" />
        <rect x="68" y="230" width="128" height="84" rx="4" />
        <circle cx="333" cy="275" r="39" />
        <circle cx="333" cy="275" r="8" />
        <rect x="474" y="231" width="129" height="57" rx="5" />
        <rect x="474" y="300" width="129" height="45" rx="5" />
      </g>
      <RoomLabel x={137} y={60}>SUNROOM</RoomLabel>
      <RoomLabel x={137} y={212}>COCINA / COMEDOR</RoomLabel>
      <RoomLabel x={345} y={102}>TERRAZA</RoomLabel>
      <RoomLabel x={538} y={127}>PISCINA</RoomLabel>
      <RoomLabel x={330} y={355}>ESCALERA</RoomLabel>
      <RoomLabel x={540} y={217}>SALA DE ESTAR</RoomLabel>
      <text x="35" y="429" fontSize="10" fill="#999" letterSpacing="2">PLANTA 02 · ESQUEMA ILUSTRATIVO</text>
    </svg>
  );
}
