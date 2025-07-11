import Link from 'next/link';

const ChevronDown = () => (
  <svg className="w-4 h-4 ml-1 inline-block text-[#003366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5 mr-1 text-[#0074B7] inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.3 1.2a2 2 0 01-.45 1.95l-.7.7a16.001 16.001 0 006.36 6.36l.7-.7a2 2 0 011.95-.45l1.2.3A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" />
  </svg>
);

const MenuNav = () => (
  <nav aria-label="Main Navigation">
    <ul className="menu-nav flex space-x-8 items-center">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li className="relative group">
        <button className="font-medium flex items-center gap-1" aria-haspopup="true" aria-expanded="false">
          About Us <ChevronDown />
        </button>
        <ul className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg opacity-0 scale-y-95 pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto transition-all duration-200 origin-top z-10">
          <li><Link href="/about-brands" className="block px-4 py-2 hover:bg-gray-100">About Brands</Link></li>
          <li><Link href="/our-team" className="block px-4 py-2 hover:bg-gray-100">Our Teams</Link></li>
          <li><Link href="/company-profile" className="block px-4 py-2 hover:bg-gray-100">Company Profile</Link></li>
          <li><Link href="/services" className="block px-4 py-2 hover:bg-gray-100">Services</Link></li>
          <li><Link href="/sub-dealers" className="block px-4 py-2 hover:bg-gray-100">Sub Dealers</Link></li>
        </ul>
      </li>
      <li className="relative group">
        <button className="font-medium flex items-center gap-1" aria-haspopup="true" aria-expanded="false">
          Products <ChevronDown />
        </button>
        <ul className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 scale-y-95 pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto transition-all duration-200 origin-top z-10">
          <li><Link href="/compressor" className="block px-4 py-2 hover:bg-gray-100">Compressor</Link></li>
          <li><Link href="/condenser" className="block px-4 py-2 hover:bg-gray-100">Condenser</Link></li>
          <li><Link href="/receiver-driver" className="block px-4 py-2 hover:bg-gray-100">Receiver Drier</Link></li>
          <li><Link href="/expansion-valve" className="block px-4 py-2 hover:bg-gray-100">Expansion Valve</Link></li>
          <li><Link href="/evaporators" className="block px-4 py-2 hover:bg-gray-100">Evaporator</Link></li>
          <li><Link href="/pipes-hoses" className="block px-4 py-2 hover:bg-gray-100">Pipes & Hoses</Link></li>
          <li><Link href="/condensor-fanmotor" className="block px-4 py-2 hover:bg-gray-100">Condensor Fan Motor/Blade</Link></li>
          <li><Link href="/radiators" className="block px-4 py-2 hover:bg-gray-100">Radiator</Link></li>
          <li><Link href="/heatercare" className="block px-4 py-2 hover:bg-gray-100">Heater Core</Link></li>
          <li><Link href="/ac-switch" className="block px-4 py-2 hover:bg-gray-100">AC Switch / Pressure Switch</Link></li>
          <li><Link href="/coolant" className="block px-4 py-2 hover:bg-gray-100">Coolant</Link></li>
          <li><Link href="/compressor-oil" className="block px-4 py-2 hover:bg-gray-100">Compressor Oil</Link></li>
          <li><Link href="/refrigerant-r-134a" className="block px-4 py-2 hover:bg-gray-100">Refrigerant  R-134a</Link></li>
          <li><Link href="/carac" className="block px-4 py-2 hover:bg-gray-100">Car Ac Systems</Link></li>
        </ul>
      </li>
      <li>
        <Link href="/clients">Our Clients</Link>
      </li>
      <li>
        <Link href="/news-centre">News Centre</Link>
      </li>
      <li>
        <Link href="/contact">Contact Us</Link>
      </li>
    </ul>
  </nav>
);

export default MenuNav; 